import PricingPlans from '@/components/PricingPlans'
import { Metadata } from 'next'
import { Suspense } from 'react'

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://zeoqr.com'

export const metadata: Metadata = {
  title: 'Fiyatlandırma',
  description: 'Reklamsız deneyim, özel QR kodlar, analitik ve toplu üretim için ZeoQR Premium\'a yükseltin. Aylık ve yaşam boyu planlar.',
  openGraph: {
    title: 'Fiyatlandırma | ZeoQR Premium',
    description: 'Premium planlar: reklamsız kullanım, logo ekleme, analitik, toplu QR üretimi.',
    url: `${BASE_URL}/pricing`,
    type: 'website',
    locale: 'tr_TR',
  },
  alternates: { canonical: `${BASE_URL}/pricing` },
}

export default async function PricingPage({
  searchParams,
}: {
  searchParams: Promise<{ success?: string; canceled?: string; session_id?: string }>
}) {
  const params = await searchParams
  return (
    <main className="min-h-screen bg-editor">
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        <div className="text-center mb-12">
          <h1 className="font-mono text-4xl md:text-5xl font-bold text-editor-text mb-4">
            Planınızı Seçin
          </h1>
          <p className="text-lg text-editor-muted">
            Premium özelliklerin kilidini açın ve ZeoQR&apos;nin gelişimini destekleyin
          </p>
        </div>

        {params.success && (
          <div className="mb-6 bg-green-900/20 border border-green-800 text-green-400 px-4 py-3 rounded-lg text-center">
            Ödeme başarılı! Premium aboneliğiniz artık aktif.
          </div>
        )}

        {params.canceled && (
          <div className="mb-6 bg-yellow-900/20 border border-yellow-800 text-yellow-400 px-4 py-3 rounded-lg text-center">
            Ödeme iptal edildi. İstediğiniz zaman tekrar deneyebilirsiniz.
          </div>
        )}

        <Suspense fallback={<div className="text-editor-muted font-mono">Yükleniyor...</div>}>
          <PricingPlans />
        </Suspense>
      </div>
    </main>
  )
}
