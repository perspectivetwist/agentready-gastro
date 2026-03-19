'use client'
import { useState } from 'react'

interface Props {
  score: number
  resultUrl: string
}

export default function ShareButton({ score, resultUrl }: Props) {
  const [copied, setCopied] = useState(false)

  const shareText = `Ich hab gerade gecheckt ob KI-Agenten meinen Betrieb nutzen können: ${score}/100. Können KI-Agenten bei dir überhaupt buchen oder anfragen? Kostenlos testen: ${resultUrl}`

  function handleWhatsApp() {
    window.open(`https://wa.me/?text=${encodeURIComponent(shareText)}`, '_blank')
  }

  function handleCopy() {
    navigator.clipboard.writeText(resultUrl).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  return (
    <div className="grid grid-cols-2 gap-3 w-full">
      <button
        onClick={handleWhatsApp}
        className="h-11 rounded-xl font-semibold text-sm text-white transition-opacity hover:opacity-90"
        style={{ backgroundColor: '#25D366' }}
      >
        Via WhatsApp teilen
      </button>
      <button
        onClick={handleCopy}
        className="h-11 rounded-xl font-semibold text-sm transition-opacity hover:opacity-90"
        style={{ backgroundColor: '#facc15', color: '#000' }}
      >
        {copied ? 'Kopiert!' : 'Link kopieren'}
      </button>
    </div>
  )
}
