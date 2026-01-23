import { NextRequest, NextResponse } from 'next/server'
import { getSessionId } from '@/lib/session'
import { checkPremiumStatus } from '@/lib/premium'

export async function GET(request: NextRequest) {
  try {
    const sessionId = await getSessionId()
    const isPremium = await checkPremiumStatus(sessionId || null)

    return NextResponse.json({ isPremium })
  } catch (error) {
    return NextResponse.json({ isPremium: false })
  }
}
