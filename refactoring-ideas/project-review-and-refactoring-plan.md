# М.И.Т.А. Project Review & Refactoring Plan

**Дата анализа:** 27 марта 2026  
**Аналитик:** AI Code Reviewer  
**Статус проекта:** Production-ready (март 2026)

---

## Executive Summary

### Общее состояние проекта

Проект **М.И.Т.А.** — это современный сайт маркетингового IT-агентства на Next.js 14 с TypeScript, Tailwind CSS и Framer Motion. Проект находится в production-ready состоянии с работающим функционалом.

**Положительные аспекты:**
- ✅ Чёткая структура проекта с правильным разделением на слои
- ✅ Использование TypeScript со строгой типизацией
- ✅ Наличие Zod валидации для API endpoints
- ✅ Реализована CSRF защита и rate limiting
- ✅ XSS защита через DOMPurify
- ✅ Тесты для компонентов (13 test файлов)
- ✅ MDX для управления контентом
- ✅ SEO оптимизация (sitemap, metadata, robots.txt)
- ✅ 3D Glass Design система с анимациями

**Критические проблемы:**
- 🔴 **174 test файла в node_modules** — могут замедлять CI/CD
- 🔴 **Пустые директории** (`home-light-test`, `echo`, `temp`, `leads`) — технический мусор
- 🔴 **In-memory rate limiter** — не работает в production с несколькими инстансами
- 🔴 **Жёстко закодированные ID счётчиков аналитики** (98765432)
- 🔴 **Отсутствует .env.local** в .gitignore (только .env*.local)

**Проблемы архитектуры:**
- 🟡 Дублирование кода в CMS функциях (blog.ts / cases.ts)
- 🟡 Отсутствие кэширования для MDX контента
- 🟡 Нет обработки ошибок для missing изображений
- 🟡 ContactForm не получает UTM метки из useUTM хука
- 🟡 Тесты используют jest, но нет конфигурации jest

**Проблемы безопасности:**
- 🟡 Bitrix24 webhook URL не валидируется перед использованием
- 🟡 Нет HTTPS enforcement в next.config.js
- 🟡 Отсутствует Content Security Policy заголовки

---

## 1. Backend Analysis

### 1.1 API Endpoints

**Файл:** `src/app/api/submit-lead/route.ts`

#### ✅ Хорошо реализовано:
- Zod схема валидации с подробными сообщениями об ошибках
- Rate limiting (10 запросов/минуту на IP)
- CSRF защита через проверку Origin заголовка
- Валидация формата телефона, email, имени
- Логирование в development режиме
- Сохранение лидов в файлы (dev)
- Интеграция с Bitrix24 webhook

#### ❌ Проблемы:

**1. In-memory rate limiter (КРИТИЧНО)**
```typescript
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();
```
**Проблема:** При деплое на Vercel/другую платформу с несколькими инстансами rate limiting не будет работать корректно — каждый инстанс будет иметь свой store.

**Решение:** Использовать Redis или Vercel KV для распределённого rate limiting.

**2. Отсутствие валидации Bitrix24 webhook URL**
```typescript
if (process.env.BITRIX24_WEBHOOK_URL) {
  const response = await fetch(process.env.BITRIX24_WEBHOOK_URL, ...);
}
```
**Проблема:** Нет проверки, что URL начинается с `https://` и принадлежит Bitrix24.

**Решение:** Добавить валидацию URL перед отправкой.

**3. Жёстко закодированный ID счётчика аналитики**
```typescript
window.ym(98765432, 'reachGoal', event.type, event);
```
**Проблема:** ID должен браться из `.env.local`.

**Решение:** Использовать `process.env.NEXT_PUBLIC_YANDEX_METRIKA_ID`.

**4. Отсутствие retry logic для Bitrix24**
**Проблема:** Если Bitrix24 временно недоступен, лид будет потерян.

**Решение:** Добавить retry с exponential backoff или очередь.

**5. Нет экспоненциальной задержки при rate limit**
```typescript
headers: {
  'Retry-After': String(Math.ceil(RATE_LIMIT_WINDOW_MS / 1000)),
}
```
**Проблема:** Заголовок есть, но нет информации в ответе для клиента.

