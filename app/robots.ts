import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', disallow: '/' },
    sitemap: 'https://erp.agrifrik.com/sitemap.xml',
  }
}
