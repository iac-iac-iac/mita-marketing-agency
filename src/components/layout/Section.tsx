import type { ReactNode } from 'react'

interface SectionProps {
  children: ReactNode
  variant?: 'default' | 'alt' | 'dark'
  className?: string
  id?: string
}

export default function Section({
  children,
  variant = 'default',
  className = '',
  id,
}: SectionProps) {
  const variantStyles = {
    default: 'bg-gradient-to-b from-direct-dark to-direct-secondary/30',
    alt: 'bg-gradient-to-b from-direct-secondary/30 to-direct-purple/20',
    dark: 'bg-gradient-to-b from-direct-dark to-direct-gray/50',
  }

  return (
    <section
      id={id}
      className={`py-16 md:py-24 ${variantStyles[variant]} ${className}`}
    >
      <div className="container mx-auto px-4">
        {children}
      </div>
    </section>
  )
}

export type { SectionProps }
