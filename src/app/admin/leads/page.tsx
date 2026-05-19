import { revalidatePath } from 'next/cache'
import {
  getAllLeads,
  getLeadsCountByStatus,
  updateLeadStatus,
  type Lead,
} from '@/lib/cms/db-leads'

const STATUS_OPTIONS: { value: Lead['status']; label: string }[] = [
  { value: 'new', label: 'Новый' },
  { value: 'contacted', label: 'Связались' },
  { value: 'qualified', label: 'Квалифицирован' },
  { value: 'won', label: 'Успех' },
  { value: 'lost', label: 'Отказ' },
]

const FORM_LABELS: Record<string, string> = {
  contact_page: 'Страница /contact',
  contact_form: 'Форма контактов',
}

function formatFormName(name: string): string {
  return FORM_LABELS[name] || name
}

function formatDate(iso: string): string {
  try {
    return new Date(iso).toLocaleString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  } catch {
    return iso
  }
}

function statusLabel(status: Lead['status']): string {
  return STATUS_OPTIONS.find((o) => o.value === status)?.label ?? status
}

function statusBadgeClass(status: Lead['status']): string {
  switch (status) {
    case 'new':
      return 'bg-blue-500/20 text-blue-300'
    case 'contacted':
      return 'bg-yellow-500/20 text-yellow-300'
    case 'qualified':
      return 'bg-purple-500/20 text-purple-300'
    case 'won':
      return 'bg-green-500/20 text-green-400'
    case 'lost':
      return 'bg-red-500/20 text-red-400'
    default:
      return 'bg-white/10 text-white/70'
  }
}

async function handleStatusUpdate(formData: FormData) {
  'use server'
  const id = Number(formData.get('id'))
  const status = formData.get('status') as Lead['status']
  if (!id || !STATUS_OPTIONS.some((o) => o.value === status)) return
  updateLeadStatus(id, status)
  revalidatePath('/admin/leads')
}

export default function AdminLeadsPage() {
  const leads = getAllLeads()
  const counts = getLeadsCountByStatus()
  const total = leads.length
  const newCount = counts.new ?? 0

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Заявки с сайта</h1>
        <p className="text-gray-400">
          Все обращения из форм сохраняются в базе на сервере. Bitrix24 не используется.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="glass rounded-xl p-4">
          <p className="text-sm text-gray-400">Всего</p>
          <p className="text-2xl font-bold text-white">{total}</p>
        </div>
        <div className="glass rounded-xl p-4">
          <p className="text-sm text-gray-400">Новые</p>
          <p className="text-2xl font-bold text-blue-300">{newCount}</p>
        </div>
        <div className="glass rounded-xl p-4">
          <p className="text-sm text-gray-400">В работе</p>
          <p className="text-2xl font-bold text-yellow-300">
            {(counts.contacted ?? 0) + (counts.qualified ?? 0)}
          </p>
        </div>
        <div className="glass rounded-xl p-4">
          <p className="text-sm text-gray-400">Успешные</p>
          <p className="text-2xl font-bold text-green-400">{counts.won ?? 0}</p>
        </div>
      </div>

      {leads.length === 0 ? (
        <div className="glass p-12 rounded-2xl text-center">
          <p className="text-gray-400">Пока нет заявок</p>
          <p className="text-sm text-gray-500 mt-2">
            После отправки формы на /contact запись появится здесь.
          </p>
        </div>
      ) : (
        <div className="glass rounded-2xl overflow-x-auto">
          <table className="w-full min-w-[960px]">
            <thead className="bg-white/5">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-medium text-white/70">Дата</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-white/70">Источник</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-white/70">Контакт</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-white/70">Компания</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-white/70">Сообщение</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-white/70">Статус</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {leads.map((lead) => (
                <tr key={lead.id} className="hover:bg-white/5 align-top">
                  <td className="px-4 py-4 text-gray-400 text-sm whitespace-nowrap">
                    {formatDate(lead.created_at)}
                  </td>
                  <td className="px-4 py-4 text-gray-300 text-sm">
                    <span className="block">{formatFormName(lead.form_name)}</span>
                    {lead.service ? (
                      <span className="text-xs text-gray-500">{lead.service}</span>
                    ) : null}
                  </td>
                  <td className="px-4 py-4 text-sm">
                    <p className="text-white font-medium">{lead.name}</p>
                    <a
                      href={`tel:${lead.phone.replace(/\s/g, '')}`}
                      className="text-direct-primary hover:underline block"
                    >
                      {lead.phone}
                    </a>
                    <a
                      href={`mailto:${lead.email}`}
                      className="text-gray-400 hover:text-white hover:underline block break-all"
                    >
                      {lead.email}
                    </a>
                  </td>
                  <td className="px-4 py-4 text-gray-400 text-sm">
                    {lead.company || '—'}
                  </td>
                  <td className="px-4 py-4 text-gray-400 text-sm max-w-xs">
                    <p className="whitespace-pre-wrap break-words">
                      {lead.message || '—'}
                    </p>
                    {(lead.utm_source || lead.utm_campaign) && (
                      <p className="text-xs text-gray-500 mt-2">
                        UTM: {[lead.utm_source, lead.utm_medium, lead.utm_campaign]
                          .filter(Boolean)
                          .join(' / ')}
                      </p>
                    )}
                  </td>
                  <td className="px-4 py-4">
                    <form action={handleStatusUpdate} className="flex flex-col gap-2 min-w-[140px]">
                      <input type="hidden" name="id" value={lead.id} />
                      <span
                        className={`inline-flex w-fit px-2 py-0.5 rounded-full text-xs font-medium ${statusBadgeClass(lead.status)}`}
                      >
                        {statusLabel(lead.status)}
                      </span>
                      <select
                        name="status"
                        defaultValue={lead.status}
                        className="rounded-lg bg-white/10 border border-white/10 text-white text-sm px-2 py-1.5"
                      >
                        {STATUS_OPTIONS.map((opt) => (
                          <option key={opt.value} value={opt.value} className="bg-direct-dark">
                            {opt.label}
                          </option>
                        ))}
                      </select>
                      <button
                        type="submit"
                        className="text-xs px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
                      >
                        Сохранить
                      </button>
                    </form>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}