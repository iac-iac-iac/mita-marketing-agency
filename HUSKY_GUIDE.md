# Pre-commit Hooks Guide

## 📋 Обзор

Проект использует **Husky v9** + **lint-staged** для автоматизации проверок кода перед коммитом.

## 🔧 Установленные хуки

### 1. Pre-commit hook

**Файл:** `.husky/pre-commit`

**Запускает:**
- `lint-staged` — линтинг изменённых файлов
- `type-check` — проверка типов TypeScript

**Когда срабатывает:** Перед каждым `git commit`

**Пример вывода:**
```
🔍 Running pre-commit checks...
✓ Made pre-commit executable
✓ Made commit-msg executable
Husky hooks configured successfully!
```

### 2. Commit-msg hook

**Файл:** `.husky/commit-msg`

**Проверяет:** Формат сообщения коммита (Conventional Commits)

**Когда срабатывает:** Перед каждым `git commit`

**Пример успешного сообщения:**
```
feat: добавить новую форму обратной связи
fix(api): исправить ошибку валидации
docs: обновить README
```

**Пример ошибки:**
```
❌ Invalid commit message format!

Expected format: type(scope): description

Examples:
  feat: добавить новую форму обратной связи
  fix(api): исправить ошибку валидации
  docs: обновить README
```

## 📝 Conventional Commits

### Формат

```
type(scope): description

[optional body]

[optional footer]
```

### Типы коммитов

| Тип | Описание | Пример |
|-----|----------|--------|
| `feat` | Новая функция | `feat: добавить форму обратной связи` |
| `fix` | Исправление ошибки | `fix: исправить утечку памяти` |
| `docs` | Документация | `docs: обновить README` |
| `style` | Стиль кода | `style: добавить точки с запятой` |
| `refactor` | Рефакторинг | `refactor: упростить логику` |
| `test` | Тесты | `test: добавить unit тесты` |
| `chore` | Конфигурация | `chore: обновить зависимости` |
| `perf` | Производительность | `perf: оптимизировать рендеринг` |
| `ci` | CI/CD | `ci: настроить GitHub Actions` |
| `build` | Сборка | `build: обновить webpack` |
| `revert` | Откат | `revert: отменить коммит abc123` |

### Scope (опционально)

Указывает область изменений:
- `api` — API endpoints
- `components` — React компоненты
- `styles` — CSS/Tailwind
- `config` — Конфигурационные файлы
- `deps` — Зависимости

### Description

- Краткое описание (до 72 символов)
- Начинается с глагола в инфинитиве
- Без точки в конце

## 🚀 Lint-staged конфигурация

**Файл:** `package.json`

```json
{
  "lint-staged": {
    "*.{ts,tsx}": ["eslint --fix", "git add"],
    "*.{js,jsx}": ["eslint --fix", "git add"],
    "*.{css,scss,json,md}": ["prettier --write", "git add"]
  }
}
```

**Что делает:**
- Автоматически применяет `eslint --fix` к TypeScript/JavaScript файлам
- Применяет `prettier --write` к CSS, SCSS, JSON, Markdown
- Автоматически добавляет исправленные файлы в staging

## ⚙️ Установка

### Автоматическая установка

```bash
npm install
```

Скрипт `prepare` автоматически настроит Husky.

### Ручная установка

```bash
# Установить зависимости
npm install

# Настроить хуки
node .husky/install.mjs
```

## 🧪 Тестирование хуков

### Проверка pre-commit

```bash
# Создать тестовый файл с ошибкой линтера
echo "const x=1" > test.ts

# Добавить в git
git add test.ts

# Попытаться закоммитить
git commit -m "test: test commit"

# Ожидается: eslint исправит форматирование
```

### Проверка commit-msg

```bash
# Неправильный формат (должен упасть)
git commit -m "исправил ошибку"

# Правильный формат (должен пройти)
git commit -m "fix: исправить ошибку"
```

## 🔧 Отключение хуков

### Временное отключение

```bash
# Пропустить pre-commit hook
git commit --no-verify -m "feat: срочный фикс"

# Или короткая версия
git commit -n -m "feat: срочный фикс"
```

### Полное отключение

```bash
# Удалить директорию .husky
rmdir /s .husky

# Удалить скрипт prepare из package.json
```

## ⚠️ Troubleshooting

### Ошибка: "husky: command not found"

```bash
# Переустановить husky
npm install --save-dev husky
node .husky/install.mjs
```

### Хуки не срабатывают

Проверьте права доступа:
```bash
# Windows (PowerShell)
icacls .husky\pre-commit /grant Everyone:(RX)

# Или пересоздайте хуки
node .husky/install.mjs
```

### Lint-staged не находит файлы

Убедитесь, что файлы добавлены в staging:
```bash
git add src/file.ts
git commit -m "feat: добавить файл"
```

### Commit-msg hook падает на Windows

Проблема с line endings:
```bash
# Настроить git
git config --global core.autocrlf false
git config --global core.eol lf
```

## 📚 Дополнительные ресурсы

- [Husky Documentation](https://typicode.github.io/husky/)
- [Conventional Commits](https://www.conventionalcommits.org/)
- [Lint-staged Documentation](https://github.com/okonet/lint-staged)

---

**М.И.Т.А.** — Маркетинговое IT-агентство полного цикла
