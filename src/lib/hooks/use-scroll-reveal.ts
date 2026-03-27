'use client'

import { useEffect, useRef } from 'react'

export function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          element.classList.add('visible')
          observer.unobserve(element)
        }
      },
      { threshold: 0.1, rootMargin: '50px' }
    )

    observer.observe(element)

    return () => {
      if (element) observer.unobserve(element)
    }
  }, [])

  return ref
}
