'use client'

import Image from 'next/image'
import { useScrollReveal } from '@/lib/hooks/use-scroll-reveal'
import { motion } from 'framer-motion'

// Функция для получения имени файла изображения
function getImageName(stepNumber: number): string {
  const names: Record<number, string> = {
    1: 'Audit',
    2: 'Setup',
    3: 'Launch',
    4: 'Scale',
    5: 'Recruit',
  };
  return names[stepNumber] || 'Audit';
}

export interface ProcessStepsProps {
  title: string;
  steps: {
    number: number;
    title: string;
    description: string;
    kpi?: string;
  }[];
}

export default function ProcessSteps({
  title,
  steps,
}: ProcessStepsProps) {
  const titleRef = useScrollReveal()
  const stepRefs = steps.map(() => useScrollReveal())

  return (
    <section className="py-20 md:py-28 relative">
      {/* Фоновый градиент */}
      <div className="absolute inset-0 bg-gradient-to-b from-direct-dark via-direct-secondary/50 to-direct-dark" />

      <div className="container mx-auto px-4 relative z-10">
        {/* H2 заголовок */}
        <div ref={titleRef} className="scroll-reveal">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-16">
            {title}
          </h2>
        </div>

        {/* Шаги процесса */}
        <div className="max-w-7xl mx-auto space-y-10">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              ref={stepRefs[index]}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="glass p-8 md:p-10 rounded-3xl hover:bg-white/10 transition-all duration-500 scroll-reveal"
            >
              <div className="flex flex-col md:flex-row gap-8 items-start md:items-center">
                {/* Номер шага */}
                <div className="flex-shrink-0">
                  <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-gradient-to-br from-direct-primary to-direct-accent flex items-center justify-center shadow-lg shadow-direct-primary/25">
                    <span className="text-3xl md:text-4xl font-bold text-white">
                      {step.number}
                    </span>
                  </div>
                </div>

                {/* Контент шага */}
                <div className="flex-grow">
                  <h3 className="text-2xl md:text-3xl font-semibold mb-3 text-white">
                    {step.title}
                  </h3>
                  <p className="text-lg text-gray-300 leading-relaxed mb-4">
                    {step.description}
                  </p>

                  {/* KPI */}
                  {step.kpi && (
                    <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-direct-primary/20 border border-direct-primary/30">
                      <svg className="w-6 h-6 text-direct-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                      </svg>
                      <span className="text-lg text-direct-primary font-medium">{step.kpi}</span>
                    </div>
                  )}
                </div>

                {/* Изображение шага */}
                <div className="flex-shrink-0 w-full md:w-64 md:h-40 relative">
                  <div className="glass-strong rounded-xl overflow-hidden h-full">
                    <Image
                      src={`/images/process_steps/${step.number}_Process Steps_${getImageName(step.number)}.png`}
                      alt={step.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 256px"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
