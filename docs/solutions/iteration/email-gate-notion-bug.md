# Bug: Email-Gate Freischaltung schlägt fehl

## Was gebaut
Bug gefixt: Email-Gate wirft "Fehler. Bitte erneut versuchen." nach Email-Eingabe.

## Problem
Notion API gibt 400 validation_error: `database_id should be a valid uuid, instead was "23add73e7f5c40af9c0a442d68aff8f8\n"`. Trailing Newline in der NOTION_DB_ID Vercel ENV-Variable.

## Lösung
- `lib/notion.ts`: `.trim()` auf NOTION_TOKEN und NOTION_DB_ID bevor sie an Notion API gehen
- Vercel ENV-Variable NOTION_DB_ID neu gesetzt (ohne Newline)
- Error-Details nicht an User leaken (nur console.error serverseitig)

## Was funktioniert hat
Debug-Details temporär in API-Response eingebaut → exakter Notion-Fehler sofort sichtbar. Dann wieder entfernt.

## Was vermeiden
ENV-Vars blind an externe APIs durchreichen — immer .trim() als Absicherung.

## Nächstes Mal
Bei Vercel ENV-Vars immer prüfen ob Copy-Paste Whitespace/Newlines enthält. Defensiv trimmen.
