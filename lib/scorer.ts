// Slipstream Scorer — 5 Dimensionen (regelbasiert, kein AI)
// Schnell, deterministisch, günstig.

import { ScrapedData } from './scraper'

export interface Finding {
  criterion: string
  passed: boolean
  businessImpact: string
  fix: string
}

export interface DimensionScore {
  id: string
  name: string
  score: number        // 0–100 (innerhalb der Dimension)
  weight: number       // Gewichtung am Gesamtscore (summe = 1.0)
  findings: Finding[]
}

export interface SlipstreamScore {
  totalScore: number          // 0–100 (gewichteter Durchschnitt)
  dimensions: DimensionScore[]
}

// --- Dimension 1: Zugang (25%) ---
function scoreZugang(data: ScrapedData): DimensionScore {
  const findings: Finding[] = []
  let score = 0

  // GPTBot/Anthropic-Crawler in robots.txt erlaubt? (10%)
  if (data.robotsTxt) {
    const robotsLower = data.robotsTxt.toLowerCase()
    const blocksGptBot = /user-agent:\s*gptbot[\s\S]*?disallow:\s*\//i.test(data.robotsTxt)
    const blocksAnthropic = /user-agent:\s*(anthropic|claudebot|claude-web)[\s\S]*?disallow:\s*\//i.test(data.robotsTxt)
    const blocksAll = /user-agent:\s*\*[\s\S]*?disallow:\s*\/\s*$/im.test(data.robotsTxt)

    if (!blocksGptBot && !blocksAnthropic && !blocksAll) {
      score += 40
      findings.push({ criterion: 'AI-Crawler erlaubt (robots.txt)', passed: true, businessImpact: 'KI-Agenten können die Website crawlen', fix: '' })
    } else if (blocksAll && !blocksGptBot) {
      score += 20
      findings.push({ criterion: 'AI-Crawler erlaubt (robots.txt)', passed: false, businessImpact: 'Globales Disallow blockiert alle Crawler inkl. KI-Agenten', fix: 'User-agent: GPTBot und ClaudeBot explizit erlauben oder globales Disallow entfernen' })
    } else {
      findings.push({ criterion: 'AI-Crawler erlaubt (robots.txt)', passed: false, businessImpact: 'KI-Agenten werden aktiv blockiert. Website ist unsichtbar für KI-Suche', fix: 'GPTBot und ClaudeBot in robots.txt erlauben: User-agent: GPTBot, Allow: /' })
    }

    // Bonus: Explizites Allow für AI-Crawler
    if (robotsLower.includes('gptbot') && !blocksGptBot) {
      score += 10
    }
  } else {
    // Kein robots.txt = implizit erlaubt
    score += 40
    findings.push({ criterion: 'AI-Crawler erlaubt (robots.txt)', passed: true, businessImpact: 'Kein robots.txt, alle Crawler erlaubt (Standard)', fix: '' })
  }

  // HTTPS aktiv? (10%)
  if (data.isHttps) {
    score += 40
    findings.push({ criterion: 'HTTPS aktiv', passed: true, businessImpact: 'Verschlüsselte Verbindung, Vertrauen für KI-Agenten', fix: '' })
  } else {
    findings.push({ criterion: 'HTTPS aktiv', passed: false, businessImpact: 'Ohne HTTPS stufen KI-Systeme Quellen als weniger vertrauenswürdig ein', fix: 'SSL-Zertifikat einrichten und HTTP auf HTTPS redirecten' })
  }

  // WAF-Blockade prüfen (5%)
  const wafHeaders = ['cf-ray', 'x-sucuri-id', 'x-cdn', 'server']
  const hasWafIndicators = Object.keys(data.httpHeaders).some(h =>
    data.httpHeaders[h]?.toLowerCase().includes('cloudflare') ||
    data.httpHeaders[h]?.toLowerCase().includes('sucuri') ||
    data.httpHeaders[h]?.toLowerCase().includes('akamai')
  )
  // Wenn wir erfolgreich scrapen konnten, ist kein aktives Blocking vorhanden
  if (data.markdown.length > 100) {
    score += 20
    findings.push({ criterion: 'Kein WAF-Blocking', passed: true, businessImpact: 'Website ist für automatisierte Anfragen erreichbar', fix: '' })
  } else {
    findings.push({ criterion: 'Kein WAF-Blocking', passed: false, businessImpact: 'WAF/CDN blockiert möglicherweise KI-Agenten', fix: 'Bot-Regeln der WAF prüfen und bekannte KI-Crawler whitelisten' })
  }

  return { id: 'zugang', name: 'Zugang', score, weight: 0.25, findings }
}

