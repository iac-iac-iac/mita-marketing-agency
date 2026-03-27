'use client'

import { useScrollReveal } from '@/lib/hooks/use-scroll-reveal'

export interface ProblemStatementProps {
  title: string;
  description: string;
  painPoints: string[];
  fullBleed?: boolean; // Убрать отступы контейнера
}

export default function ProblemStatement({
  title,
  description,
  painPoints,
  fullBleed = false,
}: ProblemStatementProps) {
  const titleRef = useScrollReveal()
  const descRef = useScrollReveal()
  const listRef = useScrollReveal()

  return (
    <section className="py-20 md:py-28 relative">
      {/* Фоновый градиент */}
      <div className="absolute inset-0 bg-gradient-to-b from-direct-dark via-direct-secondary/50 to-direct-dark" />

      <div className={`container mx-auto ${fullBleed ? 'px-0' : 'px-4'} relative z-10`}>
        <div className="max-w-4xl mx-auto">
          {/* H2 заголовок */}
          <div ref={titleRef} className="scroll-reveal">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-8">
              {title}
            </h2>
          </div>

          {/* Описание проблемы */}
          <div ref={descRef} className="scroll-reveal scroll-reveal-delay-1">
            <p className="text-xl text-gray-300 text-center mb-12 leading-relaxed">
              {description}
            </p>
          </div>

          {/* Список болей */}
          <div ref={listRef} className="scroll-reveal scroll-reveal-delay-2">
            <div className="glass p-8 md:p-10 rounded-3xl">
              <ul className="space-y-4">
                {painPoints.map((point, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-4 text-lg text-gray-200 transition-all duration-500 hover:bg-white/5 hover:rounded-lg hover:p-2 -m-2 p-2"
                  >
                    {/* Иконка крестика */}
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-red-500/20 flex items-center justify-center mt-0.5">
                      <svg
                        className="w-4 h-4 text-red-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Декоративные элементы */}
        <div className="absolute top-1/2 left-0 w-32 h-32 bg-direct-primary/5 rounded-full blur-3xl -translate-y-1/2" />
        <div className="absolute top-1/2 right-0 w-40 h-40 bg-direct-accent/5 rounded-full blur-3xl -translate-y-1/2" />
      </div>
    </section>
  )
}
