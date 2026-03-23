export default function Datenschutz() {
  return (
    <main className="min-h-screen">
      <div className="max-w-2xl mx-auto px-4 py-16">
        <h1 className="text-2xl font-bold text-white mb-8">Datenschutzerkl&auml;rung</h1>

        <div className="space-y-6 text-gray-300 font-light text-sm leading-relaxed">
          <section>
            <h2 className="text-white font-medium mb-2">Verantwortlicher</h2>
            <p>
              AI-SHIFT-DRIFT<br />
              Berliner Stra&szlig;e 124<br />
              13187 Berlin<br />
              E-Mail: asd.gastronomie@gmail.com
            </p>
          </section>

          <section>
            <h2 className="text-white font-medium mb-2">Datenverarbeitung</h2>
            <p>
              Der AEO Transformer speichert keine personenbezogenen Daten auf unseren Servern.
              Die eingegebene URL wird ausschlie&szlig;lich zur Analyse verwendet und nicht gespeichert.
            </p>
          </section>

          <section>
            <h2 className="text-white font-medium mb-2">E-Mail-Adresse</h2>
            <p>
              Wenn Sie Ihre E-Mail-Adresse eingeben, wird diese ausschlie&szlig;lich lokal in Ihrem
              Browser (localStorage) gespeichert, um den Freischalt-Status zu merken.
              Es erfolgt keine serverseitige Speicherung oder Weitergabe an Dritte.
            </p>
          </section>

          <section>
            <h2 className="text-white font-medium mb-2">Cookies</h2>
            <p>
              Wir verwenden keine Tracking-Cookies. Es werden ausschlie&szlig;lich technisch
              notwendige Technologien (localStorage) eingesetzt.
            </p>
          </section>

          <section>
            <h2 className="text-white font-medium mb-2">Analyse-Tools</h2>
            <p>
              Wir nutzen Vercel Analytics zur anonymisierten Erfassung von Seitenaufrufen.
              Es werden keine personenbezogenen Daten erfasst und keine Cookies gesetzt.
            </p>
          </section>

          <section>
            <h2 className="text-white font-medium mb-2">Ihre Rechte</h2>
            <p>
              Sie haben das Recht auf Auskunft, Berichtigung, L&ouml;schung und Einschr&auml;nkung der
              Verarbeitung Ihrer Daten. Da wir keine personenbezogenen Daten serverseitig speichern,
              k&ouml;nnen Sie Ihre lokal gespeicherten Daten jederzeit &uuml;ber die Browser-Einstellungen l&ouml;schen.
            </p>
            <p className="mt-2">
              Bei Fragen wenden Sie sich an: asd.gastronomie@gmail.com
            </p>
          </section>
        </div>
      </div>
    </main>
  )
}
