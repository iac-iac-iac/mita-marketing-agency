/**
 * Скрипт инициализации базы данных
 * Запуск: npx tsx src/lib/db/init.ts
 * 
 * Создаёт БД, применяет схему, выводит информацию о таблицах.
 */

import { join } from 'path';
import { readFileSync, existsSync } from 'fs';
import Database from 'better-sqlite3';

const DB_PATH = process.env.DATABASE_PATH ?? join(process.cwd(), 'data', 'mita.db');
const SCHEMA_PATH = join(process.cwd(), 'src', 'lib', 'db', 'schema.sql');

console.log('\n🗄️  Инициализация базы данных М.И.Т.А.\n');
console.log(`📁 Путь к БД: ${DB_PATH}`);
console.log(`📄 Схема: ${SCHEMA_PATH}\n`);

// Проверяем существование схемы
if (!existsSync(SCHEMA_PATH)) {
  console.error(`❌ Файл схемы не найден: ${SCHEMA_PATH}`);
  process.exit(1);
}

// Создаём БД
const db = new Database(DB_PATH);

// Включаем WAL и foreign keys
db.pragma('journal_mode = WAL');
db.pragma('foreign_keys = ON');

// Применяем схему
const schema = readFileSync(SCHEMA_PATH, 'utf-8');
db.exec(schema);

console.log('✅ Схема применена успешно\n');

// Выводим информацию о таблицах
const tables = db.prepare("SELECT name FROM sqlite_master WHERE type='table' ORDER BY name").all();

console.log('📊 Таблицы в базе данных:\n');

for (const table of tables) {
  const tableName = (table as { name: string }).name;
  const columns = db.prepare(`PRAGMA table_info(${tableName})`).all() as Array<{ name: string; type: string; pk: number }>;
  const count = db.prepare(`SELECT COUNT(*) as cnt FROM ${tableName}`).get() as { cnt: number };

  console.log(`  ┌─ ${tableName} (${columns.length} колонок, ${count.cnt} записей)`);

  for (const col of columns) {
    const pk = col.pk ? ' 🔑' : '';
    console.log(`  │  ${col.name} — ${col.type}${pk}`);
  }

  console.log('  └─\n');
}

// Индексы
const indexes = db.prepare("SELECT name, tbl_name FROM sqlite_master WHERE type='index' AND name NOT LIKE 'sqlite_%' ORDER BY tbl_name").all() as Array<{ name: string; tbl_name: string }>;

if (indexes.length > 0) {
  console.log('📈 Индексы:\n');
  for (const idx of indexes) {
    console.log(`  ${idx.name} → ${idx.tbl_name}`);
  }
  console.log('');
}

db.close();

console.log('🎉 База данных готова к работе!\n');
console.log('💡 Для удаления и пересоздания: удалите файл .db и запустите скрипт снова.\n');
