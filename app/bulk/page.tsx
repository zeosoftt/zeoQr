import BulkGenerator from '@/components/BulkGenerator'
import { getSessionId } from '@/lib/session'
import { checkPremiumStatus } from '@/lib/premium'
import { redirect } from 'next/navigation'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Toplu QR Kod Oluşturucu - ZeoQR Premium',
  description: 'CSV yüklemesi ile aynı anda birden fazla QR kod oluşturun. Premium özellik.',
}

export default async function BulkPage() {
  const sessionId = await getSessionId()
  const isPremium = await checkPremiumStatus(sessionId || null)

  if (!isPremium) {
    redirect('/pricing')
  }

  return (
    <main className="min-h-screen bg-editor">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <h1 className="font-mono text-3xl font-bold text-editor-text mb-6">
          Toplu QR Kod Oluşturucu
        </h1>
        <BulkGenerator />
      </div>
    </main>
  )
}
