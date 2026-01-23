'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function PricingPlans() {
  const [loading, setLoading] = useState<string | null>(null)
  const router = useRouter()

  const handleCheckout = async (planType: 'monthly' | 'lifetime', provider: 'stripe' | 'lemonsqueezy' = 'stripe') => {
    setLoading(planType)
    try {
      const response = await fetch('/api/subscription/create-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ planType, provider }),
      })

      const data = await response.json()
      
      if (data.url) {
        window.location.href = data.url
      } else {
        alert('Failed to create checkout session')
      }
    } catch (error) {
      console.error('Checkout error:', error)
      alert('Failed to start checkout')
    } finally {
      setLoading(null)
    }
  }

  const plans = [
    {
      name: 'Monthly',
      price: '$9.99',
      period: 'per month',
      features: [
        'No ads',
        'Logo upload in QR codes',
        'Custom colors',
        'Scan analytics',
        'Bulk QR generation',
        'Priority support',
      ],
      planType: 'monthly' as const,
      popular: true,
    },
    {
      name: 'Lifetime',
      price: '$99',
      period: 'one-time',
      features: [
        'Everything in Monthly',
        'Lifetime access',
        'All future features',
        'No recurring payments',
      ],
      planType: 'lifetime' as const,
      popular: false,
    },
  ]

  return (
    <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
      {plans.map((plan) => (
        <div
          key={plan.name}
          className={`bg-white dark:bg-slate-800 rounded-lg shadow-lg p-8 ${
            plan.popular ? 'ring-2 ring-primary-500 scale-105' : ''
          }`}
        >
          {plan.popular && (
            <div className="bg-primary-500 text-white text-sm font-semibold px-3 py-1 rounded-full inline-block mb-4">
              Most Popular
            </div>
          )}
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            {plan.name}
          </h2>
          <div className="mb-6">
            <span className="text-4xl font-bold text-gray-900 dark:text-white">
              {plan.price}
            </span>
            <span className="text-gray-600 dark:text-gray-400 ml-2">
              {plan.period}
            </span>
          </div>
          <ul className="space-y-3 mb-8">
            {plan.features.map((feature, idx) => (
              <li key={idx} className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span className="text-gray-700 dark:text-gray-300">{feature}</span>
              </li>
            ))}
          </ul>
          <button
            onClick={() => handleCheckout(plan.planType)}
            disabled={loading === plan.planType}
            className="w-full bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading === plan.planType ? 'Processing...' : 'Get Started'}
          </button>
        </div>
      ))}
    </div>
  )
}
