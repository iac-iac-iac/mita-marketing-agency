/**
 * Санитизация HTML для защиты от XSS атак
 * Используется для очистки MDX контента перед рендерингом
 *
 * Для client-side использует DOMPurify, для server-side — isomorphic подход.
 *
 * @param html - Исходная HTML строка
 * @returns Очищенный HTML
 */
export function sanitizeHtml(html: string): string {
  // SSR защита — на сервере используем более строгую очистку
  if (typeof window === 'undefined') {
    let sanitized = html;
    sanitized = sanitized.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
    sanitized = sanitized.replace(/\s*on\w+="[^"]*"/gi, '');
    sanitized = sanitized.replace(/\s*on\w+='[^']*'/gi, '');
    sanitized = sanitized.replace(/href=["']javascript:[^"']*["']/gi, '');
    sanitized = sanitized.replace(/<(iframe|object|embed|form|input)\b[^>]*>/gi, '');
    sanitized = sanitized.replace(/<\/(iframe|object|embed|form|input)>/gi, '');
    return sanitized;
  }

  // На клиенте — используем динамический импорт
  // Эта функция теперь async для клиентской санитизации
  throw new Error(
    'sanitizeHtml is server-only. Use sanitizeHtmlAsync for client-side sanitization.'
  );
}

/**
 * Асинхронная санитизация для клиентского использования
 */
export async function sanitizeHtmlAsync(html: string): Promise<string> {
  if (typeof window === 'undefined') {
    return sanitizeHtml(html);
  }

  const { default: DOMPurify } = await import('dompurify');
  return DOMPurify.sanitize(html, {
    ALLOWED_TAGS: [
      'p', 'br', 'strong', 'em', 'u', 'i', 'b',
      'ul', 'ol', 'li',
      'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
      'a', 'blockquote', 'code', 'pre', 'span', 'div', 'img',
    ],
    ALLOWED_ATTR: ['href', 'target', 'rel', 'class', 'src', 'alt', 'width', 'height'],
    ALLOWED_URI_REGEXP: /^(?:(?:(?:f|ht)tps?|mailto|tel):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i,
    FORBID_ATTR: ['onclick', 'onerror', 'onload', 'onmouseover'],
    FORBID_TAGS: ['script', 'style', 'iframe', 'object', 'embed', 'form', 'input'],
    ADD_ATTR: ['target'],
  });
}

/**
 * Санитизация для текстовых полей (полная очистка от HTML)
 */
export function sanitizeText(text: string): string {
  if (typeof window === 'undefined') {
    return text.replace(/<[^>]*>/g, '');
  }

  // На клиенте удаляем все HTML теги
  return text.replace(/<[^>]*>/g, '');
}
