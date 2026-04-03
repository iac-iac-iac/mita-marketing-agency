# 🗺️ Карта проблем проекта М.И.Т.А.

## Легенда
- 🔴 **Критические** — влияют на безопасность или работу в production
- 🟡 **Архитектурные** — усложняют поддержку и масштабирование
- 🟢 **Оптимизация** — улучшают производительность и DX

---

## Дерево проблем

```
М.И.Т.А. Project
│
├── 🔴 BACKEND / API
│   │
│   ├── 🔴 Rate limiter in-memory (не работает в production с несколькими инстансами)
│   │   └── Файл: src/app/api/submit-lead/route.ts
│   │   └── Решение: Redis / Vercel KV
│   │
│   ├── 🔴 Нет валидации Bitrix24 webhook URL
│   │   └── Файл: src/app/api/submit-lead/route.ts
│   │   └── Решение: Проверка https:// и домена bitrix24.ru/com
│   │
│   ├── 🔴 Нет timeout для fetch запросов
│   │   └── Файл: src/app/api/submit-lead/route.ts
│   │   └── Решение: AbortController с 5s timeout
│   │
│   └── 🔴 Нет security headers
│       └── Файл: next.config.js
│       └── Решение: CSP, HSTS, X-Frame-Options, Referrer-Policy
│
├── 🔴 АНАЛИТИКА
│   │
│   └── 🔴 ID счётчика захардкожен (98765432)
│       └── Файл: src/lib/analytics/track.ts
│       └── Решение: process.env.NEXT_PUBLIC_YANDEX_METРИКА_ID
│
├── 🟡 FRONTEND / КОМПОНЕНТЫ
│   │
│   ├── 🟡 ContactForm не использует useUTM хук
│   │   └── Файл: src/components/forms/ContactForm.tsx
│   │   └── Решение: Заменить defaultValue на value из useUTM()
│   │
│   ├── 🟡 Дублирование Header / MainHeader
│   │   └── Файлы: src/components/layout/Header.tsx, MainHeader.tsx
│   │   └── Решение: Базовый Navigation компонент
│   │
│   ├── 🟡 Главная страница 300+ строк
│   │   └── Файл: src/app/page.tsx
│   │   └── Решение: Вынести секции в HomePageContent.tsx
│   │
│   └── 🟡 Жёстко закодированные данные (отзывы, услуги)
│       └── Файл: src/app/page.tsx
│       └── Решение: Вынести в MDX или CMS
│
├── 🟡 CMS / КОНТЕНТ
│   │
│   ├── 🟡 Дублирование blog.ts / cases.ts
│   │   └── Файлы: src/lib/cms/blog.ts, src/lib/cms/cases.ts
│   │   └── Решение: Универсальная функция в shared.ts
│   │
│   ├── 🟡 Нет кэширования для MDX
│   │   └── Файлы: src/lib/cms/blog.ts, src/lib/cms/cases.ts
│   │   └── Решение: Next.js cache() или in-memory с TTL
│   │
│   └── 🟡 Парсинг frontmatter без типизации
│       └── Файл: src/lib/cms/shared.ts
│       └── Решение: Создать интерфейс StatField
│
├── 🟡 ТЕСТЫ
│   │
│   ├── 🟡 174 test файла в node_modules
│   │   └── Решение: Исключить node_modules из search
│   │
│   ├── 🟡 Нет Jest конфигурации
│   │   └── Файл: jest.config.js (отсутствует)
│   │   └── Решение: Добавить конфиг
│   │
│   └── 🟡 Нет тестов для API
│       └── Файл: src/app/api/submit-lead/route.test.ts (отсутствует)
│       └── Решение: Добавить тесты валидации, rate limiting, CSRF
│
├── 🟢 ПРОИЗВОДИТЕЛЬНОСТЬ
│   │
│   ├── 🟢 Видео без lazy loading
│   │   └── Файл: src/components/blocks/Hero.tsx
│   │   └── Решение: preload="none" + Intersection Observer
│   │
│   ├── 🟢 Нет bundle analyzer
│   │   └── Файл: next.config.js
│   │   └── Решение: @next/bundle-analyzer
│   │
│   └── 🟢 Font suboptimal display
│       └── Файл: src/app/layout.tsx
│       └── Решение: display: optional вместо swap
│
└── 🟢 DEVELOPER EXPERIENCE
    │
    ├── 🟢 Нет Storybook
    │   └── Решение: Добавить Storybook для UI компонентов
    │
    ├── 🟢 Нет pre-commit хуков
    │   └── Решение: Husky с lint-staged
    │
    ├── 🟢 Нет error tracking
    │   └── Решение: Sentry
    │
    └── 🟢 Нет logger утилиты
        └── Решение: Создать logger с debug/info/error уровнями
```

