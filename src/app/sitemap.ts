import { MetadataRoute } from 'next'
import { getPublishedPosts } from '@/lib/cms/db-blog'
import { getPublishedCases } from '@/lib/cms/db-cases'

const baseUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'https://mita.top').replace(
  /\/$/,
  ''
)

function lastModifiedOrNow(value: string | null | undefined): Date {
  if (value == null || value === '') {
    return new Date()
  }
  const d = new Date(value)
  return Number.isFinite(d.getTime()) ? d : new Date()
}

export default function sitemap(): MetadataRoute.Sitemap {
  // Статические страницы
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/career`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.75,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/security`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/offline`,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.2,
    },
    {
      url: `${baseUrl}/legal/terms`,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    },
    {
      url: `${baseUrl}/legal/privacy`,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    },
  ]

  // Страницы услуг
  const servicePages = [
    {
      url: `${baseUrl}/services/leadgen`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/services/call-center`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/services/avito`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/services/recruiting`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
  ]

  // Страницы блога (источник — SQLite, как и публичные страницы /blog)
  const blogPosts = getPublishedPosts()
  const blogPages = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: lastModifiedOrNow(post.updated_at || post.published_at),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  // Страницы кейсов (источник — SQLite)
  const cases = getPublishedCases()
  const casePages = cases.map((caseItem) => ({
    url: `${baseUrl}/cases/${caseItem.slug}`,
    lastModified: lastModifiedOrNow(caseItem.updated_at || caseItem.published_at),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  // Индексные страницы
  const indexPages = [
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/cases`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
  ]

  return [...staticPages, ...servicePages, ...indexPages, ...blogPages, ...casePages]
}
