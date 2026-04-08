# План реализации системы сайтов М.И.Т.А.

## Часть 1 — Архитектура и маршруты

### 1.1. Обзор системы

Система сайтов М.И.Т.А. строится как **продуктовая платформа** с единой архитектурой, состоящая из:
- Главного лендинга (продуктовая система «под ключ»)
- 4 лендингов услуг (Лидогенерация, Call-центр, Авито, Рекрутинг)
- Блога (контент-маркетинг, TOFU/MOFU/BOFU воронка)
- Кейсов (доказательная база с цифрами)
- Страницы безопасности (юридические и технические аспекты)
- Контактов и юридических страниц

**Референс:** Шаблон Kero (Framer) — современная структура AI/SaaS лендинга с переиспользуемыми компонентами, CMS для блога и четкой иерархией CTA.

---

### 1.2. Карта страниц и URL-структура

#### Основные страницы

| Страница | URL | Тип | Описание |
|----------|-----|-----|----------|
| **Главная** | `/` | Лендинг | Продуктовая система «под ключ» |
| **Лидогенерация** | `/services/leadgen` | Лендинг услуги | Модуль лидогенерации |
| **Call-центр** | `/services/call-center` | Лендинг услуги | Модуль обработки лидов |
| **Авито** | `/services/avito` | Лендинг услуги | Модуль продвижения на Авито |
| **Рекрутинг** | `/services/recruiting` | Лендинг услуги | Модуль подбора персонала |
| **Блог (индекс)** | `/blog` | CMS-индекс | Список статей с фильтрами |
| **Статья блога** | `/blog/{slug}` | CMS-деталь | Детальная страница статьи |
| **Кейсы (индекс)** | `/cases` | CMS-индекс | Список кейсов с фильтрами |
| **Кейс (деталь)** | `/cases/{slug}` | CMS-деталь | Детальная страница кейса |
| **Безопасность** | `/security` | Статичная | Безопасность данных и юридические аспекты |
| **Контакты** | `/contact` | Статичная | Форма связи и реквизиты |
| **Условия (Terms)** | `/legal/terms` | Статичная | Условия оказания услуг |
| **Конфиденциальность** | `/legal/privacy` | Статичная | Политика конфиденциальности |
| **404** | `/404` | Системная | Страница ошибки |

---

### 1.3. Навигация и Cross-linking

#### Header (глобальное меню)

**Структура:**
```
Logo [М.И.Т.А.]
├── Система (якорь на главной → #system)
├── Услуги (dropdown)
│   ├── Лидогенерация → /services/leadgen
│   ├── Call-центр → /services/call-center
│   ├── Авито → /services/avito
│   └── Рекрутинг → /services/recruiting
├── Кейсы → /cases
├── Блог → /blog
├── Безопасность → /security
└── CTA: «Оставить заявку» → /contact (или модальная форма)
```

#### Footer (глобальный подвал)

**Колонки:**
```
1. О компании
   - Логотип
   - Краткий слоган
   - Контакты

2. Услуги
   - Лидогенерация
   - Call-центр
   - Авито
   - Рекрутинг

3. Ресурсы
   - Блог
   - Кейсы
   - Безопасность

4. Юридическое
   - Условия оказания услуг
   - Политика конфиденциальности
   - 404

5. Соцсети
   - Telegram
   - WhatsApp
   - Email
```

#### Cross-linking стратегия

| Откуда | Куда | Цель |
|--------|------|------|
| Главная → Услуги | `/services/{service}` | Раскрытие модулей системы |
| Главная → Кейсы | `/cases` | Доказательная база |
| Главная → Блог | `/blog` | Контент-маркетинг |
| Услуги → Кейсы | `/cases?service={service}` | Кейсы по конкретной услуге |
| Услуги → Главная | `/` | Возврат к системе |
| Блог → Услуги | `/services/{service}` | Конверсия из контента |
| Кейсы → Услуги | `/services/{service}` | Конверсия из доказательства |
| Все страницы → Контакты | `/contact` | Финальная конверсия |

---

### 1.4. Типы страниц и их назначение

#### Лендинги (Главная + Услуги)

**Назначение:** Конверсия посетителя в заявку (демо, расчёт, консультация).

**Паттерн:**
1. Hero с value proposition
2. Проблема/контекст
3. Решение/фичи
4. Процесс работы
5. Кейсы/отзывы
6. Цены/пакеты
7. FAQ
8. Финальный CTA с формой

#### CMS-индексы (Блог, Кейсы)

**Назначение:** Каталоги контента с фильтрацией и навигацией.

**Паттерн:**
1. Header с заголовком и описанием
2. Фильтры/табы по категориям
3. Сетка карточек
4. Пагинация / «Загрузить ещё»

#### CMS-детали (Статья блога, Кейс)

**Назначение:** Глубокое погружение в контент с встроенными CTA.

**Паттерн:**
1. Hero с заголовком и мета-данными
2. Основной контент (H2/H3, списки, таблицы)
3. Встроенные CTA (после 30-40% текста)
4. Связанные материалы
5. Финальный CTA

#### Статичные страницы (Безопасность, Контакты, Юридические)

**Назначение:** Информация, доверие, юридическое соответствие.

**Паттерн:**
1. Header с заголовком
2. Структурированный контент (секции H2/H3)
3. FAQ (где уместно)
4. CTA (где уместно)

---

**Продолжение в следующей части →**

---

## Часть 2 — Компонентная карта и план реализации

### 2.1. Компонентная карта

Ниже перечислены все ключевые компоненты системы с их параметрами (пропсами) и областями применения.

#### 2.1.1. Layout-компоненты

| Компонент | Назначение | Пропсы | Используется |
|-----------|------------|--------|--------------|
| **Layout** | Базовая обёртка страницы | `children`, `className` | Все страницы |
| **Header** | Глобальная навигация | `logoSrc`, `menuItems[]`, `primaryCtaLabel`, `primaryCtaUrl`, `dropdownItems[]` | Все страницы |
| **Footer** | Глобальный подвал | `columns[]` (title, links[]), `brandText`, `socialLinks[]`, `legalLinks[]` | Все страницы |
| **Section** | Контейнер секции | `children`, `className`, `variant` (default/alt/dark) | Все страницы |

---

#### 2.1.2. Контентные блоки

