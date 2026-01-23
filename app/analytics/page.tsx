import AnalyticsDashboard from '@/components/AnalyticsDashboard'
import { getSessionId } from '@/lib/session'
import { checkPremiumStatus } from '@/lib/premium'
import { redirect } from 'next/navigation'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'QR Code Analytics - ZeoQR Premium',
  description: 'View detailed analytics for your QR codes including scan counts and performance metrics.',
}

export default async function AnalyticsPage() {
  const sessionId = await getSessionId()
  const isPremium = await checkPremiumStatus(sessionId || null)

  if (!isPremium) {
    redirect('/pricing')
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
          QR Code Analytics
        </h1>
        <AnalyticsDashboard />
      </div>
    </main>
  )
}
