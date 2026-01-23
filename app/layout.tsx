import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navigation from '@/components/Navigation'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'ZeoQR - Free QR Code Generator | Create QR Codes Instantly',
  description: 'Generate QR codes for URLs, text, phone numbers, and emails. Free, instant, no login required. Download as PNG. Premium features available.',
  keywords: 'QR code generator, QR code, free QR code, QR code maker, QR code creator',
  authors: [{ name: 'ZeoQR' }],
  openGraph: {
    title: 'ZeoQR - Free QR Code Generator',
    description: 'Generate QR codes instantly. No login required.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ZeoQR - Free QR Code Generator',
    description: 'Generate QR codes instantly. No login required.',
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
    <html lang="en">
      <body className={inter.className}>
        <Navigation />
        {children}
      </body>
    </html>
  )
}
