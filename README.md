# М.И.Т.А. — Сайт маркетингового IT-агентства

Современный сайт для маркетингового IT-агентства полного цикла, построенный на Next.js 14 с использованием Tailwind CSS, TypeScript и 3D Glass Design.

## 🎉 Что нового в версии 1.1.0

### Новые функции
- 🧮 **Калькулятор услуг** — интерактивный расчёт стоимости
- 💬 **Онлайн-чат** — виджет для связи с клиентами
- 📲 **PWA** — offline режим, установка приложения
- 🏷️ **Schema.org** — микроразметка для SEO

### Безопасность
- 🔒 7 security headers (CSP, HSTS, X-Frame-Options)
- ✅ Валидация webhook URL
- ⏱️ Timeout 5s для запросов

### Производительность
- ⚡ Кэширование MDX (80% быстрее)
- 🎬 Lazy loading для видео
- 📦 Bundle Analyzer

### CI/CD
- 🚀 GitHub Actions pipeline
- 📦 Автоматический деплой на Vercel
- ✅ Lint, Type Check, Tests

📖 Подробная информация в [CHANGELOG.md](CHANGELOG.md)

## 🚀 Технологический стек

### Основное
- **Framework:** Next.js 14.2 (App Router)
- **Language:** TypeScript 5
- **Styling:** Tailwind CSS 3 + кастомные стили
- **UI Components:** React 18 + Framer Motion
- **Package Manager:** npm

### Дизайн и анимации
- **3D Glass Design** — полупрозрачные поверхности с blur-эффектом
- **Framer Motion** — анимации появления, slide-in, counter
- **Видео фон** — Hero секции с видео
- **Градиенты и тени** для создания глубины

## 📁 Структура проекта

```
company_site/
├── src/
│   ├── app/                        # Next.js App Router
│   │   ├── (main)/                 # Основная группа маршрутов
│   │   │   └── services/           # Страницы услуг
│   │   │       ├── leadgen/        # Лидогенерация
│   │   │       ├── call-center/    # Call-центр
│   │   │       ├── avito/          # Продвижение на Авито
│   │   │       └── recruiting/     # Рекрутинг
│   │   ├── blog/                   # Блог (список + статьи)
│   │   ├── cases/                  # Кейсы (список + детали)
│   │   ├── contact/                # Контакты
│   │   ├── security/               # Безопасность
│   │   ├── legal/                  # Юридические страницы
│   │   │   ├── privacy/            # Политика конфиденциальности
│   │   │   └── terms/              # Условия оказания услуг
│   │   ├── about/                  # О компании + команда
│   │   ├── api/                    # API маршруты
│   │   │   └── submit-lead/        # Отправка заявок
│   │   ├── layout.tsx              # Root layout
│   │   ├── page.tsx                # Главная страница
│   │   ├── not-found.tsx           # 404 страница (с фоном)
│   │   └── sitemap.ts              # Генерация sitemap.xml
│   ├── components/                 # React компоненты
│   │   ├── layout/                 # Layout: Header, Footer, Section
│   │   ├── blocks/                 # Блоки страниц: Hero, Features, Pricing
│   │   ├── blog/                   # Компоненты блога
│   │   ├── cases/                  # Компоненты кейсов
│   │   ├── contact/                # Контактная страница
│   │   ├── forms/                  # Формы: ContactForm, LeadForm
│   │   ├── ui/                     # UI элементы: кнопки, Counter, TeamCarousel
│   │   └── legal/                  # Layout для юридических страниц
│   ├── content/                    # Контент (Markdown/MDX)
│   │   ├── blog/                   # Статьи блога
│   │   ├── cases/                  # Кейсы
│   │   └── pages/                  # Статические страницы
│   ├── lib/                        # Утилиты и API
│   │   ├── analytics/              # Аналитика и трекинг
│   │   ├── cms/                    # CMS функции (blog, cases)
│   │   ├── hooks/                  # Custom React hooks
│   │   └── utils/                  # Утилиты (cn, sanitize)
│   ├── public/                     # Статические файлы
│   │   ├── images/                 # Изображения
│   │   │   ├── hero-banner/        # Hero баннеры (видео + фото)
│   │   │   ├── icons/              # Иконки услуг, статистики
│   │   │   ├── process_steps/      # Изображения шагов процесса
│   │   │   ├── cases/              # Изображения кейсов
│   │   │   ├── blog/               # Изображения статей
│   │   │   ├── error/              # 404 фон
│   │   │   └── team/               # Фото команды
│   │   └── robots.txt              # Robots.txt для SEO
│   ├── styles/                     # Глобальные стили
│   │   └── globals.css             # Tailwind + кастомные стили + анимации
│   └── types/                      # TypeScript типы
├── .env.local                      # Переменные окружения
├── .env.local.example              # Шаблон переменных
├── next.config.js                  # Конфигурация Next.js
├── tailwind.config.js              # Конфигурация Tailwind
├── tsconfig.json                   # Конфигурация TypeScript
└── package.json
```

