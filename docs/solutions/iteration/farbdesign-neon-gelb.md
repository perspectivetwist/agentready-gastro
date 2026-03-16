# Iteration: Farbdesign Neon-Blau → Neon-Gelb

## Was gebaut
Komplette Umstellung des Farbschemas von Neon-Blau (Indigo/Purple/Blue) auf Neon-Gelb (Yellow/Amber) in 15 Dateien.

## Problem
Slipstream sah visuell identisch aus wie Wake (beide Neon-Blau). Eigenständige Markenidentität nötig.

## Lösung
Systematisches Farbmapping:
- Primary: `#6366f1` → `#facc15` (Yellow-400)
- Accent 1: `#a78bfa` → `#fde047` (Yellow-300)
- Accent 2: `#60a5fa` → `#f59e0b` (Amber-500)
- CSS custom properties umbenannt: `--color-accent-purple` → `--color-accent-light`, `--color-accent-blue` → `--color-accent-warm`
- Tailwind-Klassen: purple-* → yellow-*, blue-* → amber-*
- CTA glows: rgba purple/blue → rgba yellow/amber
- Semantische Farben (Score-Bänder, Priority-Badges) bewusst nicht verändert

## Was funktioniert hat
- `replace_all` in Edit-Tool für konsistente Massenänderung (z.B. alle `text-purple-400` in LandingFaq.tsx)
- Grep-Verifikation nach Änderung: `grep purple|indigo|#6366f1...` hat 4 vergessene Legacy-Dateien aufgedeckt
- Build-Verifikation nach jeder Änderungsrunde

## Was vermeiden
- Nicht nur die geplanten Dateien ändern — immer Grep über gesamte Codebase laufen lassen
- Bei hellen Primärfarben (Gelb) auf Textkontrast achten: `text-white` → `text-gray-900` auf gelben Buttons
- Favicon-Textfarbe nicht vergessen (war im Plan nicht explizit)

## Nächstes Mal
- Farbmapping als Tabelle VOR der Umsetzung anlegen (war im Plan gut gelöst)
- Legacy-Dateien von Anfang an mit in den Plan aufnehmen
- CSS custom property Namen beim Umbenennen sofort grep-prüfen ob sie irgendwo referenziert werden
