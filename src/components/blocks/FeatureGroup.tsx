'use client'

import Image from 'next/image'
import { useScrollReveal } from '@/lib/hooks/use-scroll-reveal'
import Link from 'next/link'
import TextLinkCta from '@/components/ui/TextLinkCta'
import { motion } from 'framer-motion'

export interface FeatureGroupProps {
  groupTitle: string;
  groupIntro: string;
  items: {
    name: string;
    label: string;
    description: string;
    icon?: string | React.ReactNode;
    ctaLabel?: string;
    ctaUrl?: string;
  }[];
  groupCtaLabel?: string;
  groupCtaUrl?: string;
}

export default function FeatureGroup({
  groupTitle,
  groupIntro,
  items,
  groupCtaLabel,
  groupCtaUrl,
}: FeatureGroupProps) {
  const titleRef = useScrollReveal()
  const cardRefs = items.map(() => useScrollReveal())
  const ctaRef = useScrollReveal()

  return (
    <section className="py-20 md:py-28 relative">
      {/* Фоновый градиент */}
      <div className="absolute inset-0 bg-gradient-to-b from-direct-dark via-direct-purple/30 to-direct-dark" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Заголовок и вступление */}
        <div ref={titleRef} className="scroll-reveal">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              {groupTitle}
            </h2>
            <p className="text-xl text-gray-300 leading-relaxed">
              {groupIntro}
            </p>
          </div>
        </div>

        {/* Карточки фичей */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto mb-12">
          {items.map((item, index) => (
            <motion.div
              key={index}
              ref={cardRefs[index]}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50, y: 0 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="glass p-6 rounded-2xl hover:bg-white/10 transition-all duration-500 scroll-reveal"
            >
              {/* Иконка */}
              {item.icon && (
                <div className="mb-4">
                  {typeof item.icon === 'string' && item.icon.startsWith('/') ? (
                    <Image
                      src={item.icon}
                      alt={`${item.name} icon`}
                      width={64}
                      height={64}
                      className="w-16 h-16 object-contain"
                    />
                  ) : (
                    <span className="text-4xl">{item.icon}</span>
                  )}
                </div>
              )}
              
              <h3 className="text-xl font-semibold mb-2">
                {item.name}
              </h3>
              <p className="text-direct-primary font-medium text-sm mb-3">
                {item.label}
              </p>
              <p className="text-gray-300 leading-relaxed">
                {item.description}
              </p>
              {item.ctaLabel && item.ctaUrl && (
                <div className="mt-4">
                  <TextLinkCta label={item.ctaLabel} href={item.ctaUrl} />
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        {groupCtaLabel && groupCtaUrl && (
          <div ref={ctaRef} className="text-center scroll-reveal scroll-reveal-delay-4">
            <TextLinkCta label={groupCtaLabel} href={groupCtaUrl} />
          </div>
        )}
      </div>
    </section>
  )
}
