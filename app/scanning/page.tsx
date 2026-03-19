'use client'

import { useSearchParams, useRouter } from 'next/navigation'
import { useEffect, useState, Suspense } from 'react'

const loadingSteps = [
  'Pr\u00fcfe Zugang\u2026',
  'Analysiere Struktur\u2026',
  'Pr\u00fcfe Entity-Vertrauen\u2026',
  'Scanne Auffindbarkeit\u2026',
  'Teste Interaktivit\u00e4t\u2026',
  'Erstelle Aktionsplan\u2026',
]

function LoadingState({ step }: { step: number }) {
  return (
    <div className="flex flex-col items-center gap-6">
      {/* Video loop */}
      <video
        src="/loading-anim.mp4"
        autoPlay
        loop
        muted
        playsInline
        className="w-64 h-64 object-cover pointer-events-none"
        style={{ mixBlendMode: 'screen', WebkitMaskImage: 'radial-gradient(ellipse at center, black 35%, transparent 70%)', maskImage: 'radial-gradient(ellipse at center, black 35%, transparent 70%)' }}
        ref={(el) => { if (el) el.playbackRate = 0.7 }}
      />

      <div className="flex flex-col items-center gap-3">
        <span className="text-sm text-yellow-200 font-medium">
          {loadingSteps[step]}
        </span>
        <div className="flex gap-1.5">
          {loadingSteps.map((_, i) => (
            <div
              key={i}
              className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                i <= step ? 'bg-yellow-300' : 'bg-white/20'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

function ScanningContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const url = searchParams.get('url') || ''

  const [loadingStep, setLoadingStep] = useState(0)
  const [error, setError] = useState('')

  // Cycle through loading steps
  useEffect(() => {
    const interval = setInterval(() => {
      setLoadingStep((prev) => {
        if (prev < loadingSteps.length - 1) return prev + 1
        return prev
      })
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  // Run scan with minimum 15s display time
  useEffect(() => {
    if (!url) {
      setError('Keine URL angegeben')
      return
    }

    async function runScan() {
      const minDelay = new Promise(resolve => setTimeout(resolve, 15000))

      try {
        const [res] = await Promise.all([
          fetch('/api/scan', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ url: decodeURIComponent(url) }),
          }),
          minDelay,
        ])

        const data = await res.json()

        if (!res.ok) {
          setError(data.error || 'Analyse fehlgeschlagen')
          return
        }

        // Store result for results page
        sessionStorage.setItem('slipstream_result', JSON.stringify(data))
        router.push(`/results?url=${url}`)
      } catch {
        setError('Verbindung fehlgeschlagen. Bitte versuche es erneut.')
      }
    }

    runScan()
  }, [url, router])

  if (error) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="text-4xl mb-4">&#x26a0;&#xfe0f;</div>
          <h1 className="text-xl font-bold text-white mb-2">Analyse fehlgeschlagen</h1>
          <p className="text-gray-400 font-light mb-6">{error}</p>
          <a
            href="/"
            className="inline-block px-6 h-11 leading-[2.75rem] bg-white text-black rounded-xl font-semibold text-sm hover:bg-gray-100 transition-colors"
          >
            Zur&uuml;ck zur Startseite
          </a>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <LoadingState step={loadingStep} />
      </div>
    </main>
  )
}

export default function ScanningPage() {
  return (
    <Suspense fallback={
      <main className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-300 mx-auto" />
      </main>
    }>
      <ScanningContent />
    </Suspense>
  )
}
