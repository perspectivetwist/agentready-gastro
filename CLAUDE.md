# CLAUDE.md – Slipstream Agent Readiness Transformer

## Was ist dieses Projekt?
Slipstream misst ob KI-Agenten auf einer Website tatsächlich handeln können.
URL → 5-Dimensionen-Score (kostenlos, Scan 1 frei) → Email-Gate ab Scan 2 → Aktionsplan.
ASD Ökosystem. Wake-Referenz: https://github.com/perspectivetwist/aeo-transformer

## Stack
- Framework: Next.js 14 (App Router)
- Hosting: Vercel Hobby (max. 60 Sek.)
- Scraping: Jina.ai Reader API (https://r.jina.ai/{URL})
- AI: claude-haiku-4-5-20251001
- Lead-Tracking: Notion API
- Design: 1:1 Wake-Repo

## Projektstruktur
slipstream-transformer/
├── app/
│   ├── page.tsx                 # Landing
│   ├── results/page.tsx         # Score + Gate + Aktionsplan
│   ├── api/
│   │   ├── scan/route.ts        # scraper → scorer → transformer
│   │   └── save-email/route.ts  # Email → Notion
│   └── layout.tsx
├── lib/
│   ├── scraper.ts               # Jina.ai + robots.txt
│   ├── scorer.ts                # 5 Dimensionen
│   └── transformer.ts           # Claude Haiku → Aktionsplan
├── components/
│   ├── ScoreCircle.tsx
│   ├── DimensionBars.tsx
│   ├── ActionPlan.tsx
│   └── EmailGate.tsx
├── CLAUDE.md
├── DEVELOPER.md
├── .env.local
└── docs/solutions/

## ENV-Variablen (exakt diese Namen)
- ANTHROPIC_API_KEY
- JINA_API_KEY
- NOTION_TOKEN (gleich wie Wake)
- NOTION_DB_ID (Slipstream Leads DB — neu)

## KRITISCHE LOGIK

### Email-Gate (analog Wake)
- localStorage['slipstream_scans']: Scan-Zähler
- Scan 1: kein Gate, Aktionsplan direkt sichtbar
- Scan 2+: EmailGate Modal
- Nach Email: localStorage['slipstream_unlocked'] = 'true'
- Score + 5 Dimensions-Scores: IMMER kostenlos

### 5 Dimensionen
1. Zugang (25%): robots.txt GPTBot, HTTPS, kein WAF
2. Parsability (25%): kein JS-only, SSR erkennbar
3. Entity-Vertrauen (20%): Schema.org, sameAs, NAP
4. Auffindbarkeit (20%): sitemap.xml, llms.txt
5. Interaktivität (10%): MCP/WebMCP/NLWeb

### Security
- Scraped Content sanitisieren vor LLM (Prompt Injection LLM01)
- SSRF-Schutz: keine internen IPs
- Rate Limiting: 5 Scans/IP/Stunde
- Kein API Key im Frontend

## AUTONOMIE-REGELN
- Bash, npm, API Calls, Deployments: ohne Rückfrage
- Fehler: 3 Versuche, dann eskalieren
- cat [filepath] nach jeder Datei-Erstellung

## KRITISCHE REGELN
1. Notion Projektplan = Single Source of Truth → https://www.notion.so/672ef2c8afb14bbfae50e7b02f3f407b
2. Nie Architektur eigenmächtig ändern
3. ENV-Variablen nur aus .env.local
4. Nach jedem Task in Notion: Status → Done, Lessons Learned, Notizen

## DOKU-PFLICHT
1. Notion: Status, Lessons Learned, Notizen
2. DEVELOPER.md updaten
3. docs/solutions/[phase]/[task].md anlegen
4. git commit -m "docs: lessons learned Task X.X" && git push
