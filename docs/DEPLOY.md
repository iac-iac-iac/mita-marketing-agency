# Деплой на production (mita.top)

## Сервер

| Параметр | Значение |
|----------|----------|
| IP | `193.233.88.174` |
| SSH | `root@193.233.88.174` (ключ в `~/.ssh`) |
| Каталог приложения | `/root/mita-marketing-agency` |
| PM2 | `mita-site` |
| Порт приложения | `3000` |
| Nginx | `/etc/nginx/sites-enabled/mita.top` → proxy на localhost:3000 |
| Домен | https://mita.top |

## Обновление после push в `main`

```bash
ssh root@193.233.88.174
cd /root/mita-marketing-agency
git pull origin main
npm ci
npm run build
pm2 restart mita-site
pm2 logs mita-site --lines 50
```

Переменные `NEXT_PUBLIC_*` вшиваются при **сборке** — после изменения `.env.local` на сервере обязательно выполнить `npm run build` и перезапустить PM2.

## `.env.local` на сервере

Файл **не коммитится**. Минимум для production:

```env
NEXT_PUBLIC_SITE_URL=https://mita.top
NEXT_PUBLIC_YANDEX_METRIKA_ID=109296126
EMAIL_FROM=info@mita.top
EMAIL_TO=info@mita.top
# BITRIX24_WEBHOOK_URL=https://your.bitrix24.ru/rest/.../
# BITRIX24_ASSIGNED_BY_ID=19
# TELEGRAM_BOT_TOKEN=...
# TELEGRAM_CHAT_ID=3900580121
# ADMIN_PASSWORD_HASH, DATABASE_PATH, SMTP — по необходимости
```

Проверка имени переменной Метрики (должна быть латиница `METRIKA`):

```bash
grep YANDEX /root/mita-marketing-agency/.env.local
```

## Проверка после деплоя

1. `curl -I https://mita.top`
2. Открыть сайт, принять cookies, убедиться в запросе к `mc.yandex.ru` в DevTools → Network
3. В интерфейсе Метрики: «Проверить счётчик» (данные могут появиться с задержкой)
4. Отправить тестовую заявку на https://mita.top/contact — запись должна появиться в https://mita.top/admin/leads (нужен вход в админку)

## Заявки с форм

- API: `POST /api/submit-lead`
- Хранение: SQLite `data/mita.db`, таблица `leads`
- Просмотр: `/admin/leads` (пункт «Заявки» в меню админки)
- Bitrix24 (`BITRIX24_WEBHOOK_URL`, `BITRIX24_ASSIGNED_BY_ID`) и Telegram (`TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID`) — опционально
- Прокси для Telegram: `/admin/proxies` (кнопка «Отправить тестовое сообщение»)
- Email-уведомления пока не реализованы

## Откат

```bash
cd /root/mita-marketing-agency
git log --oneline -5
git checkout <commit>
npm ci && npm run build
pm2 restart mita-site
```
