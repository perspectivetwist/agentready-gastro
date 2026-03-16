'use client'

import { useSearchParams } from 'next/navigation'
import { useEffect, useState, Suspense } from 'react'
import { SlipstreamResult } from '@/types/slipstream'
import ScoreCircle from '@/components/ScoreCircle'
import DimensionBars from '@/components/DimensionBars'
import ActionPlan from '@/components/ActionPlan'
import RankingCard from '@/components/RankingCard'
import EmailGate from '@/components/EmailGate'

function ResultsContent() {
  const searchParams = useSearchParams()
  const url = searchParams.get('url') || ''

  const [result, setResult] = useState<SlipstreamResult | null>(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)
  const [isUnlocked, setIsUnlocked] = useState(false)

  useEffect(() => {
    const unlocked = localStorage.getItem('slipstream_unlocked') === 'true'
    setIsUnlocked(unlocked)
  }, [])

  useEffect(() => {
    if (!url) {
      setError('Keine URL angegeben')
      setLoading(false)
      return
    }

    const cached = sessionStorage.getItem('slipstream_result')
    if (cached) {
      try {
        const data: SlipstreamResult = JSON.parse(cached)
        sessionStorage.removeItem('slipstream_result')
        setResult(data)
        setLoading(false)
        return
      } catch {
        // Fall through to API call
      }
    }

    async function runScan() {
      try {
        const res = await fetch('/api/scan', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ url: decodeURIComponent(url) }),
        })

        const data = await res.json()

        if (!res.ok) {
          throw new Error(data.error || `Fehler ${res.status}`)
        }

        setResult(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unbekannter Fehler')
      } finally {
        setLoading(false)
      }
    }

    runScan()
  }, [url])

  function handleUnlock() {
    localStorage.setItem('slipstream_unlocked', 'true')
    setIsUnlocked(true)
  }

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-300 mx-auto mb-4" />
          <p className="text-lg font-light text-gray-300">Analysiere Website...</p>
          <p className="text-sm font-light text-gray-500 mt-1">Das kann bis zu 30 Sekunden dauern</p>
        </div>
      </main>
    )
  }

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

  if (!result) return null

  return (
    <main className={`min-h-screen ${!isUnlocked ? 'pb-32' : ''}`}>
      <div className="max-w-3xl mx-auto px-4 py-8 space-y-6">
        <ScoreCircle
          score={result.totalScore}
          bandInfo={result.scoreBandInfo}
          url={result.url}
        />

        <RankingCard
          score={result.totalScore}
          industry={result.industry || 'Websites allgemein'}
        />

        <DimensionBars dimensions={result.dimensions} />

        {result.actionPlan && (
          <ActionPlan actionPlan={result.actionPlan} isUnlocked={isUnlocked} />
        )}

        <div className="text-center pt-4">
          <a
            href="/"
            className="text-yellow-300 hover:text-yellow-200 font-light text-sm"
          >
            &larr; Weitere URL analysieren
          </a>
        </div>
      </div>

      {!isUnlocked && (
        <EmailGate
          primaryColor="#facc15"
          scannerSource="Slipstream"
          url={decodeURIComponent(url)}
          onUnlock={handleUnlock}
        />
      )}
    </main>
  )
}

export default function ResultsPage() {
  return (
    <Suspense fallback={
      <main className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-300 mx-auto" />
      </main>
    }>
      <ResultsContent />
    </Suspense>
  )
}
