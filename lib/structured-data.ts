/**
 * JSON-LD yapısal veri - 2026 SEO (Organization, WebSite)
 */

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://zeoqr.com'

export function getOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${BASE_URL}/#organization`,
    name: 'ZeoQR',
    url: BASE_URL,
    description: 'Ücretsiz QR kod oluşturucu. URL, metin, telefon ve e-posta için anında QR kod oluşturup PNG indirin.',
    potentialAction: {
      '@type': 'SearchAction',
      target: { '@type': 'EntryPoint', url: `${BASE_URL}/?q={search_term_string}` },
      'query-input': 'required name=search_term_string',
    },
  }
}

export function getWebSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'ZeoQR',
    alternateName: 'ZeoQR QR Kod Oluşturucu',
    url: BASE_URL,
    description: 'Ücretsiz QR kod oluşturucu. Giriş gerektirmez, anında PNG indirin.',
    inLanguage: 'tr-TR',
    publisher: { '@id': `${BASE_URL}/#organization` },
    potentialAction: {
      '@type': 'UseAction',
      target: BASE_URL,
    },
  }
}

export function getBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  }
}
