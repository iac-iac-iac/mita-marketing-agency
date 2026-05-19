import Link from 'next/link';
import type { ProxyRow } from '@/lib/cms/db-proxies';

type ProxyFormProps = {
  action: (formData: FormData) => void | Promise<void>;
  proxy?: ProxyRow;
  title: string;
  subtitle: string;
};

export default function ProxyForm({ action, proxy, title, subtitle }: ProxyFormProps) {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">{title}</h1>
        <p className="text-gray-400">{subtitle}</p>
      </div>

      <form action={action} className="space-y-6 max-w-2xl glass p-8 rounded-2xl">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-white/90 mb-2">
            Название *
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            defaultValue={proxy?.name ?? ''}
            placeholder="Например: VPS EU #1"
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:ring-2 focus:ring-direct-primary/50"
          />
        </div>

        <div>
          <label htmlFor="url" className="block text-sm font-medium text-white/90 mb-2">
            URL прокси *
          </label>
          <input
            id="url"
            name="url"
            type="url"
            required
            defaultValue={proxy?.url ?? ''}
            placeholder="http://user:pass@host:port"
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white font-mono text-sm focus:ring-2 focus:ring-direct-primary/50"
          />
          <p className="mt-2 text-xs text-gray-500">
            HTTP/HTTPS прокси для undici ProxyAgent (например http://login:password@1.2.3.4:8080)
          </p>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <label htmlFor="priority" className="block text-sm font-medium text-white/90 mb-2">
              Приоритет
            </label>
            <input
              id="priority"
              name="priority"
              type="number"
              defaultValue={proxy?.priority ?? 0}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:ring-2 focus:ring-direct-primary/50"
            />
            <p className="mt-2 text-xs text-gray-500">Больше — проверяется раньше</p>
          </div>
          <div className="flex items-end pb-3">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                name="is_enabled"
                defaultChecked={proxy ? proxy.is_enabled === 1 : true}
                className="w-5 h-5 rounded border-white/20 bg-white/5 text-direct-primary focus:ring-direct-primary/50"
              />
              <span className="text-white/90">Включён</span>
            </label>
          </div>
        </div>

        <div className="flex items-center gap-4 pt-4">
          <button
            type="submit"
            className="px-6 py-3 bg-direct-primary hover:bg-direct-primary/90 text-white font-medium rounded-xl transition-colors"
          >
            Сохранить
          </button>
          <Link
            href="/admin/proxies"
            className="px-6 py-3 text-gray-400 hover:text-white transition-colors"
          >
            Отмена
          </Link>
        </div>
      </form>
    </div>
  );
}
