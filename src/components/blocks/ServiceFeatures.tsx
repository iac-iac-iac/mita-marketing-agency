'use client'

import { useScrollReveal } from '@/lib/hooks/use-scroll-reveal'
import { motion } from 'framer-motion'
import { TiltCard } from '@/components/ui/TiltCard'
import { mitaGoldText, mitaServiceCard } from '@/lib/mita-landing-styles'
import { cn } from '@/lib/utils/cn'

export interface ServiceFeaturesProps {
  title: string
  features: {
    name: string
    description: string
    icon?: string
  }[]
  /** Наклон и анимация как у карточек услуг на главной (TiltCard + motion) */
  tilt?: boolean
}

export default function ServiceFeatures({ title, features, tilt = true }: ServiceFeaturesProps) {
  const titleRef = useScrollReveal()
  /* Вход: только opacity — родитель с translateY/scroll-reveal ломает 3D/perspective у TiltCard */

  return (
    <section className="relative py-20 md:py-28">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0D0D0D] via-[#0D0D0D]/80 to-[#0D0D0D]" />

      <div className="container relative z-10 mx-auto px-4">
        <div ref={titleRef} className="scroll-reveal">
          <h2
            className={cn(
              mitaGoldText,
              'mb-12 text-center text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl'
            )}
          >
            {title}
          </h2>
        </div>

        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 md:grid-cols-3">
          {features.map((feature, index) =>
            tilt ? (
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.55, delay: index * 0.08 }}
                className="h-full"
              >
                <TiltCard
                  className={cn(mitaServiceCard, 'h-full group')}
                  effect="evade"
                  tiltLimit={12}
                  scale={1.03}
                >
                  <h3
                    className={cn(
                      'mb-3 text-lg font-semibold transition-colors group-hover:text-[#F5E1A4]',
                      mitaGoldText
                    )}
                  >
                    {feature.name}
                  </h3>
                  <p className="text-sm leading-relaxed text-white/60 transition-colors group-hover:text-white/75">
                    {feature.description}
                  </p>
                </TiltCard>
              </motion.div>
            ) : (
              <div
                key={index}
                className="glass scroll-reveal rounded-3xl border border-white/8 p-8 transition-all duration-700 hover:bg-white/10"
                style={{ transitionDelay: `${100 + index * 100}ms` }}
              >
                <h3 className="mb-4 text-2xl font-semibold text-white">{feature.name}</h3>
                <p className="leading-relaxed text-white/60">{feature.description}</p>
              </div>
            )
          )}
        </div>
      </div>
    </section>
  )
}
