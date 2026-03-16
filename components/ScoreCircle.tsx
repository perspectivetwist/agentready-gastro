'use client'

import { useEffect, useState } from 'react'
import { ScoreBandInfo } from '@/types/slipstream'

interface Props {
  score: number
  bandInfo: ScoreBandInfo
  url: string
}

const bandColors: Record<string, string> = {
  critical: '#ef4444',
  'needs-work': '#f97316',
  good: '#eab308',
  'agent-ready': '#22c55e',
}

export default function ScoreCircle({ score, bandInfo, url }: Props) {
  const [animatedScore, setAnimatedScore] = useState(0)
  const radius = 80
  const circumference = 2 * Math.PI * radius
  const strokeColor = bandColors[bandInfo.band] || '#fde047'

  useEffect(() => {
    let frame: number
    const start = performance.now()
    const duration = 1200

    function animate(now: number) {
      const elapsed = now - start
      const progress = Math.min(elapsed / duration, 1)
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3)
      setAnimatedScore(Math.round(eased * score))
      if (progress < 1) frame = requestAnimationFrame(animate)
    }

    frame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(frame)
  }, [score])

  const offset = circumference - (animatedScore / 100) * circumference

  return (
    <div className="rounded-2xl p-4 sm:p-6 bg-white/5 border border-white/10 backdrop-blur-sm text-center">
      <p className="text-sm font-light text-gray-500 mb-4 truncate">{url}</p>

      <div className="relative inline-flex items-center justify-center">
        <svg width="180" height="180" viewBox="0 0 200 200" className="sm:w-[200px] sm:h-[200px]">
          <circle
            cx="100"
            cy="100"
            r={radius}
            fill="none"
            stroke="rgba(255,255,255,0.1)"
            strokeWidth="16"
          />
          <circle
            cx="100"
            cy="100"
            r={radius}
            fill="none"
            stroke={strokeColor}
            strokeWidth="16"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            transform="rotate(-90 100 100)"
            style={{ transition: 'stroke-dashoffset 0.1s ease-out' }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-5xl font-bold text-white">{animatedScore}</span>
          <span className="text-xs font-light text-gray-400 mt-1">von 100</span>
        </div>
      </div>

      <div className="mt-4">
        <span className="inline-flex items-center gap-2 text-lg font-semibold" style={{ color: strokeColor }}>
          <span className="inline-block w-3 h-3 rounded-full" style={{ backgroundColor: strokeColor }} />
          {bandInfo.label}
        </span>
        <p className="text-sm font-light text-gray-400 mt-2 max-w-sm mx-auto">
          {bandInfo.message}
        </p>
      </div>
    </div>
  )
}
