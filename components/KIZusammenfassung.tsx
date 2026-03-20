import { KiSummary } from '@/types/slipstream'

interface KIZusammenfassungProps {
  kiSummary: KiSummary | undefined
}

export default function KIZusammenfassung({ kiSummary }: KIZusammenfassungProps) {
  if (!kiSummary) return null

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-white text-center">
        So sieht KI dein Restaurant heute
      </h2>

      <div className="space-y-3">
        {/* Sichtbarkeit */}
        <div className="rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm p-5">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 mt-0.5">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#F59E0B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-amber-400 mb-1">Wie KI dich heute sieht</h3>
              <p className="text-sm font-light text-gray-300 leading-relaxed">{kiSummary.sichtbarkeit}</p>
            </div>
          </div>
        </div>

        {/* Nutzbarkeit */}
        <div className="rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm p-5">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 mt-0.5">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="13 17 18 12 13 7" />
                <polyline points="6 17 11 12 6 7" />
              </svg>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-emerald-400 mb-1">Was KI-Agenten bei dir tun k&ouml;nnen</h3>
              <p className="text-sm font-light text-gray-300 leading-relaxed">{kiSummary.nutzbarkeit}</p>
            </div>
          </div>
        </div>

        {/* Sicherheit */}
        <div className="rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm p-5">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 mt-0.5">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#8B5CF6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-violet-400 mb-1">Was unkontrolliert passiert</h3>
              <p className="text-sm font-light text-gray-300 leading-relaxed">{kiSummary.sicherheit}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
