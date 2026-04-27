'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { mitaCtaGradient } from '@/lib/mita-landing-styles'
import { cn } from '@/lib/utils/cn'

const STORAGE_KEY = 'mita_cookie_consent_v1'

export default function CookieBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    try {
      if (typeof window !== 'undefined' && !localStorage.getItem(STORAGE_KEY)) {
        setVisible(true)
      }
    } catch {
      setVisible(true)
    }
  }, [])

  const accept = () => {
    try {
      localStorage.setItem(STORAGE_KEY, '1')
    } catch {
      /* ignore */
    }
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div
      className="pointer-events-none fixed bottom-0 left-0 right-0 z-[100] p-4 md:p-6"
      role="dialog"
      aria-label="Уведомление об использовании cookies"
    >
      <div className="mx-auto flex max-w-4xl flex-col gap-4 rounded-2xl border border-white/[0.08] border-t-[#D4A84B]/35 bg-white/[0.05] p-4 shadow-xl backdrop-blur-[10px] pointer-events-auto md:flex-row md:items-center md:p-5">
        <p className="flex-1 text-sm leading-relaxed text-white/60">
          Мы используем cookies и сервисы аналитики (в т.ч. Яндекс.Метрика и Google Analytics), чтобы
          сайт работал стабильнее и мы понимали, как его улучшать. Продолжая пользоваться сайтом, вы
          соглашаетесь с их использованием. Подробнее — в{' '}
          <Link
            href="/legal/privacy#cookies"
            className="text-[#D4A84B] underline-offset-2 hover:underline"
          >
            Политике конфиденциальности
          </Link>
          .
        </p>
        <button
          type="button"
          onClick={accept}
          className={cn(
            'shrink-0 rounded-xl px-5 py-3 text-sm font-semibold transition-opacity hover:opacity-90',
            mitaCtaGradient
          )}
        >
          Принять
        </button>
      </div>
    </div>
  )
}
