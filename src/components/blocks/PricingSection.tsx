'use client'

import CtaButton from '@/components/ui/CtaButton'
import { useScrollReveal } from '@/lib/hooks/use-scroll-reveal'
import { motion } from 'framer-motion'

export interface PricingSectionProps {
  title: string;
  intro?: string; // Опционально — для главной страницы
  plans: {
    name: string;
    description: string;
    price: string;
    billingPeriod?: string; // Опционально — для сервисов
    features: string[];
    ctaLabel: string;
    ctaUrl: string;
    isHighlighted?: boolean;
  }[];
}

export default function PricingSection({
  title,
  intro,
  plans,
}: PricingSectionProps) {
  const titleRef = useScrollReveal()
  const planRefs = plans.map(() => useScrollReveal())

  return (
    <section className="py-20 md:py-28 relative">
      {/* Фоновый градиент */}
      <div className="absolute inset-0 bg-gradient-to-b from-direct-dark via-direct-secondary/50 to-direct-dark" />

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

        {/* Карточки тарифов */}
        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              ref={planRefs[index]}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`glass p-8 rounded-3xl transition-all duration-700 scroll-reveal ${
                plan.isHighlighted ? 'border-direct-primary/50 shadow-xl shadow-direct-primary/20' : ''
              }`}
            >
              <h3 className="text-2xl font-bold mb-2">
                {plan.name}
              </h3>
              <p className="text-gray-300 mb-4">
                {plan.description}
              </p>
              <div className="mb-6">
                <span className="text-4xl font-bold text-direct-primary">
                  {plan.price}
                </span>
                {plan.billingPeriod && (
                  <span className="text-gray-400 ml-2">
                    {plan.billingPeriod}
                  </span>
                )}
              </div>
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start gap-3 text-gray-200">
                    <svg className="w-5 h-5 text-direct-primary flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <CtaButton
                variant={plan.isHighlighted ? 'primary' : 'secondary'}
                size="lg"
                href={plan.ctaUrl}
                className="w-full"
              >
                {plan.ctaLabel}
              </CtaButton>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
