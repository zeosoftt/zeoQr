'use client'

import Link from 'next/link'

export default function PremiumBanner() {
  return (
    <div className="bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 p-6 mb-8">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-medium mb-1">✨ Go Premium</h2>
          <p className="text-sm text-gray-300 dark:text-gray-600 font-light">
            Remove ads, add logos, custom colors, analytics & bulk generation
          </p>
        </div>
        <Link
          href="/pricing"
          className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white font-medium px-6 py-2.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors whitespace-nowrap text-sm"
        >
          View Pricing →
        </Link>
      </div>
    </div>
  )
}
