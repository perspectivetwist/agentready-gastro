import { Shield, FileSearch, Building2, Map, Zap, Search, Cpu, FileCheck, Briefcase, Users, ShoppingCart, Stethoscope } from 'lucide-react'
import UrlInputForm from '@/components/UrlInputForm'
import LandingFaq from '@/components/LandingFaq'

const dimensions = [
  { icon: Shield, title: 'Zugang', desc: 'Können KI-Crawler deine Website überhaupt lesen?' },
  { icon: FileSearch, title: 'Parsability', desc: 'Versteht eine KI deine Inhalte ohne JavaScript?' },
  { icon: Building2, title: 'Entity-Vertrauen', desc: 'Kann eine KI dein Unternehmen eindeutig identifizieren?' },
  { icon: Map, title: 'Auffindbarkeit', desc: 'Wissen Agenten welche Seiten es gibt und was du anbietest?' },
  { icon: Zap, title: 'Interaktivität', desc: 'Können Agenten bei dir buchen, kaufen oder anfragen?' },
]

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* HERO */}
      <div className="relative overflow-hidden">
        {/* Gradient background glow */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[600px] h-[400px] bg-gradient-to-br from-yellow-400/20 to-amber-500/20 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-3xl mx-auto px-4 pt-16 sm:pt-24 pb-12 sm:pb-20 text-center">
          {/* Trust bar */}
          <p className="text-[10px] sm:text-sm font-light text-gray-300 mb-6 tracking-wide uppercase">
            Kostenlos &middot; Kein Account n&ouml;tig &middot; Ergebnis in ~20&nbsp;Sek.
          </p>

          {/* Social Proof Bubble */}
          <div className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-white/5 border border-white/10 mb-12 sm:mb-20">
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
            <span className="text-base font-light text-gray-300">&Uuml;ber 8.000 Restaurants auf Agent-Readiness gepr&uuml;ft</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-10 sm:mb-16 leading-tight">
            Agent-Readiness-Test{' '}
            <span className="bg-gradient-to-r from-yellow-300 to-amber-400 bg-clip-text text-transparent">
              f&uuml;r dein Restaurant
            </span>
          </h1>

          <p className="text-base sm:text-lg font-light text-gray-300 mb-10 max-w-xl mx-auto">
            KI-Agenten buchen bald Tische, bestellen Essen und empfehlen Restaurants. Pr&uuml;fe kostenlos ob dein Restaurant bereit ist.
          </p>

          <UrlInputForm />

        </div>
      </div>

      {/* DEFINITION */}
      <section className="max-w-2xl mx-auto px-4 pt-2 pb-6 text-center">
        <p className="text-sm text-gray-400 leading-relaxed">
          Slipstream pr&uuml;ft kostenlos ob KI-Agenten in deinem Restaurant online bestellen und reservieren k&ouml;nnen. F&uuml;r Restaurants, Lieferdienste und Cateringbetriebe.
        </p>
      </section>

      {/* STATS */}
      <div className="max-w-3xl mx-auto px-4 pt-8 pb-16 sm:pb-24">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4 text-center">
          {[
            { num: '33%', label: 'der eCommerce-Unternehmen setzen bis 2028 auf Agentic AI', source: 'Gartner', url: 'https://www.gartner.com' },
            { num: '55%', label: 'j\u00e4hrliches Wachstum des AI-Agenten-Markts bis 2034', source: 'Market.us', url: 'https://scoop.market.us/ai-agents-in-ecommerce-market-news/' },
            { num: '70%', label: 'der Konsumenten w\u00fcrden KI-Agenten buchen lassen', source: 'SellersCommerce', url: 'https://www.sellerscommerce.com/blog/ai-agents-statistics/' },
          ].map(({ num, label, source, url }) => (
            <div
              key={label}
              className="rounded-xl p-4 bg-white/5 border border-white/10 backdrop-blur-sm"
            >
              <div className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-yellow-300 to-amber-400 bg-clip-text text-transparent">
                {num}
              </div>
              <div className="text-xs font-light text-gray-300 mt-1">{label}</div>
              <div className="text-[10px] font-light text-gray-500 mt-0.5">Quelle: <a href={url} target="_blank" rel="noopener noreferrer" className="underline hover:text-gray-300 transition-colors">{source}</a></div>
            </div>
          ))}
        </div>
      </div>

      {/* SO FUNKTIONIERT'S */}
      <div className="max-w-3xl mx-auto px-4 pt-16 sm:pt-24 pb-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-white text-center mb-3">
          So funktioniert&apos;s
        </h2>
        <p className="text-base font-light text-gray-300 text-center mb-12">
          Drei Schritte zum Agent-Readiness-Report f&uuml;r dein Restaurant.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {[
            { icon: Search, step: '1', title: 'URL eingeben', desc: 'Gib deine Website-URL ein. Wir scannen die Seite automatisch.' },
            { icon: Cpu, step: '2', title: 'KI analysiert', desc: 'Unsere KI pr\u00fcft 5 Dimensionen, die bestimmen ob KI-Agenten auf deiner Seite handeln k\u00f6nnen.' },
            { icon: FileCheck, step: '3', title: 'Report erhalten', desc: 'Du bekommst deinen Score, Branchen-Vergleich und konkrete Handlungsschritte.' },
          ].map(({ icon: Icon, step, title, desc }) => (
            <div key={step} className="text-center">
              <div className="w-12 h-12 rounded-full bg-yellow-400/10 border border-yellow-400/20 flex items-center justify-center mx-auto mb-4">
                <Icon size={20} className="text-yellow-300" />
              </div>
              <div className="text-xs text-yellow-300 font-medium mb-1">Schritt {step}</div>
              <div className="font-medium text-white text-sm mb-2">{title}</div>
              <div className="text-gray-300 text-xs font-light">{desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* 5 DIMENSIONS */}
      <div className="max-w-4xl mx-auto px-4 pt-16 sm:pt-24">
        <h2 className="text-2xl sm:text-3xl font-bold text-white text-center mb-3">
          Was wir pr&uuml;fen
        </h2>
        <p className="text-base font-light text-gray-300 text-center mb-12">
          5 Dimensionen entscheiden, ob KI-Agenten auf deiner Website handeln k&ouml;nnen.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {dimensions.map(({ icon: Icon, title, desc }, i) => (
            <div
              key={title}
              className={`rounded-xl p-4 bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-colors ${
                i >= 3 ? 'sm:col-span-1 lg:col-span-1' : ''
              }`}
            >
              <Icon size={20} className="text-yellow-300 mb-3" />
              <div className="font-medium text-white text-sm">{title}</div>
              <div className="text-gray-300 text-xs font-light mt-1">{desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* FÜR WEN */}
      <div className="max-w-4xl mx-auto px-4 pt-24 sm:pt-32">
        <h2 className="text-2xl sm:text-3xl font-bold text-white text-center mb-3">
          F&uuml;r wen ist der Agent Readiness Scanner?
        </h2>
        <p className="text-base font-light text-gray-300 text-center mb-12">
          F&uuml;r alle, die in der Gastronomie sichtbar und buchbar bleiben wollen.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            { icon: ShoppingCart, title: 'Restaurant-Betreiber', desc: 'Finde heraus, ob KI-Agenten dein Restaurant finden, die Speisekarte lesen und direkt einen Tisch reservieren k\u00f6nnen.' },
            { icon: Stethoscope, title: 'Caf\u00e9s & Bars', desc: 'Pr\u00fcfe, ob dein Lokal f\u00fcr KI-Agenten auffindbar und buchbar ist \u2014 bevor G\u00e4ste zur Konkurrenz weitergeleitet werden.' },
            { icon: Briefcase, title: 'Gastro-Berater & Agenturen', desc: 'Biete deinen Kunden einen neuen Service: Agent Readiness Audits als Upsell zu bestehenden Marketing-Paketen.' },
            { icon: Users, title: 'Hotel- & Gastro-Ketten', desc: 'Verstehe, welche technischen Standards (Schema.org, Reservierungs-APIs, llms.txt) eure Standorte brauchen.' },
          ].map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="rounded-xl p-5 bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-colors"
            >
              <Icon size={20} className="text-yellow-300 mb-3" />
              <div className="font-medium text-white text-sm mb-1">{title}</div>
              <div className="text-gray-300 text-xs font-light leading-relaxed">{desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-4 pt-24 sm:pt-44 pb-16 sm:pb-24">
        <h2 className="text-2xl sm:text-3xl font-bold text-white text-center mb-10">
          H&auml;ufig gestellte Fragen
        </h2>
        <LandingFaq />
      </div>

      {/* FOOTER CTA */}
      <div className="border-t border-white/10 py-16 sm:py-32 px-4 text-center">
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-8">
          Ist dein Restaurant bereit f&uuml;r KI-Agenten?
        </h2>
        <UrlInputForm />
      </div>

      {/* Ökosystem Footer */}
      <footer className="relative max-w-5xl mx-auto px-6 pb-16" style={{ zIndex: 1 }}>
        <div className="border-t pt-12" style={{ borderColor: "rgba(255,255,255,0.07)" }}>
          <div className="text-xs tracking-widest uppercase mb-8" style={{ color: "#888" }}>
            Teil des AI-Shift-Drift &Ouml;kosystems
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="flex flex-col gap-4">
              {[
                { name: 'AI Shift Drift', desc: 'Das KI-\u00d6kosystem f\u00fcr die Gastronomie', url: 'https://ai-gastro-hub.vercel.app', color: '#FF006E' },
                { name: 'Wake | AEO', desc: 'Wird dein Restaurant von ChatGPT zitiert?', url: 'https://aeo-gastro.vercel.app', color: '#6366f1' },
                { name: 'Wake | GEO', desc: 'Kennt ChatGPT den Ruf deines Restaurants?', url: 'https://geo-gastro.vercel.app', color: '#A8E6A3' },
                { name: 'Quantum', desc: 'Wie angreifbar ist dein Restaurant bei KI-Attacken?', url: 'https://aisecurity-gastro.vercel.app', color: '#FF1744' },
              ].map((s) => (
                <a key={s.name} href={s.url} target="_blank" rel="noopener noreferrer" className="flex items-start gap-3 group">
                  <div className="w-[6px] h-[6px] rounded-full flex-shrink-0 mt-1" style={{ background: s.color, boxShadow: `0 0 8px 2px ${s.color}66` }} />
                  <div className="flex flex-col">
                    <div className="text-xs tracking-widest uppercase font-semibold" style={{ color: s.color }}>{s.name}</div>
                    <div className="text-xs mt-0.5" style={{ color: "#555" }}>{s.desc}</div>
                  </div>
                </a>
              ))}
            </div>
            <div>
              <a href="https://ai-gastro-hub.vercel.app/newsroom" target="_blank" rel="noopener noreferrer" className="flex items-start gap-3 group">
                <div className="w-[6px] h-[6px] rounded-full flex-shrink-0 mt-1" style={{ background: "#FF3CAC", boxShadow: "0 0 8px 2px #FF3CAC66" }} />
                <div className="flex flex-col">
                  <div className="text-xs tracking-widest uppercase font-semibold" style={{ background: "linear-gradient(135deg, #FFB432 0%, #FF3CAC 50%, #FF2D78 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>KI-Gastro-Newsroom</div>
                  <div className="text-xs mt-0.5" style={{ color: "#555" }}>Was KI f&uuml;r die Gastronomie bedeutet, jeden Montag neu</div>
                </div>
              </a>
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between gap-8">
            <div className="flex gap-6">
              <a href="https://ai-gastro-hub.vercel.app/impressum" target="_blank" rel="noopener noreferrer" className="text-sm hover:underline" style={{ color: "#888" }}>Impressum</a>
              <a href="https://ai-gastro-hub.vercel.app/datenschutz" target="_blank" rel="noopener noreferrer" className="text-sm hover:underline" style={{ color: "#888" }}>Datenschutz</a>
            </div>
          </div>
          <div className="mt-12 text-center text-xs" style={{ color: "#444" }}>&copy; 2026 Ein Service von AI-SHIFT-DRIFT</div>
        </div>
      </footer>
    </main>
  )
}
