'use client'
import { useState } from 'react'

interface Props {
  score: number
  url: string
}

export default function ShareButton({ score, url }: Props) {
  const [copied, setCopied] = useState(false)

  function handleCopy() {
    const domain = new URL(url).hostname
    const emoji = score >= 86 ? '\ud83d\udfe2' : score >= 61 ? '\ud83d\udfe1' : score >= 31 ? '\ud83d\udfe0' : '\ud83d\udd34'
    const text = `${emoji} Mein Agent-Readiness Score: ${score}/100\n\nWebsite: ${domain}\n\nK\u00f6nnen KI-Agenten auf deiner Website handeln?\n\ud83d\udc49 Kostenlos testen: https://agentready-transformer.vercel.app`

    navigator.clipboard.writeText(text).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  return (
    <button
      onClick={handleCopy}
      className="w-full h-11 border border-white/10 text-gray-400 font-light rounded-xl hover:bg-white/5 transition-colors text-sm"
    >
      {copied ? '\u2713 Kopiert!' : '\ud83d\udce4 Score teilen'}
    </button>
  )
}
