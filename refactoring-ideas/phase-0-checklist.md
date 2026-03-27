# Direct-line: Фаза 0 — Детальный чек-лист подготовки

**Дата создания:** 27 марта 2026  
**Длительность:** 1-2 дня  
**Статус:** ⏳ Ожидает выполнения

---

## 📋 Обзор Фазы 0

**Цель:** Создать фундамент для безопасной и эффективной разработки

**Задачи:**
- ✅ Настроить окружение (.env.local)
- ✅ Создать документацию переменных (.env.local.example)
- ✅ Добавить валидацию переменных окружения
- ✅ Настроить pre-commit хуки (Husky)
- ✅ Очистить проект от мусора

**Критерии завершения:**
- [ ] Все переменные окружения настроены и задокументированы
- [ ] Валидация переменных работает
- [ ] Pre-commit хуки установлены и работают
- [ ] Проект очищен от пустых директорий и неиспользуемых файлов

---

## Часть A: Окружение (2-3 часа)

### Задача 0A-1: Настроить .env.local

**Файл:** `.env.local`  
**Сложность:** Low  
**Время:** 0.5-1 час  
**Приоритет:** 🔴 Критический

#### Чек-лист:

- [ ] **Скопировать шаблон**
  ```bash
  cp .env.local.example .env.local
  ```

- [ ] **Заполнить обязательные переменные**
  ```bash
  # Обязательные переменные
  NEXT_PUBLIC_SITE_URL=https://direct-line.ru
  
  # Bitrix24 integration
  BITRIX24_WEBHOOK_URL=https://your-company.bitrix24.ru/rest/1/your-webhook/
  
  # Опционально: CRM ID
  BITRIX24_CRM_ID=
  ```

- [ ] **Заполнить опциональные переменные**
  ```bash
  # Analytics (будут добавлены позже)
  NEXT_PUBLIC_GA_ID=
  NEXT_PUBLIC_YANDEX_METRIKA_ID=
  
  # Email notifications (если есть SMTP)
  SMTP_HOST=
  SMTP_PORT=587
  SMTP_USER=
  SMTP_PASSWORD=
  EMAIL_FROM=info@direct-line.ru
  EMAIL_TO=leads@direct-line.ru
  
  # API security
  NEXT_PUBLIC_API_KEY=
  
  # Chat widget (будет добавлен позже)
  NEXT_PUBLIC_CHAT_WIDGET_ID=
  
  # Image CDN (будет добавлен позже)
  NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=
  NEXT_PUBLIC_CLOUDINARY_API_KEY=
  CLOUDINARY_API_SECRET=
  ```

- [ ] **Проверить, что .env.local в .gitignore**
  ```bash
  # В .gitignore должно быть:
  .env.local
  .env*.local
  ```

- [ ] **Перезапустить dev сервер**
  ```bash
  npm run dev
  ```

- [ ] **Проверить, что сервер запускается без ошибок**
  ```
  ✓ Ready in 2.3s
  ○ http://localhost:3000
  ```

#### Ожидаемый результат:
```bash
# .env.local существует и содержит:
NEXT_PUBLIC_SITE_URL=https://direct-line.ru
BITRIX24_WEBHOOK_URL=https://...
```

#### Проверка:
- [ ] Файл `.env.local` существует
- [ ] Файл не закоммичен в git
- [ ] Dev сервер запускается без ошибок
- [ ] Переменные доступны в приложении

---

### Задача 0A-2: Создать .env.local.example с документацией

**Файл:** `.env.local.example`  
**Сложность:** Low  
**Время:** 0.5-1 час  
**Приоритет:** 🟡 Важный

#### Чек-лист:

- [ ] **Проверить существующий файл**
  ```bash
  cat .env.local.example
  ```

- [ ] **Обновить документацию переменных**