| Компонент | Назначение | Пропсы | Используется |
|-----------|------------|--------|--------------|
| **Hero** | Первый экран, value proposition | `eyebrow`, `title`, `subtitle`, `primaryCtaLabel`, `primaryCtaUrl`, `secondaryCtaLabel?`, `secondaryCtaUrl?`, `mediaType`, `mediaSrc` | Главная, все лендинги услуг |
| **ProblemStatement** | Блок проблемы/контекста | `title`, `description`, `painPoints[]` (bullet list) | Главная, лендинги услуг |
| **FeatureGroup** | Группа фич (3-4 карточки) | `groupTitle`, `groupIntro`, `items[]` (name, label, description, icon?, ctaLabel?, ctaUrl?), `groupCtaLabel?`, `groupCtaUrl?` | Главная, лендинги услуг |
| **ProcessSteps** | Пошаговый процесс | `title`, `steps[]` (number, title, description, kpi?) | Главная, лендинги услуг, кейсы |
| **TestimonialsSection** | Секция отзывов | `title`, `intro`, `items[]` (name, role, company, quote, avatar?) | Главная, лендинги услуг, кейсы |
| **PricingSection** | Секция тарифов/пакетов | `title`, `intro`, `plans[]` (name, description, price, billingPeriod, features[], ctaLabel, ctaUrl, isHighlighted?) | Главная, лендинги услуг |
| **PlanFeaturesMatrix** | Матрица сравнения планов | `plans[]`, `features[]`, `values[plan][feature]` | Главная, лендинги услуг |
| **BlogPreview** | Превью блога | `title`, `postsLimit`, `posts[]` (title, slug, date, author, category, excerpt?) | Главная |
| **CasePreview** | Превью кейсов | `title`, `casesLimit`, `cases[]` (title, industry, resultSummary, services[], slug) | Главная |
| **ClosingCta** | Финальный CTA-блок | `title`, `description`, `primaryCtaLabel`, `primaryCtaUrl`, `secondaryCtaLabel?`, `secondaryCtaUrl?`, `mediaSrc?` | Главная, лендинги услуг, статьи, кейсы |

---

#### 2.1.3. Карточки

| Компонент | Назначение | Пропсы | Используется |
|-----------|------------|--------|--------------|
| **FeatureCard** | Карточка фичи | `name`, `label`, `description`, `icon?`, `ctaLabel?`, `ctaUrl?` | FeatureGroup |
| **TestimonialCard** | Карточка отзыва | `name`, `role`, `company`, `quote`, `avatar?` | TestimonialsSection |
| **PricingCard** | Карточка тарифа | `name`, `description`, `price`, `billingPeriod`, `features[]`, `ctaLabel`, `ctaUrl`, `isHighlighted?` | PricingSection |
| **BlogCard** | Карточка статьи | `title`, `slug`, `date`, `author`, `category`, `excerpt?`, `coverImage?` | BlogPreview, BlogIndex |
| **CaseCard** | Карточка кейса | `title`, `industry`, `resultSummary`, `services[]`, `slug`, `coverImage?` | CasePreview, CasesIndex |

---

#### 2.1.4. Формы и интерактив

| Компонент | Назначение | Пропсы | Используется |
|-----------|------------|--------|--------------|
| **ContactForm** | Форма заявки/контактов | `title`, `intro`, `fields[]`, `submitLabel`, `successMessage`, `onSubmit` | /contact, модальные окна, финальные CTA |
| **CtaButton** | Универсальная кнопка | `label`, `url`, `variant` (primary/secondary), `size` (sm/md/lg), `onClick?` | Все страницы |
| **TextLinkCta** | Текстовая ссылка-CTA | `label`, `url`, `icon?` | FeatureGroup, ProcessSteps |
| **DropdownMenu** | Выпадающее меню | `triggerLabel`, `items[]` (label, url), `align` (left/right) | Header (Услуги) |
| **Modal** | Модальное окно | `isOpen`, `onClose`, `title`, `children` | Формы в модальных окнах |

---

#### 2.1.5. CMS-компоненты (Блог, Кейсы)

| Компонент | Назначение | Пропсы | Используется |
|-----------|------------|--------|--------------|
| **BlogIndex** | Страница списка статей | `title`, `subtitle`, `categories[]`, `posts[]` | /blog |
| **BlogPostLayout** | Layout статьи блога | `title`, `author`, `date`, `category`, `coverImage?`, `content`, `inlineCtas[]`, `relatedPosts[]`, `relatedCases[]` | /blog/{slug} |
| **CasesIndex** | Страница списка кейсов | `title`, `subtitle`, `filters[]` (service, industry), `cases[]` | /cases |
| **CaseDetailLayout** | Layout детальной страницы кейса | `heroFields`, `contextBlocks[]`, `processSteps[]`, `resultStats[]`, `toolsList[]`, `quotes[]`, `ctaBlock` | /cases/{slug} |

---

#### 2.1.6. Специализированные компоненты

| Компонент | Назначение | Пропсы | Используется |
|-----------|------------|--------|--------------|
| **SecurityPageLayout** | Страница безопасности | `sections[]` (title, content, bullets?), `faq[]`, `ctaBlock` | /security |
| **LegalPageLayout** | Юридические страницы | `title`, `lastUpdated`, `toc[]`, `sections[]` | /legal/terms, /legal/privacy |
| **FaqSection** | Секция FAQ | `title`, `items[]` (question, answer) | Лендинги услуг, /security |
| **StatsBlock** | Блок статистики/KPI | `stats[]` (label, value, prefix?, suffix?), `variant` (horizontal/vertical) | Кейсы, Главная |
| **ToolsList** | Список инструментов/интеграций | `title`, `tools[]` (name, icon?, description?) | Кейсы, Главная |

---

### 2.2. План реализации по этапам

#### Этап 1: Базовая настройка проекта и маршруты

**Задачи:**
- [ ] Инициализация проекта (Next.js/React + TypeScript + Tailwind CSS)
- [ ] Настройка структуры папок (pages/, components/, lib/, content/)
- [ ] Настройка маршрутизации (app router или pages router)
- [ ] Настройка базовых layout (MainLayout, BlogLayout, CaseLayout)
- [ ] Настройка CMS-подхода (Markdown/MDX или headless CMS)
- [ ] Настройка линтинга (ESLint, Prettier)
- [ ] Настройка алиасов импортов (@components, @lib, @content)

**Skills/Агенты:**
- `general-purpose` — генерация базовой структуры проекта
- `build-error-resolver` — решение проблем сборки TypeScript
- `doc-updater` — документация структуры проекта

---

#### Этап 2: Создание каркаса Layout, Header, Footer

**Задачи:**
- [ ] Реализация компонента Layout (обёртка с metadata)
- [ ] Реализация Header с dropdown-меню (Услуги)
- [ ] Реализация Footer с колонками ссылок
- [ ] Реализация компонента Section (контейнер с вариантами)
- [ ] Реализация CtaButton (variants: primary/secondary)
- [ ] Реализация TextLinkCta
- [ ] Тестирование адаптивности Header/Footer

**Skills/Агенты:**
- `general-purpose` — генерация компонентов
- `tdd-guide` — написание тестов для компонентов
- `e2e-runner` — E2E тесты навигации

---

#### Этап 3: Реализация главного лендинга

**Задачи:**
- [ ] Hero компонент (eyebrow, title, subtitle, 2 CTA, media)
- [ ] ProblemStatement компонент (боли аудитории)
- [ ] FeatureGroup компонент (4 модуля: Лидогенерация, Call-центр, Авито, Рекрутинг)
- [ ] ProcessSteps компонент (5 шагов системы)
- [ ] TestimonialsSection компонент (отзывы клиентов)
- [ ] PricingSection компонент (3 пакета: Start, Growth, Scale)
- [ ] PlanFeaturesMatrix компонент (матрица сравнения)
- [ ] BlogPreview компонент (3-4 последние статьи)
- [ ] CasePreview компонент (2-3 кейса)
- [ ] ClosingCta компонент (финальная форма)
- [ ] Сборка главной страницы из компонентов
- [ ] Наполнение контентом из документации М.И.Т.А.

**Skills/Агенты:**
- `general-purpose` — генерация компонентов главной
- `code-reviewer` — review архитектуры компонентов
- `tdd-guide` — тесты компонентов

