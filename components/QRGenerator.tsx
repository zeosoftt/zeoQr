'use client'

import { useState } from 'react'
import { Zap } from 'lucide-react'
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
      <div className="bg-editor-sidebar rounded-lg border border-editor-border shadow-card p-8">
        <div className="space-y-6">
          <QRTypeSelector type={type} onTypeChange={setType} />

          <div>
            <label className="block text-sm font-medium text-editor-text mb-2 font-mono">
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
              className="w-full px-4 py-3 border border-editor-border rounded bg-editor-surface text-editor-text placeholder:text-editor-muted focus:ring-2 focus:ring-editor-accent/40 focus:border-editor-accent transition-all font-mono text-sm"
            />
          </div>

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

          <button
            onClick={handleGenerate}
            disabled={loading || !content.trim()}
            className="w-full flex items-center justify-center gap-2 bg-editor-accent hover:bg-editor-accent/90 text-white font-medium py-3.5 px-6 rounded transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:shadow-card-hover hover:scale-[1.01] active:scale-[0.99]"
          >
            <Zap className="w-5 h-5 shrink-0" strokeWidth={2} />
            {loading ? 'Oluşturuluyor...' : 'QR Kod Oluştur'}
          </button>

          {error && (
            <div className="bg-red-900/20 border border-red-800 text-red-400 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}
        </div>
      </div>

      {/* Right: QR Preview */}
      <div className="bg-editor-sidebar rounded-lg border border-editor-border shadow-card p-8">
        {qrDataUrl ? (
          <div className="flex flex-col items-center justify-center h-full space-y-6">
            <QRDisplay dataUrl={qrDataUrl} />
            <QRDownload dataUrl={qrDataUrl} isPremium={isPremium} />
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full min-h-[400px] text-center">
            <div className="w-64 h-64 border-2 border-dashed border-editor-border rounded-lg flex items-center justify-center bg-editor-surface/50">
              <p className="text-editor-muted text-sm font-mono">QR kod burada görünecek</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