## 🎨 Дизайн-система

### Цветовая палитра

| Название | Hex | Использование |
|----------|-----|---------------|
| Primary | `#7274B3` | Основные акценты, CTA |
| Secondary | `#293349` | Вторичные элементы |
| Accent | `#5A4D7A` | Акценты, градиенты |
| Dark | `#090909` | Фон, текст |
| Light | `#EDECED` | Светлый текст, фон |
| Gray | `#323131` | Вторичный текст |
| Purple | `#3C3353` | Дополнительные элементы |

### Анимации

**animate-fade-in-up** — плавное появление контента (1.2s):
- Используется на главной и service страницах
- Opacity 0→1 + translateY 20px→0

**Counter Animation** — анимация чисел:
- В кейсах для статистики
- На странице /about

**Slide-in анимации** — появление карточек:
- Чередование слева/справа/снизу
- В секциях: Услуги, Отзывы, Тарифы

**Hamburger Menu** — анимация кнопки:
- Превращение в крестик
- Выезжающее меню слева

### Стиль дизайна

**3D Glass Design** — современный стиль с использованием:
- Полупрозрачных поверхностей с blur-эффектом
- Градиентов и теней для создания глубины
- Стеклянных карточек и панелей
- Плавных анимаций и переходов
- Видео фона в Hero секциях

## 🛠️ Установка и запуск

### Требования
- Node.js 18+
- npm 9+

### Установка зависимостей

```bash
npm install
```

### Запуск в режиме разработки

```bash
npm run dev
```

Сайт будет доступен по адресу: http://localhost:3000

### Сборка для production

```bash
npm run build
npm start
```

### Проверка типов

```bash
npm run type-check
```

### Линтинг

```bash
npm run lint
```

## 📄 Страницы сайта

### Основные страницы
- `/` — Главная страница с описанием услуг и преимуществ
- `/about` — О компании + команда (карусель)
- `/contact` — Контакты и форма обратной связи
- `/security` — Безопасность данных

### Услуги
- `/services/leadgen` — Лидогенерация (флагманский продукт)
- `/services/call-center` — Call-центр (профессиональный обзвон)
- `/services/avito` — Продвижение на Авито (бюджетный канал)
- `/services/recruiting` — Рекрутинг (подбор персонала)

### Контент
- `/blog` — Блог со статьями о маркетинге и продажах
- `/blog/[slug]` — Отдельная статья блога
- `/cases` — Кейсы клиентов с результатами
- `/cases/[slug]` — Детальный кейс

### Юридические
- `/legal/terms` — Условия оказания услуг (оферта)
- `/legal/privacy` — Политика конфиденциальности

### Системные
- `/404` — Страница ошибки (с фоном)
- `/sitemap.xml` — Карта сайта для SEO
- `/robots.txt` — Правила для поисковых роботов

## 🔐 Переменные окружения

Скопируйте `.env.local.example` в `.env.local` и заполните необходимыми значениями:

```bash
cp .env.local.example .env.local
```

Основные переменные:

| Переменная | Описание |
|------------|----------|
| `NEXT_PUBLIC_SITE_URL` | URL сайта (например, `https://mita.ru`) |
| `BITRIX24_WEBHOOK_URL` | Webhook для интеграции с Bitrix24 |
| `NEXT_PUBLIC_GA_ID` | Google Analytics ID |
| `NEXT_PUBLIC_YANDEX_METRIKA_ID` | Яндекс.Метрика ID |

## 🛠️ Алиасы импортов

В проекте настроены следующие алиасы (tsconfig.json):

