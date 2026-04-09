'use client'

import { useScrollReveal } from '@/lib/hooks/use-scroll-reveal'
import { useScrollRevealMulti } from '@/lib/hooks/use-scroll-reveal-multi'

export interface ServiceFeaturesProps {
  title: string;
  features: {
    name: string;
    description: string;
    icon?: string;
  }[];
}

export default function ServiceFeatures({
  title,
  features,
}: ServiceFeaturesProps) {
  const titleRef = useScrollReveal()
  const { setRef } = useScrollRevealMulti<HTMLDivElement>(features.length)

  return (
    <section className="py-20 md:py-28 relative">
      {/* Фоновый градиент */}
      <div className="absolute inset-0 bg-gradient-to-b from-direct-dark via-direct-purple/30 to-direct-dark" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Заголовок */}
        <div ref={titleRef} className="scroll-reveal">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-12">
            {title}
          </h2>
        </div>

        {/* Карточки фичей */}
        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <div
              key={index}
              ref={setRef(index)}
              className="glass p-8 rounded-3xl hover:bg-white/10 transition-all duration-700 scroll-reveal"
              style={{ transitionDelay: `${100 + index * 100}ms` }}
            >
              <h3 className="text-2xl font-semibold mb-4">
                {feature.name}
              </h3>
              <p className="text-gray-300 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
