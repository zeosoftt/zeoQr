'use client'

import { useState } from 'react'
import { QRType, generateQRCodeDataURL, formatContentForQR, generateQRHash } from '@/lib/qr'
import { overlayLogoOnQR } from '@/lib/qr-logo'
import QRTypeSelector from './QRTypeSelector'
import QRDisplay from './QRDisplay'
import QRDownload from './QRDownload'
import PremiumFeatures from './PremiumFeatures'

interface QRGeneratorProps {
  isPremium: boolean
}

export default function QRGenerator({ isPremium }: QRGeneratorProps) {
  const [type, setType] = useState<QRType>('url')
  const [content, setContent] = useState('')
  const [qrDataUrl, setQrDataUrl] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
  // Premium features
  const [logoUrl, setLogoUrl] = useState<string | null>(null)
  const [colorDark, setColorDark] = useState('#000000')
  const [colorLight, setColorLight] = useState('#FFFFFF')

  const handleGenerate = async () => {
    if (!content.trim()) {
      setError('Please enter content')
      return
    }

    setLoading(true)
    setError(null)

    try {
      const formattedContent = formatContentForQR(type, content)
      const qrHash = generateQRHash(formattedContent, type)
      
      // Track QR generation
      await fetch('/api/qr/track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ qrHash, content: formattedContent, type }),
      })

      let dataUrl = await generateQRCodeDataURL({
        type,
        content: formattedContent,
        colorDark: isPremium ? colorDark : undefined,
        colorLight: isPremium ? colorLight : undefined,
      })

      // Overlay logo if premium and logo is provided
      if (isPremium && logoUrl) {
        try {
          dataUrl = await overlayLogoOnQR(dataUrl, logoUrl)
        } catch (err) {
          console.error('Failed to overlay logo:', err)
          // Continue with QR code without logo
        }
      }

      setQrDataUrl(dataUrl)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate QR code')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      {/* Left: Form */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-8">
        <div className="space-y-6">
          {/* Type Selector */}
          <QRTypeSelector type={type} onTypeChange={setType} />

          {/* Content Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {type === 'url' && 'URL'}
              {type === 'text' && 'Text'}
              {type === 'phone' && 'Phone Number'}
              {type === 'email' && 'Email Address'}
            </label>
            <input
              type={type === 'email' ? 'email' : type === 'phone' ? 'tel' : 'text'}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
              placeholder={
                type === 'url' ? 'https://example.com'
                : type === 'text' ? 'Your text here'
                : type === 'phone' ? '+1234567890'
                : 'email@example.com'
              }
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-gray-900 dark:focus:ring-gray-100 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all"
            />
          </div>

          {/* Premium Features */}
          {isPremium && (
            <PremiumFeatures
              logoUrl={logoUrl}
              colorDark={colorDark}
              colorLight={colorLight}
              onLogoChange={setLogoUrl}
              onColorDarkChange={setColorDark}
              onColorLightChange={setColorLight}
            />
          )}

          {/* Generate Button */}
          <button
            onClick={handleGenerate}
            disabled={loading || !content.trim()}
            className="w-full bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-medium py-3 px-6 rounded-lg transition-all hover:bg-gray-800 dark:hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Generating...' : 'Generate'}
          </button>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}
        </div>
      </div>

      {/* Right: QR Preview */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-8">
        {qrDataUrl ? (
          <div className="flex flex-col items-center justify-center h-full space-y-6">
            <QRDisplay dataUrl={qrDataUrl} />
            <QRDownload dataUrl={qrDataUrl} isPremium={isPremium} />
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full min-h-[400px] text-center">
            <div className="w-64 h-64 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg flex items-center justify-center">
              <p className="text-gray-400 dark:text-gray-500 text-sm">QR code will appear here</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
