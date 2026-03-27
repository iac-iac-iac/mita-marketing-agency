# Direct-line Company Site — Проект разработки сайта

## 📋 О проекте

**Компания:** Direct-line — маркетинговое IT-агентство полного цикла  
**Период разработки:** Март 2026  
**Технологии:** Next.js 14, TypeScript, Tailwind CSS, Framer Motion, Magic UI  
**Стиль:** 3D Glass Design

---

## 🎯 Цель проекта

Создание современной системы сайтов для Direct-line с:
- Главным лендингом (продуктовая система)
- 4 лендингами услуг (Лидогенерация, Call-центр, Авито, Рекрутинг)
- Блогом и кейсами (CMS на MDX)
- Страницами безопасности и юридическими документами
- Формами обратной связи с интеграцией CRM
- Адаптивным дизайном и анимациями

---

## 📁 Структура проекта

```
company_site/
├── src/
│   ├── app/                      # Next.js App Router
│   │   ├── (main)/               # Основная группа страниц
│   │   │   ├── page.tsx          # Главная страница
│   │   │   ├── services/         # Лендинги услуг
│   │   │   │   ├── leadgen/
│   │   │   │   ├── call-center/
│   │   │   │   ├── avito/
│   │   │   │   └── recruiting/
│   │   │   ├── blog/             # Блог
│   │   │   │   ├── page.tsx
│   │   │   │   └── [slug]/
│   │   │   ├── cases/            # Кейсы
│   │   │   │   ├── page.tsx
│   │   │   │   └── [slug]/
│   │   │   ├── security/         # Безопасность
│   │   │   ├── legal/            # Юридические страницы
│   │   │   │   ├── terms/
│   │   │   │   └── privacy/
│   │   │   └── contact/          # Контакты
│   │   ├── api/                  # API endpoints
│   │   │   └── submit-lead/      # Отправка форм
│   │   ├── layout.tsx            # Root layout
│   │   ├── not-found.tsx         # 404 страница
│   │   ├── sitemap.ts            # Sitemap генерация
│   │   └── globals.css           # Глобальные стили
│   │
│   ├── components/               # React компоненты
│   │   ├── layout/               # Layout компоненты
│   │   │   ├── Layout.tsx
│   │   │   ├── Header.tsx
│   │   │   └── Footer.tsx
│   │   ├── blocks/               # Блоки страниц
│   │   │   ├── Hero.tsx
│   │   │   ├── ProblemStatement.tsx
│   │   │   ├── FeatureGroup.tsx
│   │   │   ├── ProcessSteps.tsx
│   │   │   ├── TestimonialsSection.tsx
│   │   │   ├── PricingSection.tsx
│   │   │   ├── BlogPreview.tsx
│   │   │   ├── CasePreview.tsx
│   │   │   ├── ClosingCta.tsx
│   │   │   ├── ServiceHero.tsx
│   │   │   ├── ServiceFeatures.tsx
│   │   │   ├── ServiceProcess.tsx
│   │   │   ├── ServicePricing.tsx
│   │   │   ├── ServiceTestimonials.tsx
│   │   │   └── FaqSection.tsx
│   │   ├── blog/                 # Компоненты блога
│   │   │   ├── BlogCard.tsx
│   │   │   ├── BlogIndex.tsx
│   │   │   ├── BlogPostLayout.tsx
│   │   │   └── InlineCta.tsx
│   │   ├── cases/                # Компоненты кейсов
│   │   │   ├── CaseCard.tsx
│   │   │   ├── CasesIndex.tsx
│   │   │   ├── CaseDetailLayout.tsx
│   │   │   ├── StatsBlock.tsx
│   │   │   ├── ToolsList.tsx
│   │   │   └── RelatedContent.tsx
│   │   ├── forms/                # Формы
│   │   │   ├── ContactForm.tsx
│   │   │   └── LeadForm.tsx
│   │   ├── ui/                   # UI компоненты
│   │   │   ├── CtaButton.tsx
│   │   │   ├── TextLinkCta.tsx
│   │   │   ├── DropdownMenu.tsx
│   │   │   ├── Modal.tsx
│   │   │   ├── ScrollObserver.tsx
│   │   │   ├── animated-gradient-text.tsx
│   │   │   ├── animated-shiny-text.tsx
│   │   │   └── animated-list.tsx
│   │   ├── security/             # Страница безопасности
│   │   │   └── SecurityPageLayout.tsx
│   │   ├── legal/                # Юридические страницы
│   │   │   └── LegalPageLayout.tsx
│   │   └── contact/              # Контакты
│   │       └── ContactPageContent.tsx
│   │
│   ├── lib/                      # Утилиты и библиотеки
│   │   ├── cms/                  # CMS функции
│   │   │   ├── blog.ts
│   │   │   └── cases.ts
│   │   ├── analytics/            # Аналитика
│   │   │   ├── events.ts
│   │   │   └── track.ts
│   │   ├── hooks/                # React хуки
│   │   │   ├── use-scroll-reveal.ts
│   │   │   └── use-utm.ts
│   │   └── utils/
│   │       └── cn.ts
│   │
│   ├── content/                  # MDX контент
│   │   ├── blog/                 # Статьи блога
│   │   │   ├── leadgen-guide.mdx
│   │   │   └── call-center-tips.mdx
│   │   ├── cases/                # Кейсы
│   │   │   ├── avtopremium-case.mdx
│   │   │   └── stroymaster-case.mdx
│   │   └── pages/                # Статические страницы
│   │       ├── security.mdx
│   │       ├── terms.mdx
│   │       └── privacy.mdx
│   │
│   ├── public/                   # Статические файлы
│   │   ├── images/               # Изображения
│   │   │   ├── hero-banner/
│   │   │   ├── icons/
│   │   │   ├── process_steps/
│   │   │   ├── blog_category/
│   │   │   └── OG_image/
│   │   └── robots.txt
│   │
│   ├── types/                    # TypeScript типы
│   │   └── content.ts
│   │
│   └── styles/
│       └── globals.css
│
├── docs/                         # Документация
│   ├── about_company/            # О компании
│   ├── plan/                     # План разработки
│   └── analysis_kero_directline.md
│
├── images/                       # Исходные изображения
├── next.config.js
├── tailwind.config.js
├── tsconfig.json
├── package.json
└── README.md
```