// --- Dimension 2: Parsability (25%) ---
function scoreParsability(data: ScrapedData): DimensionScore {
  const findings: Finding[] = []
  let score = 0
  const md = data.markdown

  // Kein JS-only Rendering (15%) — Heuristik: Markdown hat substanziellen Text
  const textLength = md.replace(/[#\[\]\(\)\*\-\|]/g, '').trim().length
  const hasSubstantialContent = textLength > 500

  if (hasSubstantialContent) {
    score += 60
    findings.push({ criterion: 'Inhalte ohne JavaScript lesbar', passed: true, businessImpact: 'KI-Agenten können Inhalte direkt parsen', fix: '' })
  } else if (textLength > 100) {
    score += 30
    findings.push({ criterion: 'Inhalte ohne JavaScript lesbar', passed: false, businessImpact: 'Wenig Inhalt für KI-Agenten extrahierbar, möglicherweise JS-Rendering nötig', fix: 'Server-Side Rendering (SSR) oder Static Site Generation (SSG) implementieren' })
  } else {
    findings.push({ criterion: 'Inhalte ohne JavaScript lesbar', passed: false, businessImpact: 'Kaum Inhalte ohne JavaScript. KI-Agenten sehen eine leere Seite', fix: 'Von Client-Side Rendering auf SSR/SSG umstellen' })
  }

  // SSR erkennbar (10%) — Heuristik: Meta-Tags und strukturierte Headings
  const hasHeadings = /^#{1,3}\s+.+$/m.test(md)
  const hasMetaDescription = data.httpHeaders['x-powered-by'] !== undefined ||
    md.includes('meta') || hasHeadings

  if (hasHeadings && hasSubstantialContent) {
    score += 40
    findings.push({ criterion: 'Strukturierte Inhalte (Headings)', passed: true, businessImpact: 'Klare Inhaltsstruktur hilft KI-Agenten beim Verständnis', fix: '' })
  } else if (hasHeadings) {
    score += 20
    findings.push({ criterion: 'Strukturierte Inhalte (Headings)', passed: false, businessImpact: 'Headings vorhanden aber wenig Inhalt', fix: 'Mehr strukturierten Text unter den Überschriften hinzufügen' })
  } else {
    findings.push({ criterion: 'Strukturierte Inhalte (Headings)', passed: false, businessImpact: 'Keine Überschriften-Struktur. KI-Agenten können Inhalte schwer einordnen', fix: 'Semantische H1-H3 Headings verwenden' })
  }

  return { id: 'parsability', name: 'Parsability', score, weight: 0.25, findings }
}

// --- Dimension 3: Entity-Vertrauen (20%) ---
function scoreEntityVertrauen(data: ScrapedData): DimensionScore {
  const findings: Finding[] = []
  let score = 0
  const md = data.markdown.toLowerCase()

  // Schema.org vorhanden? (10%)
  const hasSchemaOrg = md.includes('schema.org') ||
    md.includes('"@type"') ||
    md.includes('"@context"') ||
    md.includes('itemtype="http') ||
    md.includes('organization') && md.includes('schema')

  if (hasSchemaOrg) {
    score += 50
    findings.push({ criterion: 'Schema.org Markup', passed: true, businessImpact: 'Maschinenlesbare Entity-Daten stärken KI-Vertrauen', fix: '' })
  } else {
    findings.push({ criterion: 'Schema.org Markup', passed: false, businessImpact: 'Ohne Schema.org kann KI die Website-Entität nicht eindeutig identifizieren', fix: 'JSON-LD mit Organization oder LocalBusiness Schema hinzufügen' })
  }

  // sameAs Links (Social Profiles)? (5%)
  const hasSameAs = md.includes('sameas') ||
    md.includes('linkedin.com/company') ||
    md.includes('twitter.com/') ||
    md.includes('x.com/') ||
    md.includes('facebook.com/') ||
    md.includes('instagram.com/') ||
    md.includes('youtube.com/')

  if (hasSameAs) {
    score += 25
    findings.push({ criterion: 'Social-Profile-Links (sameAs)', passed: true, businessImpact: 'KI kann die Entität über Social Profiles verifizieren', fix: '' })
  } else {
    findings.push({ criterion: 'Social-Profile-Links (sameAs)', passed: false, businessImpact: 'Keine verknüpften Social Profiles. KI kann Entität nicht cross-referenzieren', fix: 'sameAs-Links in Schema.org oder sichtbare Social-Links hinzufügen' })
  }

  // NAP-Konsistenz (Name, Adresse, Phone)? (5%)
  const hasPhone = /(\+?\d{1,4}[\s\-]?\(?\d{1,5}\)?[\s\-]?\d{2,10}[\s\-]?\d{2,10})/.test(data.markdown)
  const hasAddress = /\b(\d{5}|\d{4}\s?[A-Z]{2})\b/.test(data.markdown) || // PLZ
    md.includes('straße') || md.includes('street') || md.includes('address')
  const hasNap = hasPhone || hasAddress

  if (hasNap) {
    score += 25
    findings.push({ criterion: 'NAP-Daten (Name, Adresse, Telefon)', passed: true, businessImpact: 'Kontaktdaten stärken Entity-Vertrauen für lokale KI-Suche', fix: '' })
  } else {
    findings.push({ criterion: 'NAP-Daten (Name, Adresse, Telefon)', passed: false, businessImpact: 'Keine Kontaktdaten erkennbar, schwächt lokales KI-Vertrauen', fix: 'Adresse und Telefonnummer sichtbar auf der Website und in Schema.org hinterlegen' })
  }

  return { id: 'entity-vertrauen', name: 'Entity-Vertrauen', score, weight: 0.20, findings }
}

// --- Dimension 4: Auffindbarkeit (20%) ---
function scoreAuffindbarkeit(data: ScrapedData): DimensionScore {
  const findings: Finding[] = []
  let score = 0

  // sitemap.xml vorhanden? (10%)
  if (data.sitemapExists) {
    score += 50
    findings.push({ criterion: 'sitemap.xml vorhanden', passed: true, businessImpact: 'KI-Agenten können alle Seiten systematisch finden', fix: '' })
  } else {
    findings.push({ criterion: 'sitemap.xml vorhanden', passed: false, businessImpact: 'Ohne Sitemap müssen KI-Agenten Links manuell folgen. Seiten werden übersehen', fix: 'sitemap.xml generieren und in robots.txt referenzieren' })
  }

  // llms.txt vorhanden? (10%)
  if (data.llmsTxtExists) {
    score += 50
    findings.push({ criterion: 'llms.txt vorhanden', passed: true, businessImpact: 'LLMs erhalten strukturierten Kontext über die Website', fix: '' })
  } else {
    findings.push({ criterion: 'llms.txt vorhanden', passed: false, businessImpact: 'Keine llms.txt. KI-Modelle haben keinen kuratierten Überblick über die Website', fix: 'llms.txt im Root-Verzeichnis anlegen mit Kurzbeschreibung, Kernthemen und Kontaktdaten' })
  }

  return { id: 'auffindbarkeit', name: 'Auffindbarkeit', score, weight: 0.20, findings }
}

// --- Dimension 5: Interaktivität (10%) ---
function scoreInteraktivitaet(data: ScrapedData): DimensionScore {
  const findings: Finding[] = []
  let score = 0
  const md = data.markdown.toLowerCase()

  // MCP/WebMCP Endpoint? (5%)
  const hasMcp = md.includes('mcp') ||
    md.includes('model context protocol') ||
    md.includes('webmcp') ||
    md.includes('.well-known/mcp')

  if (hasMcp) {
    score += 50
    findings.push({ criterion: 'MCP/WebMCP Endpoint', passed: true, businessImpact: 'KI-Agenten können direkt mit der Website interagieren', fix: '' })
  } else {
    findings.push({ criterion: 'MCP/WebMCP Endpoint', passed: false, businessImpact: 'Keine MCP-Integration. KI-Agenten können nur lesen, nicht handeln', fix: 'MCP-Server oder WebMCP-Endpoint implementieren für Agent-Interaktion' })
  }

  // NLWeb Markup? (3%)
  const hasNlweb = md.includes('nlweb') ||
    md.includes('natural language web') ||
    md.includes('action://') ||
    md.includes('nl-action')

  if (hasNlweb) {
    score += 30
    findings.push({ criterion: 'NLWeb Markup', passed: true, businessImpact: 'Natürlichsprachliche Aktionen für KI-Agenten definiert', fix: '' })
  } else {
    findings.push({ criterion: 'NLWeb Markup', passed: false, businessImpact: 'Keine NLWeb-Aktionen. KI-Agenten können keine natürlichsprachlichen Befehle ausführen', fix: 'NLWeb-Markup für häufige Nutzeraktionen hinzufügen' })
  }

  // Strukturierte Handlungs-Endpoints? (2%)
  const hasActionEndpoints = md.includes('/api/') ||
    md.includes('action=') ||
    md.includes('openapi') ||
    md.includes('swagger') ||
    md.includes('graphql')

  if (hasActionEndpoints) {
    score += 20
    findings.push({ criterion: 'Strukturierte API/Action Endpoints', passed: true, businessImpact: 'Programmierbare Schnittstellen für KI-Agenten erkennbar', fix: '' })
  } else {
    findings.push({ criterion: 'Strukturierte API/Action Endpoints', passed: false, businessImpact: 'Keine erkennbaren API-Endpoints. KI-Agenten sind auf Scraping beschränkt', fix: 'REST API oder OpenAPI-Dokumentation bereitstellen' })
  }

  return { id: 'interaktivitaet', name: 'Interaktivität', score, weight: 0.10, findings }
}

// --- Hauptfunktion ---
export function calculateScore(data: ScrapedData): SlipstreamScore {
  const dimensions = [
    scoreZugang(data),
    scoreParsability(data),
    scoreEntityVertrauen(data),
    scoreAuffindbarkeit(data),
    scoreInteraktivitaet(data),
  ]

  const totalScore = Math.round(
    dimensions.reduce((sum, dim) => sum + dim.score * dim.weight, 0)
  )

  return { totalScore, dimensions }
}
