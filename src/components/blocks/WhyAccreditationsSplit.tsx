'use client'

import type { ComponentType, SVGProps } from 'react'
import { motion } from 'framer-motion'
import { mitaGoldText } from '@/lib/mita-landing-styles'
import { cn } from '@/lib/utils/cn'

const glassCard =
  'rounded-2xl border border-[#D4A84B]/20 bg-white/[0.05] backdrop-blur-[10px] shadow-lg'

type IconType = ComponentType<SVGProps<SVGSVGElement> & { className?: string }>

const whyItems: { title: string; text: string; icon: IconType }[] = [
  {
    title: 'Гарантия результата',
    text: 'Мы не просто запускаем кампании — договариваемся о метриках и доводим план до результата.',
    icon: ({ className }) => (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
        />
      </svg>
    ),
  },
  {
    title: 'Полная прозрачность',
    text: 'Аналитика по каналам: вы видите лиды, звонки и этапы воронки без «чёрного ящика».',
    icon: ({ className }) => (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
        />
      </svg>
    ),
  },
  {
    title: 'Подход к работе',
    text: 'Сначала аудит и стратегия, затем настройка и запуск с понятными сроками и зоной ответственности.',
    icon: ({ className }) => (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
        />
      </svg>
    ),
  },
  {
    title: 'Речевой сервис',
    text: 'Call-центр и скрипты под ваш продукт: квалификация и передача тёплых лидов в отдел продаж.',
    icon: ({ className }) => (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
        />
      </svg>
    ),
  },
]

const accredItems: { title: string; text: string; icon: IconType }[] = [
  {
    title: 'Полная юридическая чистота',
    text: 'Работаем по договору, закрывающие документы и прозрачные платежи.',
    icon: ({ className }) => (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
        />
      </svg>
    ),
  },
  {
    title: 'Защита данных',
    text: 'Соблюдение 152-ФЗ: хранение и обработка персональных данных в правовом поле.',
    icon: ({ className }) => (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
        />
      </svg>
    ),
  },
  {
    title: 'Собственные IT-решения',
    text: 'Своя CMS и интеграции — контроль над данными и процессами для клиентов.',
    icon: ({ className }) => (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
  },
  {
    title: 'Проверенные площадки',
    text: 'Работа с рекламными и классифайд-площадками в рамках согласованных регламентов.',
    icon: ({ className }) => (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
  },
]

const cardClass = `${glassCard} p-5 transition duration-300 hover:border-[#D4A84B]/40 hover:shadow-[0_0_15px_rgba(212,168,75,0.15)]`

/**
 * Секция как в PreviewLanding: две колонки, сетка 2×2 карточек, glass + border D4A84B/20
 */
export default function WhyAccreditationsSplit() {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.45 }}
              className={cn(mitaGoldText, 'mb-8 text-2xl font-bold md:text-3xl')}
            >
              Почему выбирают нас
            </motion.h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {whyItems.map((w, wi) => {
                const Icon = w.icon
                return (
                  <motion.div
                    key={w.title}
                    initial={{ opacity: 0, y: 28 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-40px' }}
                    transition={{ duration: 0.5, delay: wi * 0.06 }}
                    className={cardClass}
                  >
                    <Icon className="mb-3 h-8 w-8 shrink-0 text-[#D4A84B]" aria-hidden />
                    <h3 className="mb-2 border-b border-white/[0.08] pb-2 font-semibold text-[#D4A84B]">
                      {w.title}
                    </h3>
                    <p className="text-sm text-white/60">{w.text}</p>
                  </motion.div>
                )
              })}
            </div>
          </div>
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.45 }}
              className={cn(mitaGoldText, 'mb-8 text-2xl font-bold md:text-3xl')}
            >
              Аккредитация и сертификаты
            </motion.h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {accredItems.map((a, ai) => {
                const Icon = a.icon
                return (
                  <motion.div
                    key={a.title}
                    initial={{ opacity: 0, y: 28 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-40px' }}
                    transition={{ duration: 0.5, delay: ai * 0.06 }}
                    className={cardClass}
                  >
                    <Icon className="mb-3 h-8 w-8 shrink-0 text-[#D4A84B]" aria-hidden />
                    <h3 className="mb-2 border-b border-white/[0.08] pb-2 font-semibold text-[#D4A84B]">
                      {a.title}
                    </h3>
                    <p className="text-sm text-white/60">{a.text}</p>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
