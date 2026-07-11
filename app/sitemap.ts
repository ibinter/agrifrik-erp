import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  // ERP app = internal only, minimal sitemap
  const baseUrl = 'https://erp.agrifrik.com'
  return [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'daily', priority: 1 },
    { url: `${baseUrl}/dashboard`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
  ]
}
