import { NextRequest, NextResponse } from 'next/server'
import { getOrCreateSession } from '@/lib/session'
import { db } from '@/lib/db'
import { generateQRHash } from '@/lib/qr'
import { z } from 'zod'

const trackSchema = z.object({
  qrHash: z.string(),
  content: z.string(),
  type: z.enum(['url', 'text', 'phone', 'email']),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { qrHash, content, type } = trackSchema.parse(body)

    const sessionId = await getOrCreateSession()

    // Check if QR code already exists
    let qrCode = await db.qRCode.findUnique({
      where: { qrHash },
    })

    if (!qrCode) {
      // Create new QR code record
      qrCode = await db.qRCode.create({
        data: {
          qrHash,
          content,
          type,
          sessionId,
        },
      })
    } else if (qrCode.sessionId !== sessionId) {
      // QR exists but from different session - update scan count if needed
      // For MVP, we'll just track the creation
    }

    return NextResponse.json({ success: true, qrId: qrCode.id })
  } catch (error) {
    console.error('QR tracking error:', error)
    return NextResponse.json(
      { error: 'Failed to track QR code' },
      { status: 500 }
    )
  }
}
