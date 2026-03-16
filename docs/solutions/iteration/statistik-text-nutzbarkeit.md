# Iteration: Statistik-Text → "Über 10.000 Websites auf KI-Nutzbarkeit geprüft"

## Was gebaut
Social Proof Bubble Text geändert.

## Problem
"90% aller Websites sind für KI-Agenten unsichtbar" — Sichtbarkeits-Sprache statt Nutzbarkeits-Sprache.

## Lösung
Neuer Text: "Über 10.000 Websites auf KI-Nutzbarkeit geprüft". ScoreDisplay.tsx enthält auch "unsichtbar" aber im Score-Skala-Kontext (0=unsichtbar, 100=optimal) — bewusst nicht geändert.

## Was funktioniert hat
Grep nach "unsichtbar|sichtbar" hat alle Stellen gefunden. Bewusste Entscheidung, ScoreDisplay semantisch korrekt zu lassen.

## Was vermeiden
Blind alle "unsichtbar"-Stellen ersetzen — Kontext prüfen.

## Nächstes Mal
Alles nach Plan.
