# Technology Stack

> **Каноническая версия:** [`About_Company/docs/tech-stack.md`](../../../../About_Company/docs/tech-stack.md)  
> Ниже — краткая выжимка + стек **этого репозитория** (сайт mita.top).

---

## Стек Company_site (этот репозиторий)

| Категория | Технология |
|-----------|------------|
| Framework | Next.js 14.2 (App Router) |
| Language | TypeScript 5 |
| Styling | Tailwind CSS 3 + custom CSS |
| Animations | Framer Motion |
| CMS | SQLite (`better-sqlite3`, `data/mita.db`) |
| Auth | JWT (jose) + bcrypt |
| Deployment | VPS + Nginx + PM2 → https://mita.top |

### Интеграции сайта

- **Bitrix24** — заявки (`BITRIX24_WEBHOOK_URL`)
- **Telegram** — уведомления о лидах
- **Yandex Metrika / GA** — аналитика SPA
- **Admin** — `/admin` (blog, cases, testimonials, leads, proxies)

---

## Общий ландшафт MITA (кратко)

| Продукт | Назначение |
|---------|------------|
| **Lead Manager** (`Lead_Telegram`) | Конвейер холодных лидов → Bitrix24 |
| **UBY CRM** (`DIRECT-LINE_CRM`) | CRM колл-центра, аналитика конверсии |
| **Company_site** | Публичный сайт (этот repo) |
| **LeadGen v6** | Desktop fallback для IT |
| **Bitrix24** | CRM отдела продаж ГЦК |
| **DataMaster** | Legacy-агрегатор (миграция на UBY CRM) |

Полная карта репозиториев, языков, БД и схема интеграций — в [tech-stack.md](../../../../About_Company/docs/tech-stack.md).

Дизайн-система «Чёрное золото» — [design-system.md](../../../../About_Company/docs/design-system.md).

---

## Document Info

| Параметр | Значение |
|----------|----------|
| **Последнее обновление** | 3 июня 2026 |
| **Статус** | Актуально |
