# Iteration: Scan-Ladescreen → separate /scanning Page

## Was gebaut
Loading-Screen von der Landing Page auf eine eigene `/scanning` Route ausgelagert, analog zu Wake's Ansatz.

## Problem
Ladescreen (Spinner + Steps + Dots) lief direkt unter dem URL-Input auf der Landing Page — unsauber, Landing Page bleibt nicht clean.

## Lösung
- `app/scanning/page.tsx` erstellt: liest URL aus Query-Params, startet API-Call, zeigt LoadingState
- `UrlInputForm.tsx` vereinfacht: nur noch Validierung + `router.push('/scanning?url=...')`
- LoadingState-Komponente (Spinner + Step-Text + Progress-Dots) 1:1 in scanning/page.tsx übernommen
- Nach Scan-Abschluss: sessionStorage + redirect zu `/results?url=...`
- Error-State mit "Zurück zur Startseite"-Link auf der Scanning-Page

## Was funktioniert hat
sessionStorage-Übergabe zwischen Scanning → Results bleibt identisch zum alten Flow. Keine Änderung an Results Page nötig.

## Was vermeiden
LoadingState nicht duplizieren — wenn das Design sich ändert, nur an einer Stelle ändern (scanning/page.tsx).

## Nächstes Mal
Bei Page-Auslagerungen immer prüfen ob State-Übergabe (sessionStorage, query params) sauber funktioniert.
