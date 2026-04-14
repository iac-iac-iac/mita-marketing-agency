'use client'

import { motion } from 'framer-motion'

interface TimelineEvent {
  year: string
  title: string
  description: string
  metric?: string
}

interface CompanyTimelineProps {
  events?: TimelineEvent[]
  title?: string
}

const defaultEvents: TimelineEvent[] = [
  {
    year: '2023',
    title: 'Основание М.И.Т.А.',
    description: 'Запуск агентства с фокусом на лидогенерацию и IT-решения для малого и среднего бизнеса.',
    metric: '1 продукт',
  },
  {
    year: '2024',
    title: 'Запуск лидогенерации',
    description: 'Разработка IT-сервиса для поиска номеров телефонов потенциальных клиентов + первичный обзвон.',
    metric: '100+ клиентов',
  },
  {
    year: '2025',
    title: 'Call-центр и Авито',
    description: 'Расширение услуг: профессиональный обзвон, продвижение на Авито, рекрутинг.',
    metric: '300+ клиентов',
  },
  {
    year: '2026',
    title: 'CMS + Админка',
    description: 'Полный переход на SQLite CMS: блог, кейсы, отзывы, заявки — всё управляется из админки.',
    metric: '500+ клиентов',
  },
]

export default function CompanyTimeline({
  events = defaultEvents,
  title = 'Путь М.И.Т.А.',
}: CompanyTimelineProps) {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        {/* Заголовок */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-4xl font-bold text-center mb-16"
        >
          {title}
        </motion.h2>

        {/* Таймлайн */}
        <div className="max-w-4xl mx-auto relative">
          {/* Вертикальная линия */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-0.5 bg-direct-primary/30" />

          {events.map((event, i) => (
            <motion.div
              key={event.year}
              initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className={`relative flex items-start mb-12 last:mb-0 ${
                i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
              }`}
            >
              {/* Точка на линии */}
              <div className="absolute left-6 md:left-1/2 w-4 h-4 rounded-full bg-direct-primary border-4 border-direct-dark transform -translate-x-1/2 z-10 mt-6" />

              {/* Контент */}
              <div className={`ml-14 md:ml-0 md:w-1/2 ${i % 2 === 0 ? 'md:pr-12' : 'md:pl-12'}`}>
                <div className="glass p-6 rounded-2xl hover:bg-white/10 transition-all duration-300">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-direct-primary font-bold text-lg">{event.year}</span>
                    {event.metric && (
                      <span className="px-3 py-1 bg-direct-primary/20 text-direct-primary rounded-full text-xs font-medium">
                        {event.metric}
                      </span>
                    )}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
                  <p className="text-gray-300 leading-relaxed text-sm">{event.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
