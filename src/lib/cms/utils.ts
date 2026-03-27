/**
 * CMS утилиты для работы с MDX контентом
 * Общие функции для blog, cases и других MDX файлов
 */

import fs from 'fs';
import path from 'path';
import { serialize } from 'next-mdx-remote/serialize';

/**
 * Кэш для MDX контента
 * Хранит serialized контент для ускорения повторных запросов
 */
const mdxCache = new Map<string, {
  content: unknown;
  timestamp: number;
  serialized: Awaited<ReturnType<typeof serialize>>;
}>();

/**
 * Время жизни кэша (5 минут в development, 1 час в production)
 */
const CACHE_TTL = process.env.NODE_ENV === 'development'
  ? 5 * 60 * 1000
  : 60 * 60 * 1000;

/**
 * Проверка актуальности кэша
 */
function isCacheValid(timestamp: number): boolean {
  return Date.now() - timestamp < CACHE_TTL;
}

/**
 * Очистка устаревшего кэша
 */
function cleanupCache() {
  for (const [key, value] of mdxCache.entries()) {
    if (!isCacheValid(value.timestamp)) {
      mdxCache.delete(key);
    }
  }
}

/**
 * Запуск очистки кэша каждые 10 минут
 */
if (typeof global !== 'undefined' && !(global as any).__mdxCleanupInterval) {
  (global as any).__mdxCleanupInterval = setInterval(cleanupCache, 10 * 60 * 1000);
}

/**
 * Получить serialized MDX контент с кэшированием
 */
export async function getSerializedContent(
  content: string,
  cacheKey: string
): Promise<Awaited<ReturnType<typeof serialize>>> {
  try {
    // Проверяем кэш
    const cached = mdxCache.get(cacheKey);
    if (cached && isCacheValid(cached.timestamp)) {
      return cached.serialized;
    }

    // Сериализуем контент
    const mdxSource = await serialize(content, {
      mdxOptions: {
        development: process.env.NODE_ENV === 'development',
      },
    });

    // Сохраняем в кэш
    mdxCache.set(cacheKey, {
      content,
      timestamp: Date.now(),
      serialized: mdxSource,
    });

    return mdxSource;
  } catch (error) {
    console.error('Error serializing MDX content:', error);
    throw error;
  }
}

/**
 * Извлечь frontmatter из MDX контента
 */
export function extractFrontmatter(content: string): Record<string, unknown> {
  const match = /^---\n([\s\S]*?)\n---/.exec(content);

  if (!match) {
    return {};
  }

  const frontmatter: Record<string, unknown> = {};
  const lines = match[1].split('\n');

  let currentKey = '';
  let isArray = false;
  let arrayLines: string[] = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Пропускаем пустые строки в начале
    if (!line.trim() && currentKey === '') {
      continue;
    }

    // Новая пара ключ-значение
    if (line.match(/^[\w]+:/) && !line.startsWith('  ') && !line.startsWith('-')) {
      // Сохраняем предыдущий массив
      if (isArray && currentKey && arrayLines.length > 0) {
        if (currentKey === 'stats') {
          frontmatter[currentKey] = parseStatsArray(arrayLines);
        } else {
          frontmatter[currentKey] = parseSimpleArray(arrayLines);
        }
        arrayLines = [];
      }

      const [key, ...valueParts] = line.split(':');
      currentKey = key.trim();
      const value = valueParts.join(':').trim();

      // Простое значение
      if (value && !value.startsWith('[')) {
        frontmatter[currentKey] = value.replace(/['"]/g, '');
        isArray = false;
      }
      // Массив в одну строку [item1, item2]
      else if (value.startsWith('[') && value.endsWith(']')) {
        frontmatter[currentKey] = value
          .slice(1, -1)
          .split(',')
          .map((item) => item.trim().replace(/['"]/g, ''))
          .filter(Boolean);
        isArray = false;
      }
      // Многострочный массив
      else {
        isArray = true;
        arrayLines = [];
      }
    }
    // Строки массива
    else if (isArray && line.trim()) {
      arrayLines.push(line);
    }
  }

  // Сохраняем последний массив
  if (isArray && currentKey && arrayLines.length > 0) {
    if (currentKey === 'stats') {
      frontmatter[currentKey] = parseStatsArray(arrayLines);
    } else {
      frontmatter[currentKey] = parseSimpleArray(arrayLines);
    }
  }

  return frontmatter;
}

/**
 * Удалить frontmatter из контента
 */
export function removeFrontmatter(content: string): string {
  return content.replace(/^---\n[\s\S]*?\n---\n/, '').trim();
}

/**
 * Оценить время чтения (минуты)
 */
export function estimateReadTime(content: string): number {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
}

/**
 * Распарсить YAML-like массив объектов для stats
 */
function parseStatsArray(lines: string[]): Array<Record<string, string>> {
  const stats: Array<Record<string, string>> = [];
  let currentStat: Record<string, string> = {};

  for (const line of lines) {
    const trimmedLine = line.trim();

    // Начало нового объекта stats
    if (trimmedLine.startsWith('- label:')) {
      if (Object.keys(currentStat).length > 0) {
        stats.push(currentStat);
      }
      currentStat = {
        label: trimmedLine.replace('- label:', '').trim().replace(/['"]/g, ''),
      };
    }
    // Дополнительные поля
    else if (trimmedLine.startsWith('before:') || trimmedLine.startsWith('after:') || trimmedLine.startsWith('improvement:')) {
      const [key, ...valueParts] = trimmedLine.split(':');
      if (key && valueParts.length > 0) {
        currentStat[key.trim()] = valueParts.join(':').trim().replace(/['"]/g, '');
      }
    }
  }

  // Добавляем последний объект
  if (Object.keys(currentStat).length > 0) {
    stats.push(currentStat);
  }

  return stats;
}

/**
 * Распарсить YAML-like массив для tools/challenges
 */
function parseSimpleArray(lines: string[]): string[] {
  const items: string[] = [];

  for (const line of lines) {
    const trimmedLine = line.trim();
    if (trimmedLine.startsWith('- ')) {
      items.push(trimmedLine.substring(2).trim().replace(/['"]/g, ''));
    }
  }

  return items;
}

/**
 * Получить все MDX файлы из директории
 */
export function getMdxFiles(directory: string): string[] {
  try {
    if (!fs.existsSync(directory)) {
      console.error('Directory not found:', directory);
      return [];
    }

    return fs.readdirSync(directory).filter((file) =>
      file.endsWith('.mdx')
    );
  } catch (error) {
    console.error('Error reading directory:', error);
    return [];
  }
}

/**
 * Прочитать MDX файл и извлечь frontmatter
 */
export function readMdxFile(filePath: string): { frontmatter: Record<string, unknown>; content: string } | null {
  try {
    if (!fs.existsSync(filePath)) {
      return null;
    }

    const content = fs.readFileSync(filePath, 'utf-8');
    const frontmatter = extractFrontmatter(content);
    const mainContent = removeFrontmatter(content);

    return { frontmatter, content: mainContent };
  } catch (error) {
    console.error('Error reading MDX file:', error);
    return null;
  }
}

/**
 * Отсортировать контент по дате (новые сначала)
 */
export function sortByDate<T extends { publishedAt: string }>(items: (T | null)[]): T[] {
  return items
    .filter((item): item is T => item !== null)
    .sort((a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );
}
