'use client'

import { useScrollReveal } from '@/lib/hooks/use-scroll-reveal'
import { motion } from 'framer-motion'

export interface AdExample {
  title: string;
  price: string;
  location: string;
  description: string;
  category: string;
  views?: string;
  isPremium?: boolean;
}

export interface AdExamplesProps {
  title: string;
  subtitle?: string;
  examples: AdExample[];
}

/**
 * AdExamples — Mockup объявлений Авито (CSS-визуализация)
 * Визуальная демонстрация качества объявлений
 */
export default function AdExamples({
  title,
  subtitle,
  examples,
}: AdExamplesProps) {
  const titleRef = useScrollReveal()
  const exampleRefs = examples.map(() => useScrollReveal())

  return (
    <section className="py-16 md:py-20 relative">
      {/* Фоновый градиент */}
      <div className="absolute inset-0 bg-gradient-to-b from-direct-dark via-direct-secondary/30 to-direct-dark" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Заголовок */}
        <div ref={titleRef} className="scroll-reveal mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-4">
            {title}
          </h2>
          {subtitle && (
            <p className="text-lg text-gray-300 text-center max-w-2xl mx-auto">
              {subtitle}
            </p>
          )}
        </div>

        {/* Примеры объявлений */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {examples.map((example, index) => (
            <motion.div
              key={index}
              ref={exampleRefs[index]}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="scroll-reveal"
            >
              {/* Mockup объявления Авито */}
              <div className="glass rounded-2xl p-5 h-full border-white/10 hover:border-direct-primary/30 transition-all duration-300">
                {/* Premium бейдж */}
                {example.isPremium && (
                  <div className="mb-3">
                    <span className="inline-block px-2 py-1 bg-gradient-to-r from-[#00AAFF] to-[#0066FF] text-white text-xs font-bold rounded-md">
                      PREMIUM
                    </span>
                  </div>
                )}

                {/* Изображение (плейсхолдер) */}
                <div className="w-full h-40 bg-gradient-to-br from-gray-700 to-gray-800 rounded-xl mb-4 flex items-center justify-center relative overflow-hidden">
                  {/* Имитация изображения товара */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent" />
                  <span className="text-4xl">{example.category === 'Недвижимость' ? '🏠' : example.category === 'Авто' ? '🚗' : example.category === 'Услуги' ? '🛠️' : '📦'}</span>
                </div>

                {/* Категория */}
                <div className="text-xs text-gray-400 mb-2">
                  {example.category}
                </div>

                {/* Заголовок */}
                <h3 className="text-lg font-semibold mb-2 line-clamp-2 min-h-[3rem]">
                  {example.title}
                </h3>

                {/* Цена */}
                <div className="text-xl font-bold text-direct-primary mb-2">
                  {example.price}
                </div>

                {/* Локация */}
                <div className="text-sm text-gray-400 mb-3 flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {example.location}
                </div>

                {/* Описание */}
                <p className="text-sm text-gray-300 mb-4 line-clamp-2">
                  {example.description}
                </p>

                {/* Просмотры */}
                {example.views && (
                  <div className="text-xs text-gray-500 pt-3 border-t border-white/10">
                    👁 {example.views} просмотров
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
