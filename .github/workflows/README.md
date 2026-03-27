# CI/CD Pipeline Documentation

## Обзор

Этот проект использует GitHub Actions для автоматизации CI/CD процессов.

## Workflow: CI/CD Pipeline

### Триггеры

- **Push** в ветки: `main`, `develop`, `feature/*`
- **Pull Request** в ветки: `main`, `develop`

### Задачи (Jobs)

#### 1. Lint & Type Check

**Цель:** Проверка кода на соответствие стандартам и типизации

**Шаги:**
1. Checkout репозитория
2. Установка Node.js 20
3. Установка зависимостей (`npm ci`)
4. Запуск линтера (`npm run lint`)
5. Запуск проверки типов (`npm run type-check`)

**Время выполнения:** ~2-3 минуты

---

#### 2. Tests

**Цель:** Запуск автоматических тестов

**Шаги:**
1. Checkout репозитория
2. Установка Node.js 20
3. Установка зависимостей (`npm ci`)
4. Запуск тестов (`npm run test`)

**Время выполнения:** ~1-2 минуты

---

#### 3. Build

**Цель:** Сборка проекта для production

**Зависимости:** `lint-and-type-check`, `test`

**Шаги:**
1. Checkout репозитория
2. Установка Node.js 20
3. Установка зависимостей (`npm ci`)
4. Сборка проекта (`npm run build`)
5. Загрузка артефактов (.next/)

**Время выполнения:** ~3-5 минут

---

#### 4. Deploy (Production)

**Цель:** Деплой на production (Vercel)

**Условие:** Только для ветки `main`

**Зависимости:** `build`

**Шаги:**
1. Checkout репозитория
2. Загрузка артефактов сборки
3. Деплой на Vercel (`amondnet/vercel-action@v25`)

**Время выполнения:** ~2-3 минуты

---

#### 5. Deploy Preview

**Цель:** Деплой preview версии для тестирования

**Условие:** Для всех веток кроме `main`

**Зависимости:** `build`

**Шаги:**
1. Checkout репозитория
2. Загрузка артефактов сборки
3. Деплой preview на Vercel

**Время выполнения:** ~2-3 минуты

---

## Переменные окружения

### Необходимые Secrets

| Secret | Описание | Где получить |
|--------|----------|--------------|
| `VERCEL_TOKEN` | Токен для деплоя на Vercel | Vercel Account Settings |
| `VERCEL_ORG_ID` | ID организации Vercel | Vercel Dashboard |
| `VERCEL_PROJECT_ID` | ID проекта Vercel | Vercel Project Settings |

### Необходимые Variables

| Variable | Описание | Пример |
|----------|----------|--------|
| `NEXT_PUBLIC_SITE_URL` | URL сайта | `https://direct-line.ru` |

---

## Настройка

### 1. Создание Secrets

1. Перейдите в репозиторий на GitHub
2. Settings → Secrets and variables → Actions
3. New repository secret

```
VERCEL_TOKEN: <your-vercel-token>
VERCEL_ORG_ID: <your-org-id>
VERCEL_PROJECT_ID: <your-project-id>
```

### 2. Создание Variables

1. Перейдите в репозиторий на GitHub
2. Settings → Secrets and variables → Actions → Variables
3. New repository variable

```
NEXT_PUBLIC_SITE_URL: https://direct-line.ru
```

### 3. Получение Vercel Token

1. Войдите в Vercel Dashboard
2. Account Settings → Tokens
3. Create Token
4. Скопируйте токен

### 4. Получение Vercel Org/Project ID

1. Войдите в Vercel Dashboard
2. Перейдите в проект
3. Settings → General
4. Найдите **Project ID** и **Org ID**

---

## Статусы Pipeline

### Успешный pipeline

```
✅ Lint & Type Check (2m)
✅ Tests (1m)
✅ Build (4m)
✅ Deploy (3m)
```

### Ошибки

#### Lint Error

```
❌ Lint & Type Check
   Error: ESLint errors found
   Fix: npm run lint -- --fix
```

#### Type Error

```
❌ Lint & Type Check
   Error: TypeScript compilation failed
   Fix: Исправьте типы в файле
```

#### Build Error

```
❌ Build
   Error: Build failed
   Fix: Проверьте логи сборки
```

---

## Локальное тестирование

### Запуск всех проверок локально

```bash
# Линтинг
npm run lint

# Проверка типов
npm run type-check

# Тесты
npm run test

# Сборка
npm run build

# Анализ бандла
npm run analyze
```

---

## Ветки

### main

- ✅ Production версия
- ✅ Автоматический деплой на Vercel
- ✅ Требует прохождения всех тестов

### develop

- 🔄 Ветка разработки
- ✅ Preview деплой
- ✅ Требует прохождения тестов

### feature/*

- 🧪 Ветки функций
- ✅ Preview деплой
- ✅ Требует прохождения тестов

---

## Артефакты

### Build Artifacts

**Расположение:** `.next/`
**Хранение:** 7 дней
**Размер:** ~50-100 MB

**Использование:**
- Для деплоя на Vercel
- Для локального тестирования сборки

---

## Мониторинг

### GitHub Actions

- Перейдите в Actions tab репозитория
- Выберите workflow "CI/CD Pipeline"
- Просмотрите историю запусков

### Vercel

- Перейдите в Vercel Dashboard
- Выберите проект
- Просмотрите историю деплоев

---

## Troubleshooting

### Pipeline застревает

**Решение:**
1. Проверьте логи в GitHub Actions
2. Перезапустите job
3. Проверьте лимиты GitHub Actions

### Деплой не работает

**Решение:**
1. Проверьте Secrets (VERCEL_TOKEN, ORG_ID, PROJECT_ID)
2. Проверьте переменные окружения
3. Проверьте логи деплоя в Vercel

### Тесты падают

**Решение:**
1. Запустите тесты локально: `npm run test`
2. Проверьте логи ошибок
3. Исправьте тесты или код

---

## Дополнительные ресурсы

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
