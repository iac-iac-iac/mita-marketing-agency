# QWEN.md — М.И.Т.А. Company Site

## 📋 Project Overview

**М.И.Т.А.** — современный сайт маркетингового IT-агентства полного цикла, разработанный на **Next.js 14** с использованием **TypeScript**, **Tailwind CSS** и **Framer Motion**.

**Статус:** ✅ Production-ready (апрель 2026)

**Дизайн-система:** 3D Glass Design с полупрозрачными поверхностями, blur-эффектами, градиентами и анимациями.

---

## 🏗️ Архитектура проекта

### Технологический стек

| Категория | Технология |
|-----------|------------|
| **Framework** | Next.js 14.2 (App Router) |
| **Language** | TypeScript 5 |
| **Styling** | Tailwind CSS 3 + кастомные стили |
| **UI/Animations** | React 18 + Framer Motion |
| **CMS** | SQLite (better-sqlite3) + рендер тел статей/кейсов через **next-mdx-remote** |
| **Forms** | React Hook Form + Zod |
| **Package Manager** | npm |

### Структура проекта

```
company_site/
├── public/                         # Статика: images/, manifest, robots.txt, sw.js
├── data/                           # SQLite (gitignore), по умолчанию mita.db
├── src/
│   ├── app/
│   │   ├── (main)/services/        # /services и лендинги услуг
│   │   ├── about/, blog/, cases/, career/, contact/, legal/, offline/, security/
│   │   ├── admin/                  # login, blog, cases, testimonials
│   │   ├── api/submit-lead/, api/admin/   # login, logout
│   │   ├── layout.tsx, page.tsx, not-found.tsx, error.tsx, sitemap.ts
│   │   └── ...
│   ├── components/
│   │   ├── layout/, blocks/, blog/, cases/, contact/, forms/, ui/, legal/, security/
│   ├── content/                    # MDX: pages/ + примеры blog/, cases/
│   ├── lib/
│   │   ├── cms/                    # db-blog, db-cases, db-testimonials, db-leads, …
│   │   ├── db/, analytics/, hooks/, seo/, utils/
│   │   └── navigation.ts
│   ├── middleware.ts
│   ├── styles/, types/
├── docs/, scripts/, .github/
├── eslint.config.js, tailwind.config.js, tsconfig.json, package.json
├── .env.local.example
└── (опционально) next.config.mjs / next.config.js
```

---

## 🎨 Дизайн-система

### Цветовая палитра

| Название | Hex | Использование |
|----------|-----|---------------|
| `direct-primary` | `#D4A84B` | Золотой primary, CTA, акценты |
| `direct-gold` | `#F2D07A` | Светлое золото (hover, подсветка) |
| `direct-accent` | `#B8892E` | Тёмное золото (дополнительный) |
| `direct-dark` | `#0A0A0A` | Глубокий чёрный фон |
| `direct-secondary` | `#1A1A1A` | Вторичный фон (поверхности) |
| `direct-gray` | `#2A2A2A` | Карточки, surface |
| `direct-purple` | `#2A2A2A` | Alias для gray (совместимость) |
| `direct-light` | `#FFFFFF` | Белый текст |
| `direct-text-secondary` | `#B0B0B0` | Вторичный текст |
| `direct-muted` | `#707070` | Приглушённый текст |

### Анимации

**animate-fade-in-up** (1.2s):
```css
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

**Counter Animation:**
- Анимация чисел от 0 до значения
- Используется в статистике кейсов

**Slide-in анимации:**
- Чередование слева/справа/снизу
- Для карточек услуг, отзывов, тарифов

**Hamburger Menu:**
- Превращение в крестик (0.3s)
- Выезжающее меню слева (spring animation)

### Якорные ссылки

- Плавная прокрутка к секциям на страницах услуг
- Автоматическое обновление URL при клике на якорь
- Подсветка активного раздела в навигации
- Scroll spy для отслеживания видимой секции

### 3D Glass Design

Стиль использует:
- Полупрозрачные поверхности с `backdrop-filter: blur()`
- Градиенты и тени для создания глубины
- Стеклянные карточки с `background: rgba(255, 255, 255, 0.05)`
- Плавные анимации появления при скролле
- Видео фон в Hero секциях

---

## 🛠️ Разработка

### Требования

- **Node.js:** 20+
- **npm:** 9+

### Установка

```bash
npm install
```

### Запуск (development)

```bash
npm run dev
```

**URL:** http://localhost:3000

### Сборка (production)

```bash
npm run build
npm start
```

### Проверка кода

```bash
# Проверка типов TypeScript
npm run type-check

