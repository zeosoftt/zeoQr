'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import Image from 'next/image'

export default function Navigation() {
  const pathname = usePathname()
  const [isPremium, setIsPremium] = useState(false)

  useEffect(() => {
    fetch('/api/subscription/check')
      .then((res) => res.json())
      .then((data) => setIsPremium(data.isPremium))
      .catch(() => setIsPremium(false))
  }, [])

  const navItems = [
    { href: '/', label: 'Ana Sayfa' },
    { href: '/sss', label: 'SSS' },
    { href: '/pricing', label: 'Fiyatlandırma' },
    ...(isPremium
      ? [
          { href: '/analytics', label: 'Analitik' },
          { href: '/bulk', label: 'Toplu Üretim' },
        ]
      : []),
  ]

  return (
    <nav className="sticky top-0 z-40 border-b border-gray-200/80 dark:border-gray-800 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-14 md:h-16">
          <Link
            href="/"
            className="flex items-center gap-2.5 text-gray-900 dark:text-white hover:opacity-90 transition-opacity"
          >
            <Image src="/icon.svg" alt="ZeoQR" width={28} height={28} className="dark:brightness-0 dark:invert" />
            <span className="text-xl font-light tracking-tight">
              ZeoQR
            </span>
          </Link>
          <div className="flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`px-4 py-2.5 rounded-lg text-sm font-light transition-colors ${
                  pathname === item.href
                    ? 'text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/30'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  )
}
