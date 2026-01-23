import { db } from './db'

export async function checkPremiumStatus(sessionId: string | null): Promise<boolean> {
  if (!sessionId) return false

  const subscription = await db.subscription.findUnique({
    where: { sessionId },
  })

  if (!subscription) return false

  if (subscription.planType === 'lifetime') {
    return subscription.status === 'active'
  }

  if (subscription.planType === 'monthly') {
    if (subscription.status !== 'active') return false
    if (subscription.expiresAt && subscription.expiresAt < new Date()) {
      // Update expired status
      await db.subscription.update({
        where: { id: subscription.id },
        data: { status: 'expired' },
      })
      return false
    }
    return true
  }

  return false
}