# Линтинг
npm run lint
```

---

## 📄 Страницы сайта

### Основные (20+ страниц)

| Страница | URL | Описание |
|----------|-----|----------|
| Главная | `/` | Лендинг с услугами, калькулятором, чатом |
| О компании | `/about` | Команда (карусель) |
| Карьера | `/career` | Вакансии и условия |
| Лидогенерация | `/services/leadgen` | Флагманский продукт |
| Call-центр | `/services/call-center` | Профессиональный обзвон |
| Авито | `/services/avito` | Бюджетный канал лидов |
| Рекрутинг | `/services/recruiting` | Подбор персонала |
| Блог | `/blog` | Список статей |
| Статья блога | `/blog/[slug]` | Детальная статья |
| Кейсы | `/cases` | Список кейсов |
| Детали кейса | `/cases/[slug]` | Детальный кейс |
| Безопасность | `/security` | Защита данных |
| Контакты | `/contact` | Форма обратной связи |
| Условия | `/legal/terms` | Оферта |
| Конфиденциальность | `/legal/privacy` | Политика |
| Offline | `/offline` | Offline страница (PWA) |
| 404 | `not-found.tsx` (маршрут Next.js) | Кастомная страница «не найдено» |

### Админ-панель

| Страница | URL | Описание |
|----------|-----|----------|
| Логин | `/admin/login` | Вход в админку |
| Блог (список) | `/admin/blog` | Управление статьями |
| Новая статья | `/admin/blog/new` | Создание статьи |
| Редактирование | `/admin/blog/[slug]/edit` | Редактирование статьи |
| Кейсы (список) | `/admin/cases` | Управление кейсами |
| Новый кейс | `/admin/cases/new` | Создание кейса |
| Редактирование | `/admin/cases/[slug]/edit` | Редактирование кейса |
| Отзывы | `/admin/testimonials` | Управление отзывами |

---

## 🔌 Интеграции

### Формы и CRM

**API Endpoint:** `/api/submit-lead`

- Обработка заявок из форм
- Интеграция с Bitrix24 через webhook
- Валидация через Zod схему
- CSRF защита (проверка Origin)
- Rate limiting (10 запросов в минуту)
- UTM-трекинг (сохранение меток из URL)

### Аналитика

События для трекинга:
- `form_submit` — отправка формы
- `form_error` — ошибка валидации
- `modal_open/close` — открытие/закрытие модального окна
- `cta_click` — клик по CTA-кнопке

**Поддерживаемые системы:**
- Google Analytics (`NEXT_PUBLIC_GA_ID`)
- Яндекс.Метрика (`NEXT_PUBLIC_YANDEX_METRIKA_ID`)

### Error Tracking

Зависимость **`@sentry/nextjs`** в `package.json` есть; отдельные `sentry.*.config.ts` в репозитории не зафиксированы — при необходимости подключите по [документации Sentry для Next.js](https://docs.sentry.io/platforms/javascript/guides/nextjs/).

### SEO

- **Metadata:** Title, description, Open Graph на всех страницах
- **Sitemap:** `src/app/sitemap.ts` — публичные URL блога и кейсов берутся из **той же SQLite**, что и страницы `/blog` и `/cases`; базовый домен — `NEXT_PUBLIC_SITE_URL` (fallback `https://mita.top`)
- **Robots.txt:** Настроен в `/public/robots.txt`
- **Canonical URLs:** Настроены для всех страниц
- **Favicon:** `/images/icons/Favicon.ico`

---

## 🔐 Переменные окружения

### Настройка

```bash
cp .env.local.example .env.local
```

### Основные переменные

