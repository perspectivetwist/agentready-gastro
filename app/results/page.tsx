import type { Metadata } from 'next'
import ResultsClient from './ResultsClient'

type Props = { searchParams: { url?: string } }

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const rawUrl = searchParams.url || ''
  let domain = ''
  try { domain = new URL(decodeURIComponent(rawUrl)).hostname } catch {}

  const title = domain
    ? `KI-Analyse: ${domain} | AgentReady Gastro Scanner`
    : 'AgentReady Gastro Scanner für Gastronomie'
  const description = domain
    ? `Agent-Readiness-Ergebnis für ${domain}: Ist dein Restaurant für KI-Agenten buchbar?`
    : 'Kostenloser Agent-Readiness-Scan für die Gastronomie'

  return {
    title,
    description,
    openGraph: { title, description },
  }
}

export default function ResultsPage() {
  return <ResultsClient />
}
