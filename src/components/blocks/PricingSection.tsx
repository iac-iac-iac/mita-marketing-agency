'use client'

import CtaButton from '@/components/ui/CtaButton'
import { useScrollReveal } from '@/lib/hooks/use-scroll-reveal'
import { useScrollRevealMulti } from '@/lib/hooks/use-scroll-reveal-multi'
import { motion } from 'framer-motion'
import { mitaCtaGradient, mitaGoldText } from '@/lib/mita-landing-styles'
import { cn } from '@/lib/utils/cn'

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
  const { setRef } = useScrollRevealMulti<HTMLDivElement>(plans.length)

  return (
    <section className="relative py-20 md:py-28">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0D0D0D] via-[#0D0D0D]/95 to-[#0D0D0D]" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Заголовок и вступление */}
        <div ref={titleRef} className="scroll-reveal">
          {intro ? (
            <div className="mx-auto mb-12 max-w-3xl text-center">
              <h2
                className={cn(
                  mitaGoldText,
                  'mb-6 text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl'
                )}
              >
                {title}
              </h2>
              <p className="text-xl text-white/60">
                {intro}
              </p>
            </div>
          ) : (
            <h2
              className={cn(
                mitaGoldText,
                'mb-12 text-center text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl'
              )}
            >
              {title}
            </h2>
          )}
        </div>

        {/* Карточки тарифов: 4+ — две колонки на md, четыре на xl; иначе три колонки */}
        <div
          className={`grid gap-6 mx-auto ${
            plans.length >= 4
              ? 'md:grid-cols-2 xl:grid-cols-4 max-w-7xl'
              : 'md:grid-cols-3 max-w-6xl'
          }`}
        >
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              ref={setRef(index)}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={cn(
                'glass scroll-reveal rounded-3xl border border-white/8 p-8 transition-all duration-700',
                plan.isHighlighted &&
                  'border-[#D4A84B]/40 shadow-[0_0_32px_rgba(212,168,75,0.15)]'
              )}
            >
              <h3 className="mb-2 text-2xl font-bold text-white">
                {plan.name}
              </h3>
              <p className="mb-4 text-white/60">
                {plan.description}
              </p>
              <div className="mb-6">
                <span className="text-4xl font-bold text-[#D4A84B]">
                  {plan.price}
                </span>
                {plan.billingPeriod && (
                  <span className="ml-2 text-white/50">
                    {plan.billingPeriod}
                  </span>
                )}
              </div>
              <ul className="mb-8 space-y-3">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start gap-3 text-white/80">
                    <svg className="mt-0.5 h-5 w-5 flex-shrink-0 text-[#D4A84B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <CtaButton
                variant={plan.isHighlighted ? 'primary' : 'secondary'}
                href={plan.ctaUrl}
                size="lg"
                className={cn(
                  'w-full',
                  plan.isHighlighted
                    ? mitaCtaGradient
                    : '!border !border-white/12 !bg-white/[0.06] !from-transparent !to-transparent !text-white/90 !shadow-none hover:!bg-white/10'
                )}
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
