'use client'

import { useEffect, useRef } from 'react'
import { getAdConfig } from '@/lib/ads'

interface AdBannerProps {
  position: 'below-result' | 'sidebar' | 'top'
}

export default function AdBanner({ position }: AdBannerProps) {
  const adRef = useRef<HTMLDivElement>(null)
  const adConfig = getAdConfig()

  useEffect(() => {
    if (!adConfig.enabled || !adRef.current) return

    // AdSense integration
    if (adConfig.provider === 'adsense' && adConfig.clientId) {
      try {
        // Load AdSense script
        const script = document.createElement('script')
        script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adConfig.clientId}`
        script.async = true
        script.crossOrigin = 'anonymous'
        document.head.appendChild(script)

        script.onload = () => {
          if (adRef.current) {
            // Initialize ad
            try {
              ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({})
            } catch (e) {
              console.error('AdSense error:', e)
            }
          }
        }
      } catch (e) {
        console.error('Failed to load AdSense:', e)
      }
    }

    // Custom ad provider integration would go here
  }, [adConfig])

  if (!adConfig.enabled) {
    return null
  }

  const containerClass = position === 'below-result' 
    ? 'mt-6 w-full'
    : position === 'top'
    ? 'mb-6 w-full'
    : 'w-full'

  return (
    <div className={containerClass}>
      <div ref={adRef} className="min-h-[100px] flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-lg">
        {adConfig.provider === 'adsense' ? (
          <ins
            className="adsbygoogle"
            style={{ display: 'block' }}
            data-ad-client="ca-pub-5570650174796895"
            data-ad-slot="1234567890" // Replace with actual ad slot ID from AdSense
            data-ad-format="auto"
            data-full-width-responsive="true"
          />
        ) : (
          <div className="text-gray-400 text-sm">
            Ad placeholder - Configure your ad provider
          </div>
        )}
      </div>
    </div>
  )
}
