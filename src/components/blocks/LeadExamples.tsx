'use client'

import { motion } from 'framer-motion'

interface Lead {
  id: number
  niche: string
  source: string
  cost: number
  status: 'converted' | 'in_progress' | 'rejected'
}

interface LeadExamplesProps {
  title: string
  description?: string
  leads: Lead[]
}

const statusConfig = {
  converted: {
    label: 'Конвертирован',
    className: 'bg-green-500/20 text-green-400 border-green-500/30',
  },
  in_progress: {
    label: 'В работе',
    className: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  },
  rejected: {
    label: 'Отклонён',
    className: 'bg-red-500/20 text-red-400 border-red-500/30',
  },
}

export default function LeadExamples({
  title,
  description,
  leads,
}: LeadExamplesProps) {
  const formatCost = (cost: number): string => {
    return new Intl.NumberFormat('ru-RU').format(cost) + ' ₽'
  }

  return (
    <section className="py-20 px-4 md:px-8 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-direct-primary to-direct-accent bg-clip-text text-transparent">
          {title}
        </h2>
        {description && (
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            {description}
          </p>
        )}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.8 }}
        className="glass rounded-2xl overflow-hidden"
        data-testid="lead-examples-table"
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-300">
                  Ниша
                </th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-300">
                  Источник
                </th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-300">
                  Стоимость
                </th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-300">
                  Статус
                </th>
              </tr>
            </thead>
            <tbody>
              {leads.map((lead, index) => {
                const config = statusConfig[lead.status]
                return (
                  <motion.tr
                    key={lead.id}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    className="border-b border-white/5 hover:bg-white/5 transition-colors"
                  >
                    <td className="py-4 px-6 text-direct-light">
                      {lead.niche}
                    </td>
                    <td className="py-4 px-6 text-gray-400">
                      {lead.source}
                    </td>
                    <td className="py-4 px-6 text-direct-primary font-semibold">
                      {formatCost(lead.cost)}
                    </td>
                    <td className="py-4 px-6">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${config.className}`}
                        data-testid="status-badge"
                      >
                        {config.label}
                      </span>
                    </td>
                  </motion.tr>
                )
              })}
            </tbody>
          </table>
        </div>

        {leads.length === 0 && (
          <div className="py-12 text-center text-gray-400">
            Нет данных для отображения
          </div>
        )}
      </motion.div>

      {/* Дополнительная статистика */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12"
      >
        <div className="glass p-6 rounded-xl text-center">
          <div className="text-3xl font-bold text-green-400 mb-2">
            {leads.filter(l => l.status === 'converted').length}
          </div>
          <div className="text-sm text-gray-400">
            Конвертировано лидов
          </div>
        </div>
        <div className="glass p-6 rounded-xl text-center">
          <div className="text-3xl font-bold text-yellow-400 mb-2">
            {leads.filter(l => l.status === 'in_progress').length}
          </div>
          <div className="text-sm text-gray-400">
            В работе
          </div>
        </div>
        <div className="glass p-6 rounded-xl text-center">
          <div className="text-3xl font-bold text-red-400 mb-2">
            {leads.filter(l => l.status === 'rejected').length}
          </div>
          <div className="text-sm text-gray-400">
            Отклонено
          </div>
        </div>
      </motion.div>
    </section>
  )
}
