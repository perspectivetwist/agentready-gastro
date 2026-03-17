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
          "text": "KI-Agenten wie ChatGPT oder Perplexity können heute Restaurant-Websites lesen, aber noch nicht eigenständig handeln. WebMCP ist der neue Standard der das ändert: Er gibt Agenten eine strukturierte Schnittstelle um Reservierungen, Bestellungen oder Anfragen direkt abzuschließen, ohne dass ein Gast klickt. Restaurant-Websites ohne WebMCP-Unterstützung werden von Agenten übersprungen und leiten Gäste automatisch zur Konkurrenz weiter."
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