---

#### Этап 4: Реализация лендингов услуг

**Задачи:**
- [ ] Шаблон лендинга услуги (LayoutService)
- [ ] Адаптация Hero под каждую услугу
- [ ] Адаптация FeatureGroup под каждую услугу
- [ ] ProcessSteps для услуг
- [ ] CasePreview с фильтрацией по услуге
- [ ] PricingSection для услуг (пакеты/тарифы)
- [ ] FaqSection компонент
- [ ] ClosingCta для услуг
- [ ] Создание 4 страниц: /services/leadgen, /services/call-center, /services/avito, /services/recruiting
- [ ] Наполнение контентом из products-services.md

**Skills/Агенты:**
- `general-purpose` — генерация страниц услуг
- `code-reviewer` — review переиспользования компонентов

---

#### Этап 5: Блог и Кейсы (CMS)

**Задачи:**
- [ ] Настройка CMS-коллекции для блога (Markdown/MDX файлы)
- [ ] Настройка CMS-коллекции для кейсов (Markdown/MDX файлы)
- [ ] BlogIndex страница (список статей с фильтрами)
- [ ] BlogCard компонент
- [ ] BlogPostLayout (детальная страница статьи)
- [ ] InlineCta компонент (встроенный CTA в статьях)
- [ ] CasesIndex страница (список кейсов с фильтрами)
- [ ] CaseCard компонент
- [ ] CaseDetailLayout (детальная страница кейса)
- [ ] StatsBlock компонент (цифры «до/после»)
- [ ] ToolsList компонент (инструменты в кейсе)
- [ ] RelatedContent компонент (связанные материалы)

**Skills/Агенты:**
- `general-purpose` — CMS-интеграция
- `doc-updater` — документация CMS-структуры

---

#### Этап 6: Секция безопасности и юридические страницы

**Задачи:**
- [ ] SecurityPageLayout компонент
- [ ] Страница /security (контент из analysis_kero_mita.md)
- [ ] LegalPageLayout компонент
- [ ] Страница /legal/terms (Условия оказания услуг)
- [ ] Страница /legal/privacy (Политика конфиденциальности)
- [ ] Страница /contact (ContactForm)
- [ ] Страница /404 (кастомная)

**Skills/Агенты:**
- `general-purpose` — генерация страниц
- `security-reviewer` — проверка на соответствие best practices

---

#### Этап 7: Формы и интеграции с CRM/аналитикой

**Задачи:**
- [ ] ContactForm компонент (валидация, отправка)
- [ ] Modal компонент (модальные окна для форм)
- [ ] Интеграция форм с CRM (Bitrix24 API или webhook)
- [ ] Настройка UTM-трекинга (скрытые поля в формах)
- [ ] Настройка событий аналитики (lead_created, form_submit)
- [ ] Настройка сквозной аналитики (концептуально)
- [ ] Тестирование форм (отправка, валидация, success message)

**Skills/Агенты:**
- `general-purpose` — интеграция с API
- `security-reviewer` — проверка безопасности форм (XSS, CSRF)
- `database-reviewer` — если нужно локальное хранение лидов

---

#### Этап 8: Адаптивность и финальные UX-улучшения

**Задачи:**
- [ ] Адаптивность Hero (мобильная версия)
- [ ] Адаптивность FeatureGroup (3-2-1 колонки)
- [ ] Адаптивность PricingSection (карточки в столбец)
- [ ] Адаптивность таблиц (PlansFeaturesMatrix → карточки)
- [ ] Адаптивность Header (бургер-меню)
- [ ] Адаптивность Footer (аккордеон для колонок)
- [ ] Оптимизация изображений (next/image, lazy loading)
- [ ] SEO-оптимизация (metadata, Open Graph, sitemap.xml)
- [ ] Доступность (A11y: aria-labels, keyboard navigation)
- [ ] Performance оптимизация (Lighthouse score)

**Skills/Агенты:**
- `e2e-runner` — E2E тесты на разных viewport
- `code-reviewer` — review accessibility
- `security-reviewer` — финальная проверка безопасности

---

## Часть 3 — Интеграции, структура проекта и дальнейшие шаги

### 3.1. Интеграции (формы, CRM, аналитика, MCP)

#### 3.1.1. Точки интеграции форм

| Страница | Форма | Данные | Куда отправляется |
|----------|-------|--------|-------------------|
| **Главная** | Hero CTA (модальная) | Имя, Телефон, Email, Компания | CRM (Bitrix24) + Email |
| **Главная** | Финальный CTA | Имя, Телефон, Отрасль, Задача | CRM + Email |
| **Лендинги услуг** | Форма под тарифами | Имя, Телефон, Выбранный тариф, Комментарий | CRM + Email |
| **Лендинги услуг** | Финальный CTA | Имя, Телефон, Задача | CRM + Email |
| **Блог** | Inline CTA (лид-магнит) | Имя, Email, Компания | CRM + Email рассылка |
| **Кейсы** | Форма «Получить такой же результат» | Имя, Телефон, Компания, Ссылка на кейс | CRM + Менеджеру |
| **Контакты** | Общая форма | Имя, Телефон, Email, Тема, Сообщение | CRM + Email |

**Общие поля для всех форм (скрытые):**
- `utm_source`, `utm_medium`, `utm_campaign`, `utm_content`
- `referrer` (текущий URL)
- `form_name` (идентификатор формы)
- `timestamp`

---

#### 3.1.2. События для CRM и аналитики

**События первого уровня (конверсии):**

| Событие | Триггер | Данные |
|---------|---------|--------|
| `lead_created` | Отправка любой формы | Все поля формы + UTM |
| `lead_qualified` | Менеджер квалифицировал лид (в CRM) | Статус из CRM |
| `deal_created` | Создана сделка (в CRM) | ID сделки, сумма, этап |
| `deal_won` | Сделка закрыта (в CRM) | Сумма, дата закрытия |

**События второго уровня (вовлечённость):**

| Событие | Триггер | Данные |
|---------|---------|--------|
| `cta_click` | Клик по CTA-кнопке | Label, URL, страница |
| `form_start` | Начало заполнения формы | Form name, страница |
| `form_abandon` | Закрытие формы без отправки | Form name, заполненные поля |
| `file_download` | Скачивание файла (PDF, презентация) | Filename, страница |
| `video_play` | Запуск видео | Video ID, страница |
| `scroll_depth` | Достижение глубины скролла 50%/75%/90% | Страница, глубина |

---

#### 3.1.3. MCP-интеграции (рекомендации)

**MCP-серверы, которые могут быть полезны:**

| MCP-сервер | Назначение | Интеграция |
|------------|------------|------------|
| **CRM MCP** | Доступ к Bitrix24 API | Создание лидов, сделок, контактов |
| **Analytics MCP** | Сквозная аналитика | Отправка событий, получение данных о конверсиях |
| **Logging MCP** | Логирование действий | Запись всех форм, ошибок, событий |
| **Knowledge Base MCP** | База знаний компании | Поиск ответов для FAQ, обучение ИИ-ассистентов |
| **Email MCP** | Отправка email | Уведомления менеджерам, автоответы клиентам |

