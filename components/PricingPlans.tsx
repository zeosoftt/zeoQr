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
              ? 'bg-editor-accent/20 border border-editor-accent/50 text-editor-accent'
              : 'bg-red-900/20 border border-red-800 text-red-400'
          }`}
        >
          {message.text}
        </div>
      )}
      {plans.map((plan) => (
        <div
          key={plan.name}
          className={`bg-editor-sidebar rounded-lg border border-editor-border shadow-card p-8 transition-shadow ${
            plan.popular ? 'ring-2 ring-editor-accent' : ''
          }`}
        >
          {plan.popular && (
            <div className="bg-editor-accent text-white text-sm font-semibold px-3 py-1 rounded inline-block mb-4 font-mono">
              En Popüler
            </div>
          )}
          <h2 className="font-mono text-2xl font-bold text-editor-text mb-2">
            {plan.name}
          </h2>
          <div className="mb-6">
            <span className="text-4xl font-bold text-editor-text">
              {plan.price}
            </span>
            <span className="text-editor-muted ml-2">
              {plan.period}
            </span>
          </div>
          <ul className="space-y-3 mb-8">
            {plan.features.map((feature, idx) => (
              <li key={idx} className="flex items-start">
                <span className="text-green-400 mr-2">✓</span>
                <span className="text-editor-text/90">{feature}</span>
              </li>
            ))}
          </ul>
          <button
            onClick={() => handleCheckout(plan.planType)}
            disabled={loading === plan.planType}
            className="w-full bg-editor-accent hover:bg-editor-accent/90 text-white font-semibold py-3.5 px-6 rounded transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed font-mono hover:scale-[1.02] active:scale-[0.98]"
          >
            {loading === plan.planType ? 'İşleniyor...' : 'Başla'}
          </button>
        </div>
      ))}
    </div>
  )
}
