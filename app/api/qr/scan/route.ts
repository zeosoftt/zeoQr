import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { z } from 'zod'

export const dynamic = 'force-dynamic'

const scanSchema = z.object({
  qrHash: z.string(),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { qrHash } = scanSchema.parse(body)

    // Increment scan count
    const qrCode = await db.qRCode.update({
      where: { qrHash },
      data: {
        scanCount: {
          increment: 1,
        },
      },
    })

    return NextResponse.json({ success: true, scanCount: qrCode.scanCount })
  } catch (error) {
    // QR might not exist in DB (generated but not tracked)
    return NextResponse.json({ success: true, scanCount: 0 })
  }
}