```bash
# =============================================================================
# DIRECT-LINE SITE CONFIGURATION
# =============================================================================
# Скопируйте этот файл в .env.local и заполните значениями
# Команда: cp .env.local.example .env.local
# =============================================================================

# -----------------------------------------------------------------------------
# ОБЯЗАТЕЛЬНЫЕ ПЕРЕМЕННЫЕ
# -----------------------------------------------------------------------------

# URL сайта (production или development)
# Примеры: http://localhost:3000, https://direct-line.ru
NEXT_PUBLIC_SITE_URL=

# Bitrix24 webhook URL для интеграции с CRM
# Получить: https://your-company.bitrix24.ru/devops/
# Формат: https://your-company.bitrix24.ru/rest/1/your-webhook/
BITRIX24_WEBHOOK_URL=

# -----------------------------------------------------------------------------
# ОПЦИОНАЛЬНЫЕ ПЕРЕМЕННЫЕ
# -----------------------------------------------------------------------------

# ID воронки в Bitrix24 (необязательно)
# Найти в настройках CRM
BITRIX24_CRM_ID=

# -----------------------------------------------------------------------------
# АНАЛИТИКА (будут добавлены позже)
# -----------------------------------------------------------------------------

# Google Analytics 4 Measurement ID
# Получить: https://analytics.google.com/
# Формат: G-XXXXXXXXXX
NEXT_PUBLIC_GA_ID=

# Яндекс.Метрика Counter ID
# Получить: https://metrika.yandex.ru/
# Формат: XXXXXXXX
NEXT_PUBLIC_YANDEX_METRIKA_ID=

# -----------------------------------------------------------------------------
# EMAIL УВЕДОМЛЕНИЯ (если есть SMTP доступ)
# -----------------------------------------------------------------------------

# SMTP сервер для отправки email
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=
SMTP_PASSWORD=

# Адреса для email уведомлений
EMAIL_FROM=info@direct-line.ru
EMAIL_TO=leads@direct-line.ru

# -----------------------------------------------------------------------------
# БЕЗОПАСНОСТЬ
# -----------------------------------------------------------------------------

# API ключ для защиты endpoints (опционально)
# Сгенерировать: openssl rand -hex 32
NEXT_PUBLIC_API_KEY=

# -----------------------------------------------------------------------------
# ОНЛАЙН-ЧАТ (будет добавлен позже)
# -----------------------------------------------------------------------------

# ID виджета чата (Tawk.to, Crisp, Intercom, etc.)
NEXT_PUBLIC_CHAT_WIDGET_ID=

# -----------------------------------------------------------------------------
# IMAGE CDN (будет добавлен позже)
# -----------------------------------------------------------------------------

# Cloudinary credentials
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=
NEXT_PUBLIC_CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

# =============================================================================
# ИНСТРУКЦИИ ПО НАСТРОЙКЕ
# =============================================================================
# 
# 1. Скопируйте файл:
#    cp .env.local.example .env.local
# 
# 2. Заполните обязательные переменные:
#    - NEXT_PUBLIC_SITE_URL
#    - BITRIX24_WEBHOOK_URL
# 
# 3. Для локальной разработки:
#    NEXT_PUBLIC_SITE_URL=http://localhost:3000
# 
# 4. Запустите сервер:
#    npm run dev
# 
# =============================================================================
```

- [ ] **Проверить, что файл закоммичен в git**
  ```bash
  git add .env.local.example
  git commit -m "docs: обновить .env.local.example с полной документацией"
  ```

#### Ожидаемый результат:
```bash
# .env.local.example существует
# Содержит документацию всех переменных
# Закоммичен в git
```

---

### Задача 0A-3: Добавить валидацию переменных окружения

**Файл:** `src/lib/utils/env.ts`  
**Сложность:** Medium  
**Время:** 1.5-2 часа  
**Приоритет:** 🔴 Критический

#### Чек-лист:

- [ ] **Создать файл валидации**
  ```bash
  # Создать файл:
  src/lib/utils/env.ts
  ```

- [ ] **Реализовать функцию валидации**

