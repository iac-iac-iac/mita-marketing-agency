'use client'

import { useEffect, useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'

interface StatItem {
  value: number
  suffix: string
  label: string
}

interface StatsBannerProps {
  stats?: StatItem[]
  title?: string
}

function AnimatedNumber({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  useEffect(() => {
    if (!isInView) return
    const duration = 2000
    const steps = 60
    const increment = target / steps
    let current = 0
    const timer = setInterval(() => {
      current += increment
      if (current >= target) {
        setCount(target)
        clearInterval(timer)
      } else {
        setCount(Math.floor(current))
      }
    }, duration / steps)
    return () => clearInterval(timer)
  }, [isInView, target])

  return (
    <span ref={ref}>
      {count.toLocaleString('ru-RU')}{suffix}
    </span>
  )
}

const defaultStats: StatItem[] = [
  { value: 500, suffix: '+', label: 'довольных клиентов' },
  { value: 50000, suffix: '+', label: 'лидов в месяц' },
  { value: 98, suffix: '%', label: 'клиентов рекомендуют' },
  { value: 4, suffix: '', label: 'направления услуг' },
]

export default function StatsBanner({
  stats = defaultStats,
  title = 'Результаты в цифрах',
}: StatsBannerProps) {
  return (
    <section className="py-16 md:py-20 relative overflow-hidden">
      {/* Фоновый градиент */}
      <div className="absolute inset-0 bg-gradient-to-r from-direct-primary/5 via-transparent to-direct-primary/5" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Заголовок */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-4xl font-bold text-center mb-12"
        >
          {title}
        </motion.h2>

        {/* Счётчики */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 max-w-5xl mx-auto">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="text-center"
            >
              <div className="text-4xl md:text-5xl lg:text-6xl font-bold text-direct-primary mb-2">
                <AnimatedNumber target={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-gray-400 text-sm md:text-base">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
