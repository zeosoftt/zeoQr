'use client'

import { useState } from 'react'
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
        'Watch a short ad to download? (Click OK to skip ad for now)'
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
        className="bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-medium py-2.5 px-6 rounded-lg transition-all hover:bg-gray-800 dark:hover:bg-gray-100 flex items-center gap-2 text-sm"
      >
        <span>⬇</span>
        <span>Download PNG</span>
      </button>
    </div>
  )
}
