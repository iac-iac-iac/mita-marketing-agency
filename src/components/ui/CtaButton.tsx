import type { ReactNode } from 'react'
import Link from 'next/link'

interface CtaButtonProps {
  variant?: 'primary' | 'secondary'
  size?: 'sm' | 'md' | 'lg'
  children: ReactNode
  href?: string
  onClick?: (e: React.MouseEvent) => void
  className?: string
  type?: 'button' | 'submit'
  disabled?: boolean
}

export default function CtaButton({
  variant = 'primary',
  size = 'md',
  children,
  href,
  onClick,
  className = '',
  type = 'button',
  disabled = false,
}: CtaButtonProps) {
  const baseStyles = 'inline-flex items-center justify-center font-medium rounded-xl transition-all duration-300 glass hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100'
  
  const variantStyles = {
    primary: 'bg-direct-primary/80 hover:bg-direct-primary text-white border border-direct-primary/30 hover:border-direct-primary/60 hover:shadow-lg hover:shadow-direct-primary/25',
    secondary: 'bg-direct-accent/60 hover:bg-direct-accent text-white border border-direct-accent/30 hover:border-direct-accent/60 hover:shadow-lg hover:shadow-direct-accent/25',
  }
  
  const sizeStyles = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  }

  const combinedClasses = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`

  if (href) {
    return (
      <Link href={href} className={combinedClasses} onClick={onClick}>
        {children}
      </Link>
    )
  }

  return (
    <button type={type} className={combinedClasses} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  )
}

export type { CtaButtonProps }
