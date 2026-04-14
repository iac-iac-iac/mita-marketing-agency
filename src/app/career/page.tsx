'use client'

import { motion } from 'framer-motion'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'

const benefits = [
  {
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    ),
    title: 'Быстрый рост',
    description: 'Мы растём на 300% в год — и растём вместе с нами. Реальные перспективы карьерного развития.',
  },
  {
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
    title: 'IT-компания',
    description: 'Собственная CMS, аналитика, автоматизация. Работаем с современными технологиями.',
  },
  {
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    title: 'Результат',
    description: 'Не просто «процесс» — конкретные KPI и измеримые результаты. Видишь свой вклад в цифры.',
  },
  {
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
    title: 'Гибридный формат',
    description: 'Возможность удалённой работы. Главное — результат, а не присутствие в офисе.',
  },
  {
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
    title: 'Обучение',
    description: 'Внутренние тренинги, курсы, конференции. Инвестируем в развитие команды.',
  },
  {
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: 'Конкурентная зарплата',
    description: 'Оклад + бонусы за результат. Прозрачная система мотивации.',
  },
]

const vacancies = [
  {
    title: 'Менеджер по продажам',
    department: 'Отдел продаж',
    description: 'Работа с входящими лидами, проведение презентаций услуг, заключение договоров.',
    requirements: ['Опыт в B2B продажах от 1 года', 'Грамотная речь', 'Умение работать в CRM'],
    conditions: ['Оклад + % от продаж', 'Гибридный формат', 'Обучение продукту'],
  },
  {
    title: 'Оператор call-центра',
    department: 'Call-центр',
    description: 'Холодные и тёплые звонки по базе, квалификация лидов, запись на консультации.',
    requirements: ['Грамотная речь', 'Стрессоустойчивость', 'Опыт в колл-центре — плюс'],
    conditions: ['Оклад + бонусы за конверсию', 'Удобный график', 'Обучение скриптам'],
  },
  {
    title: 'Маркетолог / Таргетолог',
    department: 'Маркетинг',
    description: 'Настройка и ведение рекламных кампаний, аналитика, оптимизация воронок.',
    requirements: ['Опыт с Яндекс.Директ/VK Ads', 'Понимание аналитики', 'Портфолио кейсов'],
    conditions: ['Конкурентная зарплата', 'Бюджеты на тесты', 'Рост до руководителя'],
  },
]

export default function CareerPage() {
  return (
    <>
      <Header showBackButton showHamburgerMenu />

      <main className="animate-fade-in-up">
        {/* Hero */}
        <section className="relative min-h-[60vh] flex items-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-direct-dark via-direct-secondary to-direct-dark" />
          <div className="container mx-auto px-4 relative z-10 py-20">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl"
            >
              <p className="text-direct-primary font-semibold text-sm md:text-base mb-4 tracking-wider uppercase">
                Команда М.И.Т.А.
              </p>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Строим агентство мечты вместе
              </h1>
              <p className="text-xl text-gray-300 leading-relaxed">
                Присоединяйся к команде, которая каждый день создаёт поток клиентов для бизнеса.
                Мы не просто работаем — мы растем на 300% в год.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Преимущества */}
        <section className="py-20 md:py-28 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-direct-dark via-direct-primary/5 to-direct-dark" />
          <div className="container mx-auto px-4 relative z-10">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-3xl md:text-4xl font-bold text-center mb-16"
            >
              Почему работают у нас
            </motion.h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {benefits.map((benefit, i) => (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="glass p-6 rounded-2xl hover:bg-white/10 transition-all duration-300"
                >
                  <div className="w-16 h-16 rounded-xl bg-direct-primary/20 flex items-center justify-center mb-6 text-direct-primary">
                    {benefit.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                  <p className="text-gray-300 text-sm leading-relaxed">{benefit.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Вакансии */}
        <section className="py-20 md:py-28 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-direct-dark via-direct-secondary/50 to-direct-dark" />
          <div className="container mx-auto px-4 relative z-10">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-3xl md:text-4xl font-bold text-center mb-16"
            >
              Открытые вакансии
            </motion.h2>

            <div className="max-w-4xl mx-auto space-y-8">
              {vacancies.map((vacancy, i) => (
                <motion.div
                  key={vacancy.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="glass p-8 rounded-2xl hover:bg-white/10 transition-all duration-300"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-2xl font-semibold mb-1">{vacancy.title}</h3>
                      <span className="text-direct-primary text-sm font-medium">{vacancy.department}</span>
                    </div>
                    <Link
                      href="/contact"
                      className="px-6 py-3 bg-direct-primary hover:bg-direct-primary/90 text-white font-medium rounded-xl transition-colors whitespace-nowrap"
                    >
                      Откликнуться
                    </Link>
                  </div>

                  <p className="text-gray-300 mb-6">{vacancy.description}</p>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-white font-medium mb-3">Требования</h4>
                      <ul className="space-y-2">
                        {vacancy.requirements.map((req) => (
                          <li key={req} className="text-gray-400 text-sm flex items-start gap-2">
                            <span className="text-direct-primary mt-1">•</span>
                            {req}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-white font-medium mb-3">Условия</h4>
                      <ul className="space-y-2">
                        {vacancy.conditions.map((cond) => (
                          <li key={cond} className="text-gray-400 text-sm flex items-start gap-2">
                            <span className="text-direct-primary mt-1">•</span>
                            {cond}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 relative">
          <div className="absolute inset-0 bg-gradient-to-br from-direct-primary/10 to-direct-accent/10" />
          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="max-w-3xl mx-auto text-center"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Не нашли подходящую вакансию?</h2>
              <p className="text-xl text-gray-300 mb-8">
                Напишите нам — возможно, мы как ищем именно вас!
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-4 bg-direct-primary hover:bg-direct-primary/90 text-white font-medium rounded-xl transition-colors text-lg"
              >
                Написать нам
              </Link>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
