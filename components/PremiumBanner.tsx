'use client'

import Link from 'next/link'
import { Sparkles, ChevronRight } from 'lucide-react'

export default function PremiumBanner() {
  return (
    <div className="rounded-lg border border-editor-accent/50 bg-editor-accent/10 text-editor-text p-6 md:p-7 mb-8 shadow-card transition-all duration-300 hover:shadow-card-hover hover:border-editor-accent/70">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <h2 className="font-mono text-lg font-medium mb-1 flex items-center gap-2 text-editor-text">
            <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-editor-accent/20 text-editor-accent">
              <Sparkles className="w-4 h-4" strokeWidth={2} />
            </span>
            Premium&apos;a Geç
          </h2>
          <p className="text-sm text-editor-muted font-light">
            Reklamları kaldır, logo ekle, özel renkler, analitik & toplu üretim
          </p>
        </div>
        <Link
          href="/pricing"
          className="flex-shrink-0 flex items-center gap-1.5 bg-editor-accent text-white font-medium px-6 py-2.5 rounded hover:bg-editor-accent/90 transition-all duration-300 whitespace-nowrap text-sm font-mono hover:gap-2 hover:scale-105"
        >
          Fiyatları Gör
          <ChevronRight className="w-4 h-4" strokeWidth={2} />
        </Link>
      </div>
    </div>
  )
}
