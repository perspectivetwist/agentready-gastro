# Task 1.3 – Slipstream Scorer implementieren (5 Dimensionen)

## Was wurde gebaut
- lib/scorer.ts: Vollständiger regelbasierter Scorer ohne AI
- 5 Dimensionen mit je 2-3 prüfbaren Kriterien:
  1. Zugang (25%): robots.txt AI-Crawler, HTTPS, WAF-Blockade
  2. Parsability (25%): JS-only Check, strukturierte Headings
  3. Entity-Vertrauen (20%): Schema.org, sameAs/Social Links, NAP-Daten
  4. Auffindbarkeit (20%): sitemap.xml, llms.txt
  5. Interaktivität (10%): MCP/WebMCP, NLWeb, API-Endpoints
- Jedes Finding hat: criterion, passed, businessImpact, fix
- Gewichteter Gesamtscore 0-100

## Was hat funktioniert
- Heuristiken für alle 5 Dimensionen sofort plausibel
- anthropic.com: 75 (MCP erwähnt, Schema.org, Sitemap)
- stripe.com: 65 (gute Parsability, Sitemap)
- example.com: 38 (wenig Inhalt, keine Features) — genau richtig
- google.com/bmw.de: 55 (Mittelfeld) — plausibel

## Was war unerwartet / anders als geplant
- Interaktivität-Score ist bei fast allen Seiten 0 — MCP/NLWeb ist noch extrem selten
- bmw.de hat keine sitemap.xml am Standard-Pfad (oder blockiert HEAD-Requests)
- robots.txt Parsing ist komplex: globales Disallow vs. Bot-spezifische Regeln

## Was würde man beim nächsten Mal anders machen
- Interaktivität-Gewichtung überdenken (10% für etwas das fast niemand hat = fast immer 0)
- robots.txt Parsing als eigene Utility-Funktion extrahieren für bessere Testbarkeit
