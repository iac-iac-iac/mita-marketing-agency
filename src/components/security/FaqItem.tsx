'use client'

import { useState } from 'react'

interface FaqItemProps {
  question: string
  answer: string
  index: number
}

export default function FaqItem({ question, answer, index }: FaqItemProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="glass rounded-2xl overflow-hidden animate-fade-in" style={{ animationDelay: `${0.1 + index * 0.05}s` }}>
      <button
        className="w-full px-6 py-4 text-left flex items-center justify-between gap-4 hover:bg-white/5 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="font-semibold text-lg">{question}</span>
        <svg
          className={`w-6 h-6 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {isOpen && (
        <div className="px-6 pb-4 text-gray-300 leading-relaxed animate-slide-up">
          {answer}
        </div>
      )}
    </div>
  )
}
