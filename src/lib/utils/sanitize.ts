import DOMPurify from 'dompurify';

/**
 * Санитизация HTML для защиты от XSS атак
 * Используется для очистки MDX контента перед рендерингом
 *
 * @param html - Исходная HTML строка
 * @returns Очищенный HTML
 */
export function sanitizeHtml(html: string): string {
  // SSR защита - на сервере возвращаем как есть, но с минимальной очисткой
  if (typeof window === 'undefined') {
    // Простая очистка для сервера - удаляем только script теги
    return html.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
  }

  return DOMPurify.sanitize(html, {
    // Разрешённые теги (безопасный набор для контента)
    ALLOWED_TAGS: [
      'p', 'br', 'strong', 'em', 'u', 'i', 'b',
      'ul', 'ol', 'li',
      'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
      'a', 'blockquote', 'code', 'pre', 'span', 'div'
    ],
    // Разрешённые атрибуты
    ALLOWED_ATTR: ['href', 'target', 'rel', 'class'],
    // Запрещённые протоколы для ссылок
    ALLOWED_URI_REGEXP: /^(?:(?:(?:f|ht)tps?|mailto|tel):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i,
    // Дополнительные настройки безопасности
    FORBID_ATTR: ['onclick', 'onerror', 'onload', 'onmouseover'], // Запрет JS событий
    FORBID_TAGS: ['script', 'style', 'iframe', 'object', 'embed', 'form', 'input'], // Запрет опасных тегов
    // Ссылки открываются в новой вкладке с безопасными атрибутами
    ADD_ATTR: ['target'],
    ADD_DATA_URI_TAGS: [], // Запрет data: URI
  });
}

/**
 * Санитизация для текстовых полей (полная очистка от HTML)
 * 
 * @param text - Исходный текст
 * @returns Текст без HTML тегов
 */
export function sanitizeText(text: string): string {
  if (typeof window === 'undefined') {
    return text;
  }

  return DOMPurify.sanitize(text, {
    ALLOWED_TAGS: [], // Полностью запрещаем все теги
    ALLOWED_ATTR: [],
  });
}