**Решение:** Добавить JSON поле `retryAfter` в ответ 429.

### 1.2 Интеграции

#### Bitrix24 Webhook
**Статус:** ⚠️ Частично реализовано

**Проблемы:**
- Нет проверки ответа от Bitrix24 (только `!response.ok`)
- Нет обработки timeout (fetch может висеть бесконечно)
- Нет логирования успешных отправок в production
- Отсутствует очередь на случай недоступности API

**Рекомендации:**
```typescript
const controller = new AbortController();
const timeoutId = setTimeout(() => controller.abort(), 5000);

const response = await fetch(process.env.BITRIX24_WEBHOOK_URL, {
  method: 'POST',
  signal: controller.signal,
  // ...
});
clearTimeout(timeoutId);
```

#### Аналитика (Yandex Metrica / Google Analytics)
**Статус:** ⚠️ Частично реализовано

**Проблемы:**
- ID счётчика захардкожен (`98765432`)
- Нет проверки инициализации счётчиков перед отправкой событий
- Отсутствует типизация для `window.ym` и `window.gtag`

**Файл:** `src/lib/analytics/track.ts`

```typescript
// Сейчас:
window.ym(98765432, 'reachGoal', event.type, event);

// Должно быть:
const yandexId = process.env.NEXT_PUBLIC_YANDEX_METRIKA_ID;
if (yandexId && window.ym) {
  window.ym(yandexId, 'reachGoal', event.type, event);
}
```

#### Формы
**Статус:** ✅ Хорошо реализовано

**Положительно:**
- React Hook Form с Zod валидацией
- Обработка состояний (submitting, success, error)
- Аналитика событий форм
- Сброс формы после успешной отправки

**Проблемы:**
- ContactForm не использует `useUTM` хук для автоматического заполнения UTM меток
- Скрытые поля заполняются вручную вместо использования хука

### 1.3 Безопасность

#### ✅ Реализовано:
- CSRF защита через проверку Origin
- Rate limiting (in-memory)
- XSS защита через DOMPurify
- Валидация входных данных через Zod
- Sanitization для HTML контента

#### ❌ Проблемы:

**1. Отсутствие HTTPS enforcement**
**Файл:** `next.config.js`
```javascript
const nextConfig = {
  // Нет HTTPS redirect
  // Нет security headers
}
```

**Решение:**
```javascript
const nextConfig = {
  headers: async () => [
    {
      source: '/:path*',
      headers: [
        { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
        { key: 'X-Content-Type-Options', value: 'nosniff' },
        { key: 'X-Frame-Options', value: 'DENY' },
        { key: 'X-XSS-Protection', value: '1; mode=block' },
        { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
        { key: 'Content-Security-Policy', value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://mc.yandex.ru https://www.googletagmanager.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; connect-src 'self' https://api.bitrix24.ru" },
      ],
    },
  ],
}
```

**2. Нет валидации webhook URL**
```typescript
if (process.env.BITRIX24_WEBHOOK_URL) {
  // Может быть любой URL, включая http://
}
```

**Решение:**
```typescript
function isValidBitrix24Webhook(url: string): boolean {
  try {
    const parsed = new URL(url);
    return (
      parsed.protocol === 'https:' &&
      parsed.hostname.endsWith('.bitrix24.ru') ||
      parsed.hostname.endsWith('.bitrix24.com')
    );
  } catch {
    return false;
  }
}
```

**3. In-memory rate limiter не работает в production**
**Решение:** Использовать Redis или Vercel KV.

**4. Отсутствует защита от enumeration attacks**
**Проблема:** По разному времени ответа можно определить, существует ли email в Bitrix24.

**Решение:** Добавить искусственную задержку для всех ответов.

---

## 2. Frontend Analysis

### 2.1 Компоненты

**Общее количество:** 60+ компонентов

#### ✅ Архитектурные преимущества:
- Чёткое разделение по папкам (`layout`, `blocks`, `ui`, `forms`, `blog`, `cases`)
- Переиспользуемые UI компоненты (`Button`, `Counter`, `CtaButton`)
- Композиция компонентов (Hero → CtaButton)
- TypeScript типизация props

