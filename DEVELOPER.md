# Agent Readiness Gastro Scanner – Developer Documentation

## Setup
```bash
npm install
cp .env.example .env.local  # ENV-Variablen eintragen
npm run dev                  # http://localhost:3000
```

## ENV-Variablen
| Variable | Beschreibung |
|----------|-------------|
| ANTHROPIC_API_KEY | Claude Haiku API Key |
| JINA_API_KEY | Jina.ai Reader API Key |
| NOTION_TOKEN | Notion Integration Token |
| NOTION_DB_ID | Notion Slipstream Leads DB ID |

## Deployment
```bash
npx vercel --prod --yes
```
Vercel URL: https://agentready-gastro.vercel.app

## Architektur
- `/` — Landing Page mit URL-Input
- `/results` — Score + Aktionsplan
- `/api/scan` — POST: URL → Jina scrape → Claude Analyse → Agent Readiness Score
- `/api/save-email` — POST: Email → Notion Leads DB

## Wichtige Dateien
| Datei | Zweck |
|-------|-------|
| app/page.tsx | Landing Page |
| app/results/page.tsx | Ergebnis-Seite |
| app/api/scan/route.ts | Scan-Endpoint |
| components/LandingFaq.tsx | FAQ-Accordion (8 Fragen) |
| components/Footer.tsx | Ökosystem-Footer |
| lib/scraper.ts | Jina.ai Wrapper |
| lib/scorer.ts | 5-Dimensionen Score |
| lib/transformer.ts | Claude Haiku Aktionsplan |
