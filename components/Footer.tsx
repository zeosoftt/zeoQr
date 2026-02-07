import Link from 'next/link'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900/50 mt-auto">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500 dark:text-gray-400 font-light">
            © {currentYear} ZeoQR. Ücretsiz QR kod oluşturucu.
          </p>
          <nav className="flex items-center gap-6" aria-label="Alt menü">
            <Link
              href="/sss"
              className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white font-light transition-colors"
            >
              SSS
            </Link>
            <Link
              href="/pricing"
              className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white font-light transition-colors"
            >
              Fiyatlandırma
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  )
}
