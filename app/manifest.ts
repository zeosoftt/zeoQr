import { MetadataRoute } from 'next'

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://zeoqr.com'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'ZeoQR - Ücretsiz QR Kod Oluşturucu',
    short_name: 'ZeoQR',
    description: 'URL, metin, telefon ve e-posta için anında ücretsiz QR kod oluşturup PNG indirin.',
    start_url: '/',
    display: 'standalone',
    background_color: '#f9fafb',
    theme_color: '#0284c7',
    orientation: 'portrait-primary',
    scope: '/',
    lang: 'tr',
    icons: [
      {
        src: '/icon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
        purpose: 'any maskable',
      },
    ],
    categories: ['utilities', 'productivity'],
  }
}
