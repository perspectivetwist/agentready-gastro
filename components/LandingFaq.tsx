'use client'

import { useState } from 'react'
import { ChevronDown, ChevronUp, Shield, ServerOff, MapPin } from 'lucide-react'

const faqItems = [
  {
    question: 'Was bedeutet Agent-Readiness für mein Restaurant?',
    answer: 'Agent-Readiness bedeutet: KI-Agenten können bei dir online bestellen, Tische reservieren oder Catering anfragen — vollautomatisch, ohne menschlichen Eingriff.',
    alwaysOpen: true,
  },
  {
    question: 'Wie funktioniert der Slipstream Scanner?',
    answer: 'Du gibst deine Restaurant-URL ein. Slipstream prüft ob deine Website Buchungs-Flows und strukturierte Daten hat die KI-Agenten nutzen können.',
  },
  {
    question: 'Kostet Slipstream etwas?',
    answer: 'Der Scan ist kostenlos. Kein Account nötig.',
  },
  {
    question: 'Welche KI-Agenten werden in Zukunft in Restaurants bestellen?',
    answer: 'ChatGPT, Google Gemini und spezialisierte Buchungsagenten. Wer jetzt nicht agent-ready ist, verliert diese Bestellungen an die Konkurrenz.',
  },
  {
    question: 'Was ist der Unterschied zwischen Slipstream und AEO?',
    answer: 'AEO optimiert ob KI dein Restaurant findet. Slipstream optimiert ob KI-Agenten bei dir aktiv buchen und bestellen können.',
  },
  {
    question: 'Wie wird mein Restaurant agent-ready?',
    answer: 'Strukturierte Daten, offene Buchungs-APIs und klare Handlungsaufforderungen. Slipstream zeigt dir die konkrete Lücke.',
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