**Пример использования MCP для форм:**
```typescript
// При отправке формы:
await mcp.crm.createLead({
  name: formData.name,
  phone: formData.phone,
  email: formData.email,
  company: formData.company,
  service: formData.service,
  utm_source: formData.utm_source,
  // ...
});

await mcp.logging.log({
  event: 'lead_created',
  formName: formData.form_name,
  page: window.location.pathname,
  timestamp: new Date().toISOString(),
});

await mcp.email.send({
  to: 'manager@mita.ru',
  subject: `Новый лид: ${formData.name}`,
  body: `Лид из формы "${formData.form_name}"...`,
});
```

---

### 3.2. Структура проекта (высокоуровневая)

```
company_site/
├── app/                          # Next.js App Router
│   ├── (main)/                   # Основная layout-группа
│   │   ├── page.tsx              # Главная страница
│   │   ├── services/
│   │   │   ├── leadgen/
│   │   │   │   └── page.tsx      # Лендинг Лидогенерации
│   │   │   ├── call-center/
│   │   │   │   └── page.tsx      # Лендинг Call-центра
│   │   │   ├── avito/
│   │   │   │   └── page.tsx      # Лендинг Авито
│   │   │   └── recruiting/
│   │   │       └── page.tsx      # Лендинг Рекрутинга
│   │   ├── cases/
│   │   │   ├── page.tsx          # Индекс кейсов
│   │   │   └── [slug]/
│   │   │       └── page.tsx      # Детальная страница кейса
│   │   ├── blog/
│   │   │   ├── page.tsx          # Индекс блога
│   │   │   └── [slug]/
│   │   │       └── page.tsx      # Детальная страница статьи
│   │   ├── security/
│   │   │   └── page.tsx          # Страница безопасности
│   │   ├── contact/
│   │   │   └── page.tsx          # Страница контактов
│   │   └── legal/
│   │       ├── terms/
│   │       │   └── page.tsx      # Условия оказания услуг
│   │       └── privacy/
│   │           └── page.tsx      # Политика конфиденциальности
│   ├── layout.tsx                # Root layout
│   └── not-found.tsx             # 404 страница
│
├── components/
│   ├── layout/
│   │   ├── Layout.tsx            # Базовая обёртка
│   │   ├── Header.tsx            # Header с dropdown
│   │   ├── Footer.tsx            # Footer с колонками
│   │   └── Section.tsx           # Контейнер секции
│   ├── blocks/
│   │   ├── Hero.tsx
│   │   ├── ProblemStatement.tsx
│   │   ├── FeatureGroup.tsx
│   │   ├── ProcessSteps.tsx
│   │   ├── TestimonialsSection.tsx
│   │   ├── PricingSection.tsx
│   │   ├── PlanFeaturesMatrix.tsx
│   │   ├── BlogPreview.tsx
│   │   ├── CasePreview.tsx
│   │   └── ClosingCta.tsx
│   ├── cards/
│   │   ├── FeatureCard.tsx
│   │   ├── TestimonialCard.tsx
│   │   ├── PricingCard.tsx
│   │   ├── BlogCard.tsx
│   │   └── CaseCard.tsx
│   ├── forms/
│   │   ├── ContactForm.tsx
│   │   ├── LeadForm.tsx          # Универсальная форма лида
│   │   └── Modal.tsx
│   ├── ui/
│   │   ├── CtaButton.tsx
│   │   ├── TextLinkCta.tsx
│   │   ├── DropdownMenu.tsx
│   │   ├── FaqSection.tsx
│   │   ├── StatsBlock.tsx
│   │   └── ToolsList.tsx
│   └── cms/
│       ├── BlogIndex.tsx
│       ├── BlogPostLayout.tsx
│       ├── CasesIndex.tsx
│       ├── CaseDetailLayout.tsx
│       ├── SecurityPageLayout.tsx
│       └── LegalPageLayout.tsx
│
├── content/
│   ├── blog/
│   │   ├── _index.mdx            # Мета-данные блога
│   │   ├── leadgen-guide.mdx
│   │   └── ...                   # Статьи блога
│   ├── cases/
│   │   ├── _index.mdx            # Мета-данные кейсов
│   │   ├── autoschool-case.mdx
│   │   └── ...                   # Кейсы
│   └── pages/
│       ├── security.mdx          # Контент страницы безопасности
│       ├── terms.mdx             # Условия
│       └── privacy.mdx           # Конфиденциальность
│
├── lib/
│   ├── api/
│   │   ├── crm.ts                # Bitrix24 API client
│   │   ├── analytics.ts          # Аналитика events
│   │   └── forms.ts              # Обработка форм
│   ├── cms/
│   │   ├── blog.ts               # Функции для блога
│   │   └── cases.ts              # Функции для кейсов
│   ├── utils/
│   │   ├── cn.ts                 # className utility
│   │   └── format.ts             # Форматирование данных
│   └── config/
│       ├── navigation.ts         # Конфигурация меню
│       ├── services.ts           # Конфигуание услуг
│       └── site.ts               # Общие настройки сайта
│
├── public/
│   ├── images/
│   │   ├── hero/
│   │   ├── services/
│   │   ├── cases/
│   │   └── blog/
│   ├── icons/
│   │   └── ...                   # SVG иконки
│   └── files/
│       └── ...                   # PDF, презентации
│
├── styles/
│   └── globals.css               # Глобальные стили + Tailwind
│
├── types/
│   ├── blog.ts                   # TypeScript типы для блога
│   ├── cases.ts                  # Типы для кейсов
│   ├── forms.ts                  # Типы для форм
│   └── services.ts               # Типы для услуг
│
├── .env.local                    # Переменные окружения
├── next.config.js
├── tailwind.config.js
├── tsconfig.json
├── package.json
└── README.md
```

---

### 3.3. Файлы для автоматической генерации

**Что можно генерировать автоматически:**

| Файл/Структура | Как генерировать | Данные из |
|----------------|------------------|-----------|
| **Страницы услуг** | Шаблон + данные из products-services.md | products-services.md |
| **Карточки услуг в FeatureGroup** | Цикл по массиву услуг | services.ts конфиг |
| **Тарифные карточки** | Цикл по тарифам | products-services.md (цены) |
| **FAQ для услуг** | Шаблон + вопросы | analysis_kero_mita.md |
| **Мета-теги страниц** | Шаблон + данные | company-overview.md |
| **Sitemap.xml** | Автоматически из маршрутов | app/ структура |
| **Open Graph изображения** | Генерация через API | Заголовки страниц |

---

### 3.4. Рекомендуемые Skills/Агенты для следующих шагов

| Этап | Skill/Агент | Задача |
|------|-------------|--------|
| **Этап 1** | `general-purpose` | Генерация структуры проекта, настройка Next.js |
| **Этап 1** | `build-error-resolver` | Решение проблем TypeScript/сборки |
| **Этап 2-4** | `general-purpose` | Генерация компонентов лендингов |
| **Этап 2-4** | `tdd-guide` | Написание тестов для компонентов |
| **Этап 5** | `general-purpose` | CMS-интеграция (MDX/Markdown) |
| **Этап 6** | `security-reviewer` | Проверка безопасности страниц |
| **Этап 7** | `general-purpose` | Интеграция с Bitrix24 API |
| **Этап 7** | `security-reviewer` | Проверка форм на XSS/CSRF уязвимости |
| **Этап 8** | `e2e-runner` | E2E тесты на разных viewport |
| **Этап 8** | `code-reviewer` | Review accessibility (A11y) |
| **Все этапы** | `doc-updater` | Обновление документации, codemaps |

