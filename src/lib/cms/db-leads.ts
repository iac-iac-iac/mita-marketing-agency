/**
 * CMS функции для работы с лидами через SQLite
 * 
 * ⚠️ ТОЛЬКО серверные функции — не импортировать в 'use client' компоненты!
 */

import { getDb } from '@/lib/db';

export interface LeadInput {
  form_name?: string;
  name: string;
  phone: string;
  email: string;
  company?: string;
  message?: string;
  service?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
}

export interface Lead {
  id: number;
  form_name: string;
  name: string;
  phone: string;
  email: string;
  company: string;
  message: string;
  service: string;
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
  utm_content: string;
  utm_term: string;
  bitrix_id: number | null;
  status: 'new' | 'contacted' | 'qualified' | 'lost' | 'won';
  created_at: string;
}

// ============================================================================
// ЗАПИСЬ
// ============================================================================

/**
 * Создать нового лида (из формы)
 */
export function createLead(input: LeadInput): Lead {
  const db = getDb();

  const result = db.prepare(
    `INSERT INTO leads (form_name, name, phone, email, company, message, service, utm_source, utm_medium, utm_campaign, utm_content, utm_term)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
  ).run(
    input.form_name || 'contact_form',
    input.name,
    input.phone,
    input.email,
    input.company || '',
    input.message || '',
    input.service || '',
    input.utm_source || '',
    input.utm_medium || '',
    input.utm_campaign || '',
    input.utm_content || '',
    input.utm_term || ''
  );

  return getLeadById(result.lastInsertRowid as number)!;
}

/**
 * Обновить статус лида (для админки)
 */
export function updateLeadStatus(id: number, status: Lead['status']): Lead | null {
  const db = getDb();

  db.prepare(
    `UPDATE leads SET status = ? WHERE id = ?`
  ).run(status, id);

  return getLeadById(id);
}

/**
 * Привязать Bitrix24 ID
 */
export function updateBitrixId(id: number, bitrixId: number): Lead | null {
  const db = getDb();

  db.prepare(
    `UPDATE leads SET bitrix_id = ? WHERE id = ?`
  ).run(bitrixId, id);

  return getLeadById(id);
}

// ============================================================================
// ЧТЕНИЕ (для админки)
// ============================================================================

/**
 * Получить все лиды
 */
export function getAllLeads(): Lead[] {
  const db = getDb();
  return db.prepare(
    `SELECT * FROM leads ORDER BY created_at DESC`
  ).all() as Lead[];
}

/**
 * Получить лиды со статусом
 */
export function getLeadsByStatus(status: Lead['status']): Lead[] {
  const db = getDb();
  return db.prepare(
    `SELECT * FROM leads WHERE status = ? ORDER BY created_at DESC`
  ).all(status) as Lead[];
}

/**
 * Получить новые лиди (для дашборда)
 */
export function getRecentLeads(limit: number = 10): Lead[] {
  const db = getDb();
  return db.prepare(
    `SELECT * FROM leads ORDER BY created_at DESC LIMIT ?`
  ).all(limit) as Lead[];
}

/**
 * Посчитать лиды по статусам
 */
export function getLeadsCountByStatus(): Record<string, number> {
  const db = getDb();
  const rows = db.prepare(
    `SELECT status, COUNT(*) as count FROM leads GROUP BY status`
  ).all() as Array<{ status: string; count: number }>;

  const result: Record<string, number> = {};
  for (const row of rows) {
    result[row.status] = row.count;
  }
  return result;
}

/**
 * Посчитать лиды за период
 */
export function getLeadsCountByDateRange(from: string, to: string): number {
  const db = getDb();
  const row = db.prepare(
    `SELECT COUNT(*) as count FROM leads WHERE created_at >= ? AND created_at <= ?`
  ).get(from, to) as { count: number };

  return row.count;
}

// ============================================================================
// УТИЛИТЫ
// ============================================================================

function getLeadById(id: number): Lead | null {
  const db = getDb();
  return db.prepare(
    `SELECT * FROM leads WHERE id = ?`
  ).get(id) as Lead | undefined ?? null;
}