---

## 🚀 Этапы разработки

### Этап 1: Базовая настройка проекта
**Статус:** ✅ Завершён

**Задачи:**
- Инициализация Next.js 14 проекта с TypeScript и Tailwind CSS
- Настройка App Router
- Настройка алиасов импортов (`@/*`, `@components/*`, `@lib/*`)
- Настройка цветовой палитры Direct-line в Tailwind config
- Создание базовой структуры папок
- Настройка глобальных стилей с 3D Glass эффектами

**Результат:**
- Рабочий проект на http://localhost:3000
- Настроенная конфигурация TypeScript
- Tailwind CSS с фирменной палитрой
- Базовый Layout с metadata

---

### Этап 2: Layout, Header, Footer
**Статус:** ✅ Завершён

**Созданные компоненты:**
- `Layout.tsx` — базовая обёртка страниц
- `Header.tsx` — шапка с dropdown меню и бургером
- `Footer.tsx` — подвал с 5 колонками ссылок
- `Section.tsx` — контейнер секций
- `CtaButton.tsx` — кнопка с вариантами
- `TextLinkCta.tsx` — текстовая ссылка
- `DropdownMenu.tsx` — выпадающее меню

**Функционал:**
- Глобальная навигация по сайту
- Мобильное бургер-меню
- Dropdown "Услуги" с 4 лендингами
- 3D Glass Design стили
- Адаптивность (mobile-first)

---

### Этап 3: Главная страница
**Статус:** ✅ Завершён

**Созданные компоненты (10 шт.):**
1. `Hero.tsx` — первый экран с value proposition
2. `ProblemStatement.tsx` — блок проблемы
3. `FeatureGroup.tsx` — 4 модуля системы
4. `ProcessSteps.tsx` — 5 шагов процесса
5. `TestimonialsSection.tsx` — отзывы клиентов
6. `PricingSection.tsx` — 3 пакета услуг
7. `PlanFeaturesMatrix.tsx` — матрица сравнения
8. `BlogPreview.tsx` — превью статей
9. `CasePreview.tsx` — превью кейсов
10. `ClosingCta.tsx` — финальный CTA

**Функционал:**
- Продуктовая система Direct-line
- Scroll-reveal анимации
- 3D Glass Design
- Magic UI компоненты (Animated Gradient Text)
- Адаптивность

---

### Этап 4: Лендинги услуг
**Статус:** ✅ Завершён

