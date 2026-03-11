'use client'

import { useEffect, useState } from 'react'

interface QRCodeAnalytics {
  id: string
  qrHash: string
  content: string
  type: string
  scanCount: number
  createdAt: string
}

interface AnalyticsData {
  totalQRCodes: number
  totalScans: number
  qrCodes: QRCodeAnalytics[]
}

export default function AnalyticsDashboard() {
  const [data, setData] = useState<AnalyticsData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/qr/analytics')
      .then((res) => res.json())
      .then((data) => {
        setData(data)
        setLoading(false)
      })
      .catch((err) => {
        console.error('Analytics error:', err)
        setLoading(false)
      })
  }, [])

  if (loading) {
    return <div className="text-center py-12 text-editor-muted font-mono">Analitikler yükleniyor...</div>
  }

  if (!data) {
    return <div className="text-center py-12 text-red-400 font-mono">Analitikler yüklenemedi</div>
  }

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-editor-sidebar rounded-lg border border-editor-border p-6">
          <h3 className="font-mono text-sm font-medium text-editor-muted mb-2">
            Toplam QR Kod
          </h3>
          <p className="text-3xl font-bold text-editor-text">
            {data.totalQRCodes}
          </p>
        </div>
        <div className="bg-editor-sidebar rounded-lg border border-editor-border p-6">
          <h3 className="font-mono text-sm font-medium text-editor-muted mb-2">
            Toplam Tarama
          </h3>
          <p className="text-3xl font-bold text-editor-text">
            {data.totalScans}
          </p>
        </div>
      </div>

      <div className="bg-editor-sidebar rounded-lg border border-editor-border overflow-hidden">
        <div className="px-6 py-4 border-b border-editor-border">
          <h3 className="font-mono text-lg font-semibold text-editor-text">
            QR Kodlarınız
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-editor-surface">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-editor-muted uppercase tracking-wider font-mono">
                  İçerik
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-editor-muted uppercase tracking-wider font-mono">
                  Tip
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-editor-muted uppercase tracking-wider font-mono">
                  Tarama
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-editor-muted uppercase tracking-wider font-mono">
                  Oluşturulma
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-editor-border">
              {data.qrCodes.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-8 text-center text-editor-muted">
                    Henüz QR kod oluşturulmadı
                  </td>
                </tr>
              ) : (
                data.qrCodes.map((qr) => (
                  <tr key={qr.id} className="hover:bg-editor-surface/50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-editor-text max-w-xs truncate font-mono">
                        {qr.content}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 py-1 text-xs font-medium rounded bg-editor-accent/20 text-editor-accent font-mono">
                        {qr.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-editor-text">
                      {qr.scanCount}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-editor-muted">
                      {new Date(qr.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