| Переменная | Описание | Required |
|------------|----------|----------|
| `NEXT_PUBLIC_SITE_URL` | URL сайта (например, `https://mita.ru`) | ✅ |
| `BITRIX24_WEBHOOK_URL` | Webhook для интеграции с Bitrix24 | ✅ |
| `BITRIX24_CRM_ID` | ID воронки в Bitrix24 | ❌ |
| `NEXT_PUBLIC_GA_ID` | Google Analytics ID | ❌ |
| `NEXT_PUBLIC_YANDEX_METRIKA_ID` | Яндекс.Метрика ID | ❌ |
| `ADMIN_PASSWORD` / `ADMIN_PASSWORD_HASH` | Вход в админку | ✅ для `/admin` |
| `DATABASE_PATH` | Путь к SQLite | ❌ (по умолчанию `data/mita.db`) |
| `SMTP_HOST` | SMTP сервер для email | ❌ |
| `SMTP_PORT` | SMTP порт | ❌ |
| `SMTP_USER` | SMTP пользователь | ❌ |
| `SMTP_PASSWORD` | SMTP пароль | ❌ |
| `EMAIL_FROM` | Адрес отправителя | ❌ |
| `EMAIL_TO` | Адрес получателя заявок | ❌ |
| `NEXT_PUBLIC_API_KEY` | API ключ для безопасности | ❌ |

---

## 📦 Алиасы импортов

Настроены в `tsconfig.json`:

| Алиас | Путь |
|-------|------|
| `@/*` | `./src/*` |
| `@components/*` | `./src/components/*` |
| `@lib/*` | `./src/lib/*` |
| `@content/*` | `./src/content/*` |
| `@images/*` | `./public/images/*` |
| `@styles/*` | `./src/styles/*` |
| `@types/*` | `./src/types/*` |

### Примеры использования

```typescript
// Компоненты
import { Hero } from '@components/blocks/Hero'
import { Counter } from '@components/ui/Counter'

// Утилиты
import { cn } from '@lib/utils/cn'
import { sanitizeHtml } from '@lib/utils/sanitize'

// Сервер: опубликованные посты из БД
import { getPublishedPosts } from '@lib/cms/db-blog'

// Изображения из public/
import heroVideo from '@images/hero-banner/video.mp4'
```

---

## 🧩 Ключевые компоненты

### Layout

| Компонент | Описание |
|-----------|----------|
| `Header` | Навигация с hamburger menu (service страницы) |
| `MainHeader` | Полная навигация (главная страница) |
| `Footer` | Подвал с ссылками и контактами |

### Блоки страниц

| Компонент | Описание |
|-----------|----------|
| `Hero` | Первый экран с видео/фото фоном |
| `ServiceHero` | Hero для service страниц |
| `FeatureGroup` | Карточки преимуществ/услуг с иконками |
| `ProcessSteps` | Шаги процесса работы (крупные карточки) |
| `PricingSection` | Тарифные планы |
| `TestimonialsSection` | Отзывы клиентов |
| `ClosingCta` | Финальный призыв к действию |
| `FaqSection` | Часто задаваемые вопросы (accordion) |

### UI компоненты

| Компонент | Описание |
|-----------|----------|
| `Counter` | Анимация чисел (от 0 до значения) |
| `TeamCarousel` | Карусель команды (слайдер) |
| `BackButton` | Кнопка "Назад" (на service страницах) |
| `HamburgerMenu` | Hamburger меню с анимацией |
| `ScrollToTopButton` | Кнопка прокрутки наверх |
| `CtaButton` | Кнопка с анимацией |

### Формы

| Компонент | Описание |
|-----------|----------|
| `ContactForm` | Полная форма обратной связи |
| `LeadForm` | Упрощённая форма заявки |

---

## 📊 Контент и CMS

### Публичный блог и кейсы

**Источник данных:** таблицы `blog_posts` и `cases` в SQLite (`lib/cms/db-blog.ts`, `db-cases.ts`). Текст хранится в полях и отдаётся на страницы через `next-mdx-remote` (`MDXRemote`).

### MDX на диске

- **`src/content/pages/`** — юридические и прочие статичные тексты (`security.mdx`, `terms.mdx`, `privacy.mdx`), если страницы их подключают.
- **`src/content/blog/`**, **`src/content/cases/`** — примеры/наследие; модуль **`lib/cms/blog.ts`** и **`lib/cms/cases.ts`** читает файлы с диска (для публичных маршрутов основной источник — БД).

