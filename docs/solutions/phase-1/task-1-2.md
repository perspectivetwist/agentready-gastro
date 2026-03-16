# Task 1.2 – Jina.ai Scraping implementieren (Slipstream)

## Was wurde gebaut
- lib/scraper.ts komplett neu geschrieben für Slipstream
- Jina.ai Reader API mit Authorization Header und 30s Timeout
- robots.txt separat gefetcht und als Rohtext zurückgegeben
- HTTP-Headers der Ziel-URL via HEAD-Request abgerufen
- sitemap.xml und llms.txt Existenz-Check (HEAD-Requests)
- SSRF-Schutz: interne IPs (127.x, 10.x, 172.16-31.x, 192.168.x, localhost) blockiert
- URL-Normalisierung (https:// Prefix falls fehlt)
- Fehlerbehandlung: Rate Limit (429), ungültige URLs, leere Responses

## Was hat funktioniert
- Parallele Requests (Promise.all) für Jina + robots.txt + Headers + sitemap + llms.txt — spart Zeit
- SSRF-Schutz mit Regex-Patterns zuverlässig
- Jina.ai liefert sauberen Markdown auch bei komplexen Seiten (bmw.de)

## Was war unerwartet / anders als geplant
- example.com gibt keine HTTP-Headers bei HEAD-Request zurück (0 keys)
- bmw.de hat keine sitemap.xml am Standard-Pfad
- not-a-url wird von Jina.ai mit Status 400 abgewiesen (nicht von unserem Validator) — funktioniert aber trotzdem korrekt

## Was würde man beim nächsten Mal anders machen
- HEAD-Request für Headers könnte bei manchen Servern blockiert sein — GET mit Range-Header als Fallback erwägen
- Max markdown length (15k) könnte für sehr große Seiten knapp sein — beobachten
