import { NextRequest, NextResponse } from 'next/server'
import { scrapeUrl } from '@/lib/scraper'
import { calculateScore } from '@/lib/scorer'
import { generateActionPlan } from '@/lib/transformer'
import { generateKiSummary } from '@/lib/ki-summary'
import { checkRateLimit, isCrawlerAuthorized } from '@/lib/rate-limit'
import { getScoreBand, getScoreBandInfo } from '@/lib/score-bands'
import { pingIndexNow } from '@/lib/indexnow'

const MAX_URL_LENGTH = 500
const INTERNAL_IP_PATTERNS = [
  /^127\./, /^10\./, /^172\.(1[6-9]|2\d|3[01])\./, /^192\.168\./,
  /^0\./, /^localhost$/i, /^\[::1\]/,
]

function isInternalUrl(url: string): boolean {
  try {
    const parsed = new URL(url.startsWith('http') ? url : `https://${url}`)
    return INTERNAL_IP_PATTERNS.some(p => p.test(parsed.hostname))
  } catch {
    return true
  }
}

export async function POST(request: NextRequest) {
  try {
    // Crawler-Bypass oder Rate Limiting
    const crawlerSecret = request.headers.get('x-crawler-secret')
    const skipRateLimit = isCrawlerAuthorized(crawlerSecret)

    const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
               request.headers.get('x-real-ip') ||
               'unknown'

    if (!skipRateLimit) {
      const rateCheck = checkRateLimit(ip)
      if (!rateCheck.allowed) {
        return NextResponse.json(
          { error: 'Rate Limit erreicht. Maximal 5 Scans pro Stunde.' },
          { status: 429 }
        )
      }
    }

    // Input parsen
    const body = await request.json()
    const url = body.url
    const includeActionPlan = body.includeActionPlan !== false

    // Input Validierung
    if (!url || typeof url !== 'string') {
      return NextResponse.json(
        { error: 'URL ist erforderlich' },
        { status: 400 }
      )
    }

    if (url.length > MAX_URL_LENGTH) {
      return NextResponse.json(
        { error: 'URL zu lang (max 500 Zeichen)' },
        { status: 400 }
      )
    }

    if (isInternalUrl(url)) {
      return NextResponse.json(
        { error: 'Interne URLs sind nicht erlaubt' },
        { status: 400 }
      )
    }

    // Pipeline: Scraper → Scorer → (optional) Transformer
    const scraped = await scrapeUrl(url)
    const score = calculateScore(scraped)

    let actionPlan = undefined
    if (includeActionPlan) {
      try {
        actionPlan = await generateActionPlan(scraped.url, scraped.markdown, score)
      } catch (err) {
        console.error('Transformer error (non-fatal):', err)
      }
    }

    const bandInfo = getScoreBandInfo(score.totalScore)

    // KI-Zusammenfassung generieren (non-fatal)
    let kiSummary = undefined
    if (actionPlan) {
      try {
        kiSummary = await generateKiSummary(scraped.url, actionPlan.actions)
      } catch (err) {
        console.error('KI-Summary error (non-fatal):', err)
      }
    }

    // IndexNow: Result-URL an Bing pushen (fire-and-forget)
    pingIndexNow(scraped.url)

    return NextResponse.json({
      url: scraped.url,
      totalScore: score.totalScore,
      scoreBand: bandInfo.band,
      scoreBandInfo: bandInfo,
      dimensions: score.dimensions,
      industry: actionPlan?.industry || 'Websites allgemein',
      actionPlan,
      kiSummary,
      scannedAt: new Date().toISOString(),
    })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unbekannter Fehler'
    console.error('Scan error:', message)

    // Bekannte User-Fehler als 400 zurückgeben
    if (message.includes('Ungültige URL') ||
        message.includes('Interne URLs') ||
        message.includes('nicht erlaubt')) {
      return NextResponse.json({ error: message }, { status: 400 })
    }

    if (message.includes('Rate Limit')) {
      return NextResponse.json({ error: message }, { status: 429 })
    }

    return NextResponse.json(
      { error: 'Analyse fehlgeschlagen. Bitte versuche es erneut.' },
      { status: 500 }
    )
  }
}
