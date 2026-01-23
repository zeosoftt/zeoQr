import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navigation from '@/components/Navigation'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'ZeoQR - Ücretsiz QR Kod Oluşturucu | Anında QR Kod Oluştur',
  description: 'URL, metin, telefon ve e-posta için QR kod oluşturun. Ücretsiz, anında, giriş gerektirmez. PNG olarak indirin. Premium özellikler mevcut.',
  keywords: 'QR kod oluşturucu, QR kod, ücretsiz QR kod, QR kod yapıcı, QR kod üretici',
  authors: [{ name: 'ZeoQR' }],
  icons: {
    icon: '/icon.svg',
    apple: '/icon.svg',
  },
  openGraph: {
    title: 'ZeoQR - Ücretsiz QR Kod Oluşturucu',
    description: 'Anında QR kod oluşturun. Giriş gerektirmez.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ZeoQR - Ücretsiz QR Kod Oluşturucu',
    description: 'Anında QR kod oluşturun. Giriş gerektirmez.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="tr">
      <body className={inter.className}>
        <Navigation />
        {children}
      </body>
    </html>
  )
}
