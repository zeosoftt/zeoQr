import { NextRequest, NextResponse } from 'next/server'
import { getSessionId } from '@/lib/session'
import { db } from '@/lib/db'
import { checkPremiumStatus } from '@/lib/premium'

export async function GET(request: NextRequest) {
  try {
    const sessionId = await getSessionId()
    
    if (!sessionId) {
      return NextResponse.json({ error: 'No session' }, { status: 401 })
    }

    const isPremium = await checkPremiumStatus(sessionId)
    
    if (!isPremium) {
      return NextResponse.json({ error: 'Premium required' }, { status: 403 })
    }

    // Get user's QR codes with analytics
    const qrCodes = await db.qRCode.findMany({
      where: { sessionId },
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        qrHash: true,
        content: true,
        type: true,
        scanCount: true,
        createdAt: true,
      },
    })

    const totalScans = qrCodes.reduce((sum, qr) => sum + qr.scanCount, 0)
    const totalQRCodes = qrCodes.length

    return NextResponse.json({
      totalQRCodes,
      totalScans,
      qrCodes,
    })
  } catch (error) {
    console.error('Analytics error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch analytics' },
      { status: 500 }
    )
  }
}
