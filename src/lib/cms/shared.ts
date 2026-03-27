/**
 * Общие CMS функции для blog и cases
 */

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
 * Извлечь frontmatter из MDX контента
 */
export function extractFrontmatter(content: string): Record<string, string | string[] | Array<Record<string, string>>> {
  const match = /^---\n([\s\S]*?)\n---/.exec(content);

  if (!match) {
    return {};
  }

  const frontmatter: Record<string, string | string[] | Array<Record<string, string>>> = {};
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
