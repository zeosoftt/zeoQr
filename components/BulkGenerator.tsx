'use client'

import { useState } from 'react'
import { QRType } from '@/lib/qr'
import { generateQRCodeDataURL, formatContentForQR } from '@/lib/qr'

interface BulkItem {
  type: QRType
  content: string
  qrDataUrl?: string
  qrHash?: string
}

export default function BulkGenerator() {
  const [file, setFile] = useState<File | null>(null)
  const [items, setItems] = useState<BulkItem[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = e.target.files?.[0]
    if (!uploadedFile) return

    setFile(uploadedFile)
    setError(null)

    const reader = new FileReader()
    reader.onload = (event) => {
      try {
        const text = event.target?.result as string
        const lines = text.split('\n').filter((line) => line.trim())
        
        const parsed: BulkItem[] = lines.map((line, idx) => {
          const parts = line.split(',')
          if (parts.length < 2) {
            throw new Error(`Satır ${idx + 1}: Geçersiz format. Beklenen: tip,içerik`)
          }
          
          const type = parts[0].trim().toLowerCase() as QRType
          const content = parts.slice(1).join(',').trim()

          if (!['url', 'text', 'phone', 'email'].includes(type)) {
            throw new Error(`Satır ${idx + 1}: Geçersiz tip. url, text, phone veya email olmalı`)
          }

          return { type, content }
        })

        setItems(parsed)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'CSV ayrıştırılamadı')
        setItems([])
      }
    }
    reader.readAsText(uploadedFile)
  }

  const handleGenerate = async () => {
    if (items.length === 0) {
      setError('Oluşturulacak öğe yok')
      return
    }

    setLoading(true)
    setError(null)

    try {
      // Call bulk API
      const response = await fetch('/api/qr/bulk', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'QR kodlar oluşturulamadı')
      }

      // Generate QR code images for each item
      const generated = await Promise.all(
        items.map(async (item, idx) => {
          const formattedContent = formatContentForQR(item.type, item.content)
          const qrDataUrl = await generateQRCodeDataURL({
            type: item.type,
            content: formattedContent,
          })
          return {
            ...item,
            qrDataUrl,
            qrHash: data.results[idx]?.qrHash,
          }
        })
      )

      setItems(generated)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'QR kodlar oluşturulamadı')
    } finally {
      setLoading(false)
    }
  }

  const handleDownloadAll = () => {
    items.forEach((item, idx) => {
      if (item.qrDataUrl) {
        const link = document.createElement('a')
        link.href = item.qrDataUrl
        link.download = `qrcode-${idx + 1}-${item.type}.png`
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
      }
    })
  }

  return (
    <div className="bg-editor-sidebar rounded-lg border border-editor-border shadow-card p-6 md:p-8">
      <div className="space-y-6">
        <div>
          <h2 className="font-mono text-lg font-semibold text-editor-text mb-2">
            CSV Dosyası Yükle
          </h2>
          <p className="text-sm text-editor-muted mb-4">
            Format: tip,içerik (her satırda bir)
            <br />
            Örnek: url,https://ornek.com
          </p>
          <input
            type="file"
            accept=".csv,.txt"
            onChange={handleFileUpload}
            className="block w-full text-sm text-editor-muted file:mr-4 file:py-2 file:px-4 file:rounded file:border file:border-editor-border file:text-sm file:font-semibold file:bg-editor-surface file:text-editor-accent"
          />
        </div>

        {items.length > 0 && (
          <div>
            <div className="flex justify-between items-center mb-4">
              <p className="text-sm text-editor-muted">
                {items.length} öğe yüklendi
              </p>
              <div className="flex gap-2">
                <button
                  onClick={handleGenerate}
                  disabled={loading}
                  className="bg-editor-accent hover:bg-editor-accent/90 text-white font-semibold py-2 px-4 rounded transition-colors disabled:opacity-50 font-mono"
                >
                  {loading ? 'Oluşturuluyor...' : 'Tümünü Oluştur'}
                </button>
                {items[0]?.qrDataUrl && (
                  <button
                    onClick={handleDownloadAll}
                    className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded transition-colors font-mono"
                  >
                    Tümünü İndir
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {error && (
          <div className="bg-red-900/20 border border-red-800 text-red-400 px-4 py-3 rounded-lg">
            {error}
          </div>
        )}

        {items.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-h-96 overflow-y-auto">
            {items.map((item, idx) => (
              <div key={idx} className="border border-editor-border rounded-lg p-3 bg-editor-surface">
                {item.qrDataUrl ? (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img
                    src={item.qrDataUrl}
                    alt={`QR ${idx + 1}`}
                    className="w-full mb-2"
                  />
                ) : (
                  <div className="w-full aspect-square bg-editor-surface rounded flex items-center justify-center text-xs text-editor-muted">
                    Oluşturulmadı
                  </div>
                )}
                <p className="text-xs text-editor-muted truncate font-mono">
                  {item.type}: {item.content.substring(0, 20)}...
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
