// Скрипт для создания тестовых статей в блоге
// Выполните в консоли браузера (F12 → Console)

// Тестовая статья 1
const testPost1 = {
  slug: 'test-markdown',
  title: 'Тест Markdown Форматирования',
  excerpt: 'Проверка работы Markdown в статьях',
  content: `# Заголовок 1

## Заголовок 2

### Заголовок 3

Это **жирный текст** и *курсив*.

### Списки:

**Маркированный:**
- Пункт 1
- Пункт 2
- Пункт 3

**Нумерованный:**
1. Первый
2. Второй
3. Третий

### Цитата:

> Это важная цитата которая должна выделиться слева границей

### Код:

Inline код: \`const x = 10\`

Блок кода:

\`\`\`javascript
function hello() {
  console.log('Hello World!');
}
\`\`\`

### Ссылка:

[Google](https://google.com)

---

**Конец теста!**
`,
  author: 'Тестовый Автор',
  publishedAt: new Date().toISOString(),
  category: 'Тестирование',
  tags: 'тест, markdown, проверка',
  coverImage: '',
  status: 'published',
};

// Тестовая статья 2
const testPost2 = {
  slug: 'kak-rabotaet-cms',
  title: 'Как работает наша CMS',
  excerpt: 'Простое объяснение работы системы управления контентом',
  content: `# Как работает CMS

Наша CMS использует **localStorage** для хранения данных.

## Преимущества

1. **Быстро** — данные хранятся в браузере
2. **Просто** — не нужна база данных
3. **Удобно** — работает без сервера

## Структура данных

\`\`\`javascript
{
  slug: 'statya',
  title: 'Заголовок',
  content: 'Текст',
  status: 'published'
}
\`\`\`

> Важно: localStorage очищается при очистке кэша браузера!

## Заключение

CMS готова к использованию! 🎉
`,
  author: 'Админ',
  publishedAt: new Date().toISOString(),
  category: 'Общее',
  tags: 'cms, localStorage, инструкция',
  coverImage: '',
  status: 'published',
};

// Сохраняем в localStorage
const posts = [testPost1, testPost2];
localStorage.setItem('cms_blog_posts', JSON.stringify(posts));

console.log('✅ Тестовые статьи созданы!');
console.log('📰 Статья 1: /blog/test-markdown');
console.log('📰 Статья 2: /blog/kak-rabotaet-cms');
console.log('🔄 Обновите страницу /blog чтобы увидеть');
