# Task 2.1 – API Route zusammenführen (/api/scan)

## Was wurde gebaut
- app/api/scan/route.ts: Vollständige Pipeline scraper → scorer → transformer
- Rate Limiting: 5 Requests/IP/Stunde (in-memory Map aus Wake)
- Input Validierung: URL-Format, max 500 Zeichen, SSRF-Schutz
- scoreBand Berechnung: critical/needs-work/good/excellent
- Transformer als optional: Score wird immer geliefert, Aktionsplan nur bei Erfolg
- Fehlerbehandlung: bekannte User-Fehler als 400, Rate Limit als 429, Rest als 500

## Was hat funktioniert
- Alle 3 Bausteine (scraper, scorer, transformer) greifen nahtlos ineinander
- anthropic.com: Score 75, 4 sinnvolle Actions, unter 10 Sekunden
- Rate Limiting greift exakt beim 6. Request
- includeActionPlan=false erlaubt schnellen Score-Only Modus

## Was war unerwartet / anders als geplant
- scoreBand "excellent" ab 75 — anthropic.com ist direkt excellent (vielleicht zu großzügig)
- Transformer-Fehler sind non-fatal — Score kommt immer durch, Aktionsplan optional

## Was würde man beim nächsten Mal anders machen
- scoreBand Schwellenwerte überdenken (excellent erst ab 80?)
- Response-Zeit messen und loggen für Vercel-Timeout-Monitoring
