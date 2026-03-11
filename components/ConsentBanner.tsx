'use client'

import { useState, useEffect } from 'react'
import {
  getConsentFromCookie,
  setConsentCookie,
  hasConsentChoice,
  updateGtagConsent,
  type ConsentState,
} from '@/lib/consent'

const defaultDenied: ConsentState = {
  ad_storage: false,
  analytics_storage: false,
  ad_user_data: false,
  ad_personalization: false,
}

const defaultGranted: ConsentState = {
  ad_storage: true,
  analytics_storage: true,
  ad_user_data: true,
  ad_personalization: true,
}

export default function ConsentBanner() {
  const [visible, setVisible] = useState(true)
  const [mounted, setMounted] = useState(false)
  const [manageOpen, setManageOpen] = useState(false)
  const [prefs, setPrefs] = useState<ConsentState>(defaultDenied)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return
    const chosen = hasConsentChoice()
    setVisible(!chosen)
    if (chosen) {
      const state = getConsentFromCookie()
      if (state) updateGtagConsent(state)
    }
  }, [mounted])

  const applyAndClose = (state: ConsentState) => {
    setConsentCookie(state)
    updateGtagConsent(state)
    setVisible(false)
    setManageOpen(false)
  }

  const handleAccept = () => applyAndClose(defaultGranted)
  const handleDeny = () => applyAndClose(defaultDenied)

  const handleManageSave = () => {
    applyAndClose(prefs)
  }

  if (!mounted || !visible) return null

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-[9999] border-t border-editor-border bg-editor-sidebar shadow-[0_-4px_20px_rgba(0,0,0,0.4)] animate-[fade-in_0.3s_ease-out]"
      role="dialog"
      aria-label="Çerez ve veri kullanımı tercihleri"
    >
      <div className="container mx-auto px-4 py-4 max-w-4xl">
        <p className="text-sm text-editor-muted mb-4 font-light leading-relaxed">
          Sitemiz, AEA/İngiltere/İsviçre yükümlülükleri kapsamında deneyiminizi iyileştirmek ve reklam sunmak için çerez ve benzeri veriler kullanıyor. Tercihinizi aşağıdan seçebilir veya çerez ayarlarını yönetebilirsiniz.
          <a href="/sss" className="text-editor-accent hover:underline ml-1 transition-colors duration-300">
            Daha fazla bilgi
          </a>
        </p>

        {!manageOpen ? (
          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={handleAccept}
              className="px-4 py-2 rounded bg-editor-accent hover:bg-editor-accent/90 text-white text-sm font-medium transition-all duration-300 hover:scale-105 active:scale-95"
            >
              İzin ver
            </button>
            <button
              type="button"
              onClick={handleDeny}
              className="px-4 py-2 rounded border border-editor-border text-editor-text hover:bg-editor-surface text-sm font-medium transition-all duration-300 hover:scale-105 active:scale-95"
            >
              İzin verme
            </button>
            <button
              type="button"
              onClick={() => setManageOpen(true)}
              className="px-4 py-2 rounded border border-editor-border text-editor-text hover:bg-editor-surface text-sm font-medium transition-all duration-300 hover:scale-105 active:scale-95"
            >
              Seçenekleri yönet
            </button>
          </div>
        ) : (
          <div className="space-y-4 pt-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-editor-text">
                Reklam ve kişiselleştirme çerezleri
              </span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={prefs.ad_storage}
                  onChange={(e) =>
                    setPrefs((s) => ({
                      ...s,
                      ad_storage: e.target.checked,
                      ad_user_data: e.target.checked,
                      ad_personalization: e.target.checked,
                    }))
                  }
                  className="sr-only peer"
                />
                <div className="w-9 h-5 bg-editor-surface peer-focus:ring-2 peer-focus:ring-editor-accent/50 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-editor-accent" />
              </label>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-editor-text">
                Analitik çerezleri
              </span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={prefs.analytics_storage}
                  onChange={(e) =>
                    setPrefs((s) => ({ ...s, analytics_storage: e.target.checked }))
                  }
                  className="sr-only peer"
                />
                <div className="w-9 h-5 bg-editor-surface peer-focus:ring-2 peer-focus:ring-editor-accent/50 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-editor-accent" />
              </label>
            </div>
            <div className="flex flex-wrap gap-3 pt-2">
              <button
                type="button"
                onClick={handleManageSave}
                className="px-4 py-2 rounded bg-editor-accent hover:bg-editor-accent/90 text-white text-sm font-medium transition-colors"
              >
                Tercihleri kaydet
              </button>
              <button
                type="button"
                onClick={() => setManageOpen(false)}
                className="px-4 py-2 rounded border border-editor-border text-editor-text hover:bg-editor-surface text-sm font-medium transition-colors"
              >
                Geri
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