#### ❌ Проблемы:

**1. Дублирование кода в Header и MainHeader**
**Файлы:** `src/components/layout/Header.tsx`, `src/components/layout/MainHeader.tsx`

**Проблема:** Оба компонента содержат схожую логику навигации и мобильного меню.

**Решение:** Создать базовый `Navigation` компонент.

**2. Большие компоненты страниц**
**Файл:** `src/app/page.tsx` (300+ строк)

**Проблема:** Главная страница содержит всю логику отображения, трудно тестировать.

**Решение:** Вынести секции в отдельные компоненты (`HomePageContent.tsx`).

**3. Отсутствие Storybook**
**Проблема:** Нет изолированной разработки и документации компонентов.

**Решение:** Добавить Storybook для UI компонентов.

**4. Жёстко закодированные данные в страницах**
**Файл:** `src/app/page.tsx`
```typescript
items={[
  {
    name: 'Алексей Петров',
    role: 'Коммерческий директор',
    company: 'Автосалон «АвтоПремиум»',
    quote: '...',
  },
]}
```

**Решение:** Вынести в MDX контент или CMS.

### 2.2 Состояние и хуки

#### ✅ Реализовано:
- `useUTM` — получение UTM меток из URL
- `useScrollReveal` — анимация появления при скролле
- React Hook Form для форм
- Local state для UI состояний

#### ❌ Проблемы:

**1. useUTM не используется в ContactForm**
**Файл:** `src/components/forms/ContactForm.tsx`

```typescript
// Сейчас:
<input type="hidden" {...register('utm_source')} defaultValue="" />

// Должно быть:
const utm = useUTM();
// ...
<input type="hidden" {...register('utm_source')} value={utm.utm_source} />
```

**2. Отсутствие глобального состояния**
**Проблема:** При масштабировании (добавлении корзины, личного кабинета) потребуется Context или Zustand.

**Решение:** Добавить Zustand или React Context для глобального состояния.

**3. Нет мемоизации для тяжёлых вычислений**
**Проблема:** Counter анимация и scroll reveal могут вызывать перерисовки.

**Решение:** Использовать `useMemo` и `useCallback`.

### 2.3 Производительность

#### ✅ Реализовано:
- Code splitting на уровне страниц (Next.js)
- Lazy loading для изображений (Next.js Image)
- Минификация CSS/JS (Next.js build)
- Tree shaking

#### ❌ Проблемы:

**1. Отсутствие кэширования для MDX**
**Файлы:** `src/lib/cms/blog.ts`, `src/lib/cms/cases.ts`

```typescript
export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  // Каждый запрос читает файл с диска
  const content = fs.readFileSync(filePath, 'utf-8');
}
```

**Решение:** Добавить кэш на уровне функций или использовать Next.js caching.

**2. Видео без lazy loading**
**Файл:** `src/components/blocks/Hero.tsx`
```typescript
<video autoPlay muted loop playsInline>
  <source src={mediaSrc} type="video/mp4" />
</video>
```

**Проблема:** Видео загружается сразу, даже если не в viewport.

**Решение:** Добавить `preload="none"` и загружать по Intersection Observer.

**3. Нет оптимизации для шрифтов**
**Файл:** `src/app/layout.tsx`
```typescript
const inter = Inter({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-inter',
  display: 'swap',
})
```

**Проблема:** `display: swap` может вызвать FOIT.

**Решение:** Использовать `display: optional` или `font-display: optional`.

**4. Отсутствие bundle analyzer**
**Решение:** Добавить `@next/bundle-analyzer` для анализа размера бандла.

---

## 3. TypeScript & Code Quality

### 3.1 Проблемы типизации

#### ✅ Хорошо:
- Строгий режим TypeScript (`"strict": true`)
- Типизированные props компонентов
- Интерфейсы для контента (`BlogPost`, `Case`)
- Zod схемы для валидации

#### ❌ Проблемы:

**1. Any usage в CMS функциях**
**Файл:** `src/lib/cms/shared.ts`
```typescript
function parseStatsArray(lines: string[]): Array<Record<string, string>> {
  const stats: Array<Record<string, string>> = [];
  let currentStat: Record<string, string> = {};
  // ...
}
```

