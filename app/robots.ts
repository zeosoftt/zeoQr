import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://zeoqr.com'

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/analytics', '/bulk'],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
