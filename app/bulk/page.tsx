import BulkGenerator from '@/components/BulkGenerator'
import { getSessionId } from '@/lib/session'
import { checkPremiumStatus } from '@/lib/premium'
import { redirect } from 'next/navigation'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Bulk QR Code Generator - ZeoQR Premium',
  description: 'Generate multiple QR codes at once from CSV upload. Premium feature.',
}

export default async function BulkPage() {
  const sessionId = await getSessionId()
  const isPremium = await checkPremiumStatus(sessionId || null)

  if (!isPremium) {
    redirect('/pricing')
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
          Bulk QR Code Generator
        </h1>
        <BulkGenerator />
      </div>
    </main>
  )
}