---

### 3.5. Запрос пользователю по изображениям

---

## 🎨 Запрос на генерацию изображений для внешнего AI-агрегатора

Для завершения подготовки к реализации системы сайтов необходимо сгенерировать визуальные ассеты. Опишите, пожалуйста, следующие категории изображений:

### Категории изображений для генерации:

**1. Hero-баннеры (главная + 4 лендинга услуг):**
- Главный лендинг: абстрактная схема «воронки» (лидогенерация → звонки → заявки → продажи → рекрутинг)
- Лидогенерация: визуализация потока заявок/лидов (цифровой, технологичный стиль)
- Call-центр: операторы за работой, гарнитуры, интерфейс CRM (реализм или стилизация)
- Авито: скриншот/стилизация объявлений Авито, массовое размещение
- Рекрутинг: процесс найма, собеседования, команда (корпоративный стиль)

**2. Иллюстрации для секций:**
- Feature-блоки (4 модуля системы): иконки/мини-иллюстрации для каждой услуги
- Process Steps: пошаговая схема (5 шагов) в едином стиле
- Stats Block: иконки/визуалы для цифр (рост, конверсия, сроки)

**3. Обложки для блога:**
- Шаблоны обложек для статей (TOFU/MOFU/BOFU)
- Категории: Лидогенерация, Call-центр, Авито, Рекрутинг, CRM/Аналитика

**4. Визуалы для кейсов:**
- Обложки кейсов (до/после, графики, диаграммы)
- Иконки инструментов/интеграций (Bitrix24, телефония, рекламные платформы)

**5. Иконки безопасности:**
- Щит/защита данных
- Шифрование/VPN
- Ролевой доступ
- Бэкапы/хранение

**6. Фоновые изображения:**
- Для тёмных секций (Hero, Pricing, Closing CTA)
- Для светлых секций (Problem, Features, Testimonials)

---

### Вопросы для уточнения:

1. **Стиль:** Какой визуальный стиль вам ближе?
   - Минималистичный (плоские иконки, мало деталей)
   - Техничный/технологичный (градиенты, неон, киберпанк)
   - Иллюстративный (рисованные иллюстрации, изометрия)
   - Фотореализм (реальные фото людей, офисов, интерфейсов)
   - Комбинированный (например, минимализм для иконок + реализм для hero)

2. **Цветовая палитра:** Есть ли предпочтения по цветам?
   - Основной акцентный цвет (для CTA, иконок)
   - Тёмная/светлая тема (или обе)
   - Корпоративные цвета М.И.Т.А. (если есть брендбук)

3. **Форматы:** Какие форматы нужны?
   - PNG/JPG для веба
   - SVG для иконок
   - Исходники (PSD, AI) для редактирования

4. **AI-генератор:** Какой инструмент предпочитаете использовать?
   - Midjourney
   - DALL-E 3
   - Kandinsky
   - Leonardo AI (уже используется в компании)
   - Другой

5. **Приоритет:** Какие изображения нужны в первую очередь?
   - Hero-баннеры (для запуска главной и лендингов)
   - Иконки услуг (для FeatureGroup)
   - Обложки для блога/кейсов
   - Всё сразу

---

**Пожалуйста, опишите:**
- Какие именно изображения вы хотите сгенерировать (по категориям выше)
- Какой стиль вам ближе (из вариантов или свой вариант)
- Есть ли референсы (примеры сайтов, которые нравятся визуально)
- Какой AI-генератор планируете использовать

Эта информация будет использована для составления точных промтов во внешнем генераторе изображений.

---

## ✅ Полученные ответы от пользователя (24 марта 2026)

| Параметр | Значение |
|----------|----------|
| **Стиль** | 3D glass дизайн (современный) |
| **Цветовая палитра** | `#7274B3`, `#293349`, `#5A4D7A`, `#090909`, `#EDECED`, `#323131`, `#3C3353` |
| **AI-генератор** | Veo 3.1, Nano Banana 2 |
| **Форматы** | PNG/JPG для веба, SVG для иконок (подразумевается) |
| **Приоритет** | Не указан (уточнить) |

---

## 🎨 Промты для генерации изображений

### Цветовая палитра для использования в промтах:
- **Основной акцент:** `#D4A84B` (золото, тёплое)
- **Светлое золото:** `#F2D07A` (hover, светлые элементы)
- **Тёмное золото:** `#B8892E` (дополнительный акцент)
- **Глубокий чёрный:** `#0A0A0A`, `#000000` (фон)
- **Чёрный поверхностей:** `#1A1A1A` (карточки, поверхности)
- **Чёрный для элементов:** `#2A2A2A` (вторичные элементы)
- **Белый текст:** `#FFFFFF` (основной текст, светлые элементы)
- **Серый текст:** `#B0B0B0` (вторичный текст)

### Стиль: 3D Glass Design
**Характеристики стиля:**
- Полупрозрачные стеклянные поверхности
- Мягкие градиенты и преломления света
- Объёмные формы с глубиной
- Размытие фона (backdrop blur)
- Тонкие световые блики на гранях
- Современный tech-эстетика

---

### Промт 1: Hero-баннер главной страницы

**Для:** Veo 3.1

```
3D glass design funnel visualization for marketing IT agency homepage hero section.
Flow from lead generation → calls → sales → recruiting as connected translucent
gold glass geometric shapes with light refraction. Color palette: #D4A84B (gold accent glass),
#0A0A0A (deep black background), #B8892E (dark gold accents), #FFFFFF (light elements).
Modern glass morphism, volumetric lighting, subtle subsurface scattering, depth of field.
Wide banner 16:9. Style: 3D glass, translucent gold-tinted surfaces, soft gradients,
warm light bloom on edges. No text, no people.
```

**Формат:** 1920x1080 или 1600x900
**Использование:** Главная страница, Hero-секция

---

### Промт 2: Hero-баннер Лидогенерация

```
3D gold glass visualization of digital lead flow for service landing page.
Abstract representation of incoming leads as flowing translucent gold glass particles
or streams converging into a glass funnel. Color palette: #D4A84B (primary gold glass),
#0A0A0A (deep black background), #FFFFFF (highlights). Modern glass morphism, volumetric
lighting, refraction, subtle motion blur. Wide banner 16:9. Style: 3D glass design,
translucent gold surfaces with warm light bloom. No text, no people.
```

**Формат:** 1920x1080
**Использование:** /services/leadgen, Hero-секция

---

### Промт 3: Hero-баннер Call-центр

```
3D gold glass design illustration of call center operators. Abstract translucent gold glass
silhouettes with headsets, geometric glass style. CRM interface as floating glass
panels with warm gold glow. Color palette: #D4A84B, #0A0A0A, #B8892E, #FFFFFF.
Modern glass morphism, volumetric lighting, depth of field. Wide banner 16:9.
Style: 3D glass, gold-tinted translucent surfaces, warm edge lighting. No detailed faces,
stylized glass representation. No text.
```

**Формат:** 1920x1080
**Использование:** /services/call-center, Hero-секция

---

### Промт 4: Hero-баннер Авито