**Проблема:** Использование `Record<string, string>` вместо конкретных типов.

**Решение:** Создать интерфейс `StatField`.

**2. Отсутствие типов для MDX компонентов**
**Файл:** `src/components/blog/BlogPostLayout.tsx`

**Проблема:** MDX компоненты передаются без типизации.

**Решение:** Использовать `MDXRemoteProps` из `next-mdx-remote`.

**3. Неиспользуемые импорты**
**Проблема:** В некоторых файлах есть импорты, которые не используются.

**Решение:** Запустить `npm run lint` и удалить неиспользуемые импорты.

### 3.2 Code Smells

**1. Дублирование парсинга frontmatter**
**Файлы:** `blog.ts`, `cases.ts`

**Проблема:** Одинаковый код для извлечения метаданных.

**Решение:** Вынести в `shared.ts` как универсальную функцию.

**2. Глубокая вложенность в parseStatsArray**
```typescript
for (const line of lines) {
  if (trimmedLine.startsWith('- label:')) {
    if (Object.keys(currentStat).length > 0) {
      // ...
    }
  }
}
```

**Решение:** Рефакторинг с использованием reduce.

**3. Магические числа**
```typescript
const RATE_LIMIT_WINDOW_MS = 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 10;
```

**Положительно:** Вынесены в константы.

**4. Консольные логи в production**
```typescript
console.log('=== NEW LEAD ===');
console.log('Blog files:', files);
```

**Решение:** Использовать утилиту для логирования с уровнем debug.

---

## 4. Refactoring Plan

### Phase 1: Критические исправления (High Priority)

**Срок:** 1-2 недели

#### 1.1 Безопасность API
- [ ] **Задача:** Добавить валидацию Bitrix24 webhook URL
  - **Файл:** `src/app/api/submit-lead/route.ts`
  - **Действие:** Проверка `https://` и домена bitrix24.ru/com
  - **Риск:** Низкий

- [ ] **Задача:** Добавить timeout для fetch запросов
  - **Файл:** `src/app/api/submit-lead/route.ts`
  - **Действие:** AbortController с 5s timeout
  - **Риск:** Низкий

- [ ] **Задача:** Исправить ID счётчика аналитики
  - **Файл:** `src/lib/analytics/track.ts`
  - **Действие:** Использовать `process.env.NEXT_PUBLIC_YANDEX_METРИКА_ID`
  - **Риск:** Низкий

#### 1.2 Security Headers
- [ ] **Задача:** Добавить HTTPS redirect и security headers
  - **Файл:** `next.config.js`
  - **Действие:** Настроить headers с CSP, HSTS, X-Frame-Options
  - **Риск:** Средний (может сломать сторонние скрипты)

#### 1.3 UTM метки
- [ ] **Задача:** Интегрировать useUTM в ContactForm
  - **Файл:** `src/components/forms/ContactForm.tsx`
  - **Действие:** Заменить defaultValue на value из хука
  - **Риск:** Низкий

#### 1.4 Очистка проекта
- [ ] **Задача:** Удалить пустые директории
  - **Директории:** `home-light-test`, `echo`, `temp`, `leads` (если не нужны)
  - **Риск:** Низкий

- [ ] **Задача:** Добавить .env в .gitignore
  - **Файл:** `.gitignore`
  - **Действие:** Добавить `.env` (не только `.env*.local`)
  - **Риск:** Низкий

### Phase 2: Улучшение архитектуры (Medium Priority)

**Срок:** 2-3 недели

#### 2.1 Кэширование
- [ ] **Задача:** Добавить кэш для MDX контента
  - **Файлы:** `src/lib/cms/blog.ts`, `src/lib/cms/cases.ts`
  - **Действие:** Использовать Next.js cache() или in-memory cache с TTL
  - **Риск:** Средний (нужна инвалидация кэша)

#### 2.2 Рефакторинг CMS
- [ ] **Задача:** Устранить дублирование blog.ts / cases.ts
  - **Файл:** `src/lib/cms/shared.ts`
  - **Действие:** Создать универсальную функцию `getContentBySlug`
  - **Риск:** Средний

