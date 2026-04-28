'use client'

import { motion } from 'framer-motion'
import Counter from '@/components/ui/Counter'
import { TiltCard } from '@/components/ui/TiltCard'
import { cn } from '@/lib/utils/cn'

interface FunnelStage {
  number: number
  name: string
  count: number
  conversion: number
  description?: string
}

interface RecruitmentFunnelProps {
  stages: FunnelStage[]
  title?: string
  description?: string
}

export default function RecruitmentFunnel({ 
  stages, 
  title = 'Воронка кандидатов',
  description 
}: RecruitmentFunnelProps) {
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

        {/* Воронка */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 max-w-7xl mx-auto">
          {stages.map((stage, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.55, delay: index * 0.08 }}
              className="relative h-full"
            >
              <TiltCard
                className={cn(
                  'glass p-6 rounded-2xl h-full text-center transition-all duration-300 hover:bg-white/5'
                )}
                effect="evade"
                tiltLimit={12}
                scale={1.03}
              >
                <div className="w-10 h-10 mx-auto mb-4 rounded-full bg-direct-primary/30 flex items-center justify-center text-white font-bold">
                  {stage.number}
                </div>

                <h3 className="text-lg font-semibold mb-4 min-h-[3rem]">
                  {stage.name}
                </h3>

                <div className="mb-2">
                  <span className="text-3xl md:text-4xl font-bold text-direct-primary">
                    <Counter value={stage.count} duration={2} />
                  </span>
                  <span className="text-sm text-gray-400 ml-2">кандидатов</span>
                </div>

                <div className="mb-4">
                  <span className="text-2xl font-semibold text-direct-accent">
                    {stage.conversion}%
                  </span>
                  <span className="text-xs text-gray-500 ml-1">конверсия</span>
                </div>

                {stage.description && (
                  <p className="text-sm text-gray-400">
                    {stage.description}
                  </p>
                )}
              </TiltCard>

              {index < stages.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-3 transform -translate-y-1/2 z-10 pointer-events-none">
                  <svg 
                    width="24" 
                    height="24" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    className="text-direct-primary/50"
                  >
                    <path 
                      d="M8 4L16 12L8 20" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
