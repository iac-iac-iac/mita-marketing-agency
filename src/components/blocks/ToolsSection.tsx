'use client'

import Image from 'next/image'
import { useScrollRevealMulti } from '@/lib/hooks/use-scroll-reveal-multi'

interface ToolItem {
  name: string
  description: string
  icon: string
}

interface ToolsSectionProps {
  title: string
  intro: string
  tools: ToolItem[]
}

export default function ToolsSection({ title, intro, tools }: ToolsSectionProps) {
  const { setRef } = useScrollRevealMulti<HTMLDivElement>(tools.length)

  return (
    <section className="py-20 md:py-28 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-direct-dark via-direct-secondary/30 to-direct-dark" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="scroll-reveal text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            {title}
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            {intro}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {tools.map((tool, index) => (
            <div
              key={index}
              ref={setRef(index)}
              className="scroll-reveal glass p-6 rounded-2xl hover:bg-white/5 transition-colors"
              style={{ transitionDelay: `${100 + index * 50}ms` }}
            >
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-xl bg-direct-primary/20 flex items-center justify-center mb-4 overflow-hidden">
                  <Image
                    src={tool.icon}
                    alt={`${tool.name} icon`}
                    width={64}
                    height={64}
                    className="w-16 h-16 object-contain"
                  />
                </div>
                <h3 className="text-xl font-bold mb-2">{tool.name}</h3>
                <p className="text-gray-300">{tool.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
