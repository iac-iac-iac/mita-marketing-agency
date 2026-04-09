'use client'

import CtaButton from '@/components/ui/CtaButton'
import { useScrollReveal } from '@/lib/hooks/use-scroll-reveal'
import { useScrollRevealMulti } from '@/lib/hooks/use-scroll-reveal-multi'
import { motion } from 'framer-motion'

export interface CompactPricingProps {
  title: string;
  subtitle?: string;
  plans: {
    name: string;
    description: string;
    price: string;
    regions: string;
    features: string[];
    ctaLabel: string;
    ctaUrl: string;
    isHighlighted?: boolean;
  }[];
}

/**
 * CompactPricing — горизонтальные карточки тарифов (2 в ряд)
 * Минималистичный дизайн с акцентом на ценах и количестве регионов
 */
export default function CompactPricing({
  title,
  subtitle,
  plans,
}: CompactPricingProps) {
  const titleRef = useScrollReveal()
  const { setRef } = useScrollRevealMulti<HTMLDivElement>(plans.length)

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

        {/* Горизонтальные карточки тарифов (2 в ряд) */}
        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              ref={setRef(index)}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`glass p-6 md:p-8 rounded-2xl transition-all duration-700 scroll-reveal hover:scale-[1.02] ${
                plan.isHighlighted
                  ? 'border-direct-primary/50 shadow-xl shadow-direct-primary/20'
                  : 'border-white/10'
              }`}
            >
              <div className="flex flex-col h-full">
                {/* Заголовок тарифа */}
                <div className="mb-4">
                  <h3 className="text-2xl font-bold mb-1">
                    {plan.name}
                  </h3>
                  <p className="text-sm text-gray-400">
                    {plan.regions}
                  </p>
                </div>

                {/* Цена */}
                <div className="mb-6">
                  <span className="text-4xl md:text-5xl font-bold text-direct-primary">
                    {plan.price}
                  </span>
                </div>

                {/* Описание */}
                <p className="text-gray-300 mb-6 text-sm">
                  {plan.description}
                </p>

                {/* Фичи */}
                <ul className="space-y-2 mb-6 flex-grow">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start gap-2 text-sm text-gray-200">
                      <svg className="w-4 h-4 text-direct-primary flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA кнопка */}
                <CtaButton
                  variant={plan.isHighlighted ? 'primary' : 'secondary'}
                  size="lg"
                  href={plan.ctaUrl}
                  className="w-full"
                >
                  {plan.ctaLabel}
                </CtaButton>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
