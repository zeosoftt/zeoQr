import { NextRequest, NextResponse } from 'next/server'
import { getSessionId } from '@/lib/session'
import { db } from '@/lib/db'
import { checkPremiumStatus } from '@/lib/premium'
import { generateQRHash, formatContentForQR, QRType } from '@/lib/qr'
import { z } from 'zod'

const bulkSchema = z.object({
  items: z.array(
    z.object({
      type: z.enum(['url', 'text', 'phone', 'email']),
      content: z.string(),
    })
  ),
})

export async function POST(request: NextRequest) {
  try {
    const sessionId = await getSessionId()
    
    if (!sessionId) {
      return NextResponse.json({ error: 'No session' }, { status: 401 })
    }

    const isPremium = await checkPremiumStatus(sessionId)
    
    if (!isPremium) {
      return NextResponse.json({ error: 'Premium required' }, { status: 403 })
    }

    const body = await request.json()
    const { items } = bulkSchema.parse(body)

    if (items.length > 100) {
      return NextResponse.json(
        { error: 'Maximum 100 QR codes per batch' },
        { status: 400 }
      )
    }

    const results = await Promise.all(
      items.map(async (item) => {
        const formattedContent = formatContentForQR(item.type as QRType, item.content)
        const qrHash = generateQRHash(formattedContent, item.type as QRType)

        // Check if exists
        let qrCode = await db.qRCode.findUnique({
          where: { qrHash },
        })

        if (!qrCode) {
          qrCode = await db.qRCode.create({
            data: {
              qrHash,
              content: formattedContent,
              type: item.type,
              sessionId,
            },
          })
        }

        return {
          qrHash,
          content: formattedContent,
          type: item.type,
          qrId: qrCode.id,
        }
      })
    )

    return NextResponse.json({ success: true, results })
  } catch (error) {
    console.error('Bulk generation error:', error)
    return NextResponse.json(
      { error: 'Failed to generate bulk QR codes' },
      { status: 500 }
    )
  }
}
