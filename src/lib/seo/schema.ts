/**
 * Schema.org микроразметка для М.И.Т.А.
 * JSON-LD формат для SEO оптимизации
 */

import { footerContacts } from '@/lib/navigation';

/** Базовый публичный URL для абсолютных ссылок в JSON-LD (совпадает с логикой sitemap). */
export function getSiteBaseUrl(): string {
  const raw = (process.env.NEXT_PUBLIC_SITE_URL || 'https://mita.top').trim()
  return raw.replace(/\/+$/, '')
}

export interface OrganizationSchema {
  '@context': string;
  '@type': string;
  name: string;
  url: string;
  logo?: string;
  description?: string;
  address?: {
    '@type': string;
    streetAddress: string;
    addressLocality: string;
    addressCountry: string;
  };
  contactPoint?: {
    '@type': string;
    telephone: string;
    contactType: string;
  }[];
  sameAs?: string[];
}

export interface ServiceSchema {
  '@context': string;
  '@type': string;
  name: string;
  description: string;
  provider: {
    '@type': string;
    name: string;
  };
  areaServed?: {
    '@type': string;
    name: string;
  };
  hasOfferCatalog?: {
    '@type': string;
    name: string;
    itemListElement: {
      '@type': string;
      name: string;
      description: string;
    }[];
  };
}

export interface LocalBusinessSchema {
  '@context': string;
  '@type': string;
  name: string;
  image?: string;
  url: string;
  telephone: string;
  address: {
    '@type': string;
    streetAddress: string;
    addressLocality: string;
    postalCode: string;
    addressCountry: string;
  };
  geo?: {
    '@type': string;
    latitude: string;
    longitude: string;
  };
  openingHours?: string[];
  priceRange: string;
}

export interface ArticleSchema {
  '@context': string;
  '@type': string;
  headline: string;
  description: string;
  image?: string;
  datePublished: string;
  dateModified?: string;
  author: {
    '@type': string;
    name: string;
  };
  publisher: {
    '@type': string;
    name: string;
    logo: {
      '@type': string;
      url: string;
    };
  };
}

export interface CaseStudySchema {
  '@context': string;
  '@type': string;
  name: string;
  description: string;
  url: string;
  image?: string;
  author: {
    '@type': string;
    name: string;
  };
  datePublished: string;
  about: {
    '@type': string;
    name: string;
  };
}

export interface BreadcrumbListSchema {
  '@context': string;
  '@type': string;
  itemListElement: {
    '@type': string;
    position: number;
    name: string;
    item: string;
  }[];
}

/**
 * Генерация JSON-LD скрипта
 */
export function generateSchema<T>(schema: T): string {
  return JSON.stringify(schema);
}

/**
 * Schema для Organization (главная страница, footer)
 */
export function createOrganizationSchema(): OrganizationSchema {
  const base = getSiteBaseUrl()
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'М.И.Т.А.',
    url: base,
    logo: `${base}/images/icons/Favicon.ico`,
    description: 'Маркетинговое IT-агентство полного цикла. Комплексная система лидогенерации: от привлечения клиентов до обработки звонков.',
    address: {
      '@type': 'LocalBusiness',
      streetAddress: 'Астраханская ул., 87В',
      addressLocality: 'Саратов',
      addressCountry: 'RU',
    },
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: footerContacts.phoneTel,
        contactType: 'customer service',
      },
    ],
    sameAs: [
      'https://vk.com/mita',
      'https://t.me/mita',
    ],
  };
}

/**
 * Schema для LocalBusiness (страница контактов)
 */
export function createLocalBusinessSchema(): LocalBusinessSchema {
  const base = getSiteBaseUrl()
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'М.И.Т.А.',
    image: `${base}/images/hero-banner/Hero-banner_main_link.png`,
    url: base,
    telephone: footerContacts.phoneTel,
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Астраханская ул., 87В',
      addressLocality: 'Саратов',
      postalCode: '410000',
      addressCountry: 'RU',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '51.5406',
      longitude: '46.0086',
    },
    openingHours: ['Mo-Fr 09:00-18:00'],
    priceRange: '$$',
  };
}

/**
 * Schema для Service (страницы услуг)
 */
export function createServiceSchema(
  serviceName: string,
  serviceDescription: string
): ServiceSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: serviceName,
    description: serviceDescription,
    provider: {
      '@type': 'Organization',
      name: 'М.И.Т.А.',
    },
    areaServed: {
      '@type': 'Country',
      name: 'Россия',
    },
  };
}

/**
 * Schema для Article (статьи блога)
 */
export function createArticleSchema(
  title: string,
  description: string,
  author: string,
  publishedAt: string,
  imageUrl?: string
): ArticleSchema {
  const base = getSiteBaseUrl()
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description: description,
    image: imageUrl,
    datePublished: publishedAt,
    author: {
      '@type': 'Person',
      name: author,
    },
    publisher: {
      '@type': 'Organization',
      name: 'М.И.Т.А.',
      logo: {
        '@type': 'ImageObject',
        url: `${base}/images/icons/Favicon.ico`,
      },
    },
  };
}

/**
 * Schema для CaseStudy (кейсы)
 */
export function createCaseStudySchema(
  title: string,
  description: string,
  client: string,
  publishedAt: string,
  imageUrl?: string
): CaseStudySchema {
  const base = getSiteBaseUrl()
  return {
    '@context': 'https://schema.org',
    '@type': 'CaseStudy',
    name: title,
    description: description,
    url: `${base}/cases/${title.toLowerCase().replace(/\s+/g, '-')}`,
    image: imageUrl,
    author: {
      '@type': 'Organization',
      name: 'М.И.Т.А.',
    },
    datePublished: publishedAt,
    about: {
      '@type': 'Organization',
      name: client,
    },
  };
}

/**
 * Schema для BreadcrumbList (навигационная цепочка)
 */
export function createBreadcrumbSchema(
  items: { name: string; url: string }[]
): BreadcrumbListSchema {
  const base = getSiteBaseUrl()
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${base}${item.url}`,
    })),
  };
}
