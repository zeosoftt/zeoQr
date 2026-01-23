import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { headers } from 'next/headers'
import Stripe from 'stripe'

export const runtime = 'nodejs'

export async function POST(request: NextRequest) {
  try {
    const headersList = await headers()
    const signature = headersList.get('stripe-signature')

    if (!signature || !process.env.STRIPE_WEBHOOK_SECRET || !process.env.STRIPE_SECRET_KEY) {
      return NextResponse.json({ received: true })
    }

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

    const body = await request.text()
    
    let event: Stripe.Event
    try {
      event = stripe.webhooks.constructEvent(
        body,
        signature,
        process.env.STRIPE_WEBHOOK_SECRET
      )
    } catch (err) {
      console.error('Webhook signature verification failed:', err)
      return NextResponse.json(
        { error: 'Webhook signature verification failed' },
        { status: 400 }
      )
    }

    const sessionId = (event.data.object as any).client_reference_id || 
                      (event.data.object as any).metadata?.sessionId

    if (!sessionId) {
      return NextResponse.json({ received: true })
    }

    // Handle subscription events
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session
      const planType = session.metadata?.planType || 'monthly'
      
      await db.subscription.upsert({
        where: { sessionId },
        create: {
          sessionId,
          provider: 'stripe',
          providerId: session.id,
          status: 'active',
          planType,
          expiresAt: planType === 'monthly' 
            ? new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
            : null,
        },
        update: {
          status: 'active',
          expiresAt: planType === 'monthly' 
            ? new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
            : null,
        },
      })
    }

    if (event.type === 'customer.subscription.deleted' || 
        event.type === 'customer.subscription.updated') {
      const subscription = event.data.object as Stripe.Subscription
      const status = subscription.status === 'active' ? 'active' : 'cancelled'
      
      await db.subscription.updateMany({
        where: { providerId: subscription.id },
        data: { status },
      })
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('Webhook error:', error)
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    )
  }
}
