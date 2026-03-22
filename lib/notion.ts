export async function logScan(url: string, score: number, dimensions?: string): Promise<void> {
  const dbId = process.env.NOTION_SCANS_DB_ID
  if (!dbId) return

  const properties: Record<string, unknown> = {
    'URL': { title: [{ text: { content: url } }] },
    'Score': { number: score },
    'Source': { select: { name: 'gastro-slipstream' } },
  }
  if (dimensions) {
    properties['Dimensionen'] = { rich_text: [{ text: { content: dimensions } }] }
  }

  await fetch('https://api.notion.com/v1/pages', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.NOTION_TOKEN}`,
      'Content-Type': 'application/json',
      'Notion-Version': '2022-06-28',
    },
    body: JSON.stringify({
      parent: { database_id: dbId },
      properties,
    }),
  }).catch(() => {}) // fire-and-forget
}

// Slipstream Notion Integration — Leads in Notion DB speichern
// DB Schema: Email (title), URL (text), Score (number)
// ACHTUNG: created_time NICHT im API-Call mitgeben → sonst 500 Error (Lesson Learned Wake)

interface SlipstreamLead {
  email: string
  url: string
  score?: number
}

export async function saveSlipstreamLead(lead: SlipstreamLead): Promise<void> {
  const properties: Record<string, unknown> = {
    'Email': {
      title: [{ text: { content: lead.email } }],
    },
    'URL': {
      rich_text: [{ text: { content: lead.url } }],
    },
  }

  // Score nur setzen wenn vorhanden (optional beim Email-Gate)
  if (lead.score !== undefined) {
    properties['Score'] = {
      number: lead.score,
    }
  }

  const notionToken = (process.env.NOTION_TOKEN || '').trim()
  const notionDbId = (process.env.NOTION_DB_ID || '').trim()

  const response = await fetch('https://api.notion.com/v1/pages', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${notionToken}`,
      'Content-Type': 'application/json',
      'Notion-Version': '2022-06-28',
    },
    body: JSON.stringify({
      parent: { database_id: notionDbId },
      properties,
    }),
  })

  if (!response.ok) {
    const error = await response.text()
    throw new Error(`Notion API Fehler: ${response.status} - ${error}`)
  }
}
