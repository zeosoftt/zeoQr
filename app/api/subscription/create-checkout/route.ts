import { NextRequest, NextResponse } from 'next/server'
import { getOrCreateSession } from '@/lib/session'
import { z } from 'zod'
import Stripe from 'stripe'

const checkoutSchema = z.object({
  planType: z.enum(['monthly', 'lifetime']),
  provider: z.enum(['stripe', 'lemonsqueezy']).optional().default('stripe'),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { planType, provider } = checkoutSchema.parse(body)

    const sessionId = await getOrCreateSession()

    // Stripe integration
    if (provider === 'stripe') {
      if (!process.env.STRIPE_SECRET_KEY) {
        return NextResponse.json(
          { error: 'Stripe not configured' },
          { status: 500 }
        )
      }

      const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
        apiVersion: '2024-06-20',
      })
      
      const priceId = planType === 'monthly' 
        ? process.env.STRIPE_MONTHLY_PRICE_ID
        : process.env.STRIPE_LIFETIME_PRICE_ID

      if (!priceId) {
        return NextResponse.json(
          { error: 'Price ID not configured' },
          { status: 500 }
        )
      }

      const session = await stripe.checkout.sessions.create({
        mode: planType === 'monthly' ? 'subscription' : 'payment',
        line_items: [
          {
            price: priceId,
            quantity: 1,
          },
        ],
        success_url: `${process.env.NEXT_PUBLIC_APP_URL}/pricing?success=true&session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/pricing?canceled=true`,
        client_reference_id: sessionId,
        metadata: {
          sessionId,
          planType,
        },
      })

      return NextResponse.json({ url: session.url })
    }

    // Lemon Squeezy integration
    if (provider === 'lemonsqueezy') {
      // Lemon Squeezy checkout implementation
      // For MVP, return placeholder
      return NextResponse.json({
        url: `${process.env.NEXT_PUBLIC_APP_URL}/pricing?lemonsqueezy=true`,
      })
    }

    return NextResponse.json(
      { error: 'Invalid provider' },
      { status: 400 }
    )
  } catch (error) {
    console.error('Checkout error:', error)
    return NextResponse.json(
      { error: 'Failed to create checkout' },
      { status: 500 }
    )
  }
}