```typescript
// src/lib/utils/env.ts

/**
 * Валидация переменных окружения
 * Вызывается при старте приложения
 */

type EnvValidationResult = {
  valid: boolean;
  errors: string[];
  warnings: string[];
};

export function validateEnv(): EnvValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  // ---------------------------------------------------------------------------
  // ОБЯЗАТЕЛЬНЫЕ ПЕРЕМЕННЫЕ
  // ---------------------------------------------------------------------------

  // NEXT_PUBLIC_SITE_URL
  if (!process.env.NEXT_PUBLIC_SITE_URL) {
    errors.push('NEXT_PUBLIC_SITE_URL не установлена');
  } else {
    try {
      new URL(process.env.NEXT_PUBLIC_SITE_URL);
    } catch {
      errors.push('NEXT_PUBLIC_SITE_URL должна быть валидным URL');
    }
  }

  // BITRIX24_WEBHOOK_URL
  if (!process.env.BITRIX24_WEBHOOK_URL) {
    warnings.push('BITRIX24_WEBHOOK_URL не установлена (интеграция с CRM не будет работать)');
  } else {
    try {
      new URL(process.env.BITRIX24_WEBHOOK_URL);
    } catch {
      errors.push('BITRIX24_WEBHOOK_URL должна быть валидным URL');
    }
  }

  // ---------------------------------------------------------------------------
  // ОПЦИОНАЛЬНЫЕ ПЕРЕМЕННЫЕ — ПРОВЕРКА ФОРМАТА
  // ---------------------------------------------------------------------------

  // NEXT_PUBLIC_GA_ID
  if (process.env.NEXT_PUBLIC_GA_ID) {
    if (!/^G-[A-Z0-9]{10}$/i.test(process.env.NEXT_PUBLIC_GA_ID)) {
      warnings.push('NEXT_PUBLIC_GA_ID имеет неверный формат (ожидается G-XXXXXXXXXX)');
    }
  }

  // NEXT_PUBLIC_YANDEX_METRIKA_ID
  if (process.env.NEXT_PUBLIC_YANDEX_METRIKA_ID) {
    if (!/^\d{8}$/.test(process.env.NEXT_PUBLIC_YANDEX_METRIKA_ID)) {
      warnings.push('NEXT_PUBLIC_YANDEX_METRIKA_ID должна содержать 8 цифр');
    }
  }

  // SMTP переменные (все или ничего)
  const smtpVars = ['SMTP_HOST', 'SMTP_PORT', 'SMTP_USER', 'SMTP_PASSWORD'];
  const smtpSet = smtpVars.filter(v => process.env[v]);
  
  if (smtpSet.length > 0 && smtpSet.length < smtpVars.length) {
    warnings.push(`Настроены не все SMTP переменные: ${smtpVars.filter(v => !process.env[v]).join(', ')}`);
  }

  // EMAIL адреса
  if (process.env.EMAIL_FROM) {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(process.env.EMAIL_FROM)) {
      errors.push('EMAIL_FROM должна быть валидным email адресом');
    }
  }

  if (process.env.EMAIL_TO) {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(process.env.EMAIL_TO)) {
      errors.push('EMAIL_TO должна быть валидным email адресом');
    }
  }

  // ---------------------------------------------------------------------------
  // РЕЗУЛЬТАТ
  // ---------------------------------------------------------------------------

  return {
    valid: errors.length === 0,
    errors,
    warnings,
  };
}

/**
 * Логирование результатов валидации
 */
export function logEnvValidation(): void {
  const result = validateEnv();

  if (result.warnings.length > 0) {
    console.warn('\n⚠️  Предупреждения конфигурации:');
    result.warnings.forEach(w => console.warn(`   - ${w}`));
  }

  if (result.errors.length > 0) {
    console.error('\n❌ Ошибки конфигурации:');
    result.errors.forEach(e => console.error(`   - ${e}`));
    console.error('\nПриложение не может быть запущено с некорректной конфигурацией.');
    console.error('Исправьте ошибки и перезапустите сервер.\n');
    
    // В development режиме выбрасываем ошибку
    if (process.env.NODE_ENV === 'development') {
      throw new Error(`Конфигурация содержит ошибки: ${result.errors.join(', ')}`);
    }
  }

  if (result.valid && result.warnings.length === 0) {
    console.log('\n✅ Конфигурация проверена без ошибок\n');
  }
}
```

- [ ] **Интегрировать валидацию в приложение**

```typescript
// src/app/layout.tsx

import { logEnvValidation } from '@lib/utils/env'

// Вызвать валидацию при старте
if (process.env.NODE_ENV === 'development') {
  logEnvValidation()
}
```

- [ ] **Или создать отдельный файл инициализации**

```typescript
// src/lib/init.ts

import { logEnvValidation } from './utils/env'

export function init() {
  // Валидация окружения
  logEnvValidation()
  
  // Другие инициализации...
}
```

```typescript
// src/app/layout.tsx

import { init } from '@lib/init'

// Вызвать при старте
init()
```

- [ ] **Протестировать валидацию**

```bash
# Тест 1: Запустить с корректной конфигурацией
npm run dev
# Ожидается: ✅ Конфигурация проверена без ошибок

# Тест 2: Запустить без обязательных переменных
# Временно переименовать .env.local
mv .env.local .env.local.bak
npm run dev
# Ожидается: ❌ Ошибки конфигурации

# Тест 3: Восстановить конфигурацию
mv .env.local.bak .env.local
```

