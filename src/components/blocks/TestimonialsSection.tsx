'use client'

import { useScrollReveal } from '@/lib/hooks/use-scroll-reveal'
import { useScrollRevealMulti } from '@/lib/hooks/use-scroll-reveal-multi'
import { motion } from 'framer-motion'

export interface TestimonialsSectionProps {
  title: string;
  intro?: string; // Опционально — для главной страницы
  items: {
    name: string;
    role: string;
    company: string;
    quote: string;
  }[];
  layout?: 'default' | 'wide'; // default = 2 колонки, wide = 3 колонки
}

export default function TestimonialsSection({
  title,
  intro,
  items,
  layout = 'default',
}: TestimonialsSectionProps) {
  const titleRef = useScrollReveal()
  const { setRef } = useScrollRevealMulti<HTMLDivElement>(items.length)

  return (
    <section className="py-20 md:py-28 relative">
      {/* Фоновый градиент */}
      <div className="absolute inset-0 bg-gradient-to-b from-direct-dark via-direct-primary/20 to-direct-dark" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Заголовок и вступление */}
        <div ref={titleRef} className="scroll-reveal">
          {intro ? (
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
                {title}
              </h2>
              <p className="text-xl text-gray-300">
                {intro}
              </p>
            </div>
          ) : (
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-12">
              {title}
            </h2>
          )}
        </div>

        {/* Карточки отзывов */}
        <div className={`grid gap-6 ${
          layout === 'wide' 
            ? 'md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto' 
            : 'md:grid-cols-2 max-w-4xl mx-auto'
        }`}>
          {items.map((item, index) => (
            <motion.div
              key={index}
              ref={setRef(index)}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass p-8 rounded-3xl transition-all duration-700 scroll-reveal hover:bg-white/10"
            >
              {/* Цитата */}
              <div className="mb-6">
                <svg className="w-10 h-10 text-direct-primary/40 mb-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-5.999c0-3.228 2.228-5.999 5.999-5.999 1.666 0 3.001 1.334 3.001 3.001 0 1.665-1.335 2.999-3.001 2.999v-2.999c-1.665 0-2.999 1.334-2.999 2.999v5.999h-3zm-11.017 0v-5.999c0-3.228 2.228-5.999 5.999-5.999 1.666 0 3.001 1.334 3.001 3.001 0 1.665-1.335 2.999-3.001 2.999v-2.999c-1.665 0-2.999 1.334-2.999 2.999v5.999h-3z" />
                </svg>
                <p className="text-gray-200 leading-relaxed italic">
                  "{item.quote}"
                </p>
              </div>

              {/* Автор */}
              <div className="border-t border-white/10 pt-4">
                <p className="font-semibold text-white mb-1">
                  {item.name}
                </p>
                <p className="text-sm text-direct-primary">
                  {item.role}
                </p>
                <p className="text-sm text-gray-400">
                  {item.company}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
