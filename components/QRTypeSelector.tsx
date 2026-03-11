'use client'

import { Link2, FileText, Phone, Mail } from 'lucide-react'
import { QRType } from '@/lib/qr'

interface QRTypeSelectorProps {
  type: QRType
  onTypeChange: (type: QRType) => void
}

const typeConfig: { value: QRType; label: string; icon: React.ComponentType<{ className?: string; strokeWidth?: number | string }> }[] = [
  { value: 'url', label: 'URL', icon: Link2 },
  { value: 'text', label: 'Metin', icon: FileText },
  { value: 'phone', label: 'Telefon', icon: Phone },
  { value: 'email', label: 'E-posta', icon: Mail },
]

export default function QRTypeSelector({ type, onTypeChange }: QRTypeSelectorProps) {
  return (
    <div className="grid grid-cols-4 gap-2">
      {typeConfig.map((t) => {
        const Icon = t.icon
        return (
          <button
            key={t.value}
            onClick={() => onTypeChange(t.value)}
            className={`px-3 py-2.5 rounded border transition-all duration-300 font-mono text-xs flex flex-col items-center ${
              type === t.value
                ? 'border-editor-accent bg-editor-accent text-white scale-[1.02]'
                : 'border-editor-border hover:border-editor-accent/70 text-editor-text bg-editor-surface hover:scale-[1.02] active:scale-[0.98]'
            }`}
          >
            <Icon className="w-5 h-5 mb-0.5" strokeWidth={1.8} />
            <span className="font-medium">{t.label}</span>
          </button>
        )
      })}
    </div>
  )
}
