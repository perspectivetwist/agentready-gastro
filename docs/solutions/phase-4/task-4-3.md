# Task 4.3 – End-to-End Test + Deployment

## E2E Test Ergebnisse (lokal)
| URL | Score | Band | Zeit |
|---|---|---|---|
| example.com (KMU) | 38 | needs-work | 8.8s |
| stripe.com (tech) | 65 | good | 19.2s |
| anthropic.com (meta) | 75 | good | 10.6s |

Alle unter 55 Sekunden. Scores plausibel. Action Plans generiert (stripe: 5, anthropic: 5).

## Deployment
- `npx vercel --prod` schlägt fehl: "Git author must have access to the team"
- GitHub Push erfolgreich (main up to date)
- Vercel GitHub Integration deployed nicht automatisch — zeigt noch alte AEO-Version
- **Manueller Schritt nötig**: Vercel Dashboard → Re-deploy from GitHub oder Vercel CLI mit richtigem git config

## ENV auf Vercel
- Müssen manuell geprüft werden: ANTHROPIC_API_KEY, JINA_API_KEY, NOTION_TOKEN, NOTION_DB_ID

## Was war unerwartet / anders als geplant
- Vercel CLI Deploy-Fehler wegen Git Author mismatch
- Vercel GitHub Integration scheint nicht aktiv/connected
- Stripe nicht relevant für V0 (kein Payment)

## Was würde man beim nächsten Mal anders machen
- Vercel GitHub Integration in Task 0.1 sauber einrichten statt zu überspringen