#### Ожидаемый результат:
```typescript
// src/lib/utils/env.ts существует
// validateEnv() проверяет все переменные
// logEnvValidation() выводит понятные сообщения
// Приложение не запускается с критическими ошибками
```

#### Проверка:
- [ ] Файл `src/lib/utils/env.ts` существует
- [ ] Функция `validateEnv()` возвращает правильные результаты
- [ ] Валидация запускается при старте приложения
- [ ] Ошибки выводятся в консоль
- [ ] Приложение не запускается с некорректной конфигурацией (dev)

---

## Часть B: Инструменты разработки (2-3 часа)

### Задача 0B-1: Настроить pre-commit хуки (Husky)

**Файлы:** `.husky/pre-commit`, `package.json`  
**Сложность:** Medium  
**Время:** 1.5-2 часа  
**Приоритет:** 🟡 Важный

#### Чек-лист:

- [ ] **Установить Husky**
  ```bash
  npm install -D husky
  ```

- [ ] **Инициализировать Husky**
  ```bash
  npx husky init
  ```
  
  Это создаст:
  - `.husky/` директорию
  - `.husky/pre-commit` файл
  - Добавит скрипт в `package.json`

- [ ] **Проверить package.json**
  ```json
  {
    "scripts": {
      "prepare": "husky"
    }
  }
  ```

- [ ] **Настроить pre-commit хук**

```bash
# .husky/pre-commit

#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

# Запустить lint staged
npm run lint-staged
```

- [ ] **Установить lint-staged**
  ```bash
  npm install -D lint-staged
  ```

- [ ] **Добавить конфигурацию lint-staged в package.json**

```json
{
  "lint-staged": {
    "*.{ts,tsx}": [
      "eslint --fix",
      "prettier --write"
    ],
    "*.{js,jsx}": [
      "eslint --fix",
      "prettier --write"
    ],
    "*.{css,scss}": [
      "stylelint --fix",
      "prettier --write"
    ],
    "*.{md,json}": [
      "prettier --write"
    ]
  }
}
```

- [ ] **Установить Prettier (если не установлен)**
  ```bash
  npm install -D prettier
  ```

- [ ] **Создать конфигурацию Prettier**

```javascript
// prettier.config.js

/** @type {import('prettier').Config} */
module.exports = {
  semi: false,
  singleQuote: true,
  tabWidth: 2,
  trailingComma: 'es5',
  printWidth: 100,
  arrowParens: 'always',
  endOfLine: 'auto',
  overrides: [
    {
      files: '*.tsx',
      options: {
        parser: 'typescript',
      },
    },
  ],
}
```

- [ ] **Создать .prettierignore**

```bash
# .prettierignore
.next/
node_modules/
dist/
build/
coverage/
*.min.js
*.min.css
public/
```

- [ ] **Протестировать хук**

```bash
# Сделать тестовое изменение
echo "console.log('test')" >> src/test.ts

# Добавить файл
git add src/test.ts

# Попробовать закоммитить
git commit -m "test: husky hook"

# Ожидается: запуск lint-staged и форматирование
```

#### Ожидаемый результат:
```bash
# .husky/pre-commit существует и работает
# lint-staged форматирует файлы перед коммитом
# eslint проверяет код
# prettier форматирует код
```

#### Проверка:
- [ ] Husky установлен и инициализирован
- [ ] Pre-commit хук существует
- [ ] lint-staged настроен
- [ ] Prettier настроен
- [ ] Хук запускается при коммите

---

### Задача 0B-2: Добавить lint-staged для авто-фикса

**Файл:** `package.json`  
**Сложность:** Low  
**Время:** 0.5-1 час  
**Приоритет:** 🟢 Желательный

#### Чек-лист:

- [ ] **Проверить конфигурацию lint-staged** (из предыдущей задачи)

- [ ] **Добавить скрипт для ручного запуска**

```json
{
  "scripts": {
    "lint-staged": "lint-staged",
    "format": "prettier --write \"src/**/*.{ts,tsx,js,jsx}\"",
    "format:check": "prettier --check \"src/**/*.{ts,tsx,js,jsx}\""
  }
}
```

- [ ] **Протестировать ручной запуск**

```bash
# Запустить форматирование
npm run format

# Запустить проверку
npm run format:check
```

- [ ] **Добавить скрипт для полной проверки**

```json
{
  "scripts": {
    "check": "npm run lint && npm run type-check && npm run format:check",
    "check:fix": "npm run lint -- --fix && npm run format"
  }
}
```

