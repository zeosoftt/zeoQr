'use client'

import { QRType } from '@/lib/qr'

interface QRTypeSelectorProps {
  type: QRType
  onTypeChange: (type: QRType) => void
}

export default function QRTypeSelector({ type, onTypeChange }: QRTypeSelectorProps) {
  const types: { value: QRType; label: string; icon: string }[] = [
    { value: 'url', label: 'URL', icon: '🔗' },
    { value: 'text', label: 'Metin', icon: '📝' },
    { value: 'phone', label: 'Telefon', icon: '📞' },
    { value: 'email', label: 'E-posta', icon: '✉️' },
  ]

  return (
    <div className="grid grid-cols-4 gap-2">
      {types.map((t) => (
        <button
          key={t.value}
          onClick={() => onTypeChange(t.value)}
          className={`px-3 py-2.5 rounded-xl border transition-all ${
            type === t.value
              ? 'border-primary-500 bg-primary-600 text-white dark:bg-primary-500 dark:border-primary-400'
              : 'border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-primary-600 text-gray-700 dark:text-gray-300'
          }`}
        >
          <div className="text-lg mb-0.5">{t.icon}</div>
          <div className="text-xs font-medium">{t.label}</div>
        </button>
      ))}
    </div>
  )
}
