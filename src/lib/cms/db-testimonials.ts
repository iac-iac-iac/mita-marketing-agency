/**
 * CMS функции для работы с отзывами через SQLite
 */

import { getDb, Row } from '@/lib/db';

export interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  quote: string;
  avatar: string;
  category: string;
  sort_order: number;
}

export interface TestimonialInput {
  name: string;
  role: string;
  company: string;
  quote: string;
  avatar?: string;
  category?: string;
  sort_order?: number;
}

// ============================================================================
// ЧТЕНИЕ
// ============================================================================

export function getAllTestimonials(category?: string): Testimonial[] {
  const db = getDb();
  if (category) {
    return db.prepare(
      `SELECT * FROM testimonials WHERE category = ? ORDER BY sort_order ASC, created_at DESC`
    ).all(category) as Testimonial[];
  }
  return db.prepare(
    `SELECT * FROM testimonials ORDER BY sort_order ASC, created_at DESC`
  ).all() as Testimonial[];
}

export function getTestimonialById(id: number): Testimonial | null {
  const db = getDb();
  return db.prepare(
    `SELECT * FROM testimonials WHERE id = ?`
  ).get(id) as Testimonial | undefined ?? null;
}

// ============================================================================
// ЗАПИСЬ
// ============================================================================

export function createTestimonial(input: TestimonialInput): Testimonial {
  const db = getDb();

  const result = db.prepare(
    `INSERT INTO testimonials (name, role, company, quote, avatar, category, sort_order)
     VALUES (?, ?, ?, ?, ?, ?, ?)`
  ).run(
    input.name,
    input.role,
    input.company,
    input.quote,
    input.avatar || '',
    input.category || '',
    input.sort_order ?? 0
  );

  return getTestimonialById(result.lastInsertRowid as number)!;
}

export function updateTestimonial(id: number, input: Partial<TestimonialInput>): Testimonial | null {
  const db = getDb();
  const existing = getTestimonialById(id);
  if (!existing) return null;

  const updates: string[] = [];
  const values: unknown[] = [];

  if (input.name !== undefined) { updates.push('name = ?'); values.push(input.name); }
  if (input.role !== undefined) { updates.push('role = ?'); values.push(input.role); }
  if (input.company !== undefined) { updates.push('company = ?'); values.push(input.company); }
  if (input.quote !== undefined) { updates.push('quote = ?'); values.push(input.quote); }
  if (input.avatar !== undefined) { updates.push('avatar = ?'); values.push(input.avatar); }
  if (input.category !== undefined) { updates.push('category = ?'); values.push(input.category); }
  if (input.sort_order !== undefined) { updates.push('sort_order = ?'); values.push(input.sort_order); }

  values.push(id);

  db.prepare(
    `UPDATE testimonials SET ${updates.join(', ')} WHERE id = ?`
  ).run(...values);

  return getTestimonialById(id);
}

export function deleteTestimonial(id: number): boolean {
  const db = getDb();
  const result = db.prepare(
    `DELETE FROM testimonials WHERE id = ?`
  ).run(id);

  return result.changes > 0;
}
