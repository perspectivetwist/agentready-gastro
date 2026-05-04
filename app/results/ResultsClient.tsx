'use client'

import { useSearchParams } from 'next/navigation'
import { useEffect, useState, Suspense } from 'react'
import { SlipstreamResult } from '@/types/slipstream'

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || ''
import ScoreCircle from '@/components/ScoreCircle'
import DimensionBars from '@/components/DimensionBars'
import ActionPlan from '@/components/ActionPlan'
import KIZusammenfassung from '@/components/KIZusammenfassung'
import RankingCard from '@/components/RankingCard'
import EmailGate from '@/components/EmailGate'
import CrossSell from '@/components/CrossSell'
import ShareButton from '@/components/ShareButton'
import { trackScanComplete, trackEmailGate } from '@/lib/gtag'

function ResultsContent() {
  const searchParams = useSearchParams()
  const url = searchParams.get('url') || ''

  const [result, setResult] = useState<SlipstreamResult | null>(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)
  const [isUnlocked, setIsUnlocked] = useState(false)

  useEffect(() => {
    const unlocked = localStorage.getItem('slipstream_unlocked') === 'true'
    setIsUnlocked(unlocked)
  }, [])

  useEffect(() => {
    if (!url) {
      setError('Keine URL angegeben')
      setLoading(false)
      return
    }

    const cached = sessionStorage.getItem('slipstream_result')
    if (cached) {
      try {
        const data: SlipstreamResult = JSON.parse(cached)
        sessionStorage.removeItem('slipstream_result')
        setResult(data)
        trackScanComplete(decodeURIComponent(url), data.totalScore)
        if (!isUnlocked) trackEmailGate('shown')
        setLoading(false)
        return
      } catch {
        // Fall through to API call
      }
    }

    async function runScan() {
      try {
        const res = await fetch(`${BASE_PATH}/api/scan`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ url: decodeURIComponent(url) }),
        })

        const data = await res.json()

        if (!res.ok) {
          throw new Error(data.error || `Fehler ${res.status}`)
        }

        setResult(data)
        trackScanComplete(decodeURIComponent(url), data.totalScore)
        if (!isUnlocked) trackEmailGate('shown')
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unbekannter Fehler')
      } finally {
        setLoading(false)
      }
    }

    runScan()
  }, [url])

  function handleUnlock() {
    localStorage.setItem('slipstream_unlocked', 'true')
    setIsUnlocked(true)
  }

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-300 mx-auto mb-4" />
          <p className="text-lg font-light text-gray-300">Analysiere Website...</p>
        </div>
      </main>
    )
  }

  if (error) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="text-4xl mb-4">&#x26a0;&#xfe0f;</div>
          <h1 className="text-xl font-bold text-white mb-2">Analyse fehlgeschlagen</h1>
          <p className="text-gray-400 font-light mb-6">{error}</p>
          <a
            href="/"
            className="inline-block px-6 h-11 leading-[2.75rem] bg-white text-black rounded-xl font-semibold text-sm hover:bg-gray-100 transition-colors"
          >
            Zur&uuml;ck zur Startseite
          </a>
        </div>
      </main>
    )
  }

  if (!result) return null

  return (
    <main className={`min-h-screen ${!isUnlocked ? 'pb-32' : ''}`}>
      <div className="max-w-3xl mx-auto px-4 py-8 space-y-6">
        <ScoreCircle
          score={result.totalScore}
          bandInfo={result.scoreBandInfo}
          url={result.url}
        />

        <ShareButton score={result.totalScore} resultUrl={typeof window !== 'undefined' ? window.location.href : ''} />

        <RankingCard
          score={result.totalScore}
          industry={result.industry || 'Websites allgemein'}
        />

        <DimensionBars dimensions={result.dimensions} />

        <KIZusammenfassung kiSummary={result.kiSummary ?? null} isUnlocked={isUnlocked} />

        {result.actionPlan && (
          <ActionPlan actionPlan={result.actionPlan} isUnlocked={isUnlocked} />
        )}

        <CrossSell />

        <div className="text-center pt-4">
          <a
            href="/"
            className="text-yellow-300 hover:text-yellow-200 font-light text-sm"
          >
            &larr; Weitere URL analysieren
          </a>
        </div>

        {/* ASD Hotmail Footer */}
        <div className="text-center pt-8 pb-4 border-t border-white/10 mt-8">
          <a
            href="https://www.ki-gastronomie.com?utm_source=slipstream&utm_medium=report&utm_campaign=hotmail"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-gray-500 hover:text-gray-300 transition-colors"
          >
            Erstellt mit AI Shift Drift | Kostenloser KI-Scan f&uuml;r Restaurants
          </a>
        </div>
      </div>

      {!isUnlocked && (
        <EmailGate
          primaryColor="#facc15"
          scannerSource="gastro-slipstream"
          url={decodeURIComponent(url)}
          onUnlock={handleUnlock}
        />
      )}
    </main>
  )
}

export default function ResultsClient() {
  return (
    <Suspense fallback={
      <main className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-300 mx-auto" />
      </main>
    }>
      <ResultsContent />
    </Suspense>
  )
}