**Созданные компоненты (6 шт.):**
- `ServiceHero.tsx` — Hero для услуг
- `ServiceFeatures.tsx` — фичи услуги
- `ServiceProcess.tsx` — процесс работы
- `ServicePricing.tsx` — тарифы
- `ServiceTestimonials.tsx` — отзывы
- `FaqSection.tsx` — FAQ

**Страницы (4 шт.):**
- `/services/leadgen` — Лидогенерация (148 000 ₽)
- `/services/call-center` — Call-центр (50 000 - 200 000 ₽)
- `/services/avito` — Авито (30 000 - 40 000 ₽/мес)
- `/services/recruiting` — Рекрутинг (10 000 - 1 080 000 ₽)

**Функционал:**
- Уникальный контент для каждой услуги
- Цены из документации Direct-line
- Scroll-reveal анимации
- Адаптивность

---

### Этап 5: Блог и Кейсы (CMS)
**Статус:** ✅ Завершён

**Созданные компоненты (10 шт.):**
- `BlogCard.tsx`, `BlogIndex.tsx`, `BlogPostLayout.tsx`, `InlineCta.tsx`
- `CaseCard.tsx`, `CasesIndex.tsx`, `CaseDetailLayout.tsx`
- `StatsBlock.tsx`, `ToolsList.tsx`, `RelatedContent.tsx`

**Страницы (4 шт.):**
- `/blog` — список статей
- `/blog/[slug]` — детальная статья
- `/cases` — список кейсов
- `/cases/[slug]` — детальный кейс

**Контент (MDX):**
- 2 статьи блога
- 2 кейса

**Функционал:**
- CMS на MDX (next-mdx-remote)
- Детальные страницы с контентом
- Связанные материалы
- Scroll-reveal анимации

---

### Этап 6: Безопасность и юридические страницы
**Статус:** ✅ Завершён

**Созданные компоненты (3 шт.):**
- `SecurityPageLayout.tsx` — страница безопасности
- `LegalPageLayout.tsx` — юридические страницы
- `ContactPage.tsx` — контакты
- `AboutPage.tsx` — страница о компании

**Страницы (6 шт.):**
- `/security` — безопасность данных
- `/legal/terms` — условия оказания услуг
- `/legal/privacy` — политика конфиденциальности
- `/contact` — контакты
- `/about` — о компании (команда, карусель)
- `/404` — кастомная страница ошибки

**Контент:**
- Безопасность: хранение данных, CRM, гарантии, FAQ
- Terms: публичная оферта (8 разделов)
- Privacy: политика конфиденциальности (11 разделов, 152-ФЗ)

---

### Этап 7: Формы и интеграции с CRM
**Статус:** ✅ Завершён

**Созданные компоненты (5 шт.):**
- `ContactForm.tsx` — полная форма с валидацией
- `LeadForm.tsx` — упрощённая форма для модальных окон
- `Modal.tsx` — модальное окно
- `ContactPageContent.tsx` — страница контактов

**Утилиты (3 шт.):**
- `analytics/events.ts` — типы событий
- `analytics/track.ts` — функции трекинга
- `hooks/use-utm.ts` — хук для UTM-меток

**API:**
- `/api/submit-lead` — обработка заявок

**Функционал:**
- Валидация через React Hook Form
- UTM-трекинг
- Трекинг событий (form_submit, form_error, modal_open, modal_close, cta_click)
- Поддержка Яндекс.Метрики и Google Analytics
- API endpoint с логированием

---

### Этап 8: Финальная проверка и оптимизация
**Статус:** ✅ Завершён

**SEO оптимизация:**
- ✅ Metadata на всех страницах
- ✅ `robots.txt` создан
- ✅ `sitemap.xml` сгенерирован
- ✅ Open Graph мета-теги

**Performance:**
- ✅ next/image оптимизация
- ✅ Lazy loading
- ✅ Bundle size в норме

**Доступность (A11y):**
- ✅ ARIA-атрибуты
- ✅ Keyboard navigation
- ✅ Focus states

**Финальная проверка:**
- ✅ Все 15 страниц работают
- ✅ Формы валидируются и отправляются
- ✅ Сборка проходит успешно (`npm run build`)

---

## 📊 Итоговая статистика

| Категория | Количество |
|-----------|------------|
| **Контентных страниц** | 15 |
| **Технических файлов** | 3 (layout, not-found, sitemap) |
| **Компонентов** | 60+ |
| **MDX файлов** | 7 |
| **API endpoints** | 1 |
| **UI библиотек** | Magic UI (3 компонента) |
| **Этапов** | 8 |

