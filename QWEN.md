# QWEN.md — М.И.Т.А. Company Site

## 📋 Project Overview

**М.И.Т.А.** — современный сайт маркетингового IT-агентства полного цикла, разработанный на **Next.js 14** с использованием **TypeScript**, **Tailwind CSS** и **Framer Motion**.

**Статус:** ✅ Production-ready (март 2026)

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
| **CMS** | MDX (next-mdx-remote) |
| **Forms** | React Hook Form + Zod |
| **Package Manager** | npm |

### Структура проекта

```
company_site/
├── src/
│   ├── app/                        # Next.js App Router
│   │   ├── (main)/                 # Основная группа маршрутов
│   │   │   ├── page.tsx            # Главная страница
│   │   │   ├── services/           # Лендинги услуг
│   │   │   │   ├── leadgen/        # Лидогенерация
│   │   │   │   ├── call-center/    # Call-центр
│   │   │   │   ├── avito/          # Продвижение на Авито
│   │   │   │   └── recruiting/     # Рекрутинг
│   │   │   ├── blog/               # Блог (список + [slug])
│   │   │   ├── cases/              # Кейсы (список + [slug])
│   │   │   ├── security/           # Безопасность данных
│   │   │   ├── legal/              # Юридические страницы
│   │   │   │   ├── terms/          # Условия оказания услуг
│   │   │   │   └── privacy/        # Политика конфиденциальности
│   │   │   ├── contact/            # Контакты
│   │   │   └── about/              # О компании + команда
│   │   ├── api/
│   │   │   └── submit-lead/        # API отправки заявок
│   │   ├── layout.tsx              # Root layout
│   │   ├── not-found.tsx           # 404 страница (с фоном)
│   │   └── sitemap.ts              # Генерация sitemap.xml
│   │
│   ├── components/
│   │   ├── layout/                 # Header, Footer, Section
│   │   ├── blocks/                 # Hero, Features, Pricing, Steps
│   │   ├── blog/                   # BlogCard, BlogPostLayout
│   │   ├── cases/                  # CaseCard, StatsBlock
│   │   ├── forms/                  # ContactForm, LeadForm
│   │   ├── ui/                     # Button, Counter, TeamCarousel
│   │   └── security/               # Компоненты безопасности
│   │
│   ├── content/                    # MDX контент
│   │   ├── blog/                   # Статьи блога
│   │   ├── cases/                  # Кейсы клиентов
│   │   └── pages/                  # Статические страницы
│   │
│   ├── lib/
│   │   ├── analytics/              # Трекинг событий
│   │   ├── cms/                    # Функции работы с MDX
│   │   ├── hooks/                  # Custom React hooks
│   │   └── utils/                  # Утилиты (cn, sanitize)
│   │
│   ├── public/
│   │   ├── images/                 # Изображения
│   │   │   ├── hero-banner/        # Hero баннеры (видео + фото)
│   │   │   ├── icons/              # Иконки услуг, статистики
│   │   │   ├── process_steps/      # Изображения шагов
│   │   │   ├── cases/              # Изображения кейсов
│   │   │   ├── blog/               # Изображения статей
│   │   │   ├── error/              # 404 фон
│   │   │   └── team/               # Фото команды
│   │   └── robots.txt              # SEO robots
│   │
│   ├── styles/
│   │   └── globals.css             # Глобальные стили + анимации
│   │
│   └── types/                      # TypeScript типы
│
├── .env.local                      # Переменные окружения
├── .env.local.example              # Шаблон переменных
├── next.config.js                  # Next.js конфигурация
├── tailwind.config.js              # Tailwind конфигурация
├── tsconfig.json                   # TypeScript конфигурация
└── package.json
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

- **Node.js:** 18+
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

### Основные (15 контентных страниц)

| Страница | URL | Описание |
|----------|-----|----------|
| Главная | `/` | Лендинг с услугами и преимуществами |
| О компании | `/about` | Команда (карусель) |
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
| 404 | `/_not-found` | Страница ошибки (с фоном) |

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
- Яндекс.Метрика (`NEXT_PUBLIC_YANDEX_METРИКА_ID`)

### SEO

- **Metadata:** Title, description, Open Graph на всех страницах
- **Sitemap:** Автоматическая генерация через `sitemap.ts`
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
| `NEXT_PUBLIC_YANDEX_METРИКА_ID` | Яндекс.Метрика ID | ❌ |
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

// Контент
import blogPosts from '@content/blog/posts.json'

// Изображения
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
| `ScrollToTop` | Кнопка прокрутки наверх |
| `CtaButton` | Кнопка с анимацией |

### Формы

| Компонент | Описание |
|-----------|----------|
| `ContactForm` | Полная форма обратной связи |
| `LeadForm` | Упрощённая форма заявки |

---

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

### Страницы

**Расположение:** `src/content/pages/`

Файлы:
- `security.mdx` — Безопасность данных
- `terms.mdx` — Условия оказания услуг
- `privacy.mdx` — Политика конфиденциальности

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
| `QUICK_START.md` | Краткий гид по быстрому старту |
| `DEVELOPMENT_REPORT.md` | Подробный отчёт о разработке |
| `FINAL_CHECKLIST.md` | Чек-лист перед релизом |

---

## 🎯 Статистика проекта

| Категория | Количество |
|-----------|------------|
| Контентных страниц | 15 |
| Технических файлов | 3 (layout, not-found, sitemap) |
| Компонентов | 60+ |
| MDX файлов | 7 |
| API endpoints | 1 |
| Внешних библиотек | 14 |

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
