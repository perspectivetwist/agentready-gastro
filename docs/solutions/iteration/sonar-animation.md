# Iteration: MRT-Animation → Sonar Ping-Wellen Animation

## Was gebaut
MRT-Scan-Animation durch Sonar Ping-Wellen ersetzt. Neue Komponente SonarAnimation.tsx.

## Problem
MRT-Animation (horizontale Balken im Input-Feld) passte nicht zum Scanning-Konzept.

## Lösung
- Neue Datei: components/SonarAnimation.tsx (reines CSS, kein Package)
- 4 konzentrische Kreise mit scale+opacity keyframe (sonar-ping, 2.4s ease-out)
- Zentrierter Neon-Gelb Punkt mit Glow
- Eingebunden im Hero-Bereich von page.tsx (über der Headline)
- MrtScanner-Funktion komplett aus UrlInputForm.tsx entfernt
- @keyframes mrt-slice → @keyframes sonar-ping in globals.css
- Input-Padding von pr-12 auf px-4 vereinfacht

## Was funktioniert hat
Reines CSS ohne externe Dependencies. Animation ist smooth und endlos.

## Was vermeiden
MRT-Referenzen nicht vergessen zu entfernen (Funktion, Keyframes, Klassen-Referenzen).

## Nächstes Mal
Bei Animation-Swaps immer Grep nach altem Namen laufen lassen.
