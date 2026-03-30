# Development Guide — Direct-line

Полное руководство по разработке проекта Direct-line.

## 📋 Содержание

- [Быстрый старт](#быстрый-старт)
- [Структура проекта](#структура-проекта)
- [Команда разработки](#команды-разработки)
- [Окружение](#окружение)
- [Ветвление](#ветвление)
- [Коммиты](#коммиты)
- [Code Review](#code-review)
- [Тестирование](#тестирование)
- [Деплой](#деплой)

---

## 🚀 Быстрый старт

```bash
# 1. Клонирование
git clone <repository-url>
cd company_site

# 2. Установка зависимостей
npm install

# 3. Настройка окружения
cp .env.local.example .env.local
# Заполните BITRIX24_WEBHOOK_URL и NEXT_PUBLIC_SITE_URL

# 4. Запуск dev сервера
npm run dev
```

**URL:** http://localhost:3000

---

## 📁 Структура проекта

```
company_site/
├── src/
│   ├── app/                        # Next.js App Router
│   │   ├── (main)/                 # Основная группа
│   │   │   ├── services/           # Страницы услуг
│   │   │   ├── blog/               # Блог
│   │   │   ├── cases/              # Кейсы
│   │   │   ├── about/              # О компании
│   │   │   └── contact/            # Контакты
│   │   ├── api/                    # API endpoints
│   │   ├── layout.tsx              # Root layout
│   │   └── page.tsx                # Главная
│   ├── components/                 # React компоненты
│   │   ├── blocks/                 # Блоки: Hero, Features
│   │   ├── layout/                 # Header, Footer
│   │   └── ui/                     # UI: Button, Counter
│   ├── lib/                        # Утилиты
│   │   ├── analytics/              # Трекинг событий
│   │   ├── cms/                    # CMS функции
│   │   ├── hooks/                  # React hooks
│   │   └── utils/                  # Утилиты
│   └── content/                    # MDX контент
│       ├── blog/                   # Статьи
│       └── cases/                  # Кейсы
├── public/                         # Статические файлы
├── .github/workflows/              # CI/CD
├── .husky/                         # Git hooks
├── .env.local.example              # Шаблон env
├── CHANGELOG.md                    # История изменений
├── CONTRIBUTING.md                 # Руководство для контрибьюторов
└── README.md                       # Основная документация
```

---

## 🛠️ Команды разработки

```bash
# Запуск dev сервера
npm run dev

# Запуск staging сервера (порт 3001)
npm run dev:staging

# Сборка production
npm run build

# Запуск production
npm start

# Запуск staging production
npm run start:staging

# Линтинг
npm run lint

# Линтинг с авто-фиксом
npm run lint:fix

# Проверка типов TypeScript
npm run type-check

# Анализ бандла
npm run analyze

# Запуск тестов
npm test
```

---

## 🔧 Окружение

### Обязательные переменные

```bash
# URL сайта
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Bitrix24 webhook
BITRIX24_WEBHOOK_URL=https://your-company.bitrix24.ru/rest/1/your-webhook/
```

### Опциональные переменные

```bash
# Аналитика
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_YANDEX_METRIKA_ID=XXXXXXXXX

# Email уведомления
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-password
EMAIL_FROM=noreply@direct-line.ru
EMAIL_TO=info@direct-line.ru

# Sentry (error tracking)
NEXT_PUBLIC_SENTRY_DSN=https://...@o....ingest.sentry.io/...
```

### Копирование окружения

```bash
# Development
cp .env.local.example .env.local

# Staging
cp .env.local.staging.example .env.local.staging
```

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
| `hotfix/` | Срочный фикс | `hotfix/security-patch` |
| `refactor/` | Рефакторинг | `refactor/cms-functions` |
| `docs/` | Документация | `docs/api-documentation` |
| `test/` | Тесты | `test/api-endpoints` |
| `chore/` | Конфигурация | `chore/update-deps` |

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

### Формат

```
type(scope): description

[optional body]

[optional footer]
```

### Типы коммитов

| Тип | Описание | Пример |
|-----|----------|--------|
| `feat` | Новая функция | `feat: добавить калькулятор` |
| `fix` | Исправление ошибки | `fix(api): исправить валидацию` |
| `docs` | Документация | `docs: обновить README` |
| `style` | Стиль кода | `style: форматирование` |
| `refactor` | Рефакторинг | `refactor(components)` |
| `test` | Тесты | `test: добавить тесты` |
| `chore` | Конфигурация | `chore: обновить зависимости` |
| `perf` | Производительность | `perf: оптимизировать загрузку` |
| `ci` | CI/CD | `ci: добавить GitHub Actions` |
| `build` | Сборка | `build: обновить webpack` |
| `revert` | Откат | `revert: отменить изменение` |

### Примеры

```bash
# Новая функция
git commit -m "feat: добавить онлайн-чат"

# Исправление с областью
git commit -m "fix(api): исправить валидацию email"

# Рефакторинг с описанием
git commit -m "refactor(components): разделить Header на мелкие компоненты"

# Breaking change
git commit -m "feat: миграция на Next.js 15

BREAKING CHANGE: требуется Node.js 18+"
```

---

## 🔍 Code Review

### Процесс

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
   - Описание тестирования

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

## 🚀 Деплой

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

### CI/CD Pipeline

Автоматический деплой через GitHub Actions:

1. Push в `main` → запуск pipeline
2. Lint & Type Check → Tests → Build
3. Deploy to Vercel (production)
4. Для feature веток → Deploy Preview

---

## 📚 Дополнительные ресурсы

- [Next.js Documentation](https://nextjs.org/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Conventional Commits](https://www.conventionalcommits.org/)
- [Git Flow](https://nvie.com/posts/a-successful-git-branching-model/)

---

**Direct-line** — Маркетинговое IT-агентство полного цикла

📍 Адрес: г. Саратов, Астраханская ул., 87В
🌐 Сайт: https://direct-line.ru
