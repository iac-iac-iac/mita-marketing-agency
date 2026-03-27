import type { ReactNode } from 'react'
import Link from 'next/link'

interface TextLinkCtaProps {
  label: string
  href: string
  icon?: ReactNode
  className?: string
  external?: boolean
}

export default function TextLinkCta({
  label,
  href,
  icon,
  className = '',
  external = false,
}: TextLinkCtaProps) {
  const baseStyles = 'inline-flex items-center gap-2 text-direct-primary hover:text-white transition-colors duration-300 font-medium group'
  const combinedClasses = `${baseStyles} ${className}`

  const linkProps = external
    ? { href, target: '_blank', rel: 'noopener noreferrer' }
    : { href }

  return (
    <Link {...linkProps} className={combinedClasses}>
      <span>{label}</span>
      {icon && (
        <span className="transform group-hover:translate-x-1 transition-transform duration-300">
          {icon}
        </span>
      )}
    </Link>
  )
}

export type { TextLinkCtaProps }
