'use client'

import { useEffect, useState } from 'react'
import { useScrollReveal } from '@/lib/hooks/use-scroll-reveal'
import ScrollToTopButton from '@/components/ui/ScrollToTopButton'
import type { ReactNode } from 'react'

export interface LegalPageLayoutProps {
  title: string;
  subtitle: string;
  lastUpdated: string;
  sections: {
    id: string;
    title: string;
    content: ReactNode;
    subsections?: {
      id: string;
      title: string;
      content: ReactNode;
    }[];
  }[];
}

export default function LegalPageLayout({
  title,
  subtitle,
  lastUpdated,
  sections,
}: LegalPageLayoutProps) {
  const heroRef = useScrollReveal()
  const [activeSection, setActiveSection] = useState<string>('')
  const [isTableOfContentsOpen, setIsTableOfContentsOpen] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { threshold: 0.3, rootMargin: '-100px 0px -100px 0px' }
    )

    sections.forEach((section) => {
      const element = document.getElementById(section.id)
      if (element) observer.observe(element)
    })

    return () => observer.disconnect()
  }, [sections])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setActiveSection(id)
      setIsTableOfContentsOpen(false)
    }
  }

  return (
    <main className="min-h-screen" style={{ background: '#f5f5f7' }}>
      {/* Hero секция */}
      <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0" style={{ background: 'linear-gradient(135deg, rgba(114,116,179,0.1) 0%, rgba(245,245,247,1) 50%, rgba(90,77,122,0.1) 100%)' }} />

        {/* Декоративные элементы */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl animate-float" style={{ background: 'rgba(114, 116, 179, 0.15)' }} />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full blur-3xl animate-float" style={{ background: 'rgba(90, 77, 122, 0.15)', animationDelay: '1s' }} />

        <div ref={heroRef} className="scroll-reveal container mx-auto px-4 relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6" style={{ color: '#1d1d1f' }}>
            {title}
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto mb-4" style={{ color: '#424245' }}>
            {subtitle}
          </p>
          <p className="text-sm" style={{ color: '#86868b' }}>
            Последнее обновление: {lastUpdated}
          </p>
        </div>
      </section>

      {/* Оглавление */}
      <div className="sticky top-20 z-20 py-4" style={{ background: 'rgba(255, 255, 255, 0.8)', backdropFilter: 'blur(10px)', borderBottom: '1px solid rgba(0, 0, 0, 0.1)' }}>
        <div className="container mx-auto px-4">
          <button
            onClick={() => setIsTableOfContentsOpen(!isTableOfContentsOpen)}
            className="lg:hidden w-full px-6 py-3 flex items-center justify-between rounded-xl"
            style={{ background: 'rgba(114, 116, 179, 0.1)', border: '1px solid rgba(114, 116, 179, 0.2)', color: '#1d1d1f' }}
          >
            <span className="font-semibold">Оглавление</span>
            <svg className={`w-5 h-5 transition-transform ${isTableOfContentsOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: '#1d1d1f' }}>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {isTableOfContentsOpen && (
            <div className="lg:hidden mt-4 space-y-2 p-4 rounded-xl" style={{ background: 'rgba(255, 255, 255, 0.8)', border: '1px solid rgba(0, 0, 0, 0.1)' }}>
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className="block w-full text-left px-4 py-2 rounded-lg transition-colors"
                  style={{ 
                    color: activeSection === section.id ? '#7274B3' : '#1d1d1f',
                    background: activeSection === section.id ? 'rgba(114, 116, 179, 0.15)' : 'transparent'
                  }}
                >
                  {section.title}
                </button>
              ))}
            </div>
          )}

          <div className="hidden lg:flex items-center gap-2 overflow-x-auto">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                className="px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors"
                style={{ 
                  color: activeSection === section.id ? '#ffffff' : '#424245',
                  background: activeSection === section.id ? '#7274B3' : 'transparent'
                }}
              >
                {section.title}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Контент */}
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto space-y-16">
          {sections.map((section, index) => (
            <section
              key={section.id}
              id={section.id}
              className="scroll-reveal"
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div 
                ref={useScrollReveal()} 
                className="p-8 md:p-10 rounded-2xl shadow-lg" 
                style={{ 
                  background: '#ffffff',
                  border: '1px solid rgba(0, 0, 0, 0.08)'
                }}
              >
                <h2 className="text-2xl md:text-3xl font-bold mb-6" style={{ color: '#1d1d1f' }}>
                  {section.title}
                </h2>
                <div className="space-y-4 mb-6" style={{ color: '#333333', lineHeight: '1.7' }}>
                  {section.content}
                </div>

                {section.subsections && section.subsections.length > 0 && (
                  <div className="space-y-6 mt-8">
                    {section.subsections.map((subsection) => (
                      <div key={subsection.id} className="pl-6" style={{ borderLeft: '2px solid rgba(114, 116, 179, 0.3)' }}>
                        <h3 className="text-xl md:text-2xl font-semibold mb-3" style={{ color: '#1d1d1f' }}>
                          {subsection.title}
                        </h3>
                        <div className="space-y-4" style={{ color: '#333333', lineHeight: '1.7' }}>
                          {subsection.content}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </section>
          ))}
        </div>
      </div>

      <ScrollToTopButton />
    </main>
  )
}
