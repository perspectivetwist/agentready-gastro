'use client'

import { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { DimensionScore } from '@/types/slipstream'

interface Props {
  dimensions: DimensionScore[]
}

const LABEL_MAP: Record<string, { label: string; subtitle: string }> = {
  'Parsability': { label: 'KI-Lesbarkeit', subtitle: 'Können ChatGPT & Co. deine Inhalte lesen?' },
  'Entity-Vertrauen': { label: 'Glaubwürdigkeit', subtitle: 'Erkennen ChatGPT & Co. dich als vertrauenswürdige Quelle?' },
  'Auffindbarkeit': { label: 'KI-Sichtbarkeit', subtitle: 'Tauchst du in KI-Antworten auf?' },
  'Interaktivität': { label: 'Buchbarkeit', subtitle: 'Können Kunden über KI bei dir buchen oder kaufen?' },
  'Zugang': { label: 'KI-Zugang', subtitle: 'Kommen KI-Agenten überhaupt auf deine Website?' },
}

function getBarColor(score: number): string {
  if (score <= 30) return '#ef4444'
  if (score <= 60) return '#f97316'
  if (score <= 85) return '#eab308'
  return '#22c55e'
}

function getScoreBadge(score: number): { text: string; color: string } | null {
  if (score === 0) return { text: 'Kritisch', color: '#ef4444' }
  if (score <= 30) return { text: 'Schwach', color: '#f97316' }
  return null
}

export default function DimensionBars({ dimensions }: Props) {
  const [expandedId, setExpandedId] = useState<string | null>(null)

  // Worst-first: sort ascending by score
  const sorted = [...dimensions].sort((a, b) => a.score - b.score)

  return (
    <div className="rounded-2xl p-4 sm:p-6 bg-white/5 border border-white/10 backdrop-blur-sm">
      <h2 className="font-semibold text-white mb-5 text-sm sm:text-base">5 Dimensionen der Agent-Readiness</h2>
      <div className="space-y-4">
        {sorted.map((dim, i) => {
          const isExpanded = expandedId === dim.id
          const failedFindings = dim.findings.filter((f) => !f.passed)
          const mapped = LABEL_MAP[dim.name]
          const label = mapped?.label || dim.name
          const subtitle = mapped?.subtitle
          const badge = getScoreBadge(dim.score)
          const isWorst = i === 0

          return (
            <div key={dim.id}>
              {isWorst && (
                <p className="text-xs font-semibold mb-1" style={{ color: '#facc15' }}>
                  Dein gr&ouml;&szlig;tes Risiko
                </p>
              )}
              <button
                type="button"
                onClick={() => setExpandedId(isExpanded ? null : dim.id)}
                className="w-full text-left"
              >
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-white text-sm">{label}</span>
                    {badge && (
                      <span
                        className="text-[10px] font-semibold px-1.5 py-0.5 rounded"
                        style={{ backgroundColor: badge.color + '20', color: badge.color }}
                      >
                        {badge.text}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-white">{dim.score}</span>
                    {failedFindings.length > 0 ? (
                      isExpanded
                        ? <ChevronUp size={14} className="text-gray-500" />
                        : <ChevronDown size={14} className="text-gray-500" />
                    ) : (
                      <span className="text-xs text-green-400">{'\u2713'}</span>
                    )}
                  </div>
                </div>
                {subtitle && (
                  <p className="text-xs text-gray-500 mb-1.5">{subtitle}</p>
                )}
                <div className="w-full bg-white/10 rounded-full h-2">
                  <div
                    className="h-2 rounded-full transition-all duration-700"
                    style={{ width: `${Math.max(3, dim.score)}%`, backgroundColor: getBarColor(dim.score) }}
                  />
                </div>
              </button>

              {isExpanded && failedFindings.length > 0 && (
                <div className="mt-3 ml-6 space-y-2">
                  {failedFindings.map((f) => (
                    <div key={f.criterion} className="text-xs">
                      <p className="text-red-400 font-medium">{f.criterion}</p>
                      <p className="text-gray-400 font-light mt-0.5">{f.businessImpact}</p>
                      <p className="text-yellow-300 font-light mt-0.5">{f.fix}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
