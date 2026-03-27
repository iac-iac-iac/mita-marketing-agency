import { MetadataRoute } from 'next'
import { getAllBlogPosts } from '@/lib/cms/blog'
import { getAllCases } from '@/lib/cms/cases'

const baseUrl = 'https://direct-line.ru'

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

  // Страницы блога
  const blogPosts = getAllBlogPosts()
  const blogPages = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.publishedAt),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  // Страницы кейсов
  const cases = getAllCases()
  const casePages = cases.map((caseItem) => ({
    url: `${baseUrl}/cases/${caseItem.slug}`,
    lastModified: new Date(caseItem.publishedAt),
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
