# Task 1.4 – Claude Haiku Aktionsplan-Generator

## Was wurde gebaut
- lib/transformer.ts: Claude Haiku Integration für Aktionsplan-Generierung
- Content-Sanitisierung vor LLM-Input (Prompt Injection Schutz):
  - "Ignore previous instructions" Patterns entfernt
  - HTML/Script Tags entfernt
  - Template Injection ({{...}}, {%...%}) entfernt
  - Max 8000 Zeichen Input
- Output-Validierung: HTML und Code-Blöcke aus Antwort entfernt
- Strukturiertes JSON-Output: summary + actions[] mit dimension/priority/effort/businessImpact
- System Prompt: "Agent-Readiness-Berater, KMU-verständlich, kein Tech-Jargon"

## Was hat funktioniert
- E2E Pipeline (Scraper → Scorer → Transformer) auf Anhieb funktioniert
- anthropic.com: 4 sinnvolle Actions generiert (Schema.org, llms.txt, NLWeb, OpenAPI)
- Prompt-Injection-Test bestanden: kein HTML, kein "Pirate" im Output
- Claude Haiku antwortet zuverlässig mit validem JSON

## Was war unerwartet / anders als geplant
- Claude Haiku gibt manchmal Text vor/nach dem JSON — JSON-Extraction via Regex nötig
- Bei manipuliertem Content (Injection-Test) generiert Haiku trotzdem sinnvolle Security-Empfehlungen

## Was würde man beim nächsten Mal anders machen
- JSON Mode / Tool Use statt freie Text-Antwort für garantiert valides JSON
- Sanitisierung als eigene Utility für bessere Testbarkeit