```
3D gold glass visualization of classified ads platform. Abstract floating gold glass cards
or listings in grid, translucent with light refraction. Color palette: #D4A84B
(accent gold glass), #0A0A0A, #1A1A1A, #FFFFFF. Modern glass morphism, volumetric
lighting, depth of field. Wide banner 16:9. Style: 3D glass design, gold-tinted
translucent surfaces, warm gradients, isometric perspective optional. No text, no logos.
```

**Формат:** 1920x1080
**Использование:** /services/avito, Hero-секция

---

### Промт 5: Hero-баннер Рекрутинг

```
3D gold glass design illustration of recruitment process. Abstract translucent gold
funnel with candidate selection flow, glass people icons, interview panels.
Color palette: #D4A84B, #B8892E, #0A0A0A, #FFFFFF. Modern glass morphism,
volumetric lighting, subsurface scattering. Wide banner 16:9. Style: 3D glass,
gold-tinted translucent surfaces with warm light bloom. No detailed faces, stylized glass. No text.
```

**Формат:** 1920x1080
**Использование:** /services/recruiting, Hero-секция

---

### Промт 6: Иконки услуг (4 штуки)

**Для:** Nano Banana 2

```
Set of 4 3D gold glass service icons for marketing agency website:
1. Lead generation - translucent gold glass funnel with incoming gold particles/arrows
2. Call center - gold glass headset with sound waves
3. Classified ads (Avito) - grid of translucent gold glass cards/listings
4. Recruiting - gold glass person icon with checkmark/selection

Style: 3D glass design, gold-tinted translucent surfaces, light refraction, volumetric lighting.
Colors: #D4A84B (primary gold glass), #0A0A0A, #B8892E, #FFFFFF (accents).
Format: square icons, warm gradients, edge lighting, subsurface scattering.
No text. Consistent gold glass style across all 4 icons.
```

**Формат:** 512x512 каждая (или единым спрайтом 1024x512)
**Использование:** FeatureGroup карточки, меню, навигация

---

### Промт 7: Process Steps — Шаг 1: Аудит

```
3D gold glass magnifying glass icon for marketing agency process diagram.
Translucent gold glass audit symbol with light refraction.
Color palette: #D4A84B (gold glass), #0A0A0A (black background), #B8892E (dark gold accents).
Style: 3D glass, gold-tinted translucent surface, volumetric lighting, depth of field.
Format: square icon 256x256. No text.
```

**Формат:** 256x256
**Использование:** Шаг 1 — "Аудит и стратегия"

---

### Промт 8: Process Steps — Шаг 2: Настройка

```
3D gold glass gear/settings icon for marketing agency process diagram.
Translucent gold glass setup symbol with light refraction.
Color palette: #D4A84B, #0A0A0A, #B8892E, #FFFFFF.
Style: 3D glass, gold-tinted translucent surface, volumetric lighting.
Format: square icon 256x256. No text.
```

**Формат:** 256x256
**Использование:** Шаг 2 — "Настройка и запуск"

---

### Промт 9: Process Steps — Шаг 3: Запуск

```
3D gold glass rocket icon for marketing agency process diagram.
Translucent gold glass launch symbol with light refraction, subtle motion blur.
Color palette: #D4A84B, #0A0A0A, #B8892E, #FFFFFF.
Style: 3D glass, gold-tinted translucent surface, volumetric lighting.
Format: square icon 256x256. No text.
```

**Формат:** 256x256
**Использование:** Шаг 3 — "Привлечение лидов"

---

### Промт 10: Process Steps — Шаг 4: Масштабирование

```
3D gold glass growth chart icon for marketing agency process diagram.
Translucent gold glass scaling symbol with upward arrow, light refraction.
Color palette: #D4A84B, #0A0A0A, #B8892E, #FFFFFF.
Style: 3D glass, gold-tinted translucent surface, volumetric lighting.
Format: square icon 256x256. No text.
```

**Формат:** 256x256
**Использование:** Шаг 4 — "Масштабирование"

---

### Промт 11: Process Steps — Шаг 5: Рекрутинг

```
3D gold glass team/people icon for marketing agency process diagram.
Translucent gold glass recruiting symbol with multiple figures, light refraction.
Color palette: #D4A84B, #0A0A0A, #B8892E, #FFFFFF.
Style: 3D glass, gold-tinted translucent surface, volumetric lighting.
Format: square icon 256x256. No text.
```

**Формат:** 256x256
**Использование:** Шаг 5 — "Рекрутинг"

---

### Промт 12: Stats Block — Рост лидов

```
3D gold glass upward arrow icon for growth metric display.
Translucent gold glass arrow pointing up with light refraction.
Color palette: #D4A84B (gold glass), #0A0A0A (black), #FFFFFF (highlights).
Style: 3D glass, gold-tinted translucent surface, warm edge lighting.
Format: square icon 128x128. No text.
```

**Формат:** 128x128
**Использование:** Метрика "Рост лидов"

---

### Промт 13: Stats Block — Конверсия

```
3D gold glass percentage symbol icon for conversion rate metric.
Translucent gold glass percent sign with light refraction.
Color palette: #D4A84B, #0A0A0A, #B8892E, #FFFFFF.
Style: 3D glass, gold-tinted translucent surface, warm edge lighting.
Format: square icon 128x128. No text.
```

**Формат:** 128x128
**Использование:** Метрика "Конверсия"

---

### Промт 14: Stats Block — Время/Скорость

```
3D gold glass clock icon for time/speed metric display.
Translucent gold glass clock face with light refraction.
Color palette: #D4A84B, #0A0A0A, #B8892E, #FFFFFF.
Style: 3D glass, gold-tinted translucent surface, warm edge lighting.
Format: square icon 128x128. No text.
```

**Формат:** 128x128
**Использование:** Метрика "Время отклика"

---

### Промт 15: Stats Block — Цели

```
3D gold glass target with bullseye icon for goal metric display.
Translucent gold glass target with center dot, light refraction.
Color palette: #D4A84B, #0A0A0A, #B8892E, #FFFFFF.
Style: 3D glass, gold-tinted translucent surface, warm edge lighting.
Format: square icon 128x128. No text.
```

**Формат:** 128x128
**Использование:** Метрика "Достигнутые цели"

---

### Промт 16: Stats Block — Команда

```
3D gold glass people/team icon for recruitment metric display.
Translucent gold glass multiple figures with light refraction.
Color palette: #D4A84B, #0A0A0A, #B8892E, #FFFFFF.
Style: 3D glass, gold-tinted translucent surface, warm edge lighting.
Format: square icon 128x128. No text.
```

**Формат:** 128x128
**Использование:** Метрика "Найм сотрудников"

---

### Промт 17: Stats Block — Выручка/ROI

```
3D gold glass coin/dollar sign icon for revenue metric display.
Translucent gold glass coin with currency symbol, light refraction.
Color palette: #D4A84B, #0A0A0A, #B8892E, #FFFFFF.
Style: 3D glass, gold-tinted translucent surface, warm edge lighting.
Format: square icon 128x128. No text.
```

**Формат:** 128x128
**Использование:** Метрика "ROI/Выручка"

---

### Промт 18: Обложка блога — Лидогенерация