#### Ожидаемый результат:
```bash
# npm run format — форматирует все файлы
# npm run format:check — проверяет форматирование
# npm run check — полная проверка проекта
```

---

## Часть C: Очистка проекта (1 час)

### Задача 0C-1: Удалить пустые директории

**Директории:** `src/components/blocks/__tests__`, `src/components/ui/__tests__`  
**Сложность:** Low  
**Время:** 0.5 часа  
**Приоритет:** 🟢 Желательный

#### Чек-лист:

- [ ] **Найти пустые директории**

```bash
# PowerShell
Get-ChildItem -Path . -Directory -Recurse | Where-Object {
  (Get-ChildItem -Path $_.FullName).Count -eq 0
} | Select-Object FullName

# Или вручную проверить:
# src/components/blocks/__tests__/
# src/components/ui/__tests__/
```

- [ ] **Удалить пустые директории**

```bash
# PowerShell
Remove-Item -Path "src\components\blocks\__tests__" -Recurse -Force
Remove-Item -Path "src\components\ui\__tests__" -Recurse -Force

# Или через проводник
```

- [ ] **Проверить удаление**

```bash
# Убедиться, что директории удалены
Test-Path "src\components\blocks\__tests__"  # Ожидается: False
Test-Path "src\components\ui\__tests__"      # Ожидается: False
```

#### Ожидаемый результат:
```bash
# Пустые директории удалены
# Git отслеживает удаление
```

---

### Задача 0C-2: Удалить неиспользуемые файлы

**Файлы:** `$null`, временные файлы  
**Сложность:** Low  
**Время:** 0.5 часа  
**Приоритет:** 🟢 Желательный

#### Чек-лист:

- [ ] **Найти странные файлы**

```bash
# PowerShell — найти файлы с подозрительными именами
Get-ChildItem -Path . -File | Where-Object {
  $_.Name -match '^\$' -or $_.Name -match '\.tmp$' -or $_.Name -match '\.bak$'
}
```

- [ ] **Удалить файл $null**

```bash
# PowerShell
Remove-Item -Path "\$null" -Force
```

- [ ] **Проверить корень проекта на временные файлы**

```bash
# PowerShell
Get-ChildItem -Path . -File -Depth 1 | Where-Object {
  $_.Name -match '\.tmp|\.bak|\.old|~$'
}
```

- [ ] **Закоммитить изменения**

```bash
git add -A
git status
# Проверить, что удаляются только нужные файлы
git commit -m "chore: удалить неиспользуемые файлы"
```

#### Ожидаемый результат:
```bash
# Файл $null удалён
# Временные файлы удалены
# Проект чище
```

---

## ✅ Финальный чек-лист Фазы 0

### Все задачи выполнены:

- [ ] **0A-1:** .env.local настроен
- [ ] **0A-2:** .env.local.example создан с документацией
- [ ] **0A-3:** Валидация переменных окружения работает
- [ ] **0B-1:** Husky pre-commit хуки настроены
- [ ] **0B-2:** lint-staged для авто-фикса работает
- [ ] **0C-1:** Пустые директории удалены
- [ ] **0C-2:** Неиспользуемые файлы удалены

### Критерии приёмки:

- [ ] Dev сервер запускается без ошибок
- [ ] Валидация окружения проходит успешно
- [ ] Pre-commit хук запускается при коммите
- [ ] Файлы форматируются автоматически
- [ ] Проект очищен от мусора

### Документация обновлена:

- [ ] `.env.local.example` содержит все переменные
- [ ] Валидация документирована в `src/lib/utils/env.ts`
- [ ] Husky настроен и работает

---

## 📊 Метрики Фазы 0

| Метрика | Значение |
|---------|----------|
| **Задач выполнено** | 6/6 |
| **Время затрачено** | 5-7 часов |
| **Критических задач** | 2/2 ✅ |
| **Важных задач** | 2/2 ✅ |
| **Желательных задач** | 2/2 ✅ |

---

## 🚀 Следующие шаги

После завершения Фазы 0:

1. **Перейти к Фазе 1:** Критические исправления
2. **Проверить, что все тесты проходят:**
   ```bash
   npm run dev
   npm run lint
   npm run type-check
   ```
3. **Создать ветку для Фазы 1:**
   ```bash
   git checkout -b feature/phase-1-critical-fixes
   ```

---

**Статус Фазы 0:** ⏳ Ожидает выполнения  
**Создано:** 27 марта 2026  
**Обновлено:** 27 марта 2026  
**Версия:** 2.0
