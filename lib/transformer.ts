// Slipstream Transformer — Claude Haiku Aktionsplan-Generator
// Nimmt Scorer-Output und generiert konkreten Aktionsplan via Claude Haiku

import Anthropic from '@anthropic-ai/sdk'
import { SlipstreamScore } from './scorer'

export interface ActionItem {
  dimension: string
  priority: 'high' | 'medium' | 'low'
  action: string
  effort: string
  businessImpact: string
}

export interface ActionPlan {
  summary: string
  industry: string
  actions: ActionItem[]
}

// Content sanitisieren vor LLM-Input (Indirect Prompt Injection — OWASP LLM01)
function sanitizeContent(content: string): string {
  let sanitized = content

  // Prompt-Injection-Patterns entfernen
  sanitized = sanitized.replace(/ignore\s+(all\s+)?(previous|above|prior)\s+(instructions?|prompts?)/gi, '[REMOVED]')
  sanitized = sanitized.replace(/you\s+are\s+(now|a)\s+/gi, '[REMOVED]')
  sanitized = sanitized.replace(/system\s*:\s*/gi, '[REMOVED]')
  sanitized = sanitized.replace(/<\/?(?:script|style|iframe|object|embed|form|input)[^>]*>/gi, '[REMOVED]')
  sanitized = sanitized.replace(/\{%.*?%\}/g, '[REMOVED]')
  sanitized = sanitized.replace(/\{\{.*?\}\}/g, '[REMOVED]')

  // Max 8000 Zeichen (ca. 2000 Token)
  return sanitized.slice(0, 8000)
}

// Output validieren: kein HTML, kein Code
function validateOutput(plan: ActionPlan): ActionPlan {
  const cleanString = (s: string): string =>
    s.replace(/<[^>]+>/g, '').replace(/```[\s\S]*?```/g, '').trim()

  return {
    summary: cleanString(plan.summary),
    industry: cleanString(plan.industry || 'Websites allgemein'),
    actions: plan.actions.map(a => ({
      ...a,
      action: cleanString(a.action),
      effort: cleanString(a.effort),
      businessImpact: cleanString(a.businessImpact),
    })),
  }
}

function buildPrompt(url: string, score: SlipstreamScore, scrapedContent: string): string {
  const sanitized = sanitizeContent(scrapedContent)

  const dimensionSummary = score.dimensions.map(dim => {
    const failedFindings = dim.findings
      .filter(f => !f.passed)
      .map(f => `- ${f.criterion}: ${f.businessImpact}. Fix: ${f.fix}`)
      .join('\n')

    const passedFindings = dim.findings
      .filter(f => f.passed)
      .map(f => `- ${f.criterion}: OK`)
      .join('\n')

    return `### ${dim.name} (Score: ${dim.score}/100, Gewicht: ${Math.round(dim.weight * 100)}%)
Bestanden:
${passedFindings || '- Nichts'}
Nicht bestanden:
${failedFindings || '- Alles bestanden'}`
  }).join('\n\n')

  return `Analysiere diese Website und erstelle einen Aktionsplan.

URL: ${url}
Gesamtscore: ${score.totalScore}/100

${dimensionSummary}

Website-Inhalt (Auszug):
${sanitized.slice(0, 3000)}

Erstelle einen JSON-Aktionsplan mit diesem exakten Format:
{
  "summary": "2-3 Sätze Gesamteinschätzung in Business-Sprache",
  "industry": "Gib die Branche auf Deutsch zurück, max. 2 Wörter, kein Schrägstrich, kein Englisch. Beispiele: Zahnarzt, Handwerker, Online-Shop, Steuerberater. Fallback: 'Websites allgemein'",
  "actions": [
    {
      "dimension": "Name der Dimension",
      "priority": "high|medium|low",
      "action": "Konkrete Handlungsempfehlung in 1-2 Sätzen",
      "effort": "Aufwand-Einschätzung (z.B. '30 Min', '1-2 Stunden', '1 Tag')",
      "businessImpact": "Ohne diesen Fix: [Konsequenz]. Mit diesem Fix: [Vorteil]."
    }
  ]
}

Regeln:
- Nur Dimensions mit Score < 100 bekommen Actions
- Max 5 Actions, sortiert nach Priority (high zuerst)
- Sprache: Deutsch, direkt, KMU-verständlich, kein Tech-Jargon
- Business-Impact Template: "Ohne diesen Fix: [Konsequenz]. Mit diesem Fix: [Vorteil]."
- Antworte NUR mit dem JSON, kein Text davor oder danach`
}

export async function generateActionPlan(
  url: string,
  scrapedContent: string,
  score: SlipstreamScore
): Promise<ActionPlan> {
  const client = new Anthropic()

  const message = await client.messages.create({
    model: 'claude-haiku-4-5-20251001',
    max_tokens: 1500,
    messages: [
      {
        role: 'user',
        content: buildPrompt(url, score, scrapedContent),
      },
    ],
    system: 'Du bist ein Agent-Readiness-Berater. Übersetze technische Befunde in konkrete Business-Aktionen. Sprache: direkt, KMU-verständlich, kein Tech-Jargon. Antworte ausschließlich mit validem JSON.',
  })

  const responseText = message.content
    .filter((block): block is Anthropic.TextBlock => block.type === 'text')
    .map(block => block.text)
    .join('')

  // JSON extrahieren (auch wenn Text drumherum ist)
  const jsonMatch = responseText.match(/\{[\s\S]*\}/)
  if (!jsonMatch) {
    throw new Error('Claude hat kein valides JSON zurückgegeben')
  }

  const parsed = JSON.parse(jsonMatch[0]) as ActionPlan

  // Validierung: Pflichtfelder prüfen
  if (!parsed.summary || !Array.isArray(parsed.actions)) {
    throw new Error('Aktionsplan hat ungültiges Format')
  }

  return validateOutput(parsed)
}
