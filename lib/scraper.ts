// Slipstream Scraper — Jina.ai Reader API + robots.txt + HTTP Headers
// Liefert alle Rohdaten die der Scorer (Task 1.3) braucht

export interface ScrapedData {
  url: string
  markdown: string          // Jina.ai Markdown output
  robotsTxt: string | null  // robots.txt Inhalt (oder null)
  httpHeaders: Record<string, string>  // Response-Headers der Ziel-URL
  isHttps: boolean
  sitemapExists: boolean
  llmsTxtExists: boolean
  error?: string
}

const INTERNAL_IP_PATTERNS = [
  /^127\./,
  /^10\./,
  /^172\.(1[6-9]|2\d|3[01])\./,
  /^192\.168\./,
  /^0\./,
  /^localhost$/i,
  /^\[::1\]/,
]

function isInternalUrl(url: string): boolean {
  try {
    const parsed = new URL(url)
    const hostname = parsed.hostname
    return INTERNAL_IP_PATTERNS.some(pattern => pattern.test(hostname))
  } catch {
    return true // Im Zweifel ablehnen
  }
}

function normalizeUrl(url: string): string {
  let normalized = url.trim()
  if (!/^https?:\/\//i.test(normalized)) {
    normalized = `https://${normalized}`
  }
  return normalized
}

function getBaseUrl(url: string): string {
  const parsed = new URL(url)
  return `${parsed.protocol}//${parsed.host}`
}

async function fetchWithTimeout(url: string, options: RequestInit = {}, timeoutMs = 20000): Promise<Response> {
  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs)

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    })
    return response
  } finally {
    clearTimeout(timeoutId)
  }
}

async function fetchRobotsTxt(baseUrl: string): Promise<string | null> {
  try {
    const response = await fetchWithTimeout(`${baseUrl}/robots.txt`, {}, 10000)
    if (!response.ok) return null
    const text = await response.text()
    // Nur zurückgeben wenn es wirklich robots.txt Inhalt ist (kein HTML)
    if (text.includes('<html') || text.includes('<!DOCTYPE')) return null
    return text
  } catch {
    return null
  }
}

async function checkUrlExists(url: string): Promise<boolean> {
  try {
    const response = await fetchWithTimeout(url, { method: 'HEAD' }, 10000)
    return response.ok
  } catch {
    return false
  }
}

async function fetchHttpHeaders(url: string): Promise<Record<string, string>> {
  try {
    const response = await fetchWithTimeout(url, { method: 'HEAD' }, 10000)
    const headers: Record<string, string> = {}
    response.headers.forEach((value, key) => {
      headers[key.toLowerCase()] = value
    })
    return headers
  } catch {
    return {}
  }
}

export async function scrapeUrl(inputUrl: string): Promise<ScrapedData> {
  const url = normalizeUrl(inputUrl)

  // SSRF-Schutz
  if (isInternalUrl(url)) {
    throw new Error('Interne URLs sind nicht erlaubt')
  }

  // URL-Validierung
  try {
    new URL(url)
  } catch {
    throw new Error('Ungültige URL')
  }

  const baseUrl = getBaseUrl(url)
  const isHttps = url.startsWith('https://')

  // Jina Headers
  const jinaHeaders: Record<string, string> = { 'Accept': 'text/plain' }
  if (process.env.JINA_API_KEY) {
    jinaHeaders['Authorization'] = `Bearer ${process.env.JINA_API_KEY}`
  }

  // Parallel: Jina scrape + robots.txt + HTTP Headers + sitemap + llms.txt
  const [jinaResponse, robotsTxt, httpHeaders, sitemapExists, llmsTxtExists] = await Promise.all([
    fetchWithTimeout(`https://r.jina.ai/${url}`, { headers: jinaHeaders }, 20000),
    fetchRobotsTxt(baseUrl),
    fetchHttpHeaders(url),
    checkUrlExists(`${baseUrl}/sitemap.xml`),
    checkUrlExists(`${baseUrl}/llms.txt`),
  ])

  let finalJinaResponse = jinaResponse

  // Auth-Fallback: Wenn 401 (ungültiger Key), ohne Auth-Header versuchen
  if (!finalJinaResponse.ok && finalJinaResponse.status === 401 && process.env.JINA_API_KEY) {
    finalJinaResponse = await fetchWithTimeout(`https://r.jina.ai/${url}`, {
      headers: { 'Accept': 'text/plain' },
    }, 20000)
  }

  // HTTPS→HTTP Fallback: Wenn Jina 422 gibt (SSL-Fehler), mit http:// versuchen
  if (!finalJinaResponse.ok && finalJinaResponse.status === 422 && url.startsWith('https://')) {
    const httpUrl = url.replace('https://', 'http://')
    const fallbackHeaders: Record<string, string> = { 'Accept': 'text/plain' }
    if (process.env.JINA_API_KEY) {
      fallbackHeaders['Authorization'] = `Bearer ${process.env.JINA_API_KEY}`
    }
    finalJinaResponse = await fetchWithTimeout(`https://r.jina.ai/${httpUrl}`, { headers: fallbackHeaders }, 20000)
    // Auth + HTTP Fallback kombiniert
    if (!finalJinaResponse.ok && finalJinaResponse.status === 401 && process.env.JINA_API_KEY) {
      finalJinaResponse = await fetchWithTimeout(`https://r.jina.ai/${httpUrl}`, {
        headers: { 'Accept': 'text/plain' },
      }, 20000)
    }
  }

  if (!finalJinaResponse.ok) {
    if (finalJinaResponse.status === 429) {
      throw new Error('Rate Limit erreicht. Bitte warte einen Moment.')
    }
    throw new Error(`Website konnte nicht geladen werden (Status ${finalJinaResponse.status})`)
  }

  const jinaResponseFinal = finalJinaResponse

  const markdown = await jinaResponseFinal.text()

  if (!markdown || markdown.trim().length < 50) {
    throw new Error('Website hat keinen verwertbaren Inhalt zurückgegeben')
  }

  return {
    url,
    markdown: markdown.slice(0, 15000), // Max 15k Zeichen
    robotsTxt,
    httpHeaders,
    isHttps,
    sitemapExists,
    llmsTxtExists,
  }
}
