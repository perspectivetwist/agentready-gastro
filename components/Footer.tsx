import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-black/20 border-t border-white/10 py-8 mt-16">
      <div className="max-w-3xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <span className="text-xs text-gray-400 font-light">
          &copy; 2026 Ein Service der Perspectivetwist &#x1f9ec;
        </span>
        <div className="flex gap-6">
          <Link href="/impressum" className="text-xs text-gray-400 hover:text-white transition-colors">
            Impressum
          </Link>
          <Link href="/datenschutz" className="text-xs text-gray-400 hover:text-white transition-colors">
            Datenschutz
          </Link>
        </div>
      </div>
    </footer>
  )
}