```
3D gold glass blog category cover for lead generation articles.
Translucent gold glass funnel with flowing gold particles representing lead flow.
Color palette: #D4A84B, #0A0A0A, #B8892E, #1A1A1A, #FFFFFF.
Style: 3D glass, gold-tinted translucent surfaces, volumetric lighting, depth of field.
Format: 16:9 banner 1200x675. No text, suitable as article header.
```

**Формат:** 1200x675
**Использование:** Категория блога "Лидогенерация"

---

### Промт 19: Обложка блога — Call-центр

```
3D gold glass blog category cover for call center articles.
Translucent gold glass headset with communication waves, light refraction.
Color palette: #D4A84B, #0A0A0A, #B8892E, #1A1A1A, #FFFFFF.
Style: 3D glass, gold-tinted translucent surfaces, volumetric lighting.
Format: 16:9 banner 1200x675. No text, suitable as article header.
```

**Формат:** 1200x675
**Использование:** Категория блога "Call-центр"

---

### Промт 20: Обложка блога — Авито/Классифайды

```
3D gold glass blog category cover for classified ads articles.
Grid of floating translucent gold glass cards/listings with light refraction.
Color palette: #D4A84B, #0A0A0A, #B8892E, #1A1A1A, #FFFFFF.
Style: 3D glass, gold-tinted translucent surfaces, isometric perspective optional.
Format: 16:9 banner 1200x675. No text, suitable as article header.
```

**Формат:** 1200x675
**Использование:** Категория блога "Продвижение на Авито"

---

### Промт 21: Обложка блога — Рекрутинг

```
3D gold glass blog category cover for recruiting articles.
Translucent gold glass people icons with selection funnel, light refraction.
Color palette: #D4A84B, #0A0A0A, #B8892E, #1A1A1A, #FFFFFF.
Style: 3D glass, gold-tinted translucent surfaces, volumetric lighting.
Format: 16:9 banner 1200x675. No text, suitable as article header.
```

**Формат:** 1200x675
**Использование:** Категория блога "Рекрутинг"

---

### Промт 22: Обложка блога — CRM/Аналитика

```
3D gold glass blog category cover for CRM/analytics articles.
Translucent gold glass dashboard with charts and graphs, light refraction.
Color palette: #D4A84B, #0A0A0A, #B8892E, #1A1A1A, #FFFFFF.
Style: 3D glass, gold-tinted translucent surfaces, volumetric lighting.
Format: 16:9 banner 1200x675. No text, suitable as article header.
```

**Формат:** 1200x675
**Использование:** Категория блога "CRM/Аналитика"

---

### Промт 23: Иконка безопасности — Защита данных

```
3D gold glass shield with lock icon for data protection.
Translucent gold glass security shield with keyhole, light refraction.
Color palette: #D4A84B, #0A0A0A, #B8892E, #FFFFFF.
Style: 3D glass, gold-tinted translucent surface, warm edge lighting.
Format: square icon 256x256. No text.
```

**Формат:** 256x256
**Использование:** Страница безопасности — "Защита данных"

---

### Промт 24: Иконка безопасности — Шифрование

```
3D gold glass lock with circuit lines icon for encryption.
Translucent gold glass lock with digital circuit pattern, light refraction.
Color palette: #D4A84B, #0A0A0A, #B8892E, #FFFFFF.
Style: 3D glass, gold-tinted translucent surface, warm edge lighting.
Format: square icon 256x256. No text.
```

**Формат:** 256x256
**Использование:** Страница безопасности — "Шифрование/VPN"

---

### Промт 25: Иконка безопасности — Контроль доступа

```
3D gold glass key/user icon for role-based access control.
Translucent gold glass key with user silhouette, light refraction.
Color palette: #D4A84B, #0A0A0A, #B8892E, #FFFFFF.
Style: 3D glass, gold-tinted translucent surface, warm edge lighting.
Format: square icon 256x256. No text.
```

**Формат:** 256x256
**Использование:** Страница безопасности — "Ролевой доступ"

---

### Промт 26: Иконка безопасности — Бэкапы

```
3D gold glass cloud with arrows icon for backups/storage.
Translucent gold glass cloud with up/down arrows, light refraction.
Color palette: #D4A84B, #0A0A0A, #B8892E, #FFFFFF.
Style: 3D glass, gold-tinted translucent surface, warm edge lighting.
Format: square icon 256x256. No text.
```

**Формат:** 256x256
**Использование:** Страница безопасности — "Резервное копирование"

---

### Промт 11: Фоновые изображения (2 варианта)

**A. Тёмный фон (Hero, Pricing, Closing CTA)**

```
3D gold glass dark background pattern for website sections.
Subtle geometric gold glass shapes with gradient from #0A0A0A to #000000.
Translucent gold glass overlay pattern with soft light refraction.
Should be non-distracting, suitable for overlaying white/light text.
Format: seamless tileable pattern or large background 1920x1080.
Style: 3D glass, luxury tech aesthetic, volumetric lighting.
```

**Формат:** 1920x1080 (tileable)
**Использование:** Hero, Pricing, Closing CTA секции

**B. Светлый фон (Problem, Features, Testimonials)**

```
3D gold glass light background pattern for website sections.
Subtle translucent gold glass geometric pattern on #1A1A1A base.
Gold glass accents (#D4A84B at low opacity).
Clean, non-distracting, suitable for overlaying white text.
Format: seamless tileable or large background 1920x1080.
Style: 3D glass, clean luxury aesthetic, soft warm lighting.
```

**Формат:** 1920x1080 (tileable)
**Использование:** Problem, Features, Testimonials секции

---

### Промт 28: Иконка инструмента — CRM

```
3D gold glass database/people icon for CRM integration.
Translucent gold glass database cylinder with user figures, light refraction.
Color palette: #D4A84B, #0A0A0A, #B8892E, #FFFFFF.
Style: 3D glass, gold-tinted translucent surface, warm edge lighting.
Format: square icon 128x128. No text.
```

**Формат:** 128x128
**Использование:** Кейсы — "CRM интеграция"

---

### Промт 29: Иконка инструмента — Телефония

```
3D gold glass phone handset icon for telephony integration.
Translucent gold glass phone receiver with call waves, light refraction.
Color palette: #D4A84B, #0A0A0A, #B8892E, #FFFFFF.
Style: 3D glass, gold-tinted translucent surface, warm edge lighting.
Format: square icon 128x128. No text.
```

**Формат:** 128x128
**Использование:** Кейсы — "Телефония"

---

### Промт 30: Иконка инструмента — Реклама

```
3D gold glass megaphone/target icon for advertising integration.
Translucent gold glass megaphone with target bullseye, light refraction.
Color palette: #D4A84B, #0A0A0A, #B8892E, #FFFFFF.
Style: 3D glass, gold-tinted translucent surface, warm edge lighting.
Format: square icon 128x128. No text.
```

**Формат:** 128x128
**Использование:** Кейсы — "Рекламные кампании"

---

### Промт 31: Иконка инструмента — Аналитика

```
3D gold glass chart/graph icon for analytics integration.
Translucent gold glass bar chart with upward trend, light refraction.
Color palette: #D4A84B, #0A0A0A, #B8892E, #FFFFFF.
Style: 3D glass, gold-tinted translucent surface, warm edge lighting.
Format: square icon 128x128. No text.
```

