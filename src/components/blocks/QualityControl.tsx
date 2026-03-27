'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

interface ControlLevel {
  title: string
  description: string
  icon: string
  features: string[]
}

interface QualityControlProps {
  levels: ControlLevel[]
  title?: string
  description?: string
}

export default function QualityControl({ 
  levels, 
  title = "Контроль качества",
  description = "Многоуровневая система обеспечения качества каждого звонка"
}: QualityControlProps) {
  return (
    <section className="py-16 md:py-24 relative overflow-hidden">
      {/* Фоновый градиент */}
      <div className="absolute inset-0 bg-gradient-to-b from-direct-dark via-direct-accent/20 to-direct-dark opacity-50" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Заголовок */}
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

        {/* Уровни контроля */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {levels.map((level, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ 
                duration: 0.5, 
                delay: index * 0.15,
                type: "spring",
                stiffness: 100
              }}
              className="glass p-6 rounded-2xl hover:bg-white/10 transition-all duration-300 hover:scale-105 group"
            >
              {/* Иконка */}
              <div className="w-16 h-16 mb-6 rounded-xl bg-direct-primary/20 flex items-center justify-center overflow-hidden group-hover:bg-direct-primary/30 transition-colors">
                <span className="text-3xl">{level.icon}</span>
              </div>

              {/* Заголовок */}
              <h3 className="text-xl font-bold text-direct-light mb-3">
                {level.title}
              </h3>

              {/* Описание */}
              <p className="text-gray-400 mb-4">
                {level.description}
              </p>

              {/* Список возможностей */}
              <ul className="space-y-2">
                {level.features.map((feature, featureIndex) => (
                  <motion.li
                    key={featureIndex}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ 
                      duration: 0.3, 
                      delay: 0.3 + (featureIndex * 0.1) 
                    }}
                    className="flex items-start gap-2 text-sm text-direct-light/80"
                  >
                    <svg
                      className="w-5 h-5 text-direct-primary flex-shrink-0 mt-0.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M5 13l4 4L19 7" 
                      />
                    </svg>
                    <span>{feature}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Дополнительная информация о прозрачности */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 text-center"
        >
          <div className="inline-block glass px-8 py-4 rounded-xl">
            <p className="text-direct-light/90">
              <span className="text-direct-primary font-semibold">Прозрачность процессов:</span>
              {' '}Вы получаете доступ к записям всех звонков и детальной отчётности в реальном времени
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
