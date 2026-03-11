'use client'

import { useState } from 'react'
import { Download } from 'lucide-react'
import { shouldShowAds } from '@/lib/ads'

interface QRDownloadProps {
  dataUrl: string
  isPremium: boolean
}

export default function QRDownload({ dataUrl, isPremium }: QRDownloadProps) {
  const [showVideoAd, setShowVideoAd] = useState(false)

  const handleDownload = async () => {
    // Show rewarded video ad for free users before download
    if (!isPremium && shouldShowAds(false)) {
      const showAd = window.confirm(
        'İndirmek için kısa bir reklam izlemek ister misiniz? (Şimdilik atlamak için Tamam\'a tıklayın)'
      )
      if (showAd) {
        // In production, integrate rewarded video ad here
        // For MVP, we'll just proceed with download
      }
    }

    // Download QR code
    const link = document.createElement('a')
    link.href = dataUrl
    link.download = `qrcode-${Date.now()}.png`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="flex justify-center">
      <button
        onClick={handleDownload}
        className="bg-editor-accent hover:bg-editor-accent/90 text-white font-medium py-2.5 px-6 rounded transition-all duration-300 flex items-center gap-2 text-sm font-mono hover:scale-105 active:scale-95"
      >
        <Download className="w-4 h-4" strokeWidth={2} />
        PNG İndir
      </button>
    </div>
  )
}
