/**
 * Прокси для исходящих запросов (Telegram и др.)
 * ⚠️ Только сервер — не импортировать в 'use client'.
 */

import { getDb } from '@/lib/db';

export interface ProxyRow {
  id: number;
  name: string;
  url: string;
  is_enabled: number;
  priority: number;
  last_check_at: string | null;
  last_check_ok: number | null;
  last_check_error: string;
  created_at: string;
}

export interface ProxyInput {
  name: string;
  url: string;
  is_enabled?: boolean;
  priority?: number;
}

export function getAllProxies(): ProxyRow[] {
  const db = getDb();
  return db
    .prepare(`SELECT * FROM proxies ORDER BY priority DESC, id ASC`)
    .all() as ProxyRow[];
}

export function getEnabledProxies(): ProxyRow[] {
  const db = getDb();
  return db
    .prepare(
      `SELECT * FROM proxies WHERE is_enabled = 1 ORDER BY priority DESC, id ASC`
    )
    .all() as ProxyRow[];
}

export function getProxyById(id: number): ProxyRow | null {
  const db = getDb();
  const row = db.prepare(`SELECT * FROM proxies WHERE id = ?`).get(id) as
    | ProxyRow
    | undefined;
  return row ?? null;
}

export function createProxy(input: ProxyInput): ProxyRow {
  const db = getDb();
  const result = db
    .prepare(
      `INSERT INTO proxies (name, url, is_enabled, priority)
       VALUES (?, ?, ?, ?)`
    )
    .run(
      input.name.trim(),
      input.url.trim(),
      input.is_enabled === false ? 0 : 1,
      input.priority ?? 0
    );
  return getProxyById(result.lastInsertRowid as number)!;
}

export function updateProxy(id: number, input: ProxyInput): ProxyRow | null {
  const db = getDb();
  db.prepare(
    `UPDATE proxies SET name = ?, url = ?, is_enabled = ?, priority = ? WHERE id = ?`
  ).run(
    input.name.trim(),
    input.url.trim(),
    input.is_enabled === false ? 0 : 1,
    input.priority ?? 0,
    id
  );
  return getProxyById(id);
}

export function deleteProxy(id: number): void {
  const db = getDb();
  db.prepare(`DELETE FROM proxies WHERE id = ?`).run(id);
}

export function recordProxyCheck(
  id: number,
  ok: boolean,
  errorMessage = ''
): void {
  const db = getDb();
  db.prepare(
    `UPDATE proxies SET last_check_at = datetime('now'), last_check_ok = ?, last_check_error = ? WHERE id = ?`
  ).run(ok ? 1 : 0, errorMessage.slice(0, 500), id);
}