**Формат:** 128x128
**Использование:** Кейсы — "Аналитика"

---

### Промт 32: Иконка инструмента — Сообщения

```
3D gold glass chat bubble icon for messaging integration.
Translucent gold glass speech bubble with notification dot, light refraction.
Color palette: #D4A84B, #0A0A0A, #B8892E, #FFFFFF.
Style: 3D glass, gold-tinted translucent surface, warm edge lighting.
Format: square icon 128x128. No text.
```

**Формат:** 128x128
**Использование:** Кейсы — "Мессенджеры"

---

### Промт 33: Иконка инструмента — Хранилище

```
3D gold glass cloud/cylinder icon for database storage.
Translucent gold glass cloud with data arrows, light refraction.
Color palette: #D4A84B, #0A0A0A, #B8892E, #FFFFFF.
Style: 3D glass, gold-tinted translucent surface, warm edge lighting.
Format: square icon 128x128. No text.
```

**Формат:** 128x128
**Использование:** Кейсы — "Хранение данных"

---

### Промт 13: 404 страница

```
3D gold glass design 404 error page illustration. Large translucent gold glass "404"
numbers floating in space, artistic glass shard effect. Color palette: #D4A84B, #0A0A0A, #B8892E, #FFFFFF.
Modern glass morphism, volumetric lighting, depth of field.
Style: 3D glass, gold-tinted translucent surfaces, warm edge lighting.
Can include subtle "page not found" concept visually. No text.
```

**Формат:** 800x600 или 1200x800
**Использование:** /404 страница

---

### Промт 14: Favicon (упрощённая иконка)

```
3D gold glass favicon icon for marketing agency. Single translucent gold glass
abstract symbol (funnel or geometric shape representing lead generation).
Color palette: #D4A84B (primary gold glass), #0A0A0A (black background).
Style: 3D glass, clean simple shape suitable for small sizes.
Format: square icon, works at 16x16, 32x32, 64x64.
No text, minimalistic gold glass design.
```

**Формат:** 512x512 (масштабируется до 16x16, 32x32, 64x64)
**Использование:** Favicon сайта

---

### Промт 15: OG-изображения для соцсетей (3 варианта)

**A. Главная страница**

```
3D gold glass design social media OG image for marketing agency homepage.
Abstract translucent gold glass funnel visualization with modern glass morphism.
Color palette: #D4A84B, #0A0A0A, #B8892E, #FFFFFF. Wide banner with
space for text overlay. Style: 3D gold glass, volumetric lighting,
luxury tech aesthetic. No text.
```

**Формат:** 1200x630 (Open Graph standard)
**Использование:** Соцсети (VK, Telegram, WhatsApp) при шеринге главной

**B. Лендинги услуг**

```
3D gold glass design social media OG image for service landing pages.
Abstract gold glass service icon (funnel/headset/cards/people) with
modern glass morphism. Color palette: #D4A84B, #0A0A0A, #B8892E, #FFFFFF.
Wide banner with space for text overlay. Style: 3D gold glass,
volumetric lighting. No text.
```

**Формат:** 1200x630
**Использование:** Соцсети при шеринге страниц услуг

**C. Блог и кейсы**

```
3D gold glass design social media OG image for blog posts and case studies.
Abstract gold glass dashboard/analytics visualization with modern glass morphism.
Color palette: #D4A84B, #0A0A0A, #B8892E, #1A1A1A, #FFFFFF.
Wide banner with space for text overlay. Style: 3D gold glass,
volumetric lighting, professional look. No text.
```

**Формат:** 1200x630
**Использование:** Соцсети при шеринге статей и кейсов

---

## 📋 Сводная таблица для генерации

| # | Изображение | Формат | Кол-во | Приоритет |
|---|-------------|--------|--------|-----------|
| 1 | Hero главной | 1920x1080 | 1 | 🔴 Высокий |
| 2 | Hero Лидогенерация | 1920x1080 | 1 | 🔴 Высокий |
| 3 | Hero Call-центр | 1920x1080 | 1 | 🔴 Высокий |
| 4 | Hero Авито | 1920x1080 | 1 | 🔴 Высокий |
| 5 | Hero Рекрутинг | 1920x1080 | 1 | 🔴 Высокий |
| 6 | Иконки услуг | 512x512 | 4 | 🔴 Высокий |
| 7 | Process Steps | 1200x600 | 1 | 🟡 Средний |
| 8 | Stats иконки | 128x128 | 6 | 🟡 Средний |
| 9 | Обложки блога | 1200x675 | 5 | 🟢 Низкий |
| 10 | Иконки безопасности | 256x256 | 4 | 🟢 Низкий |
| 11 | Фоны (тёмный/светлый) | 1920x1080 | 2 | 🟡 Средний |
| 12 | Иконки инструментов | 128x128 | 6 | 🟢 Низкий |
| 13 | 404 страница | 800x600 | 1 | 🟢 Низкий |
| 14 | Favicon | 512x512 | 1 | 🔴 Высокий |
| 15 | OG-изображения (соцсети) | 1200x630 | 3 | 🟡 Средний |

**Итого:** 46 изображений

---

## 🎯 Рекомендации по генерации

**Для Veo 3.1:**
- Hero-баннеры (1-5) — лучше справляется с широкими баннерами
- Process Steps (7) — хорошие результаты для диаграмм
- Фоны (11) — качественные градиенты и паттерны
- 404 страница (13) — креативные 3D композиции
- OG-изображения (15) — социальные баннеры

**Для Nano Banana 2:**
- Иконки услуг (6) — лучше для мелких детализированных иконок
- Stats иконки (8) — детализация 3D стекла
- Обложки блога (9) — хорошие результаты для категориных изображений
- Иконки безопасности (10) — чёткие 3D формы
- Иконки инструментов (12) — консистентность стиля
- Favicon (14) — упрощённые формы для малых размеров

**Порядок генерации:**
1. Сначала Hero-баннеры (5 штук) + Favicon — критично для запуска
2. Иконки услуг (4 штуки) — для FeatureGroup
3. Process Steps + Stats иконки + OG-изображения — для наполнения страниц
4. Фоны — для улучшения визуала
5. Обложки блога, иконки безопасности, инструменты, 404 — по мере необходимости

**Итого:** 46 изображений в стиле 3D Glass Design

---

## ⏭️ Следующие шаги

**Подтвердите, пожалуйста:**

1. ✅ Все ли промты корректны и соответствуют вашему видению?
2. ✅ Нужно ли что-то добавить или изменить в описаниях?
3. ✅ Подтверждаете ли приоритеты (Hero → Иконки → остальное)?
4. ❓ Нужно ли сгенерировать дополнительные изображения (например, для 404 страницы, favicon, social share OG-изображения)?

**После подтверждения:**
- Можно приступать к генерации изображений в Veo 3.1 / Nano Banana 2
- Параллельно можно начать **Этап 1** (базовая настройка проекта Next.js)

---

## Документ завершён

**Следующие шаги:**
1. Получить от пользователя информацию по изображениям
2. Составить промты для AI-генератора изображений
3. Начать Этап 1 (базовая настройка проекта) или пропустить генерацию изображений, если они уже есть

**Дата создания:** 24 марта 2026 г.  
**Владелец документа:** IT-отдел М.И.Т.А.
