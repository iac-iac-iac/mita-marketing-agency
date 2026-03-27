/**
 * Schema.org микроразметка для Direct-line
 * JSON-LD формат для SEO оптимизации
 */

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
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Direct-line',
    url: 'https://direct-line.ru',
    logo: 'https://direct-line.ru/images/icons/Favicon.ico',
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
        telephone: '+7 (XXX) XXX-XX-XX',
        contactType: 'customer service',
      },
    ],
    sameAs: [
      'https://vk.com/directline',
      'https://t.me/directline',
    ],
  };
}

/**
 * Schema для LocalBusiness (страница контактов)
 */
export function createLocalBusinessSchema(): LocalBusinessSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Direct-line',
    image: 'https://direct-line.ru/images/hero-banner/Hero-banner_main_link.png',
    url: 'https://direct-line.ru',
    telephone: '+7 (XXX) XXX-XX-XX',
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
      name: 'Direct-line',
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
      name: 'Direct-line',
      logo: {
        '@type': 'ImageObject',
        url: 'https://direct-line.ru/images/icons/Favicon.ico',
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
  return {
    '@context': 'https://schema.org',
    '@type': 'CaseStudy',
    name: title,
    description: description,
    url: `https://direct-line.ru/cases/${title.toLowerCase().replace(/\s+/g, '-')}`,
    image: imageUrl,
    author: {
      '@type': 'Organization',
      name: 'Direct-line',
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
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `https://direct-line.ru${item.url}`,
    })),
  };
}
