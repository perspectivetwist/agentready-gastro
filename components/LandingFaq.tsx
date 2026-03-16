'use client'

import { useState } from 'react'
import { ChevronDown, ChevronUp, Shield, ServerOff, MapPin } from 'lucide-react'

const faqItems = [
  {
    question: 'Was ist ein KI-Agent f\u00fcr Restaurants?',
    answer: 'KI-Agenten sind Programme die selbstst\u00e4ndig im Internet agieren. Ein Nutzer sagt seinem KI-Assistenten: \u201eBuche mir heute Abend einen Tisch f\u00fcr 2 in einem italienischen Restaurant in Berlin-Mitte.\u201c Der Agent sucht, vergleicht und bucht \u2014 vollautomatisch. Restaurants die nicht buchbar sind werden \u00fcbersprungen.',
    alwaysOpen: true,
  },
  {
    question: 'Warum sollte mich das jetzt schon interessieren?',
    answer: 'KI-Agenten wie Googles Project Mariner und OpenAIs Operator sind bereits aktiv. In 12-18 Monaten werden sie Restaurant-Buchungen automatisieren. Wer jetzt nicht bereit ist, verliert Reservierungen an die Konkurrenz \u2014 ohne es zu merken.',
  },
  {
    question: 'Was pr\u00fcft der Agent-Readiness Scanner?',
    answer: '5 Dimensionen: Online-Reservierungssystem vorhanden und maschinenlesbar, Speisekarte strukturiert abrufbar, Kontaktdaten konsistent und aktuell, Buchungs-API oder Reservierungslink vorhanden, Schema Markup f\u00fcr Restaurant und \u00d6ffnungszeiten.',
  },
  {
    question: 'Was kostet der Scan?',
    answer: 'Kostenlos. Den vollst\u00e4ndigen Aktionsplan gibt es nach Email-Eingabe.',
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
