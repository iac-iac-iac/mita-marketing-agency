'use client'

import { useState } from 'react'
import { useScrollReveal } from '@/lib/hooks/use-scroll-reveal'
import { motion, AnimatePresence } from 'framer-motion'

export interface FaqSectionProps {
  title: string;
  items: {
    question: string;
    answer: string;
  }[];
}

export default function FaqSection({
  title,
  items,
}: FaqSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const titleRef = useScrollReveal()
  const itemRefs = items.map(() => useScrollReveal())

  return (
    <section className="py-20 md:py-28 relative">
      {/* Фоновый градиент */}
      <div className="absolute inset-0 bg-gradient-to-b from-direct-dark via-direct-secondary/30 to-direct-dark" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Заголовок */}
        <div ref={titleRef} className="scroll-reveal">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-12">
            {title}
          </h2>
        </div>

        {/* Аккордеон */}
        <div className="max-w-3xl mx-auto space-y-4">
          {items.map((item, index) => (
            <motion.div
              key={index}
              ref={itemRefs[index]}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="glass rounded-2xl overflow-hidden scroll-reveal"
            >
              <button
                className="w-full px-6 py-4 text-left flex items-center justify-between gap-4 hover:bg-white/5 transition-colors"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <span className="font-semibold text-lg">
                  {item.question}
                </span>
                <motion.span
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </motion.span>
              </button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-4 text-gray-300 leading-relaxed">
                      {item.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
