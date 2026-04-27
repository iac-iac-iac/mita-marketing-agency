'use client'

import { motion } from 'framer-motion'
import { mitaGoldText } from '@/lib/mita-landing-styles'
import { cn } from '@/lib/utils/cn'

interface PrincipleItem {
  icon: React.ReactNode
  title: string
  description: string
}

interface WhyChooseUsProps {
  principles?: PrincipleItem[]
  title?: string
  subtitle?: string
}

const defaultPrinciples: PrincipleItem[] = [
  {
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    title: 'Гарантия результата',
    description: 'Мы не просто запускаем кампании — мы гарантируем количество лидов. Если план не выполнен — возвращаем деньги.',
  },
  {
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
      </svg>
    ),
    title: 'Полная прозрачность',
    description: 'Детальная аналитика по каждому каналу. Вы видите каждый лид, каждый звонок, каждую конверсию.',
  },
  {
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    title: 'IT-решения, а не слова',
    description: 'Мы не просто агентство — мы IT-компания. Собственная CMS, аналитика, автоматизация процессов.',
  },
  {
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    ),
    title: 'Масштабирование',
    description: 'Нашли работающую связку? Масштабируем на любые объёмы — от 100 до 10 000 лидов в месяц.',
  },
]

export default function WhyChooseUs({
  principles = defaultPrinciples,
  title = 'Почему выбирают нас',
  subtitle = 'Четыре принципа, которые отличают М.И.Т.А. от других агентств',
}: WhyChooseUsProps) {
  return (
    <section className="relative py-20 md:py-28">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0D0D0D] via-[#0D0D0D] to-[#0D0D0D]/95" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Заголовок */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto text-center mb-16"
        >
          <h2
            className={cn(
              mitaGoldText,
              'mb-6 text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl'
            )}
          >
            {title}
          </h2>
          <p className="text-xl leading-relaxed text-white/60">{subtitle}</p>
        </motion.div>

        {/* Принципы */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {principles.map((principle, i) => (
            <motion.div
              key={principle.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass rounded-2xl border border-white/8 p-8 transition-all duration-500 hover:bg-white/10"
            >
              <motion.div
                className="mb-6 flex h-16 w-16 items-center justify-center rounded-xl border border-[#D4A84B]/25 bg-[#D4A84B]/10 text-[#D4A84B]"
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 + 0.15, type: 'spring', stiffness: 200, damping: 10 }}
              >
                {principle.icon}
              </motion.div>

              <h3 className="mb-3 text-xl font-semibold text-white">{principle.title}</h3>
              <p className="leading-relaxed text-white/60">{principle.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
