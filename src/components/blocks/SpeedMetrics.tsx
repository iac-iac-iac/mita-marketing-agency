'use client'

import { motion } from 'framer-motion'
import Counter from '@/components/ui/Counter'

interface Metric {
  label: string
  value: number
  suffix?: string
  icon: string
  description?: string
}

interface SpeedMetricsProps {
  metrics: Metric[]
  title?: string
  description?: string
}

export default function SpeedMetrics({ 
  metrics, 
  title = 'Скорость подбора',
  description 
}: SpeedMetricsProps) {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        {/* Заголовок секции */}
        {title && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {title}
            </h2>
            {description && (
              <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                {description}
              </p>
            )}
          </motion.div>
        )}

        {/* Сетка метрик */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {metrics.map((metric, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="glass p-6 rounded-2xl text-center hover:bg-white/5 transition-colors"
            >
              {/* Значение с Counter */}
              <div className="mb-3">
                <span className="text-4xl md:text-5xl font-bold text-direct-primary">
                  <Counter value={metric.value} duration={2.5} />
                </span>
                {metric.suffix && (
                  <span className="text-2xl text-direct-primary ml-1">
                    {metric.suffix}
                  </span>
                )}
              </div>

              {/* Label */}
              <h3 className="text-lg font-semibold mb-2">
                {metric.label}
              </h3>

              {/* Description */}
              {metric.description && (
                <p className="text-sm text-gray-400">
                  {metric.description}
                </p>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
