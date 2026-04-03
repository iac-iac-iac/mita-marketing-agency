# Этап 6 — Безопасность и юридические страницы Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Создать страницы безопасности, юридических документов и контактов для сайта М.И.Т.А. с 3D Glass Design и scroll-reveal анимациями.

**Architecture:** 
- Компоненты Layout для переиспользования структуры страниц (SecurityPageLayout, LegalPageLayout)
- Отдельный ContactPage компонент для страницы контактов
- MDX файлы для контента юридических документов
- Next.js 14 App Router для маршрутизации

**Tech Stack:** Next.js 14, TypeScript, Tailwind CSS, 3D Glass Design, MDX, Magic UI анимации

---

## Task 1: SecurityPageLayout компонент

**Files:**
- Create: `src/components/security/SecurityPageLayout.tsx`

**Step 1: Write the failing test**

Пропускаем (UI компонент без бизнес-логики)

**Step 2: Write implementation**

Создать компонент с секциями:
- Hero секция с заголовком
- Секция "Хранение данных" (как собираем и храним)
- Секция "CRM и телефония" (интеграции)
- Секция "Юридические гарантии" (соглашения)
- FAQ по безопасности
- CTA блок

**Step 3: Commit**

```bash
git add src/components/security/SecurityPageLayout.tsx
git commit -m "feat: add SecurityPageLayout component with 3D glass design"
```

---

## Task 2: LegalPageLayout компонент

**Files:**
- Create: `src/components/legal/LegalPageLayout.tsx`

**Step 1: Write the failing test**

Пропускаем (UI компонент)

**Step 2: Write implementation**

Создать компонент с:
- Оглавление с якорями (Table of Contents)
- Длинный текст с H2/H3 секциями
- Дата обновления
- Scroll-reveal анимации

**Step 3: Commit**

```bash
git add src/components/legal/LegalPageLayout.tsx
git commit -m "feat: add LegalPageLayout component with table of contents"
```

---

## Task 3: ContactPage компонент

**Files:**
- Create: `src/components/contact/ContactPage.tsx`

**Step 1: Write the failing test**

Пропускаем (UI компонент)

**Step 2: Write implementation**

Создать компонент с:
- Контактная информация (адрес, email, телефон)
- Форма обратной связи
- Карта (опционально, заглушка)
- 3D Glass Design

**Step 3: Commit**

```bash
git add src/components/contact/ContactPage.tsx
git commit -m "feat: add ContactPage component with contact form"
```

---

## Task 4: Контент для страницы безопасности

**Files:**
- Create: `src/content/pages/security.mdx`

**Step 1: Write content**

Написать контент на основе документации М.И.Т.А.:
- Описание процессов обработки данных
- Информация о CRM (Битрикс24)
- Юридические гарантии
- FAQ

**Step 2: Commit**

```bash
git add src/content/pages/security.mdx
git commit -m "docs: add security page content"
```

---

## Task 5: Контент для условий оказания услуг

**Files:**
- Create: `src/content/pages/terms.mdx`

**Step 1: Write content**

Написать юридический текст:
- Общие положения
- Условия оказания услуг
- Оплата и тарифы
- Ответственность сторон
- Реквизиты

**Step 2: Commit**

```bash
git add src/content/pages/terms.mdx
git commit -m "docs: add terms of service content"
```

---

## Task 6: Контент для политики конфиденциальности

**Files:**
- Create: `src/content/pages/privacy.mdx`

**Step 1: Write content**

Написать политику конфиденциальности:
- Сбор персональных данных
- Цели обработки
- Защита данных
- Права пользователей

**Step 2: Commit**

```bash
git add src/content/pages/privacy.mdx
git commit -m "docs: add privacy policy content"
```

---

## Task 7: Страница безопасности

**Files:**
- Create: `src/app/security/page.tsx`

**Step 1: Write implementation**

Создать страницу:
- Импортировать SecurityPageLayout
- Загрузить контент из security.mdx
- Передать props в компонент

**Step 2: Commit**

```bash
git add src/app/security/page.tsx
git commit -m "feat: add security page"
```

---

## Task 8: Страница условий оказания услуг

**Files:**
- Create: `src/app/legal/terms/page.tsx`

**Step 1: Write implementation**

Создать страницу:
- Импортировать LegalPageLayout
- Загрузить контент из terms.mdx
- Передать props в компонент

**Step 2: Commit**

```bash
git add src/app/legal/terms/page.tsx
git commit -m "feat: add terms of service page"
```

---

## Task 9: Страница политики конфиденциальности

**Files:**
- Create: `src/app/legal/privacy/page.tsx`

**Step 1: Write implementation**

Создать страницу:
- Импортировать LegalPageLayout
- Загрузить контент из privacy.mdx
- Передать props в компонент

**Step 2: Commit**

```bash
git add src/app/legal/privacy/page.tsx
git commit -m "feat: add privacy policy page"
```

---

## Task 10: Страница контактов

**Files:**
- Create: `src/app/contact/page.tsx`

**Step 1: Write implementation**

Создать страницу:
- Импортировать ContactPage
- Рендер компонента

**Step 2: Commit**

```bash
git add src/app/contact/page.tsx
git commit -m "feat: add contact page"
```

---

## Task 11: Обновление 404 страницы

**Files:**
- Modify: `src/app/not-found.tsx`

**Step 1: Write implementation**

Обновить страницу с 3D Glass Design:
- Добавить фоновое изображение
- Glass эффект для контейнера
- CTA кнопка на главную
- Анимации

**Step 2: Commit**

```bash
git add src/app/not-found.tsx
git commit -m "feat: update 404 page with 3D glass design"
```

---

## Task 12: Финальная проверка

**Step 1: Run build**

```bash
npm run build
```

Ожидаемый результат: Успешная сборка без ошибок

**Step 2: Test pages**

Проверить страницы:
- http://localhost:3000/security
- http://localhost:3000/legal/terms
- http://localhost:3000/legal/privacy
- http://localhost:3000/contact
- http://localhost:3000/nonexistent (404)

**Step 3: Commit**

```bash
git add .
git commit -m "chore: complete stage 6 - security and legal pages"
```

---

## File Structure

```
src/
├── components/
│   ├── security/
│   │   └── SecurityPageLayout.tsx
│   ├── legal/
│   │   └── LegalPageLayout.tsx
│   └── contact/
│       └── ContactPage.tsx
├── app/
│   ├── security/
│   │   └── page.tsx
│   ├── legal/
│   │   ├── terms/
│   │   │   └── page.tsx
│   │   └── privacy/
│   │       └── page.tsx
│   ├── contact/
│   │   └── page.tsx
│   └── not-found.tsx
└── content/
    └── pages/
        ├── security.mdx
        ├── terms.mdx
        └── privacy.mdx
```
