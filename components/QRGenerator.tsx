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
      setError('Lütfen içerik girin')
      return
    }

    setLoading(true)
    setError(null)

    try {
      const formattedContent = formatContentForQR(type, content)
      const qrHash = generateQRHash(formattedContent, type)

      // Track QR generation (fire-and-forget; don't block or fail UX if DB is down)
      fetch('/api/qr/track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ qrHash, content: formattedContent, type }),
      }).catch(() => {})

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
      setError(err instanceof Error ? err.message : 'QR kod oluşturulamadı')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      {/* Left: Form */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-card p-8">
        <div className="space-y-6">
          {/* Type Selector */}
          <QRTypeSelector type={type} onTypeChange={setType} />

          {/* Content Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {type === 'url' && 'URL'}
              {type === 'text' && 'Metin'}
              {type === 'phone' && 'Telefon Numarası'}
              {type === 'email' && 'E-posta Adresi'}
            </label>
            <input
              type={type === 'email' ? 'email' : type === 'phone' ? 'tel' : 'text'}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
              placeholder={
                type === 'url' ? 'https://ornek.com'
                : type === 'text' ? 'Metninizi buraya yazın'
                : type === 'phone' ? '+905551234567'
                : 'ornek@email.com'
              }
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary-500/30 focus:border-primary-500 dark:bg-gray-700 dark:text-white transition-all"
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
            className="w-full bg-primary-600 hover:bg-primary-700 dark:bg-primary-500 dark:hover:bg-primary-600 text-white font-medium py-3.5 px-6 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
          >
            {loading ? 'Oluşturuluyor...' : 'QR Kod Oluştur'}
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
      <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-card p-8">
        {qrDataUrl ? (
          <div className="flex flex-col items-center justify-center h-full space-y-6">
            <QRDisplay dataUrl={qrDataUrl} />
            <QRDownload dataUrl={qrDataUrl} isPremium={isPremium} />
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full min-h-[400px] text-center">
            <div className="w-64 h-64 border-2 border-dashed border-gray-200 dark:border-gray-600 rounded-2xl flex items-center justify-center bg-gray-50/50 dark:bg-gray-700/30">
              <p className="text-gray-400 dark:text-gray-500 text-sm">QR kod burada görünecek</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
