import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
import { Inter } from 'next/font/google'
import Script from 'next/script'
import './globals.css'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { getOrganizationSchema, getWebSiteSchema } from '@/lib/structured-data'

const ConsentBanner = dynamic(() => import('@/components/ConsentBanner'), { ssr: false })

const GA_MEASUREMENT_ID = 'G-CLTZ9TL3JM'
const GTM_ID = 'GTM-5PM7M253'

const inter = Inter({ subsets: ['latin'] })

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://zeoqr.com'

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: 'ZeoQR - Ücretsiz QR Kod Oluşturucu | Anında QR Kod Oluştur',
    template: '%s | ZeoQR',
  },
  description: 'URL, metin, telefon ve e-posta için QR kod oluşturun. Ücretsiz, anında, giriş gerektirmez. PNG olarak indirin. Premium özellikler mevcut.',
  keywords: ['QR kod oluşturucu', 'QR kod', 'ücretsiz QR kod', 'QR kod yapıcı', 'QR kod üretici', 'QR generator'],
  authors: [{ name: 'ZeoQR', url: BASE_URL }],
  creator: 'ZeoQR',
  publisher: 'ZeoQR',
  icons: {
    icon: [{ url: '/icon.svg', type: 'image/svg+xml' }],
    apple: [{ url: '/icon.svg', type: 'image/svg+xml', sizes: '180x180' }],
  },
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#0284c7' },
    { media: '(prefers-color-scheme: dark)', color: '#0c4a6e' },
  ],
  openGraph: {
    type: 'website',
    locale: 'tr_TR',
    url: BASE_URL,
    siteName: 'ZeoQR',
    title: 'ZeoQR - Ücretsiz QR Kod Oluşturucu',
    description: 'Anında QR kod oluşturun. Giriş gerektirmez. URL, metin, telefon, e-posta için ücretsiz QR kod.',
    images: [{ url: '/icon.svg', width: 32, height: 32, alt: 'ZeoQR' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ZeoQR - Ücretsiz QR Kod Oluşturucu',
    description: 'Anında QR kod oluşturun. Giriş gerektirmez.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  verification: {
    google: 'a6BWEECgOVLs2N_48WsD8BZdpGG1kWCCi1av6KZyI7Y',
  },
  alternates: {
    canonical: BASE_URL,
  },
  formatDetection: {
    telephone: false,
    email: false,
    address: false,
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
        {/* Google AdSense - tüm sayfalarda */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5570650174796895"
          crossOrigin="anonymous"
        />
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
        {/* JSON-LD: Organization + WebSite (SEO 2026) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              getOrganizationSchema(),
              getWebSiteSchema(),
            ]),
          }}
        />
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
        <Script id="google-consent-and-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('consent', 'default', {
              ad_storage: 'denied',
              analytics_storage: 'denied',
              ad_user_data: 'denied',
              ad_personalization: 'denied',
              wait_for_update: 500
            });
            gtag('config', '${GA_MEASUREMENT_ID}');
          `}
        </Script>
        <div className="flex min-h-screen flex-col">
          <Navigation />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
        <ConsentBanner />
      </body>
    </html>
  )
}
