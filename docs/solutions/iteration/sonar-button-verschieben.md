# Iteration: Sonar-Animation in Button-Bereich verschieben

## Was gebaut
Sonar-Animation aus Hero-Mitte entfernt und als subtile Ping-Wellen hinter dem "Jetzt prüfen" Button integriert.

## Problem
Sonar in der Hero-Mitte war zu prominent und nicht analog zu Wake (dort ist die Animation im Input-Bereich).

## Lösung
- SonarAnimation.tsx umgebaut: absolute positioning, pointer-events-none, rounded-xl (Button-Form)
- 3 statt 4 Wellen für subtileren Effekt
- In UrlInputForm.tsx als Wrapper-div um den Button eingebaut
- Aus page.tsx Hero-Bereich entfernt (Import + Verwendung)

## Was funktioniert hat
Absolute positioning mit inset-0 im relativen Wrapper-div — Animation passt sich automatisch an Button-Größe an.

## Was vermeiden
Sonar-Komponente war vorher standalone mit fester Größe — für Button-Integration muss sie sich an den Parent anpassen.

## Nächstes Mal
Bei Animation-Platzierung immer Wake-Repo als Referenz checken bevor eigenständig platziert wird.
