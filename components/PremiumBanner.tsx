'use client'

import Link from 'next/link'

export default function PremiumBanner() {
  return (
    <div className="rounded-2xl border border-primary-200 dark:border-primary-800 bg-gradient-to-r from-primary-600 to-primary-700 dark:from-primary-700 dark:to-primary-800 text-white p-6 md:p-7 mb-8 shadow-card">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-medium mb-1 flex items-center gap-2">
            <span aria-hidden>✨</span> Premium&apos;a Geç
          </h2>
          <p className="text-sm text-primary-100 font-light">
            Reklamları kaldır, logo ekle, özel renkler, analitik & toplu üretim
          </p>
        </div>
        <Link
          href="/pricing"
          className="flex-shrink-0 bg-white text-primary-700 font-medium px-6 py-2.5 rounded-xl hover:bg-primary-50 transition-colors whitespace-nowrap text-sm shadow-sm"
        >
          Fiyatları Gör →
        </Link>
      </div>
    </div>
  )
}
