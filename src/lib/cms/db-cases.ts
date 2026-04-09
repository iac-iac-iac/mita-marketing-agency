/**
 * CMS функции для работы с кейсами через SQLite
 * 
 * ⚠️ ТОЛЬКО серверные функции — не импортировать в 'use client' компоненты!
 */

import { getDb, Row } from '@/lib/db';

export interface CaseDB {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  client: string;
  industry: string;
  cover_image: string;
  gallery: string; // JSON
  stats: string; // JSON
  tools: string; // JSON
  challenges: string; // JSON
  solutions: string; // JSON
  results: string;
  testimonial: string; // JSON
  status: 'draft' | 'published';
  published_at: string;
  updated_at: string;
  created_at: string;
}

export interface CaseInput {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  client?: string;
  industry?: string;
  cover_image?: string;
  gallery?: Array<{ url: string; caption: string }>;
  stats?: Array<{ label: string; before?: string; after: string; improvement?: string; icon?: string }>;
  tools?: string[];
  challenges?: string[];
  solutions?: string[];
  results?: string;
  testimonial?: { text: string; author: string; position: string; company: string; avatar?: string };
  status?: 'draft' | 'published';
}

// ============================================================================
// ЧТЕНИЕ
// ============================================================================

/**
 * Получить все опубликованные кейсы
 */
export function getPublishedCases(): CaseDB[] {
  const db = getDb();
  return db.prepare(
    `SELECT * FROM cases WHERE status = 'published' ORDER BY published_at DESC`
  ).all() as CaseDB[];
}

/**
 * Получить все кейсы (включая черновики)
 */
export function getAllCases(): CaseDB[] {
  const db = getDb();
  return db.prepare(
    `SELECT * FROM cases ORDER BY created_at DESC`
  ).all() as CaseDB[];
}

/**
 * Получить кейс по slug
 */
export function getCaseBySlug(slug: string): CaseDB | null {
  const db = getDb();
  return db.prepare(
    `SELECT * FROM cases WHERE slug = ?`
  ).get(slug) as CaseDB | undefined ?? null;
}

/**
 * Получить все slug (для generateStaticParams)
 */
export function getAllCaseSlugs(): string[] {
  const db = getDb();
  const rows = db.prepare(`SELECT slug FROM cases WHERE status = 'published'`).all() as Row[];
  return rows.map(r => r.slug as string);
}

/**
 * Получить кейсы по индустрии
 */
export function getCasesByIndustry(industry: string): CaseDB[] {
  const db = getDb();
  return db.prepare(
    `SELECT * FROM cases WHERE status = 'published' AND industry = ? ORDER BY published_at DESC`
  ).all(industry) as CaseDB[];
}

// ============================================================================
// ЗАПИСЬ
// ============================================================================

/**
 * Создать новый кейс
 */
export function createCase(input: CaseInput): CaseDB {
  const db = getDb();
  const now = new Date().toISOString();

  const result = db.prepare(
    `INSERT INTO cases (slug, title, excerpt, content, client, industry, cover_image, gallery, stats, tools, challenges, solutions, results, testimonial, status, published_at, created_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
  ).run(
    input.slug,
    input.title,
    input.excerpt,
    input.content,
    input.client || '',
    input.industry || '',
    input.cover_image || '',
    JSON.stringify(input.gallery || []),
    JSON.stringify(input.stats || []),
    JSON.stringify(input.tools || []),
    JSON.stringify(input.challenges || []),
    JSON.stringify(input.solutions || []),
    input.results || '',
    JSON.stringify(input.testimonial || {}),
    input.status || 'draft',
    now,
    now
  );

  return getCaseById(result.lastInsertRowid as number)!;
}

/**
 * Обновить кейс
 */
export function updateCase(slug: string, input: Partial<CaseInput>): CaseDB | null {
  const db = getDb();
  const existing = getCaseBySlug(slug);
  if (!existing) return null;

  const updates: string[] = [];
  const values: unknown[] = [];

  if (input.title !== undefined) { updates.push('title = ?'); values.push(input.title); }
  if (input.excerpt !== undefined) { updates.push('excerpt = ?'); values.push(input.excerpt); }
  if (input.content !== undefined) { updates.push('content = ?'); values.push(input.content); }
  if (input.client !== undefined) { updates.push('client = ?'); values.push(input.client); }
  if (input.industry !== undefined) { updates.push('industry = ?'); values.push(input.industry); }
  if (input.cover_image !== undefined) { updates.push('cover_image = ?'); values.push(input.cover_image); }
  if (input.gallery !== undefined) { updates.push('gallery = ?'); values.push(JSON.stringify(input.gallery)); }
  if (input.stats !== undefined) { updates.push('stats = ?'); values.push(JSON.stringify(input.stats)); }
  if (input.tools !== undefined) { updates.push('tools = ?'); values.push(JSON.stringify(input.tools)); }
  if (input.challenges !== undefined) { updates.push('challenges = ?'); values.push(JSON.stringify(input.challenges)); }
  if (input.solutions !== undefined) { updates.push('solutions = ?'); values.push(JSON.stringify(input.solutions)); }
  if (input.results !== undefined) { updates.push('results = ?'); values.push(input.results); }
  if (input.testimonial !== undefined) { updates.push('testimonial = ?'); values.push(JSON.stringify(input.testimonial)); }
  if (input.status !== undefined) { updates.push('status = ?'); values.push(input.status); }

  updates.push('updated_at = ?');
  values.push(new Date().toISOString());

  values.push(slug);

  db.prepare(
    `UPDATE cases SET ${updates.join(', ')} WHERE slug = ?`
  ).run(...values);

  return getCaseBySlug(slug);
}

/**
 * Удалить кейс
 */
export function deleteCase(slug: string): boolean {
  const db = getDb();
  const result = db.prepare(
    `DELETE FROM cases WHERE slug = ?`
  ).run(slug);

  return result.changes > 0;
}

// ============================================================================
// УТИЛИТЫ
// ============================================================================

function getCaseById(id: number): CaseDB | null {
  const db = getDb();
  return db.prepare(
    `SELECT * FROM cases WHERE id = ?`
  ).get(id) as CaseDB | undefined ?? null;
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
