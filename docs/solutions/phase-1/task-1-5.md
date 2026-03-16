# Task 1.5 – Email-Gate Logik (localStorage + Notion)

## Was wurde gebaut
- components/EmailGate.tsx: API-Endpoint von /api/subscribe auf /api/save-email geändert
- app/api/save-email/route.ts: Notion-Integration mit Email-Validierung (Regex + Max 254 Zeichen)
- lib/notion.ts: Komplett neu für Slipstream Leads DB (Email=title, URL=text, Score=number)
- Alte Wake-Route app/api/subscribe/ entfernt (wurde nicht mehr referenziert)
- localStorage-Logik (slipstream_scans, slipstream_unlocked) aus Wake übernommen in results/page.tsx

## Was hat funktioniert
- Wake EmailGate-Komponente fast 1:1 wiederverwendbar — nur Endpoint ändern
- Disposable-Email-Check aus Wake funktioniert direkt
- MCP-Notion-Tools haben Zugriff auf Slipstream Leads DB — Test-Lead erstellt

## Was war unerwartet / anders als geplant
- Notion Integration Token (ntn_...) hat KEINEN Zugriff auf die Slipstream Leads DB
- DB wurde via MCP (OAuth) erstellt, aber die API-Integration muss separat verbunden werden
- Manueller Schritt nötig: DB in Notion öffnen → Connections → Integration hinzufügen
- Alte subscribe-Route verursachte Build-Fehler wegen entferntem saveEmailLead-Export

## Was würde man beim nächsten Mal anders machen
- Nach DB-Erstellung SOFORT die Integration verbinden (oder via API automatisieren)
- Alte Wake-Routen VOR dem ersten Build entfernen
