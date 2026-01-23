import QRGenerator from '@/components/QRGenerator'
import PremiumBanner from '@/components/PremiumBanner'
import AdBanner from '@/components/AdBanner'
import { getSessionId } from '@/lib/session'
import { checkPremiumStatus } from '@/lib/premium'

export default async function Home() {
  const sessionId = await getSessionId()
  const isPremium = await checkPremiumStatus(sessionId || null)

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-12 max-w-7xl">
        {/* Header */}
        <header className="text-center mb-12">
          <h1 className="text-5xl font-light text-gray-900 dark:text-white mb-3 tracking-tight">
            ZeoQR
          </h1>
          <p className="text-gray-500 dark:text-gray-400 font-light">
            Generate QR codes instantly
          </p>
        </header>

        {/* Premium Banner */}
        {!isPremium && <PremiumBanner />}

        {/* QR Generator */}
        <QRGenerator isPremium={isPremium} />

        {/* Ad Banner (below QR result) */}
        {!isPremium && <AdBanner position="below-result" />}
      </div>
    </main>
  )
}
