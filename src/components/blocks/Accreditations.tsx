'use client'

import { motion } from 'framer-motion'

interface CertificationItem {
  icon: React.ReactNode
  title: string
  description: string
  badge?: string
}

interface AccreditationsProps {
  items?: CertificationItem[]
  title?: string
  subtitle?: string
}

const defaultItems: CertificationItem[] = [
  {
    icon: (
      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    title: 'Аккредитованная IT-компания',
    description: 'М.И.Т.А. внесена в реестр аккредитованных IT-компаний Минцифры РФ. Это подтверждает наш статус и компетенции.',
    badge: 'Минцифры РФ',
  },
  {
    icon: (
      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
    title: 'Полная юридическая чистота',
    description: 'Работаем по договору, предоставляем закрывающие документы. Все платежи прозрачны и документированы.',
    badge: 'Договор',
  },
  {
    icon: (
      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      </svg>
    ),
    title: 'Защита данных',
    description: 'Соблюдаем 152-ФЗ о персональных данных. Все данные клиентов хранятся на серверах в РФ.',
    badge: '152-ФЗ',
  },
  {
    icon: (
      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
      </svg>
    ),
    title: 'Собственная CMS',
    description: 'Разработали собственную систему управления контентом на SQLite. Полный контроль над данными клиентов.',
    badge: 'SQLite',
  },
]

export default function Accreditations({
  items = defaultItems,
  title = 'Аккредитация и сертификаты',
  subtitle = 'Работаем официально и прозрачно. Все документы в порядке.',
}: AccreditationsProps) {
  return (
    <section className="py-20 md:py-28 relative">
      {/* Фоновый градиент */}
      <div className="absolute inset-0 bg-gradient-to-b from-direct-dark via-direct-secondary/30 to-direct-dark" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Заголовок */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">{title}</h2>
          <p className="text-xl text-gray-300 leading-relaxed">{subtitle}</p>
        </motion.div>

        {/* Сертификаты */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {items.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass p-8 rounded-2xl hover:bg-white/10 transition-all duration-500"
            >
              {/* Иконка + бейдж */}
              <div className="flex items-start justify-between mb-6">
                <div className="text-direct-primary">{item.icon}</div>
                {item.badge && (
                  <span className="px-3 py-1 bg-direct-primary/20 text-direct-primary rounded-full text-xs font-medium whitespace-nowrap">
                    {item.badge}
                  </span>
                )}
              </div>

              <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
              <p className="text-gray-300 leading-relaxed">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
