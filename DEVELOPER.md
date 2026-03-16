# Slipstream Agent Readiness Transformer – Developer Documentation

## Was ist das?
Single-Page Web-App: URL eingeben → Agent-Readiness-Score (5 Dimensionen) + Aktionsplan.
Stack: Next.js 14 (App Router) + Tailwind + TypeScript + Vercel.

## Dateistruktur
```
slipstream-transformer/
├── app/
│   ├── page.tsx                 # Landing Page + URL-Input
│   ├── scanning/page.tsx        # Scan-Ladescreen (Spinner + Steps)
│   ├── results/page.tsx         # Score + Gate + Aktionsplan
│   ├── layout.tsx               # Root Layout (Wake-Design übernommen)
│   └── api/
│       ├── scan/route.ts        # POST: scrapen → scoren → transformieren
│       └── save-email/route.ts  # POST: Email → Notion
├── components/
│   ├── ScoreCircle.tsx          # Animated Score Circle
│   ├── DimensionBars.tsx        # 5 Dimension Bars
│   ├── ActionPlan.tsx           # LLM-generierter Aktionsplan
│   ├── EmailGate.tsx            # Email-Gate Modal (ab Scan 2)
│   └── SonarAnimation.tsx      # Sonar Ping-Wellen (Hero-Bereich)
├── lib/
│   ├── scraper.ts               # Jina.ai + robots.txt Wrapper
│   ├── scorer.ts                # 5 Dimensionen Scoring (kein AI)
│   └── transformer.ts           # Claude Haiku → Aktionsplan
├── types/                       # TypeScript Interfaces
├── docs/solutions/              # Lessons Learned pro Task
├── .github/workflows/           # GitHub Actions (Doku-Check)
├── CLAUDE.md                    # Claude Code Kontext
├── DEVELOPER.md                 # Diese Datei
├── SECURITY.md                  # Security-Regeln
└── .env.local                   # Secrets (nie committen!)
```

## Lokale Entwicklung
```bash
npm install
npm run dev → http://localhost:3000
```

## Deployment
git push origin main → Vercel deployed automatisch.
Vercel URL: https://agentready-transformer.vercel.app

## ENV-Variablen
| Variable | Beschreibung |
|---|---|
| ANTHROPIC_API_KEY | Claude Haiku API Key |
| JINA_API_KEY | Jina.ai Reader (Scraping) |
| NOTION_TOKEN | Notion Integration Token (gleich wie Wake) |
| NOTION_DB_ID | Slipstream Leads Datenbank ID |

## Architektur (Datenfluss)
```
Landing Page (URL-Input) → router.push('/scanning?url=...')
  → /scanning Page startet API-Call:
    → /api/scan/route.ts
      → lib/scraper.ts (Jina.ai Reader API)
      → lib/scorer.ts (5 Dimensionen, kein AI)
      → lib/transformer.ts (Claude Haiku → Aktionsplan)
      → Response: { score, dimensions[], actionPlan }
  → sessionStorage.setItem('slipstream_result', ...)
  → router.push('/results?url=...')

Email-Gate:
  → /api/save-email/route.ts → Notion API
  → localStorage tracking (slipstream_scans, slipstream_unlocked)
```

## 5 Scoring-Dimensionen
1. **Zugang (25%)**: robots.txt GPTBot, HTTPS, kein WAF
2. **Parsability (25%)**: kein JS-only, SSR erkennbar
3. **Entity-Vertrauen (20%)**: Schema.org, sameAs, NAP
4. **Auffindbarkeit (20%)**: sitemap.xml, llms.txt
5. **Interaktivität (10%)**: MCP/WebMCP/NLWeb

## Bekannte Limitierungen
- localStorage Gate: kein echter Schutz, nur UX-Gate für V0
- Vercel Hobby: max. 60 Sek. Function Runtime
- Rate Limiting: serverseitig, 5 Scans/IP/Stunde

## Farbschema
Primärfarbe: Neon-Gelb (`#facc15` / Yellow-400) auf Dark-BG (`#0a0a0f`).
CSS custom properties in `app/globals.css`:
- `--color-primary`: `#facc15`
- `--color-accent-light`: `#fde047` (Yellow-300)
- `--color-accent-warm`: `#f59e0b` (Amber-500)

Tailwind-Klassen: `yellow-*` für Primary/Accent, `amber-*` für warme Akzente.
Semantische Farben (Score-Bänder, Priority) bleiben rot/orange/gelb/grün.

## Nach jedem Task aktualisieren
Wenn neue Parameter, Dateien oder Architekturänderungen entstehen → dieses File updaten.
Lessons Learned → docs/solutions/[phase]/[task].md
