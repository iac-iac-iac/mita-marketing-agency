'use client'

import { useEffect, useState, useRef } from 'react'
import { useInView } from 'framer-motion'

interface CounterProps {
  value: number
  duration?: number
}

export default function Counter({ value, duration = 2 }: CounterProps) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  useEffect(() => {
    if (!isInView) return

    let startTime: number
    let animationFrame: number

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / (duration * 1000), 1)
      
      // Ease out quart
      const easeProgress = 1 - Math.pow(1 - progress, 4)
      const currentCount = Math.floor(easeProgress * value)
      
      setCount(currentCount)

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate)
      }
    }

    animationFrame = requestAnimationFrame(animate)

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame)
      }
    }
  }, [isInView, value, duration])

  return <span ref={ref}>{count}</span>
}
