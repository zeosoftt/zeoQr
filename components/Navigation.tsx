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
    { href: '/pricing', label: 'Fiyatlandırma' },
    ...(isPremium
      ? [
          { href: '/analytics', label: 'Analitik' },
          { href: '/bulk', label: 'Toplu Üretim' },
        ]
      : []),
  ]

  return (
    <nav className="border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/icon.svg" alt="ZeoQR" width={32} height={32} className="dark:invert" />
            <span className="text-xl font-light text-gray-900 dark:text-white tracking-tight">
              ZeoQR
            </span>
          </Link>
          <div className="flex items-center gap-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm font-light transition-colors ${
                  pathname === item.href
                    ? 'text-gray-900 dark:text-white'
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
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
