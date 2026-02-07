import { db } from './db'

export async function checkPremiumStatus(sessionId: string | null): Promise<boolean> {
  if (!sessionId) return false

  try {
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
        try {
          await db.subscription.update({
            where: { id: subscription.id },
            data: { status: 'expired' },
          })
        } catch {
          // DB unreachable, treat as not premium
        }
        return false
      }
      return true
    }

    return false
  } catch (error) {
    // Database unreachable (e.g. Supabase paused, local without DB) → treat as not premium
    if (process.env.NODE_ENV === 'development') {
      console.warn('checkPremiumStatus: database unreachable, assuming not premium', error)
    }
    return false
  }
}
