'use client'

import { motion } from 'framer-motion'
import Counter from '@/components/ui/Counter'

interface StatItem {
  label: string
  value: number
  suffix?: string
  icon: string
  description?: string
}

interface CallStatisticsProps {
  stats: StatItem[]
  title?: string
  description?: string
}

export default function CallStatistics({ 
  stats, 
  title = "Наши результаты в цифрах",
  description 
}: CallStatisticsProps) {
  return (
    <section className="py-16 md:py-24 relative overflow-hidden">
      {/* Фоновый градиент */}
      <div className="absolute inset-0 bg-gradient-to-b from-direct-dark via-direct-purple/20 to-direct-dark opacity-50" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Заголовок */}
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
              <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                {description}
              </p>
            )}
          </motion.div>
        )}

        {/* Сетка статистики */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ 
                duration: 0.5, 
                delay: index * 0.1,
                type: "spring",
                stiffness: 100
              }}
              className="glass p-6 rounded-2xl text-center hover:bg-white/10 transition-all duration-300 hover:scale-105 group"
            >
              {/* Иконка */}
              <div className="w-16 h-16 mx-auto mb-4 rounded-xl bg-direct-primary/20 flex items-center justify-center overflow-hidden group-hover:bg-direct-primary/30 transition-colors">
                <span className="text-3xl">{stat.icon}</span>
              </div>

              {/* Значение с Counter */}
              <div className="text-4xl md:text-5xl font-bold text-direct-primary mb-2">
                <Counter value={stat.value} duration={2.5} />
                {stat.suffix && (
                  <span className="text-2xl ml-1">{stat.suffix}</span>
                )}
              </div>

              {/* Название */}
              <div className="text-lg font-semibold text-direct-light mb-2">
                {stat.label}
              </div>

              {/* Описание (опционально) */}
              {stat.description && (
                <p className="text-sm text-gray-400">
                  {stat.description}
                </p>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
