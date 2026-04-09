/**
 * SQLite база данных для CMS М.И.Т.А.
 * 
 * better-sqlite3 — синхронный драйвер, работает только на сервере.
 * НИКОГДА не импортировать в клиентские компоненты ('use client').
 */

import Database from 'better-sqlite3';
import { join } from 'path';
import { mkdirSync, existsSync, readFileSync } from 'fs';

// Путь к файлу БД
const DB_PATH = process.env.DATABASE_PATH ?? join(process.cwd(), 'data', 'mita.db');
const SCHEMA_PATH = join(process.cwd(), 'src', 'lib', 'db', 'schema.sql');

// Singleton — один экземпляр на весь процесс
let db: Database.Database | null = null;

/**
 * Получить экземпляр базы данных (singleton)
 */
export function getDb(): Database.Database {
  if (!db) {
    // Гарантируем существование директории
    const dbDir = join(DB_PATH, '..');
    if (!existsSync(dbDir)) {
      mkdirSync(dbDir, { recursive: true });
    }

    db = new Database(DB_PATH);

    // Включаем foreign keys и WAL режим
    db.pragma('journal_mode = WAL');
    db.pragma('foreign_keys = ON');

    // Инициализируем схему
    initSchema(db);
  }

  return db;
}

/**
 * Инициализация схемы БД
 */
function initSchema(database: Database.Database): void {
  if (existsSync(SCHEMA_PATH)) {
    const schema = readFileSync(SCHEMA_PATH, 'utf-8');
    database.exec(schema);
  } else {
    console.warn(`[DB] Schema file not found at ${SCHEMA_PATH}`);
  }
}

/**
 * Закрыть соединение с БД (для graceful shutdown)
 */
export function closeDb(): void {
  if (db) {
    db.close();
    db = null;
  }
}

// Типы для RowData
export type Row = Record<string, unknown>;
export type RowArray = Row[];
