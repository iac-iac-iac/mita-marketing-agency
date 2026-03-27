'use client'

import { motion } from 'framer-motion'
import Counter from '@/components/ui/Counter'

interface VacancyCase {
  niche: string
  position: string
  deadline: string
  result: string
  icon: string
}

interface VacancyCasesProps {
  cases: VacancyCase[]
  title?: string
  description?: string
}

export default function VacancyCases({ 
  cases, 
  title = 'Закрытые вакансии',
  description 
}: VacancyCasesProps) {
  // Извлекаем число из результата для анимации
  const extractNumber = (result: string): number => {
    const match = result.match(/(\d+)/)
    return match ? parseInt(match[1], 10) : 0
  }

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

        {/* Сетка кейсов */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {cases.map((caseItem, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass p-6 rounded-2xl hover:bg-white/5 transition-colors"
            >
              {/* Иконка */}
              <div className="text-4xl mb-4">
                {caseItem.icon}
              </div>

              {/* Ниша */}
              <div className="inline-block px-3 py-1 rounded-full bg-direct-primary/20 text-direct-primary text-sm font-medium mb-4">
                {caseItem.niche}
              </div>

              {/* Позиция */}
              <h3 className="text-lg font-semibold mb-4 min-h-[3rem]">
                {caseItem.position}
              </h3>

              {/* Срок */}
              <div className="mb-3">
                <span className="text-sm text-gray-400">Срок:</span>
                <span className="ml-2 text-direct-light font-medium">
                  {caseItem.deadline}
                </span>
              </div>

              {/* Результат */}
              <div>
                <span className="text-sm text-gray-400">Результат:</span>
                <div className="mt-1">
                  <span className="text-2xl font-bold text-direct-primary">
                    <Counter value={extractNumber(caseItem.result)} duration={2} />
                  </span>
                  <span className="text-direct-light ml-1">
                    {caseItem.result.replace(/\d+/, '')}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