Примеры файлов: `leadgen-guide.mdx`, `call-center-tips.mdx`, `avtopremium-case.mdx`, `stroymaster-case.mdx`.

---

## 🚀 Деплой

### Рекомендуемые платформы

1. **Vercel** — оптимально для Next.js
   ```bash
   npm i -g vercel
   vercel deploy
   ```

2. **Netlify** — альтернативный вариант

3. **Docker** — для самостоятельного хостинга

### Переменные окружения на production

Обязательно настройте:
- `NEXT_PUBLIC_SITE_URL` — домен сайта
- `BITRIX24_WEBHOOK_URL` — webhook Bitrix24
- Аналитика (GA, Яндекс.Метрика)

---

## ♿ Доступность (A11y)

- Семантическая HTML-разметка
- ARIA-атрибуты для интерактивных элементов
- Keyboard navigation (Tab, Enter, Esc)
- Focus states для всех интерактивных элементов
- Контрастность текста соответствует WCAG

---

## 📈 Performance

### Оптимизация

- **Code splitting** на уровне страниц
- **Tree shaking** для unused кода
- **Минификация** CSS и JavaScript
- **Lazy loading** для изображений ниже fold
- **Image optimization** через Next.js Image component

### Bundle size

- First Load JS: ~87-152 KB
- Статические страницы предрендерятся при сборке
- Динамические страницы рендерятся на сервере (SSR)

---

## 📝 Conventions

### Структура коммитов

```
feat: добавление новой функции
fix: исправление ошибки
docs: обновление документации
style: изменение стиля
refactor: рефакторинг кода
test: добавление тестов
chore: изменение конфигурации
```

### Ветки

- `main` — production версия
- `develop` — ветка разработки
- `feature/*` — новые функции
- `fix/*` — исправления

### Именование файлов

- **Компоненты:** PascalCase (`ContactForm.tsx`)
- **Утилиты:** camelCase (`formatDate.ts`)
- **Стили:** kebab-case (`globals.css`)
- **Контент:** kebab-case (`leadgen-guide.mdx`)

---

## 📁 Дополнительная документация

| Файл | Описание |
|------|----------|
| `README.md` | Основная документация проекта |
| `CHANGELOG.md` | История изменений |
| `docs/about_company/` | Материалы о компании (не путать со стеком репозитория) |
| `docs/plan/implementation-plan.md` | Продуктовый план и спецификация |

---

## 🎯 Статистика проекта

| Категория | Количество |
|-----------|------------|
| Контентных страниц | 20+ (включая админку) |
| Компонентов | ~90+ `.tsx` в `src/components/` (ориентир) |
| MDX файлов | 7 в `src/content/` |
| API (app router) | 3 маршрута: `submit-lead`, `admin/login`, `admin/logout` |
| Тестов | 13+ файлов `*.test.tsx` |
| Внешних библиотек | 20+ |

---

## ⚠️ Важные заметки

### Windows-совместимость

- Используйте `move` вместо `mv` для перемещения файлов
- Пути должны использовать обратные слеши или быть абсолютными
- Команды shell могут требовать PowerShell синтаксиса

### Next.js особенности

- Все страницы должны быть в `src/app/`
- Layout по умолчанию — `layout.tsx`
- API routes — в `src/app/api/`
- Динамические сегменты — папки `[slug]/page.tsx`
- Route groups — `(main)/` для группировки без влияния на URL

### MDX рендеринг

- Публичные статьи и кейсы: строка контента из SQLite → `MDXRemote` (RSC) в `blog/[slug]/page.tsx` и `cases/[slug]/page.tsx`
- Файловый MDX: `lib/cms/utils.ts` (`readMdxFile` и др.) для контента из `src/content/`

### Анимации

- `animate-fade-in-up` — плавное появление (1.2s)
- Counter animation — анимация чисел в статистике
- Slide-in — чередование слева/справа для карточек
- Hamburger — превращение в крестик

---

**М.И.Т.А.** — Маркетинговое IT-агентство полного цикла

📍 Адрес: г. Саратов, Астраханская ул., 87В
🌐 Сайт: https://mita.top

**Статус:** ✅ Production-ready (апрель 2026)
