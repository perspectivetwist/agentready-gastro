'use client'

import { useState, useSyncExternalStore } from 'react'
import { useRouter } from 'next/navigation'
import SonarAnimation from '@/components/SonarAnimation'

// Shared scan count across all UrlInputForm instances
let sharedScans = Math.floor(Math.random() * 8) + 2
const listeners = new Set<() => void>()

if (typeof window !== 'undefined') {
  setInterval(() => {
    sharedScans = Math.floor(Math.random() * 8) + 2
    listeners.forEach((l) => l())
  }, 60000)
}

function useActiveScans() {
  return useSyncExternalStore(
    (cb) => { listeners.add(cb); return () => listeners.delete(cb) },
    () => sharedScans,
    () => sharedScans,
  )
}

export default function UrlInputForm() {
  const [url, setUrl] = useState('')
  const [error, setError] = useState('')
  const activeScans = useActiveScans()
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    const trimmed = url.trim()
    if (!trimmed) {
      setError('Bitte URL eingeben')
      return
    }

    if (trimmed.length > 500) {
      setError('URL zu lang (max 500 Zeichen)')
      return
    }

    router.push(`/scanning?url=${encodeURIComponent(trimmed)}`)
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      <form onSubmit={handleSubmit}>
        <div className="flex flex-row gap-3 items-center">
          <div className="relative flex-1 w-full">
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://deine-website.de"
              className="w-full h-11 px-4 pr-12 rounded-lg border border-white/15 bg-white/5 text-white text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-300/50 focus:border-yellow-300/50 backdrop-blur-sm"
            />
            <SonarAnimation />
            <p className="hidden sm:block absolute -bottom-5 right-0 text-amber-300 text-xs font-light">
              Gerade aktiv: {activeScans} Scans
            </p>
          </div>
          <div className="relative shrink-0">
            <button
              type="submit"
              className="relative h-11 px-4 sm:px-8 rounded-xl font-semibold text-sm transition-all overflow-hidden backdrop-blur-sm cta-glass"
            >
              <span className="relative z-10 bg-gradient-to-r from-yellow-100 to-amber-200 bg-clip-text text-transparent">
                Jetzt pr&uuml;fen
              </span>
            </button>
          </div>
        </div>
        {error && <p className="mt-2 text-red-400 text-sm">{error}</p>}
      </form>
    </div>
  )
}
