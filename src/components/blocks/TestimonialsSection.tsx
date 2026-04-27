'use client'

import { useScrollReveal } from '@/lib/hooks/use-scroll-reveal'
import { useScrollRevealMulti } from '@/lib/hooks/use-scroll-reveal-multi'
import { motion } from 'framer-motion'
import { mitaGoldText } from '@/lib/mita-landing-styles'
import { cn } from '@/lib/utils/cn'

export interface TestimonialsSectionProps {
  title: string
  intro?: string
  items: {
    name: string
    role: string
    company: string
    quote: string
  }[]
  layout?: 'default' | 'wide'
}

const cardClass =
  'rounded-2xl border border-[#D4A84B]/20 bg-white/[0.05] backdrop-blur-[10px] p-5 shadow-lg transition duration-300 hover:border-[#D4A84B]/40 hover:shadow-[0_0_15px_rgba(212,168,75,0.15)]'

/**
 * Сетка и карточки как в превью (Why/Accred): 2 колонки, иконка, подпись с border-b
 */
export default function TestimonialsSection({
  title,
  intro,
  items,
  layout = 'default',
}: TestimonialsSectionProps) {
  const titleRef = useScrollReveal()
  const { setRef } = useScrollRevealMulti<HTMLDivElement>(items.length)

  return (
    <section className="py-16 md:py-24">
      <div className="container relative z-10 mx-auto px-4">
        <div ref={titleRef} className="scroll-reveal">
          {intro ? (
            <div className="mb-8 text-center">
              <h2
                className={cn(
                  mitaGoldText,
                  'mb-4 text-2xl font-bold md:mb-6 md:text-3xl lg:text-4xl'
                )}
              >
                {title}
              </h2>
              <p className="text-sm text-white/60 md:text-base">{intro}</p>
            </div>
          ) : (
            <h2
              className={cn(
                mitaGoldText,
                'mb-8 text-center text-2xl font-bold md:mb-10 md:text-3xl lg:text-4xl'
              )}
            >
              {title}
            </h2>
          )}
        </div>

        <div
          className={cn(
            'grid grid-cols-1 gap-4 sm:grid-cols-2',
            layout === 'wide' ? 'mx-auto max-w-6xl lg:grid-cols-3' : 'mx-auto max-w-5xl'
          )}
        >
          {items.map((item, index) => (
            <motion.div
              key={index}
              ref={setRef(index)}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: index * 0.06 }}
              className={cn(cardClass, 'scroll-reveal')}
            >
              <div className="mb-3 text-[#D4A84B]" aria-hidden>
                <svg className="h-8 w-8 shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-5.999c0-3.228 2.228-5.999 5.999-5.999 1.666 0 3.001 1.334 3.001 3.001 0 1.665-1.335 2.999-3.001 2.999v-2.999c-1.665 0-2.999 1.334-2.999 2.999v5.999h-3zm-11.017 0v-5.999c0-3.228 2.228-5.999 5.999-5.999 1.666 0 3.001 1.334 3.001 3.001 0 1.665-1.335 2.999-3.001 2.999v-2.999c-1.665 0-2.999 1.334-2.999 2.999v5.999h-3z" />
                </svg>
              </div>
              <p className="mb-3 text-sm leading-relaxed text-white/60 md:text-base">{item.quote}</p>
              <h3 className="mb-2 border-b border-white/[0.08] pb-2 text-base font-semibold text-[#D4A84B]">
                {item.name}
              </h3>
              <p className="text-sm text-white/60">{item.role}</p>
              <p className="text-sm text-white/45">{item.company}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