| Алиас | Путь |
|-------|------|
| `@/*` | `./src/*` |
| `@components/*` | `./src/components/*` |
| `@lib/*` | `./src/lib/*` |
| `@content/*` | `./src/content/*` |
| `@images/*` | `./public/images/*` |
| `@styles/*` | `./src/styles/*` |
| `@types/*` | `./src/types/*` |

Пример использования:

```typescript
import { Button } from '@components/ui/CtaButton'
import { formatDate } from '@lib/utils/format'
import heroImage from '@images/hero-banner/main.png'
```

## 🎯 Ключевые компоненты

### Layout
- `Header` — навигация с hamburger menu (на service страницах)
- `MainHeader` — полная навигация (на главной)
- `Footer` — подвал с ссылками и контактами

### UI компоненты
- `Counter` — анимация чисел (от 0 до значения)
- `TeamCarousel` — карусель команды (слайдер)
- `BackButton` — кнопка "Назад" (на service страницах)
- `HamburgerMenu` — hamburger меню с анимацией
- `ScrollToTop` — кнопка прокрутки наверх
- `CtaButton` — кнопка с анимацией

### Блоки страниц
- `Hero` — первый экран с видео/фото фоном
- `ServiceHero` — Hero для service страниц
- `FeatureGroup` — карточки услуг с иконками
- `ProcessSteps` — шаги процесса (крупные карточки)
- `TestimonialsSection` — отзывы клиентов
- `PricingSection` — тарифные планы
- `FaqSection` — FAQ с accordion анимацией

## 📊 Контент (MDX)

### Блог

**Расположение:** `src/content/blog/`

Файлы:
- `leadgen-guide.mdx` — Руководство по лидогенерации
- `call-center-tips.mdx` — Советы по call-центру

### Кейсы

**Расположение:** `src/content/cases/`

Файлы:
- `avtopremium-case.mdx` — Автосалон (+147% лидов)
- `stroymaster-case.mdx` — Строительная компания (+220% продаж)

## 🔌 Интеграции

### Формы
- **API:** `/api/submit-lead` — обработка заявок
- **Валидация:** Zod схема
- **Безопасность:** CSRF защита, rate limiting (10 запросов/мин)
- **Интеграция:** Bitrix24 webhook

### Аналитика
- **События:** form_submit, form_error, modal_open, modal_close, cta_click
- **Поддержка:** Яндекс.Метрика, Google Analytics

### SEO
- **Metadata:** Title, description, Open Graph на всех страницах
- **Sitemap:** Автоматическая генерация через `sitemap.ts`
- **Robots.txt:** Настроен в `/public/robots.txt`
- **Canonical URLs:** Настроены для всех страниц
- **Favicon:** `/images/icons/Favicon.ico`

## ♿ Доступность (A11y)

- Семантическая HTML-разметка
- ARIA-атрибуты для интерактивных элементов
- Keyboard navigation (Tab, Enter, Esc)
- Focus states для всех интерактивных элементов
- Контрастность текста соответствует WCAG

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

## 📊 Статистика проекта

| Категория | Количество |
|-----------|------------|
| Страниц | 17 |
| Компонентов | 60+ |
| MDX файлов | 7 |
| API endpoints | 1 |
| Внешних библиотек | 14 |

## ⚠️ Важные заметки

### Windows-совместимость
- Используйте `move` вместо `mv` для перемещения файлов
- Пути должны использовать обратные слеши или быть абсолютными
- Команды shell могут требовать PowerShell синтаксиса

### Next.js особенности
- Все страницы должны быть в `src/app/`
- Layout по умолчанию — `layout.tsx`
- API routes — в `src/app/api/`
- Динамические маршруты — `[slug].tsx`

### MDX рендеринг
- Используйте `next-mdx-remote` для рендеринга
- Контент загружается через `fs.readFileSync`
- Компоненты передаются через `MDXRemote`

### Анимации
- `animate-fade-in-up` — плавное появление (1.2s)
- Counter animation — анимация чисел в статистике
- Slide-in — чередование слева/справа для карточек
- Hamburger — превращение в крестик

---

**М.И.Т.А.** — Маркетинговое IT-агентство полного цикла

📍 Адрес: г. Саратов, Астраханская ул., 87В
🌐 Сайт: https://mita.ru

**Статус:** ✅ Production-ready (март 2026)
