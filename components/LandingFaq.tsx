'use client'

import { useState } from 'react'
import { ChevronDown, ChevronUp, Shield, ServerOff, MapPin } from 'lucide-react'

const faqItems = [
  {
    question: 'Was macht den Agent-Readiness Check einzigartig?',
    answer: 'In 20 Sekunden prüft der Scanner ob KI-Agenten auf deiner Restaurant-Website handeln können, nicht nur ob sie dich finden. Wir messen 5 Dimensionen: Zugang, Parsability, Entity-Vertrauen, Auffindbarkeit und Interaktivität. Kein Account, keine Agentur, kein Warten.',
    alwaysOpen: true,
  },
  {
    question: 'Warum gibt es den Agent-Readiness Scanner und warum jetzt?',
    answer: 'Weil KI-Agenten bereits Tische reservieren, Speisekarten vergleichen und Restaurants empfehlen, und die meisten Restaurant-Websites dafür nicht bereit sind.\n\nChatGPT, Perplexity und Google handeln zunehmend autonom im Auftrag von Nutzern. Wer technisch nicht zugänglich ist, wird übersprungen. Die Zahlen:\n\n• Bis 2028 werden 15% aller Kaufentscheidungen von KI-Agenten getroffen (Gartner 2025)\n• KI-Agenten scheitern an Websites die nur per JavaScript gerendert werden. Der Content ist für sie unsichtbar\n• robots.txt ohne GPTBot-Freigabe = vollständige Blockade für ChatGPT-Agenten\n• Nur 0,027% aller Websites haben überhaupt einen KI-Agent-Einstiegspunkt (IEEE Symposium 2026)\n• llms.txt als neuer Standard für Agent-Readiness: noch unter 1% der Websites haben ihn\n\nDer Scanner zeigt in Sekunden ob ein KI-Agent auf deiner Restaurant-Website tatsächlich handeln kann oder scheitert bevor er es versucht.',
  },
  {
    question: 'Was ist Agent-Readiness für Restaurants?',
    answer: 'Agent-Readiness misst, ob KI-Agenten (wie ChatGPT, Claude, Perplexity) deine Restaurant-Website nicht nur finden, sondern auch verstehen und darauf handeln können: Tische reservieren, Speisekarten lesen, Anfragen stellen. Restaurants die nicht Agent-Ready sind, verlieren zunehmend Gäste an Wettbewerber die es sind.',
  },
  {
    question: 'Welche 5 Dimensionen werden geprüft?',
    answer: 'Zugang (können KI-Crawler deine Restaurant-Website lesen?), Parsability (versteht die KI deine Speisekarte und Öffnungszeiten?), Entity-Vertrauen (kann die KI dein Restaurant eindeutig identifizieren?), Auffindbarkeit (wissen Agenten was du anbietest?) und Interaktivität (können Agenten bei dir reservieren?). Jede Dimension hat eigene Kriterien und einen gewichteten Score.',
  },
  {
    question: 'Was zeigt der Agent-Readiness Score?',
    answer: 'Der Score (0-100) zeigt wie bereit deine Restaurant-Website für die Agenten-Ökonomie ist. Unter 30 = kritisch (Agenten können nicht handeln), 31-60 = Verbesserungsbedarf, 61-85 = gut, über 85 = Agent-Ready. Zusätzlich bekommst du einen konkreten Aktionsplan.',
  },
  {
    question: 'Brauche ich einen Account oder Installation?',
    answer: 'Nein. Der Agent-Readiness Check ist kostenlos, ohne Account und ohne Installation. URL eingeben, warten, Ergebnis lesen. DSGVO-konform und ohne Datenspeicherung.',
  },
  {
    question: 'Für wen ist der Agent-Check relevant?',
    answer: 'Für jeden Gastronomiebetrieb der Gäste gewinnen will: Restaurants, Cafés, Hotels, Catering-Unternehmen. Besonders wichtig für Betriebe mit Online-Reservierungen, Speisekarten oder Anfrage-Formularen, denn dort können Agenten direkt für deine Gäste handeln.',
  },
  {
    question: 'Was ist WebMCP und warum verliere ich Reservierungen ohne es?',
    answer: 'KI-Agenten wie ChatGPT oder Perplexity können heute Restaurant-Websites lesen, aber noch nicht eigenständig handeln. WebMCP ist der neue Standard der das ändert: Er gibt Agenten eine strukturierte Schnittstelle um Reservierungen, Bestellungen oder Anfragen direkt abzuschließen, ohne dass ein Gast klickt. Restaurant-Websites ohne WebMCP-Unterstützung werden von Agenten übersprungen und leiten Gäste automatisch zur Konkurrenz weiter. Der Scanner misst ob deine Website bereit ist und zeigt dir im Aktionsplan konkret wie du WebMCP implementierst, bevor deine Konkurrenz es tut.',
  },
]

export default function LandingFaq() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <div className="space-y-3">
      {faqItems.map((item, i) => {
        const isOpen = item.alwaysOpen || openIndex === i
        return (
          <div
            key={i}
            className="rounded-2xl bg-white/5 border border-white/10 overflow-hidden"
          >
            <button
              type="button"
              onClick={() => {
                if (item.alwaysOpen) return
                setOpenIndex(openIndex === i ? null : i)
              }}
              className={`w-full flex items-center justify-between p-4 sm:p-6 text-left ${item.alwaysOpen ? 'cursor-default' : 'cursor-pointer'}`}
            >
              <span className="font-medium text-white text-sm pr-4">{item.question}</span>
              {!item.alwaysOpen && (
                isOpen
                  ? <ChevronUp size={18} className="text-yellow-300 shrink-0" />
                  : <ChevronDown size={18} className="text-yellow-300 shrink-0" />
              )}
            </button>
            {isOpen && (
              <div className="px-4 sm:px-6 pb-4 sm:pb-6 -mt-2">
                <p className="text-gray-300 text-sm font-light leading-relaxed whitespace-pre-line">
                  {item.answer}
                </p>
                {item.alwaysOpen && (
                  <div className="flex flex-wrap items-center gap-3 sm:gap-4 mt-4 text-xs text-gray-400">
                    <span className="inline-flex items-center gap-1.5">
                      <Shield size={14} className="text-yellow-300" />
                      DSGVO-konform
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <ServerOff size={14} className="text-yellow-300" />
                      Keine Datenspeicherung
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <MapPin size={14} className="text-yellow-300" />
                      Made in Germany
                    </span>
                  </div>
                )}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
