# Contributing to М.И.Т.А.

Спасибо за интерес к проекту **М.И.Т.А.**! Этот документ содержит руководство по внесению изменений в проект.

## 📋 Содержание

- [Структура проекта](#структура-проекта)
- [Начало работы](#начало-работы)
- [Ветвление (Git Flow)](#ветвление-git-flow)
- [Коммиты (Conventional Commits)](#коммиты-conventional-commits)
- [Code Review](#code-review)
- [Тестирование](#тестирование)
- [Деплой](#деплой)

---

## 🏗️ Структура проекта

```
company_site/
├── src/
│   ├── app/                        # Next.js App Router
│   ├── components/                 # React компоненты
│   ├── lib/                        # Утилиты, хуки, CMS
│   ├── content/                    # MDX контент
│   ├── public/                     # Статические файлы
│   └── styles/                     # Глобальные стили
├── .env.local                      # Локальные переменные (не коммитить)
├── .env.local.example              # Шаблон переменных
├── package.json                    # Зависимости и скрипты
└── README.md                       # Основная документация
```

---

## 🚀 Начало работы

### 1. Клонирование репозитория

```bash
git clone <repository-url>
cd company_site
```

### 2. Установка зависимостей

```bash
npm install
```

### 3. Настройка окружения

```bash
# Скопируйте шаблон
cp .env.local.example .env.local

# Заполните обязательные переменные в .env.local:
# - NEXT_PUBLIC_SITE_URL
# - BITRIX24_WEBHOOK_URL
```

### 4. Запуск dev сервера

```bash
npm run dev
```

**URL:** http://localhost:3000

---

## 🌿 Ветвление (Git Flow)

### Основные ветки

| Ветка | Описание |
|-------|----------|
| `main` | Production версия (стабильная) |
| `develop` | Ветка разработки (нестабильная) |

### Ветки функций

| Префикс | Описание | Пример |
|---------|----------|--------|
| `feature/` | Новая функция | `feature/calculator` |
| `fix/` | Исправление ошибки | `fix/form-validation` |
| `hotfix/` | Срочный фикс для production | `hotfix/security-patch` |
| `refactor/` | Рефакторинг кода | `refactor/cms-functions` |
| `docs/` | Документация | `docs/api-documentation` |
| `test/` | Тесты | `test/api-endpoints` |
| `chore/` | Конфигурация, зависимости | `chore/update-deps` |

### Создание ветки

```bash
# Переключиться на develop
git checkout develop

# Создать новую ветку
git checkout -b feature/your-feature-name

# Запушить ветку
git push -u origin feature/your-feature-name
```

---

## 📝 Коммиты (Conventional Commits)

### Формат коммитов

Мы используем **Conventional Commits** для стандартного формата сообщений:

```
type(scope): description

[optional body]

[optional footer]
```

### Типы коммитов

| Тип | Описание | Пример |
|-----|----------|--------|
| `feat` | Новая функция | `feat: добавить калькулятор услуг` |
| `fix` | Исправление ошибки | `fix(api): исправить валидацию форм` |
| `docs` | Документация | `docs: обновить README` |
| `style` | Стиль кода (пробелы, точки с запятой) | `style: форматирование компонентов` |
| `refactor` | Рефакторинг без изменений функциональности | `refactor(components): упростить логику` |
| `test` | Добавление тестов | `test: добавить тесты для ContactForm` |
| `chore` | Изменение конфигурации, зависимости | `chore: обновить зависимости` |
| `perf` | Улучшение производительности | `perf: оптимизировать загрузку изображений` |
| `ci` | CI/CD конфигурация | `ci: добавить GitHub Actions` |
| `build` | Сборка, зависимости | `build: обновить webpack конфигурацию` |
| `revert` | Откат коммита | `revert: отменить изменение в header` |

### Примеры коммитов

```bash
# Новая функция
git commit -m "feat: добавить онлайн-чат виджет"

# Исправление с областью
git commit -m "fix(api): исправить ошибку валидации email"

# Документация
git commit -m "docs: добавить CONTRIBUTING.md"

# Рефакторинг с описанием
git commit -m "refactor(components): разделить Header на мелкие компоненты"

# Breaking change (с указанием в footer)
git commit -m "feat: миграция на Next.js 15

BREAKING CHANGE: требуется Node.js 18+
```

### Pre-commit хуки

Проект использует **Husky** для автоматической проверки кода перед коммитом:

- **lint-staged** — автоматически форматирует изменённые файлы
- **commit-msg** — проверяет формат сообщения коммита

Если коммит отклонён:

```bash
# Проверьте формат сообщения
git commit -m "feat: добавить новую форму"  # ✅ Правильно
git commit -m "added new form"              # ❌ Неправильно
```

---

## 🔍 Code Review

### Процесс Code Review

1. **Создание Pull Request**
   - Запушить ветку: `git push -u origin feature/your-feature`
   - Создать PR на GitHub
   - Описать изменения в PR description

2. **Checklist для PR**
   - [ ] Код следует стилю проекта
   - [ ] Нет TypeScript ошибок
   - [ ] Нет ESLint предупреждений
   - [ ] Тесты проходят (если есть)
   - [ ] Документация обновлена

3. **Требования к PR**
   - Один PR — одна функция/исправление
   - Маленькие PR ревьювятся быстрее
   - Скриншоты для UI изменений
   - Описание тестирования (как тестировал)

4. **Получение feedback**
   - Ответить на все комментарии
   - Внести исправления
   - Запросить повторное ревью

5. **Merge**
   - PR одобрен → merge в `develop`
   - Удалить ветку после merge

---

## 🧪 Тестирование

### Запуск тестов

```bash
# Проверка типов TypeScript
npm run type-check

# Линтинг
npm run lint

# Линтинг с авто-фиксом
npm run lint:fix

# Форматирование
npm run format

# Полная проверка
npm run check
```

### Pre-commit проверки

Хуки автоматически запускают:

- **ESLint** — проверка стиля кода
- **Prettier** — форматирование

### Ручное тестирование

Перед отправкой PR:

1. Запустить dev сервер: `npm run dev`
2. Проверить все изменённые страницы
3. Проверить формы (отправка, валидация)
4. Проверить мобильную версию
5. Проверить консоль на ошибки

---

## 📦 Деплой

### Staging окружение

```bash
# Запуск staging сервера
npm run dev:staging

# URL: http://localhost:3001
```

### Production деплой

1. **Создать релиз ветку**
   ```bash
   git checkout -b release/v1.0.0
   ```

2. **Протестировать**
   - Проверить все функции
   - Исправить баги

3. **Замержить в main**
   ```bash
   git checkout main
   git merge release/v1.0.0
   git tag v1.0.0
   git push origin main --tags
   ```

4. **Деплой на Vercel**
   - Автоматически при push в `main`
   - Или вручную: `vercel deploy --prod`

---

## 📚 Дополнительные ресурсы

- [Next.js Documentation](https://nextjs.org/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Conventional Commits](https://www.conventionalcommits.org/)
- [Git Flow](https://nvie.com/posts/a-successful-git-branching-model/)

---

## ❓ Вопросы?

Создайте issue с тегом `question` или обратитесь к команде разработки.

---

**М.И.Т.А.** — Маркетинговое IT-агентство полного цикла

📍 Адрес: г. Саратов, Астраханская ул., 87В
🌐 Сайт: https://mita.ru
