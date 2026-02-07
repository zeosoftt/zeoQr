/**
 * Kullanıcı rızası – Google Consent Mode v2 uyumlu
 * AEA, UK ve İsviçre için CMP (Consent Management Platform) desteği
 */

export const CONSENT_COOKIE_NAME = 'zeoqr_consent'
export const CONSENT_COOKIE_MAX_AGE_DAYS = 365

export type ConsentState = {
  ad_storage: boolean
  analytics_storage: boolean
  ad_user_data: boolean
  ad_personalization: boolean
}

export function getConsentFromCookie(): ConsentState | null {
  if (typeof document === 'undefined') return null
  const match = document.cookie.match(new RegExp(`(?:^|; )${CONSENT_COOKIE_NAME}=([^;]*)`))
  if (!match) return null
  try {
    const decoded = decodeURIComponent(match[1])
    const parsed = JSON.parse(decoded) as Partial<ConsentState>
    if (typeof parsed.ad_storage === 'boolean' && typeof parsed.analytics_storage === 'boolean') {
      return {
        ad_storage: parsed.ad_storage ?? false,
        analytics_storage: parsed.analytics_storage ?? false,
        ad_user_data: parsed.ad_user_data ?? parsed.ad_storage ?? false,
        ad_personalization: parsed.ad_personalization ?? parsed.ad_storage ?? false,
      }
    }
    // Eski format: "granted" | "denied"
    if (decoded === 'granted') {
      return { ad_storage: true, analytics_storage: true, ad_user_data: true, ad_personalization: true }
    }
    if (decoded === 'denied') {
      return { ad_storage: false, analytics_storage: false, ad_user_data: false, ad_personalization: false }
    }
  } catch {
    // ignore
  }
  return null
}

export function setConsentCookie(state: ConsentState): void {
  if (typeof document === 'undefined') return
  const value = encodeURIComponent(JSON.stringify(state))
  const maxAge = CONSENT_COOKIE_MAX_AGE_DAYS * 24 * 60 * 60
  document.cookie = `${CONSENT_COOKIE_NAME}=${value}; path=/; max-age=${maxAge}; SameSite=Lax`
}

export function hasConsentChoice(): boolean {
  return getConsentFromCookie() !== null
}

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
  }
}

export function updateGtagConsent(state: ConsentState): void {
  if (typeof window === 'undefined') return
  const consent = {
    ad_storage: state.ad_storage ? 'granted' : 'denied',
    analytics_storage: state.analytics_storage ? 'granted' : 'denied',
    ad_user_data: state.ad_storage ? 'granted' : 'denied',
    ad_personalization: state.ad_storage ? 'granted' : 'denied',
  }
  if (window.gtag) {
    window.gtag('consent', 'update', consent)
  }
  // GTM Consent Mode v2 için dataLayer (GTM kullanıyorsanız)
  try {
    const dl = (window as unknown as { dataLayer?: object[] }).dataLayer
    if (dl && Array.isArray(dl)) {
      dl.push({ event: 'consent_update', ...consent })
    }
  } catch {
    // ignore
  }
}
