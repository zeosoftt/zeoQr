// Ad integration abstraction layer
// Supports Google AdSense or custom providers

export type AdProvider = 'adsense' | 'custom' | 'none'

export interface AdConfig {
  provider: AdProvider
  clientId?: string
  enabled: boolean
}

export function getAdConfig(): AdConfig {
  const provider = (process.env.NEXT_PUBLIC_ADS_PROVIDER || 'adsense') as AdProvider
  const enabled = provider !== 'none'

  return {
    provider,
    clientId: process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID || 'ca-pub-5570650174796895',
    enabled,
  }
}

export function shouldShowAds(isPremium: boolean): boolean {
  if (isPremium) return false
  return getAdConfig().enabled
}