---

## Матрица приоритетов

```
                    ВЛИЯНИЕ НА БИЗНЕС
                    Низкое    Среднее    Высокое
                ┌──────────┬──────────┬──────────┐
Высокий         │   🟢     │   🟡     │   🔴     │
                │  Оптим.  │  Архит.  │  Крит.   │
                │          │          │          │
Средний         │   🟢     │   🟡     │   🔴     │
                │          │          │          │
Низкий          │   🟢     │   🟢     │   🟡     │
                └──────────┴──────────┴──────────┘
```

---

## Зависимости между задачами

```
Phase 1 (Критические)
│
├── 1.1 Валидация webhook ─────────────┐
├── 1.2 Timeout для fetch ─────────────┤
├── 1.3 ID аналитики ──────────────────┼──> Phase 2
├── 1.4 Security headers ──────────────┤
├── 1.5 UTM в ContactForm ─────────────┤
└── 1.6 Очистка проекта ───────────────┘
     │
     ▼
Phase 2 (Архитектура)
│
├── 2.1 Кэширование MDX ───────────────┐
├── 2.2 Рефакторинг CMS ───────────────┤
├── 2.3 Redis rate limit ──────────────┼──> Phase 3
├── 2.4 Разделение страницы ───────────┤
├── 2.5 Navigation компонент ──────────┤
├── 2.6 Jest конфиг ───────────────────┤
└── 2.7 API тесты ─────────────────────┘
     │
     ▼
Phase 3 (Оптимизация)
│
├── 3.1 Bundle analyzer
├── 3.2 Lazy video
├── 3.3 Font optimization
├── 3.4 Storybook
├── 3.5 Husky hooks
└── 3.6 Sentry
```

---

## Оценка рисков

| Задача | Риск | Митигация |
|--------|------|-----------|
| Security headers | 🔴 Средний (может сломать скрипты) | Тестировать на staging, добавить исключения в CSP |
| Redis rate limit | 🔴 Высокий (требует инфраструктуру) | Использовать Vercel KV (бесплатно для старта) |
| Рефакторинг CMS | 🟡 Средний (может сломать контент) | Покрыть тестами, деплоить постепенно |
| Кэширование MDX | 🟡 Средний (нужна инвалидация) | TTL 5-15 минут, инвалидация по webhook |
| Разделение страницы | 🟢 Низкий | Изменения не затрагивают функционал |

---

## Быстрые победы (Quick Wins)

Эти задачи можно выполнить за 1-2 часа с высоким эффектом:

1. **🟢 Исправить ID аналитики** (30 мин)
   - Заменить `98765432` на `process.env.NEXT_PUBLIC_YANDEX_METРИКА_ID`
   - Эффект: Корректный трекинг

2. **🟢 Добавить .env в .gitignore** (10 мин)
   - Добавить строку `.env` в `.gitignore`
   - Эффект: Защита секретов

3. **🟢 Удалить пустые директории** (15 мин)
   - Удалить `home-light-test`, `echo`, `temp`, `leads`
   - Эффект: Чистота проекта

4. **🟢 Интегрировать useUTM в ContactForm** (1 час)
   - Заменить `defaultValue` на `value` из хука
   - Эффект: Корректный трекинг UTM

5. **🟢 Добавить timeout для fetch** (30 мин)
   - AbortController с 5s timeout
   - Эффект: Защита от зависаний

---

**Рекомендация:** Начать с "Быстрых побед", затем перейти к Phase 1.