---

## 🎨 Дизайн-система

### Цветовая палитра
```css
--color-primary: #7274B3    /* Основной акцент */
--color-secondary: #293349  /* Тёмный фон */
--color-accent: #5A4D7A     /* Вторичный акцент */
--color-dark: #090909       /* Глубокий чёрный */
--color-light: #EDECED      /* Светлый текст */
--color-gray: #323131       /* Нейтральный */
--color-purple: #3C3353     /* Фиолетовый */
```

### Стиль: 3D Glass Design
- Полупрозрачные стеклянные поверхности
- Мягкие градиенты и преломления света
- Объёмные формы с глубиной
- Размытие фона (backdrop blur)
- Тонкие световые блики на гранях

### Анимации
- **Scroll-reveal** — появление элементов при скролле
- **Float** — плавающие декоративные элементы
- **Fade-in** — плавное появление
- **Magic UI** — Animated Gradient Text, Shiny Text

---

## 🔧 Технологии

### Основные
- **Next.js 14** — React фреймворк с App Router
- **TypeScript** — типизация
- **Tailwind CSS** — стилизация
- **Framer Motion** — анимации
- **MDX** — контент (блог, кейсы)

### Библиотеки
- **next-mdx-remote** — рендеринг MDX
- **react-hook-form** — валидация форм
- **clsx, tailwind-merge** — утилиты классов
- **Magic UI** — UI компоненты

### Инструменты
- **ESLint** — линтинг кода
- **TypeScript** — проверка типов
- **Next.js Image** — оптимизация изображений

---

## 📈 Метрики

### Performance (ожидаемые)
- **First Contentful Paint:** < 1.5s
- **Largest Contentful Paint:** < 2.5s
- **Time to Interactive:** < 3.5s
- **Cumulative Layout Shift:** < 0.1

### SEO
- **Metadata:** ✅ Все страницы
- **Open Graph:** ✅ Все страницы
- **Sitemap:** ✅ sitemap.xml
- **Robots.txt:** ✅ Создан

### Accessibility
- **ARIA labels:** ✅ Кнопки, формы
- **Keyboard navigation:** ✅ Tab, Enter, Esc
- **Focus states:** ✅ Все интерактивные элементы

---

## 🚀 Запуск проекта

### Требования
- Node.js 18+
- npm или pnpm

### Установка
```bash
npm install
```

### Запуск (development)
```bash
npm run dev
```

### Сборка (production)
```bash
npm run build
npm start
```

### Проверка типов
```bash
npm run type-check
```

---

## 📁 Ключевые файлы

### Конфигурация
- `next.config.js` — настройка Next.js
- `tailwind.config.js` — настройка Tailwind
- `tsconfig.json` — настройка TypeScript
- `package.json` — зависимости

### Стили
- `src/styles/globals.css` — глобальные стили с 3D Glass эффектами

### Контент
- `src/content/blog/` — статьи блога
- `src/content/cases/` — кейсы
- `src/content/pages/` — статические страницы

### API
- `src/app/api/submit-lead/route.ts` — обработка форм

---

## 📝 Документация

### Внутренняя документация
- `docs/analysis_kero_directline.md` — анализ референса Kero
- `docs/about_company/` — документация компании
- `docs/plan/implementation-plan.md` — план разработки

### Проектная документация
- `README.md` — описание проекта
- `FINAL_CHECKLIST.md` — чеклист готовности
- `DEVELOPMENT_REPORT.md` — этот документ

---

## ✅ Чеклист готовности

| Критерий | Статус |
|----------|--------|
| Все страницы работают без ошибок | ✅ |
| SEO настроен (metadata, sitemap, robots.txt) | ✅ |
| Адаптивность работает на всех страницах | ✅ |
| Формы отправляются и валидируются | ✅ |
| Нет console.error в браузере | ✅ |
| Сборка проходит успешно (`npm run build`) | ✅ |
| 3D Glass Design реализован | ✅ |
| Scroll-reveal анимации работают | ✅ |
| Magic UI компоненты интегрированы | ✅ |
| UTM-трекинг настроен | ✅ |
| Аналитика событий работает | ✅ |

---

## 🎉 Проект готов к production!

**Сайт доступен:** http://localhost:3000

**Дата завершения:** 24 марта 2026  
**Команда разработки:** AI-ассистент (Qwen Code)  
**Статус:** ✅ Готово
