'use client'

import { motion } from 'framer-motion'
import { TiltCard } from '@/components/ui/TiltCard'
import { cn } from '@/lib/utils/cn'

interface Guarantee {
  title: string
  description: string
  color?: 'blue' | 'green' | 'purple' | 'red' | 'orange'
}

interface GuaranteeSectionProps {
  guarantees: Guarantee[]
  title?: string
  description?: string
}

export default function GuaranteeSection({
  guarantees,
  title = 'Наши гарантии',
  description
}: GuaranteeSectionProps) {
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

        {/* Сетка гарантий */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {guarantees.map((guarantee, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.55, delay: index * 0.08 }}
              className="h-full"
            >
              <TiltCard
                className={cn(
                  'glass p-6 rounded-2xl h-full transition-all duration-300 hover:bg-white/5'
                )}
                effect="evade"
                tiltLimit={12}
                scale={1.03}
              >
                <h3 className="text-xl font-semibold mb-3">
                  {guarantee.title}
                </h3>

                <p className="text-gray-400 leading-relaxed">
                  {guarantee.description}
                </p>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
