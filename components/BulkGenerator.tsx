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
    <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-6 md:p-8">
      <div className="space-y-6">
        <div>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            CSV Dosyası Yükle
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            Format: tip,içerik (her satırda bir)
            <br />
            Örnek: url,https://ornek.com
          </p>
          <input
            type="file"
            accept=".csv,.txt"
            onChange={handleFileUpload}
            className="block w-full text-sm text-gray-500 dark:text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100 dark:file:bg-primary-900/20 dark:file:text-primary-300"
          />
        </div>

        {items.length > 0 && (
          <div>
            <div className="flex justify-between items-center mb-4">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {items.length} öğe yüklendi
              </p>
              <div className="flex gap-2">
                <button
                  onClick={handleGenerate}
                  disabled={loading}
                  className="bg-primary-600 hover:bg-primary-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors disabled:opacity-50"
                >
                  {loading ? 'Oluşturuluyor...' : 'Tümünü Oluştur'}
                </button>
                {items[0]?.qrDataUrl && (
                  <button
                    onClick={handleDownloadAll}
                    className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
                  >
                    Tümünü İndir
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {error && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 px-4 py-3 rounded-lg">
            {error}
          </div>
        )}

        {items.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-h-96 overflow-y-auto">
            {items.map((item, idx) => (
              <div key={idx} className="border border-gray-200 dark:border-gray-700 rounded-lg p-3">
                {item.qrDataUrl ? (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img
                    src={item.qrDataUrl}
                    alt={`QR ${idx + 1}`}
                    className="w-full mb-2"
                  />
                ) : (
                  <div className="w-full aspect-square bg-gray-100 dark:bg-gray-700 rounded flex items-center justify-center text-xs text-gray-400">
                    Oluşturulmadı
                  </div>
                )}
                <p className="text-xs text-gray-600 dark:text-gray-400 truncate">
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
