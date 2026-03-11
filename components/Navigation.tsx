'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import { Home, BookOpen, HelpCircle, CreditCard, BarChart3, Layers } from 'lucide-react'

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
    { href: '/', label: 'Ana Sayfa', icon: Home },
    { href: '/rehber', label: 'Rehber', icon: BookOpen },
    { href: '/sss', label: 'SSS', icon: HelpCircle },
    { href: '/pricing', label: 'Fiyatlandırma', icon: CreditCard },
    ...(isPremium
      ? [
          { href: '/analytics', label: 'Analitik', icon: BarChart3 },
          { href: '/bulk', label: 'Toplu Üretim', icon: Layers },
        ]
      : []),
  ]

  return (
    <nav className="sticky top-0 z-40 border-b border-editor-border bg-editor-sidebar/95 backdrop-blur-sm transition-colors duration-300">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-14 md:h-16">
          <Link
            href="/"
            className="flex items-center gap-2.5 text-editor-text hover:opacity-90 transition-all duration-300 hover:scale-[1.02]"
          >
            <Image src="/icon.svg" alt="ZeoQR" width={28} height={28} className="invert opacity-90 transition-transform duration-300" />
            <span className="font-mono text-lg font-medium tracking-tight text-[#cccccc]">
              ZeoQR
            </span>
          </Link>
          <div className="flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded text-sm font-light transition-all duration-300 ease-out ${
                    isActive
                      ? 'text-editor-accent bg-editor-accent/20 shadow-sm'
                      : 'text-editor-muted hover:text-editor-text hover:bg-editor-surface'
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" strokeWidth={1.8} />
                  <span className="hidden sm:inline">{item.label}</span>
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    </nav>
  )
}
