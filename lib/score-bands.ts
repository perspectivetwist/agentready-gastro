// Slipstream Score-Bänder + Business-Texte
// Übersetzt technische Scores in Business-Sprache

export type ScoreBand = 'critical' | 'needs-work' | 'good' | 'agent-ready'

export interface ScoreBandInfo {
  band: ScoreBand
  label: string
  headline: string
  message: string
  color: string  // Tailwind color class
}

export function getScoreBand(score: number): ScoreBand {
  if (score <= 30) return 'critical'
  if (score <= 60) return 'needs-work'
  if (score <= 85) return 'good'
  return 'agent-ready'
}

export function getScoreBandInfo(score: number): ScoreBandInfo {
  const band = getScoreBand(score)

  const bands: Record<ScoreBand, ScoreBandInfo> = {
    'critical': {
      band: 'critical',
      label: 'Kritisch',
      headline: '',
      message: 'KI-Agenten scheitern bei dir komplett. Keine Buchungen, keine Formulare, kein Umsatz.',
      color: 'red',
    },
    'needs-work': {
      band: 'needs-work',
      label: 'Ausbaufähig',
      headline: '',
      message: 'Agenten kommen rein, können aber nicht buchen, kaufen oder Kontakt aufnehmen.',
      color: 'orange',
    },
    'good': {
      band: 'good',
      label: 'Gut',
      headline: '',
      message: 'Fast agent-ready. Einzelne Aktionen noch blockiert, z.B. Buchung oder Kontaktformular.',
      color: 'yellow',
    },
    'agent-ready': {
      band: 'agent-ready',
      label: 'Top',
      headline: '',
      message: 'KI-Agenten können bei dir buchen, kaufen und Kontakt aufnehmen. Umsatz läuft automatisch.',
      color: 'green',
    },
  }

  return bands[band]
}

// Business-Impact Texte für fehlgeschlagene Kriterien
// Werden im Scorer verwendet und auf der Results Page angezeigt
export const businessImpactTexts: Record<string, { fail: string; fix: string }> = {
  // Zugang
  'AI-Crawler erlaubt (robots.txt)': {
    fail: 'ChatGPT, Claude und andere KI-Assistenten werden dich nie finden — du existierst nicht in der KI-Suche.',
    fix: 'robots.txt anpassen: GPTBot und ClaudeBot erlauben. 5 Minuten Aufwand, sofortige Wirkung.',
  },
  'HTTPS aktiv': {
    fail: 'Ohne HTTPS stufen KI-Systeme deine Website als unsicher ein und zitieren sie seltener.',
    fix: 'SSL-Zertifikat einrichten. Viele Hoster bieten das kostenlos an (Let\'s Encrypt).',
  },
  'Kein WAF-Blocking': {
    fail: 'Deine Firewall blockiert KI-Agenten — sie können deine Website nicht lesen.',
    fix: 'WAF-Regeln prüfen und bekannte KI-Crawler (GPTBot, ClaudeBot) whitelisten.',
  },

  // Parsability
  'Inhalte ohne JavaScript lesbar': {
    fail: 'KI-Agenten sehen eine leere Seite — dein gesamter Content ist unsichtbar.',
    fix: 'Server-Side Rendering (SSR) aktivieren, damit Inhalte ohne JavaScript verfügbar sind.',
  },
  'Strukturierte Inhalte (Headings)': {
    fail: 'Ohne klare Überschriften-Struktur können KI-Agenten deine Inhalte nicht einordnen.',
    fix: 'Semantische H1-H3 Überschriften verwenden — jede Seite braucht eine klare Hierarchie.',
  },

  // Entity-Vertrauen
  'Schema.org Markup': {
    fail: 'KI kann dein Unternehmen nicht eindeutig identifizieren — du bist ein Unbekannter.',
    fix: 'JSON-LD Schema (Organization/LocalBusiness) im <head> einfügen. 15 Minuten mit Generator-Tool.',
  },
  'Social-Profile-Links (sameAs)': {
    fail: 'KI kann nicht verifizieren, wer du bist — keine Social-Media-Bestätigung deiner Identität.',
    fix: 'LinkedIn, Instagram oder andere Profile in Schema.org als sameAs-Links hinterlegen.',
  },
  'NAP-Daten (Name, Adresse, Telefon)': {
    fail: 'Ohne Kontaktdaten kein Vertrauen — besonders fatal für lokale KI-Suche.',
    fix: 'Adresse und Telefon sichtbar auf der Website + in Schema.org hinterlegen.',
  },

  // Auffindbarkeit
  'sitemap.xml vorhanden': {
    fail: 'Agenten müssen raten, welche Seiten existieren — viele werden übersehen.',
    fix: 'sitemap.xml generieren (die meisten CMS können das automatisch) und in robots.txt verlinken.',
  },
  'llms.txt vorhanden': {
    fail: 'Agenten wissen nicht, was sie bei dir tun können — keine Bedienungsanleitung für KI.',
    fix: 'llms.txt im Root anlegen: Wer bist du, was bietest du, wie kontaktiert man dich.',
  },

  // Interaktivität
  'MCP/WebMCP Endpoint': {
    fail: 'Agenten können nur lesen, nicht handeln — Buchungen, Käufe, Anfragen über KI sind unmöglich.',
    fix: 'MCP-Server implementieren, damit KI-Agenten Aktionen ausführen können.',
  },
  'NLWeb Markup': {
    fail: 'Keine natürlichsprachlichen Aktionen — Agenten verstehen nicht, was man bei dir tun kann.',
    fix: 'NLWeb-Markup für Hauptaktionen definieren (z.B. "Termin buchen", "Produkt kaufen").',
  },
  'Strukturierte API/Action Endpoints': {
    fail: 'Keine programmierbaren Schnittstellen — Agenten können nichts automatisieren.',
    fix: 'OpenAPI-Dokumentation für wichtige Aktionen bereitstellen.',
  },
}
