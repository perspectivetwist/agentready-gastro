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
            <span className="text-base font-light text-gray-300">&Uuml;ber 8.000 Websites auf KI-Nutzbarkeit gepr&uuml;ft</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-10 sm:mb-16 leading-tight">
            Kann KI bei dir kaufen?<br />
            <span className="bg-gradient-to-r from-yellow-300 to-amber-400 bg-clip-text text-transparent">
              Oder kauft sie woanders?
            </span>
          </h1>

          <p className="text-base sm:text-lg font-light text-gray-300 mb-10 max-w-xl mx-auto">
            Bald kaufen und buchen Kunden &uuml;ber KI. Funktioniert das auf deiner Website?
          </p>

          <UrlInputForm />

        </div>
      </div>

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
          Drei Schritte zum Agent-Readiness-Report.
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
          Jeder, dessen Gesch&auml;ft bereit sein muss f&uuml;r die Agenten-&Ouml;konomie.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            { icon: ShoppingCart, title: 'E-Commerce & Shops', desc: 'Finde heraus, ob KI-Agenten deine Produkte finden, vergleichen und f\u00fcr ihre Nutzer bestellen k\u00f6nnen.' },
            { icon: Stethoscope, title: 'Dienstleister & Praxen', desc: 'Pr\u00fcfe, ob KI-Agenten f\u00fcr ihre Nutzer bei dir Termine buchen oder Anfragen stellen k\u00f6nnen.' },
            { icon: Briefcase, title: 'Agenturen & Berater', desc: 'Biete deinen Kunden einen neuen Service: Agent Readiness Audits als Upsell zu bestehenden SEO-Paketen.' },
            { icon: Users, title: 'Produkt- & Tech-Teams', desc: 'Verstehe, welche technischen Standards (MCP, Schema.org, llms.txt) ihr implementieren m\u00fcsst.' },
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
          Ist deine Website bereit f&uuml;r die Agenten-&Ouml;konomie?
        </h2>
        <UrlInputForm />
      </div>
    </main>
  )
}
