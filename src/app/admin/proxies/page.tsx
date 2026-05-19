import Link from 'next/link';
import { getAllProxies } from '@/lib/cms/db-proxies';
import { deleteProxyAction } from './actions';
import DeleteButton from './DeleteButton';
import TelegramTestButton from './TelegramTestButton';

function envStatus() {
  const bitrix = Boolean(process.env.BITRIX24_WEBHOOK_URL?.trim());
  const assigned = Boolean(process.env.BITRIX24_ASSIGNED_BY_ID?.trim());
  const tgBot = Boolean(process.env.TELEGRAM_BOT_TOKEN?.trim());
  const tgChat = Boolean(process.env.TELEGRAM_CHAT_ID?.trim());
  return { bitrix, assigned, tgBot, tgChat };
}

export default function AdminProxiesPage() {
  const proxies = getAllProxies();
  const env = envStatus();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Прокси и Telegram</h1>
          <p className="text-gray-400 max-w-2xl">
            Прокси используются для запросов к api.telegram.org, если прямое соединение с VPS
            недоступно. Сначала идёт попытка без прокси, затем по приоритету включённые записи.
          </p>
        </div>
        <Link
          href="/admin/proxies/new"
          className="shrink-0 px-6 py-3 bg-gradient-to-r from-direct-primary to-direct-accent text-white font-semibold rounded-xl shadow-lg transition-all text-center"
        >
          + Добавить прокси
        </Link>
      </div>

      <div className="glass rounded-2xl p-6 mb-8">
        <h2 className="text-lg font-semibold text-white mb-4">Переменные окружения (.env.local)</h2>
        <ul className="space-y-2 text-sm">
          <li className={env.bitrix ? 'text-green-400' : 'text-amber-400'}>
            BITRIX24_WEBHOOK_URL — {env.bitrix ? 'задан' : 'не задан'}
          </li>
          <li className={env.assigned ? 'text-green-400' : 'text-gray-400'}>
            BITRIX24_ASSIGNED_BY_ID — {env.assigned ? 'задан' : 'не задан (опционально)'}
          </li>
          <li className={env.tgBot ? 'text-green-400' : 'text-amber-400'}>
            TELEGRAM_BOT_TOKEN — {env.tgBot ? 'задан' : 'не задан'}
          </li>
          <li className={env.tgChat ? 'text-green-400' : 'text-amber-400'}>
            TELEGRAM_CHAT_ID — {env.tgChat ? 'задан' : 'не задан'}
          </li>
        </ul>
        <div className="mt-6 pt-6 border-t border-white/10">
          <h3 className="text-white font-medium mb-2">Проверка Telegram</h3>
          <p className="text-gray-400 text-sm mb-4">
            Отправит тестовое сообщение в канал с теми же настройками, что и заявки с сайта.
          </p>
          <TelegramTestButton />
        </div>
      </div>

      {proxies.length === 0 ? (
        <div className="glass p-12 rounded-2xl text-center">
          <p className="text-gray-400 mb-4">Прокси не добавлены — запросы к Telegram идут напрямую</p>
          <Link
            href="/admin/proxies/new"
            className="inline-block px-6 py-3 bg-direct-primary hover:bg-direct-primary/90 text-white font-medium rounded-xl transition-colors"
          >
            Добавить первый прокси
          </Link>
        </div>
      ) : (
        <div className="glass rounded-2xl overflow-hidden">
          <table className="w-full">
            <thead className="bg-white/5">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-medium text-white/70">Название</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-white/70">URL</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-white/70">Приоритет</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-white/70">Статус</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-white/70">Проверка</th>
                <th className="px-6 py-4 text-right text-sm font-medium text-white/70">Действия</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {proxies.map((p) => (
                <tr key={p.id} className="hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4 text-white font-medium">{p.name}</td>
                  <td className="px-6 py-4 text-gray-400 text-sm font-mono max-w-xs truncate" title={p.url}>
                    {p.url}
                  </td>
                  <td className="px-6 py-4 text-gray-400">{p.priority}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs ${
                        p.is_enabled
                          ? 'bg-green-500/20 text-green-400'
                          : 'bg-gray-500/20 text-gray-400'
                      }`}
                    >
                      {p.is_enabled ? 'Включён' : 'Выключен'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-400 text-xs">
                    {p.last_check_at ? (
                      <>
                        {p.last_check_ok ? (
                          <span className="text-green-400">OK</span>
                        ) : (
                          <span className="text-red-400" title={p.last_check_error}>
                            Ошибка
                          </span>
                        )}
                        <br />
                        <span className="text-white/40">{p.last_check_at}</span>
                      </>
                    ) : (
                      '—'
                    )}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-4">
                      <Link
                        href={`/admin/proxies/${p.id}/edit`}
                        className="text-direct-primary hover:text-direct-primary/80 text-sm"
                      >
                        Изменить
                      </Link>
                      <form action={deleteProxyAction} className="inline">
                        <input type="hidden" name="id" value={p.id} />
                        <DeleteButton label={p.name} />
                      </form>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