#### 2.3 Rate Limiting
- [ ] **Задача:** Заменить in-memory rate limiter на Redis/Vercel KV
  - **Файл:** `src/app/api/submit-lead/route.ts`
  - **Действие:** Интеграция с Vercel KV или Upstash Redis
  - **Риск:** Высокий (требует деплой и настройку)

#### 2.4 Компоненты
- [ ] **Задача:** Разделить главную страницу на секции
  - **Файл:** `src/app/page.tsx`
  - **Действие:** Создать `HomePageContent.tsx` с секциями
  - **Риск:** Низкий

- [ ] **Задача:** Создать базовый Navigation компонент
  - **Файлы:** `Header.tsx`, `MainHeader.tsx`
  - **Действие:** Вынести общую логику в `Navigation.tsx`
  - **Риск:** Средний

#### 2.5 Тестирование
- [ ] **Задача:** Настроить Jest конфигурацию
  - **Файл:** `jest.config.js`
  - **Действие:** Добавить конфиг для запуска тестов
  - **Риск:** Низкий

- [ ] **Задача:** Добавить тесты для API endpoint
  - **Файл:** `src/app/api/submit-lead/route.test.ts`
  - **Действие:** Тесты валидации, rate limiting, CSRF
  - **Риск:** Низкий

### Phase 3: Оптимизация (Low Priority)

**Срок:** 1-2 недели

#### 3.1 Производительность
- [ ] **Задача:** Добавить bundle analyzer
  - **Файл:** `next.config.js`
  - **Действие:** `@next/bundle-analyzer`
  - **Риск:** Низкий

- [ ] **Задача:** Оптимизировать загрузку видео
  - **Файл:** `src/components/blocks/Hero.tsx`
  - **Действие:** Lazy loading через Intersection Observer
  - **Риск:** Низкий

- [ ] **Задача:** Добавить font optimization
  - **Файл:** `src/app/layout.tsx`
  - **Действие:** Использовать `display: optional`
  - **Риск:** Низкий

#### 3.2 Developer Experience
- [ ] **Задача:** Добавить Storybook
  - **Файл:** `.storybook/`
  - **Действие:** Настроить Storybook для UI компонентов
  - **Риск:** Низкий

- [ ] **Задача:** Добавить pre-commit хуки
  - **Файл:** `.husky/`
  - **Действие:** Husky с lint-staged
  - **Риск:** Низкий

#### 3.3 Мониторинг
- [ ] **Задача:** Добавить Sentry для error tracking
  - **Файл:** `src/app/layout.tsx`
  - **Действие:** Интеграция @sentry/nextjs
  - **Риск:** Средний

- [ ] **Задача:** Добавить логирование с уровнями
  - **Файл:** `src/lib/utils/logger.ts`
  - **Действие:** Создать утилиту с debug/info/error уровнями
  - **Риск:** Низкий

---

## 5. Вопросы к пользователю

### Критические вопросы:

1. **Bitrix24 интеграция:**
   - Используется ли сейчас Bitrix24 webhook в production?
   - Какой URL webhook (нужно для валидации)?

2. **Аналитика:**
   - Какие реальные ID счётчиков Яндекс.Метрики и Google Analytics?
   - Нужно ли добавить больше событий для трекинга?

3. **Rate limiting:**
   - Развёрнут ли сайт на платформе с несколькими инстансами (Vercel, AWS)?
   - Есть ли доступ к Redis для распределённого rate limiting?

4. **Контент:**
   - Планируется ли переезд на headless CMS (Sanity, Contentful)?
   - Нужно ли оставить MDX или заменить на CMS?

5. **Тесты:**
   - Запускаются ли сейчас тесты в CI/CD?
   - Нужно ли добавить E2E тесты (Playwright)?

### Вопросы по рефакторингу:

6. **Приоритеты:**
   - Какие проблемы наиболее критичны для бизнеса?
   - Есть ли ограничения по времени на рефакторинг?

7. **Деплой:**
   - Где развёрнут сайт (Vercel, Netlify, свой сервер)?
   - Есть ли staging окружение?

