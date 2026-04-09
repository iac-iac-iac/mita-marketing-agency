/**
 * CMS функции для работы с блогом через SQLite
 * 
 * ⚠️ ТОЛЬКО серверные функции — не импортировать в 'use client' компоненты!
 */

import { getDb, Row } from '@/lib/db';

export interface BlogPostDB {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  category: string;
  tags: string; // JSON строка
  cover_image: string;
  status: 'draft' | 'published';
  read_time: number;
  published_at: string;
  updated_at: string;
  created_at: string;
}

export interface BlogPostInput {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author?: string;
  category?: string;
  tags?: string[];
  cover_image?: string;
  status?: 'draft' | 'published';
  read_time?: number;
}

// ============================================================================
// ЧТЕНИЕ
// ============================================================================

/**
 * Получить все опубликованные статьи (для публичных страниц)
 */
export function getPublishedPosts(): BlogPostDB[] {
  const db = getDb();
  return db.prepare(
    `SELECT * FROM blog_posts WHERE status = 'published' ORDER BY published_at DESC`
  ).all() as BlogPostDB[];
}

/**
 * Получить все статьи (включая черновики, для админки)
 */
export function getAllPosts(): BlogPostDB[] {
  const db = getDb();
  return db.prepare(
    `SELECT * FROM blog_posts ORDER BY created_at DESC`
  ).all() as BlogPostDB[];
}

/**
 * Получить статью по slug
 */
export function getPostBySlug(slug: string): BlogPostDB | null {
  const db = getDb();
  return db.prepare(
    `SELECT * FROM blog_posts WHERE slug = ?`
  ).get(slug) as BlogPostDB | undefined ?? null;
}

/**
 * Получить все slug (для generateStaticParams)
 */
export function getAllPostSlugs(): string[] {
  const db = getDb();
  const rows = db.prepare(`SELECT slug FROM blog_posts WHERE status = 'published'`).all() as Row[];
  return rows.map(r => r.slug as string);
}

/**
 * Получить статьи по категории
 */
export function getPostsByCategory(category: string): BlogPostDB[] {
  const db = getDb();
  return db.prepare(
    `SELECT * FROM blog_posts WHERE status = 'published' AND category = ? ORDER BY published_at DESC`
  ).all(category) as BlogPostDB[];
}

/**
 * Получить все уникальные категории
 */
export function getAllCategories(): string[] {
  const db = getDb();
  const rows = db.prepare(
    `SELECT DISTINCT category FROM blog_posts WHERE status = 'published' ORDER BY category`
  ).all() as Row[];
  return rows.map(r => r.category as string);
}

// ============================================================================
// ЗАПИСЬ
// ============================================================================

/**
 * Создать новую статью
 */
export function createPost(input: BlogPostInput): BlogPostDB {
  const db = getDb();
  const now = new Date().toISOString();

  const result = db.prepare(
    `INSERT INTO blog_posts (slug, title, excerpt, content, author, category, tags, cover_image, status, read_time, published_at, created_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
  ).run(
    input.slug,
    input.title,
    input.excerpt,
    input.content,
    input.author || 'М.И.Т.А.',
    input.category || 'Общее',
    JSON.stringify(input.tags || []),
    input.cover_image || '',
    input.status || 'draft',
    input.read_time || 5,
    now,
    now
  );

  return getPostById(result.lastInsertRowid as number)!;
}

/**
 * Обновить статью
 */
export function updatePost(slug: string, input: Partial<BlogPostInput>): BlogPostDB | null {
  const db = getDb();
  const existing = getPostBySlug(slug);
  if (!existing) return null;

  const updates: string[] = [];
  const values: unknown[] = [];

  if (input.title !== undefined) { updates.push('title = ?'); values.push(input.title); }
  if (input.excerpt !== undefined) { updates.push('excerpt = ?'); values.push(input.excerpt); }
  if (input.content !== undefined) { updates.push('content = ?'); values.push(input.content); }
  if (input.author !== undefined) { updates.push('author = ?'); values.push(input.author); }
  if (input.category !== undefined) { updates.push('category = ?'); values.push(input.category); }
  if (input.tags !== undefined) { updates.push('tags = ?'); values.push(JSON.stringify(input.tags)); }
  if (input.cover_image !== undefined) { updates.push('cover_image = ?'); values.push(input.cover_image); }
  if (input.status !== undefined) { updates.push('status = ?'); values.push(input.status); }
  if (input.read_time !== undefined) { updates.push('read_time = ?'); values.push(input.read_time); }

  updates.push('updated_at = ?');
  values.push(new Date().toISOString());

  values.push(slug);

  db.prepare(
    `UPDATE blog_posts SET ${updates.join(', ')} WHERE slug = ?`
  ).run(...values);

  return getPostBySlug(slug);
}

/**
 * Удалить статью
 */
export function deletePost(slug: string): boolean {
  const db = getDb();
  const result = db.prepare(
    `DELETE FROM blog_posts WHERE slug = ?`
  ).run(slug);

  return result.changes > 0;
}

// ============================================================================
// УТИЛИТЫ
// ============================================================================

function getPostById(id: number): BlogPostDB | null {
  const db = getDb();
  return db.prepare(
    `SELECT * FROM blog_posts WHERE id = ?`
  ).get(id) as BlogPostDB | undefined ?? null;
}

/**
 * Сгенерировать slug из заголовка
 */
export function generateSlug(title: string): string {
  const translitMap: Record<string, string> = {
    'а': 'a', 'б': 'b', 'в': 'v', 'г': 'g', 'д': 'd', 'е': 'e', 'ё': 'yo',
    'ж': 'zh', 'з': 'z', 'и': 'i', 'й': 'y', 'к': 'k', 'л': 'l', 'м': 'm',
    'н': 'n', 'о': 'o', 'п': 'p', 'р': 'r', 'с': 's', 'т': 't', 'у': 'u',
    'ф': 'f', 'х': 'kh', 'ц': 'ts', 'ч': 'ch', 'ш': 'sh', 'щ': 'shch',
    'ъ': '', 'ы': 'y', 'ь': '', 'э': 'e', 'ю': 'yu', 'я': 'ya',
  };

  return title
    .toLowerCase()
    .split('')
    .map(char => translitMap[char] ?? char)
    .join('')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 100);
}
