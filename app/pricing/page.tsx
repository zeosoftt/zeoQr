import PricingPlans from '@/components/PricingPlans'
import { Metadata } from 'next'
import { Suspense } from 'react'

export const metadata: Metadata = {
  title: 'Fiyatlandırma - ZeoQR Premium',
  description: 'Reklamsız deneyim, özel QR kodlar, analitik ve toplu üretim için ZeoQR Premium&apos;a yükseltin.',
}

export default async function PricingPage({
  searchParams,
}: {
  searchParams: Promise<{ success?: string; canceled?: string; session_id?: string }>
}) {
  const params = await searchParams
  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Planınızı Seçin
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Premium özelliklerin kilidini açın ve ZeoQR&apos;nin gelişimini destekleyin
          </p>
        </div>

        {params.success && (
          <div className="mb-6 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-green-700 dark:text-green-400 px-4 py-3 rounded-lg text-center">
            Ödeme başarılı! Premium aboneliğiniz artık aktif.
          </div>
        )}

        {params.canceled && (
          <div className="mb-6 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 text-yellow-700 dark:text-yellow-400 px-4 py-3 rounded-lg text-center">
            Ödeme iptal edildi. İstediğiniz zaman tekrar deneyebilirsiniz.
          </div>
        )}

        <Suspense fallback={<div>Yükleniyor...</div>}>
          <PricingPlans />
        </Suspense>
      </div>
    </main>
  )
}