8. **Команда:**
   - Сколько разработчиков будут работать над рефакторингом?
   - Есть ли выделенный QA инженер?

---

## 6. Идеи для улучшений

### 6.1 Функциональные улучшения

**1. Личный кабинет клиента**
- **Описание:** Клиенты могут видеть статус своих заявок, историю взаимодействий
- **Ценность:** Повышение прозрачности, уменьшение нагрузки на менеджеров
- **Сложность:** Высокая (требуется аутентификация, БД)

**2. Калькулятор услуг**
- **Описание:** Интерактивный калькулятор стоимости услуг
- **Ценность:** Быстрая оценка для клиентов, квалификация лидов
- **Сложность:** Средняя

**3. Онлайн-чат**
- **Описание:** Чат с менеджером или ботом
- **Ценность:** Увеличение конверсии, быстрая поддержка
- **Сложность:** Средняя (интеграция с CRM)

**4. A/B тестирование**
- **Описание:** Тестирование разных версий страниц
- **Ценность:** Оптимизация конверсии
- **Сложность:** Средняя

### 6.2 Технические улучшения

**1. Переезд на Next.js 15**
- **Описание:** Обновление до последней версии Next.js
- **Ценность:** Новые фичи, улучшения производительности
- **Сложность:** Средняя (breaking changes)

**2. Микроразметка Schema.org**
- **Описание:** Добавление structured data для SEO
- **Ценность:** Улучшение видимости в поиске
- **Сложность:** Низкая

**3. PWA (Progressive Web App)**
- **Описание:** Офлайн режим, push уведомления
- **Ценность:** Улучшение UX на мобильных
- **Сложность:** Средняя

**4. Image CDN**
- **Описание:** Использование Cloudinary или Imgix
- **Ценность:** Автоматическая оптимизация изображений
- **Сложность:** Низкая

### 6.3 Процессные улучшения

**1. CI/CD пайплайн**
- **Описание:** Автоматические тесты, линтинг, деплой
- **Ценность:** Быстрый и безопасный релиз
- **Сложность:** Средняя

**2. Мониторинг производительности**
- **Описание:** Vercel Analytics или Google Core Web Vitals
- **Ценность:** Контроль производительности в production
- **Сложность:** Низкая

**3. Документация API**
- **Описание:** Swagger/OpenAPI спецификация
- **Ценность:** Упрощение интеграции для внешних разработчиков
- **Сложность:** Низкая

---

## Приложения

### A. Список файлов для рефакторинга

**Критические (Phase 1):**
```
src/app/api/submit-lead/route.ts
src/lib/analytics/track.ts
src/components/forms/ContactForm.tsx
next.config.js
.gitignore
```

**Архитектурные (Phase 2):**
```
src/lib/cms/blog.ts
src/lib/cms/cases.ts
src/lib/cms/shared.ts
src/app/page.tsx
src/components/layout/Header.tsx
src/components/layout/MainHeader.tsx
```

**Оптимизация (Phase 3):**
```
src/components/blocks/Hero.tsx
src/app/layout.tsx
next.config.js
```

### B. Оценка усилий

| Фаза | Задач | Оценка (часы) | Приоритет |
|------|-------|---------------|-----------|
| Phase 1 | 6 | 8-12 | 🔴 High |
| Phase 2 | 7 | 20-30 | 🟡 Medium |
| Phase 3 | 6 | 12-18 | 🟢 Low |
| **Итого** | **19** | **40-60** | |

### C. Метрики успеха

После рефакторинга проверить:

- [ ] Все тесты проходят (`npm test`)
- [ ] Нет TypeScript ошибок (`npm run type-check`)
- [ ] Нет ESLint предупреждений (`npm run lint`)
- [ ] Lighthouse score > 90 (Performance, Accessibility, SEO)
- [ ] Bundle size < 200KB (gzipped)
- [ ] API response time < 200ms
- [ ] Нет console.log в production

---

**Документ создан:** 27 марта 2026  
**Следующий шаг:** Обсудить с пользователем приоритеты и получить подтверждение на начало Phase 1
