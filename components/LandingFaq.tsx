'use client'

import { useState } from 'react'
import { ChevronDown, ChevronUp, Shield, ServerOff, MapPin } from 'lucide-react'

const faqItems = [
  {
    question: 'Was macht den Slipstream Agent-Check einzigartig?',
    answer: 'In 20 Sekunden pr\u00fcft Slipstream ob KI-Agenten auf deiner Website handeln k\u00f6nnen \u2014 nicht nur ob sie dich finden. Wir messen 5 Dimensionen: Zugang, Parsability, Entity-Vertrauen, Auffindbarkeit und Interaktivit\u00e4t. Kein Account, keine Agentur, kein Warten.',
    alwaysOpen: true,
  },
  {
    question: 'Warum gibt es Slipstream und warum jetzt?',
    answer: 'Weil KI-Agenten bereits einkaufen, buchen und kontaktieren — und die meisten Websites dafür nicht bereit sind.\n\nChatGPT, Perplexity und Google handeln zunehmend autonom im Auftrag von Nutzern. Wer technisch nicht zugänglich ist, wird übersprungen. Die Zahlen:\n\n• Bis 2028 werden 15% aller Kaufentscheidungen von KI-Agenten getroffen (Gartner 2025)\n• KI-Agenten scheitern an Websites die nur per JavaScript gerendert werden — der Content ist für sie unsichtbar\n• robots.txt ohne GPTBot-Freigabe = vollständige Blockade für ChatGPT-Agenten\n• Nur 0,027% aller Websites haben überhaupt einen KI-Agent-Einstiegspunkt (IEEE Symposium 2026)\n• llms.txt als neuer Standard für Agent-Readiness: noch unter 1% der Websites haben ihn\n\nSlipstream zeigt in Sekunden ob ein KI-Agent auf deiner Website tatsächlich handeln kann — oder scheitert bevor er es versucht.',
  },
  {
    question: 'Was ist Agent-Readiness?',
    answer: 'Agent-Readiness misst, ob KI-Agenten (wie ChatGPT, Claude, Perplexity) deine Website nicht nur finden, sondern auch verstehen und darauf handeln k\u00f6nnen \u2014 Termine buchen, Produkte empfehlen, Anfragen stellen. Websites die nicht Agent-Ready sind, verlieren zunehmend Kunden an Wettbewerber die es sind.',
  },
  {
    question: 'Welche 5 Dimensionen werden gepr\u00fcft?',
    answer: 'Zugang (k\u00f6nnen KI-Crawler dich lesen?), Parsability (versteht die KI deine Inhalte?), Entity-Vertrauen (kann die KI dich identifizieren?), Auffindbarkeit (wissen Agenten was du anbietest?) und Interaktivit\u00e4t (k\u00f6nnen Agenten bei dir handeln?). Jede Dimension hat eigene Kriterien und einen gewichteten Score.',
  },
  {
    question: 'Was zeigt der Agent-Readiness Score?',
    answer: 'Der Score (0\u2013100) zeigt wie bereit deine Website f\u00fcr die Agenten-\u00d6konomie ist. Unter 30 = kritisch (Agenten k\u00f6nnen nicht handeln), 31\u201360 = Verbesserungsbedarf, 61\u201385 = gut, \u00fcber 85 = Agent-Ready. Zus\u00e4tzlich bekommst du einen konkreten Aktionsplan.',
  },
  {
    question: 'Brauche ich einen Account oder Installation?',
    answer: 'Nein. Der Slipstream Agent-Check ist kostenlos, ohne Account und ohne Installation. URL eingeben, warten, Ergebnis lesen \u2014 DSGVO-konform und ohne Datenspeicherung.',
  },
  {
    question: 'F\u00fcr wen ist der Agent-Check relevant?',
    answer: 'F\u00fcr jede Website die Kunden gewinnen will: E-Commerce, SaaS, Dienstleister, Agenturen, lokale Unternehmen. Besonders wichtig f\u00fcr Seiten mit Buchungen, Produkten oder Anfrage-Formularen \u2014 denn dort k\u00f6nnen Agenten direkt f\u00fcr deine Kunden handeln.',
  },
  {
    question: 'Was ist WebMCP \u2014 und warum verliere ich Umsatz ohne es?',
    answer: 'KI-Agenten wie ChatGPT oder Perplexity k\u00f6nnen heute Websites lesen, aber noch nicht eigenst\u00e4ndig handeln. WebMCP ist der neue Standard der das \u00e4ndert: Er gibt Agenten eine strukturierte Schnittstelle um Buchungen, K\u00e4ufe oder Anfragen direkt abzuschlie\u00dfen, ohne dass ein Mensch klickt. Websites ohne WebMCP-Unterst\u00fctzung werden von Agenten \u00fcbersprungen und leiten Kunden automatisch zur Konkurrenz weiter. Slipstream misst ob deine Website bereit ist und zeigt dir im Aktionsplan konkret wie du WebMCP implementierst, bevor deine Konkurrenz es tut.',
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
