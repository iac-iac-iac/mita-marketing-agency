# Staging Environment Guide

## 📋 Обзор

Staging окружение используется для тестирования изменений перед deployment на production.

## 🎯 Назначение

- ✅ Тестирование новых функций перед production
- ✅ Интеграционное тестирование с Bitrix24
- ✅ Проверка форм и email уведомлений
- ✅ Pre-production валидация
- ✅ Демонстрация заказчику

## 🚀 Запуск staging локально

### Вариант 1: Копирование staging конфига

```bash
# Скопировать staging конфиг в .env.local
copy .env.local.staging .env.local

# Запустить development сервер на порту 3001
npm run dev:staging
```

### Вариант 2: Ручная настройка

1. Скопируйте `.env.local.staging` в `.env.local`
2. Заполните переменные окружения значениями для staging
3. Запустите: `npm run dev:staging`

**URL:** http://localhost:3001

## 📦 Build staging версии

```bash
# Собрать staging версию
npm run build:staging

# Запустить production сервер на порту 3001
npm run start:staging
```

## 🔧 Переменные окружения

### Обязательные для staging

| Переменная | Описание | Пример |
|------------|----------|--------|
| `NEXT_PUBLIC_SITE_URL` | Staging URL | `https://staging.direct-line.ru` |
| `BITRIX24_WEBHOOK_URL` | Test webhook | (тестовый webhook) |
| `NEXT_PUBLIC_DEBUG` | Режим отладки | `true` |
| `NEXT_PUBLIC_STAGING_WATERMARK` | Показывать watermark | `true` |

### Staging-specific флаги

- `NEXT_PUBLIC_DEBUG=true` — включает debug режим
- `NEXT_PUBLIC_STAGING_WATERMARK=true` — показывает watermark "Staging"

## 🆚 Сравнение окружений

| Характеристика | Development | Staging | Production |
|----------------|-------------|---------|------------|
| **Порт** | 3000 | 3001 | 3000 / 443 |
| **URL** | localhost | staging.domain.ru | domain.ru |
| **Debug** | true | true | false |
| **Watermark** | false | true | false |
| **CRM** | Mock/Test | Test воронка | Production воронка |
| **Email** | Console/Test | Dev email | Production email |
| **Analytics** | Отключена | Test счётчик | Production счётчик |

## 📝 Workflow

### 1. Разработка фичи

```bash
# Создать ветку
git checkout -b feature/new-feature

# Разрабатывать локально
npm run dev
```

### 2. Тестирование на staging

```bash
# Переключиться на staging конфиг
copy .env.local.staging .env.local

# Запустить staging
npm run dev:staging

# Протестировать функциональность
```

### 3. Deployment на staging

```bash
# Собрать и задеплоить на staging (Vercel)
vercel deploy --prod

# Или для Vercel preview
vercel deploy
```

### 4. Валидация

- [ ] Формы работают корректно
- [ ] Заявки уходят в тестовую Bitrix24
- [ ] Email уведомления приходят
- [ ] Analytics не загрязняет production данные
- [ ] Watermark отображается

### 5. Deployment на production

После успешного тестирования на staging:

```bash
# Переключиться на production конфиг
# Заполнить production переменные
npm run build
npm run start
```

## ⚠️ Важные заметки

### Безопасность

- ❌ **НЕ используйте production webhook на staging**
- ❌ **НЕ отправляйте staging заявки в production CRM**
- ✅ Используйте отдельные тестовые воронки Bitrix24
- ✅ Используйте test email адреса для staging

### Данные

- Staging может использовать production базу (read-only) для тестирования
- Или отдельную staging базу данных
- Все данные на staging считаются временными

### Analytics

- Staging должен использовать отдельные счётчики GA4 и Яндекс.Метрики
- Это предотвращает загрязнение production данных тестовыми визитами

## 🐛 Troubleshooting

### Ошибка: Port 3001 is already in use

```bash
# Найти процесс на порту 3001
netstat -ano | findstr :3001

# Убить процесс
taskkill /PID <PID> /F

# Или использовать другой порт
npm run dev:staging -- --port 3002
```

### Staging watermark не отображается

Проверьте переменную:
```bash
NEXT_PUBLIC_STAGING_WATERMARK=true
```

### Bitrix24 webhook не работает

- Убедитесь, что используете тестовый webhook
- Проверьте права доступа webhook
- Проверьте логи в Bitrix24

## 📚 Дополнительные ресурсы

- [Next.js Environment Variables](https://nextjs.org/docs/basic-features/environment-variables)
- [Vercel Preview Deployments](https://vercel.com/docs/deployments/preview-deployments)

---

**Direct-line** — Маркетинговое IT-агентство полного цикла
