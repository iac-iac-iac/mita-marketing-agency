/**
 * Утилиты для работы с localStorage (CMS)
 * Хранение записей блога и кейсов
 */

// ============================================================================
// БЛОГ
// ============================================================================

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  publishedAt: string;
  updatedAt?: string;
  category: string;
  tags: string[]; // Массив тегов (соответствует types/content.ts)
  coverImage: string;
  status: 'draft' | 'published';
}

/**
 * Получить все записи блога из localStorage
 */
export function getAllBlogPostsFromStorage(): BlogPost[] {
  if (typeof window === 'undefined') return [];
  const data = localStorage.getItem('cms_blog_posts');
  return data ? JSON.parse(data) : [];
}

/**
 * Получить запись по slug из localStorage
 */
export function getBlogPostBySlugFromStorage(slug: string): BlogPost | null {
  const posts = getAllBlogPostsFromStorage();
  return posts.find(p => p.slug === slug) || null;
}

/**
 * Сохранить запись блога (создание или обновление)
 */
export function saveBlogPost(post: BlogPost): void {
  const posts = getAllBlogPostsFromStorage();
  const index = posts.findIndex(p => p.slug === post.slug);

  if (index >= 0) {
    // Обновление
    posts[index] = { ...post, updatedAt: new Date().toISOString() };
  } else {
    // Создание
    posts.push(post);
  }

  localStorage.setItem('cms_blog_posts', JSON.stringify(posts));
}

/**
 * Удалить запись блога по slug
 */
export function deleteBlogPost(slug: string): void {
  const posts = getAllBlogPostsFromStorage();
  const filtered = posts.filter(p => p.slug !== slug);
  localStorage.setItem('cms_blog_posts', JSON.stringify(filtered));
}

// ============================================================================
// КЕЙСЫ
// ============================================================================

export interface Case {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  client: string;
  industry: string;
  publishedAt: string;
  updatedAt?: string;
  coverImage: string;
  gallery?: string[];
  stats?: { label: string; value: string }[];
  status: 'draft' | 'published';
}

/**
 * Получить все кейсы из localStorage
 */
export function getAllCasesFromStorage(): Case[] {
  if (typeof window === 'undefined') return [];
  const data = localStorage.getItem('cms_cases');
  return data ? JSON.parse(data) : [];
}

/**
 * Получить кейс по slug из localStorage
 */
export function getCaseBySlugFromStorage(slug: string): Case | null {
  const cases = getAllCasesFromStorage();
  return cases.find(c => c.slug === slug) || null;
}

/**
 * Сохранить кейс (создание или обновление)
 */
export function saveCase(caseItem: Case): void {
  const cases = getAllCasesFromStorage();
  const index = cases.findIndex(c => c.slug === caseItem.slug);

  if (index >= 0) {
    // Обновление
    cases[index] = { ...caseItem, updatedAt: new Date().toISOString() };
  } else {
    // Создание
    cases.push(caseItem);
  }

  localStorage.setItem('cms_cases', JSON.stringify(cases));
}

/**
 * Удалить кейс по slug
 */
export function deleteCase(slug: string): void {
  const cases = getAllCasesFromStorage();
  const filtered = cases.filter(c => c.slug !== slug);
  localStorage.setItem('cms_cases', JSON.stringify(filtered));
}

// ============================================================================
// ГЕНЕРАЦИЯ SLUG
// ============================================================================

/**
 * Сгенерировать slug из заголовка
 */
export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9а-яё\s-]/gi, '')
    .replace(/\s+/g, '-')
    .replace(/ё/g, 'е')
    .replace(/[^a-z0-9а-яё-]/g, '')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}
