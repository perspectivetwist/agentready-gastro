# Iteration: Statistik-Boxen → 55% + Quellen als Links

## Was gebaut
54,7% auf 55% gerundet und alle drei Quellen-Texte als klickbare Links mit externen URLs hinterlegt.

## Problem
54,7% wirkte weniger stark als gerundete Zahl. Quellen waren nur Text ohne Nachweis-Link.

## Lösung
- Stats-Array in `app/page.tsx` erweitert: neues `url`-Feld pro Eintrag
- `source`-Text in `<a href={url} target="_blank" rel="noopener noreferrer">` gewrappt
- Hover-Effekt: `hover:text-gray-300 transition-colors`
- `num: '54,7%'` → `num: '55%'`

## Was funktioniert hat
Minimaler Change — nur Daten-Array und Template-String in einer Datei. Kein neuer Component nötig.

## Was vermeiden
Nichts — straightforward Task.

## Nächstes Mal
Bei Statistik-Zahlen immer prüfen ob Rundung sinnvoller wirkt (Marketing > Präzision bei Prozentangaben).
