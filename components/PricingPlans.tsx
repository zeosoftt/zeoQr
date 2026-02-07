'use client'

import { useState } from 'react'

export default function PricingPlans() {
  const [loading, setLoading] = useState<string | null>(null)
  const [message, setMessage] = useState<{ type: 'info' | 'error'; text: string } | null>(null)

  const handleCheckout = async (planType: 'monthly' | 'lifetime', provider: 'stripe' | 'lemonsqueezy' = 'stripe') => {
    setMessage(null)
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
        return
      }
      if (!response.ok && data.error) {
        if (data.error === 'Stripe not configured' || data.error === 'Price ID not configured') {
          setMessage({ type: 'info', text: 'Ödeme sistemi yakında açılacak. Şimdilik ücretsiz özellikleri kullanabilirsiniz.' })
          return
        }
        setMessage({ type: 'error', text: data.error })
        return
      }
      setMessage({ type: 'error', text: 'Ödeme oturumu oluşturulamadı' })
    } catch (error) {
      console.error('Checkout error:', error)
      setMessage({ type: 'error', text: 'Ödeme başlatılamadı' })
    } finally {
      setLoading(null)
    }
  }

  const plans = [
    {
      name: 'Aylık',
      price: '$9.99',
      period: 'aylık',
      features: [
        'Reklam yok',
        'QR kodlara logo yükleme',
        'Özel renkler',
        'Tarama analitiği',
        'Toplu QR üretimi',
        'Öncelikli destek',
      ],
      planType: 'monthly' as const,
      popular: true,
    },
    {
      name: 'Yaşam Boyu',
      price: '$99',
      period: 'tek seferlik',
      features: [
        'Aylık planın tüm özellikleri',
        'Yaşam boyu erişim',
        'Tüm gelecek özellikler',
        'Tekrarlayan ödeme yok',
      ],
      planType: 'lifetime' as const,
      popular: false,
    },
  ]

  return (
    <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
      {message && (
        <div
          className={`md:col-span-2 px-4 py-3 rounded-lg text-center ${
            message.type === 'info'
              ? 'bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-400'
              : 'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400'
          }`}
        >
          {message.text}
        </div>
      )}
      {plans.map((plan) => (
        <div
          key={plan.name}
          className={`bg-white dark:bg-slate-800 rounded-2xl shadow-card hover:shadow-card-hover transition-shadow p-8 ${
            plan.popular ? 'ring-2 ring-primary-500 dark:ring-primary-400' : ''
          }`}
        >
          {plan.popular && (
            <div className="bg-primary-500 text-white text-sm font-semibold px-3 py-1 rounded-full inline-block mb-4">
              En Popüler
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
            className="w-full bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3.5 px-6 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
          >
            {loading === plan.planType ? 'İşleniyor...' : 'Başla'}
          </button>
        </div>
      ))}
    </div>
  )
}
