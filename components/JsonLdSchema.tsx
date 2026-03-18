export default function JsonLdSchema() {
  const org = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "AI Shift Drift",
    "url": "https://ai-gastro-hub.vercel.app",
    "sameAs": ["https://github.com/perspectivetwist"]
  }

  const app = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Agent Readiness Gastro Scanner",
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "Web",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "EUR" }
  }

  const faq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Was macht den Agent-Readiness Check einzigartig?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "In 20 Sekunden prüft der Scanner ob KI-Agenten auf deiner Restaurant-Website handeln können, nicht nur ob sie dich finden. Wir messen 5 Dimensionen: Zugang, Parsability, Entity-Vertrauen, Auffindbarkeit und Interaktivität. Kein Account, keine Agentur, kein Warten."
        }
      },
      {
        "@type": "Question",
        "name": "Warum gibt es den Agent-Readiness Scanner und warum jetzt?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Weil KI-Agenten bereits Tische reservieren, Speisekarten vergleichen und Restaurants empfehlen, und die meisten Restaurant-Websites dafür nicht bereit sind. ChatGPT, Perplexity und Google handeln zunehmend autonom im Auftrag von Nutzern. Wer technisch nicht zugänglich ist, wird übersprungen. Bis 2028 werden 15% aller Kaufentscheidungen von KI-Agenten getroffen (Gartner 2025). Nur 0,027% aller Websites haben überhaupt einen KI-Agent-Einstiegspunkt (IEEE Symposium 2026). llms.txt als neuer Standard für Agent-Readiness: noch unter 1% der Websites haben ihn. Der Scanner zeigt in Sekunden ob ein KI-Agent auf deiner Restaurant-Website tatsächlich handeln kann oder scheitert bevor er es versucht."
        }
      },
      {
        "@type": "Question",
        "name": "Was ist Agent-Readiness für Restaurants?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Agent-Readiness misst, ob KI-Agenten (wie ChatGPT, Claude, Perplexity) deine Restaurant-Website nicht nur finden, sondern auch verstehen und darauf handeln können: Tische reservieren, Speisekarten lesen, Anfragen stellen. Restaurants die nicht Agent-Ready sind, verlieren zunehmend Gäste an Wettbewerber die es sind."
        }
      },
      {
        "@type": "Question",
        "name": "Welche 5 Dimensionen werden geprüft?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Zugang (können KI-Crawler deine Restaurant-Website lesen?), Parsability (versteht die KI deine Speisekarte und Öffnungszeiten?), Entity-Vertrauen (kann die KI dein Restaurant eindeutig identifizieren?), Auffindbarkeit (wissen Agenten was du anbietest?) und Interaktivität (können Agenten bei dir reservieren?). Jede Dimension hat eigene Kriterien und einen gewichteten Score."
        }
      },
      {
        "@type": "Question",
        "name": "Was zeigt der Agent-Readiness Score?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Der Score (0-100) zeigt wie bereit deine Restaurant-Website für die Agenten-Ökonomie ist. Unter 30 = kritisch (Agenten können nicht handeln), 31-60 = Verbesserungsbedarf, 61-85 = gut, über 85 = Agent-Ready. Zusätzlich bekommst du einen konkreten Aktionsplan."
        }
      },
      {
        "@type": "Question",
        "name": "Brauche ich einen Account oder Installation?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Nein. Der Agent-Readiness Check ist kostenlos, ohne Account und ohne Installation. URL eingeben, warten, Ergebnis lesen. DSGVO-konform und ohne Datenspeicherung."
        }
      },
      {
        "@type": "Question",
        "name": "Für wen ist der Agent-Check relevant?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Für jeden Gastronomiebetrieb der Gäste gewinnen will: Restaurants, Cafés, Hotels, Catering-Unternehmen. Besonders wichtig für Betriebe mit Online-Reservierungen, Speisekarten oder Anfrage-Formularen, denn dort können Agenten direkt für deine Gäste handeln."
        }
      },
      {
        "@type": "Question",
        "name": "Was ist WebMCP und warum verliere ich Reservierungen ohne es?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "KI-Agenten wie ChatGPT oder Perplexity können heute Restaurant-Websites lesen, aber noch nicht eigenständig handeln. WebMCP ist der neue Standard der das ändert: Er gibt Agenten eine strukturierte Schnittstelle um Reservierungen, Bestellungen oder Anfragen direkt abzuschließen, ohne dass ein Gast klickt. Restaurant-Websites ohne WebMCP-Unterstützung werden von Agenten übersprungen und leiten Gäste automatisch zur Konkurrenz weiter. Der Scanner misst ob deine Website bereit ist und zeigt dir im Aktionsplan konkret wie du WebMCP implementierst, bevor deine Konkurrenz es tut."
        }
      }
    ]
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(org) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(app) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faq) }} />
    </>
  )
}
