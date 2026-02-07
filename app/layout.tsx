import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Script from 'next/script'
import './globals.css'
import Navigation from '@/components/Navigation'

const GA_MEASUREMENT_ID = 'G-CLTZ9TL3JM'
const GTM_ID = 'GTM-5PM7M253'

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
  other: {
    'google-adsense-account': 'ca-pub-5570650174796895',
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
      <head>
        <meta name="google-adsense-account" content="ca-pub-5570650174796895" />
        {/* Google Tag Manager */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`,
          }}
        />
        {/* End Google Tag Manager */}
      </head>
      <body className={inter.className}>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
            title="Google Tag Manager"
          />
        </noscript>
        {/* End Google Tag Manager (noscript) */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}');
          `}
        </Script>
        <Navigation />
        {children}
      </body>
    </html>
  )
}
