'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'

interface DropdownItem {
  label: string
  url: string
}

interface DropdownMenuProps {
  triggerLabel: string
  items: DropdownItem[]
  align?: 'left' | 'right'
  className?: string
}

export default function DropdownMenu({
  triggerLabel,
  items,
  align = 'left',
  className = '',
}: DropdownMenuProps) {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const alignStyles = {
    left: 'left-0',
    right: 'right-0',
  }

  return (
    <div ref={dropdownRef} className={`relative inline-block ${className}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center gap-1 text-gray-300 hover:text-white transition-colors duration-300 font-medium py-2"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        {triggerLabel}
        <svg
          className={`w-4 h-4 transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div
          className={`absolute top-full mt-2 min-w-[200px] glass glass-strong z-50 rounded-xl overflow-hidden shadow-xl ${alignStyles[align]} animate-fade-in`}
        >
          <ul className="py-2">
            {items.map((item, index) => (
              <li key={item.url}>
                <Link
                  href={item.url}
                  className="block px-4 py-2 text-gray-300 hover:text-white hover:bg-direct-primary/20 transition-colors duration-200"
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
                {index < items.length - 1 && (
                  <div className="h-px bg-white/10 mx-4 my-1" />
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export type { DropdownItem, DropdownMenuProps }
