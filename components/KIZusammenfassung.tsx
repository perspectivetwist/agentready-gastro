'use client'

import { KiSummary } from '@/lib/ki-summary'
import BlurWrapper from './BlurWrapper'

interface Props {
  kiSummary: KiSummary | null
  isUnlocked: boolean
}

function FlowIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4 12h4m0 0l-2-2m2 2l-2 2" stroke="#FFE600" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <rect x="10" y="8" width="4" height="8" rx="1" stroke="#FFE600" strokeWidth="2"/>
      <path d="M16 12h4m0 0l-2-2m2 2l-2 2" stroke="#FFE600" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

function SummaryCard({ kiSummary }: { kiSummary: KiSummary }) {
  return (
    <div className="rounded-2xl p-4 sm:p-6 bg-white/5 border border-white/10 backdrop-blur-sm">
      <div className="flex items-center gap-3 mb-3">
        <FlowIcon />
        <h2 className="font-semibold text-white">So sieht KI dein Restaurant heute</h2>
      </div>
      <p className="text-sm font-light text-gray-300 leading-relaxed">
        {kiSummary.zusammenfassung}
      </p>
    </div>
  )
}

export default function KIZusammenfassung({ kiSummary, isUnlocked }: Props) {
  if (!kiSummary) return null

  if (!isUnlocked) {
    return (
      <BlurWrapper bgColor="#0a0a0f">
        <SummaryCard kiSummary={kiSummary} />
      </BlurWrapper>
    )
  }

  return <SummaryCard kiSummary={kiSummary} />
}
