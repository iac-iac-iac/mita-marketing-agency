'use client'

import { useEffect, useRef } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import Script from 'next/script'

const counterIdRaw = process.env.NEXT_PUBLIC_YANDEX_METRIKA_ID
const counterId = counterIdRaw ? parseInt(counterIdRaw, 10) : NaN

declare global {
  interface Window {
    /** Однократная инициализация счётчика (SPA + defer) */
    __mitaYmInited?: boolean
  }
}

/** Полный URL страницы для ym('hit') — см. https://yandex.ru/support/metrica/ru/code/counter-spa-setup.html */
function buildPageUrl(pathname: string, searchParams: URLSearchParams): string {
  const query = searchParams.toString()
  const path = query ? `${pathname}?${query}` : pathname
  if (typeof window === 'undefined') return path
  return `${window.location.origin}${path}`
}

/** Загрузчик tag.js (официальный фрагмент без init) */
function getMetrikaLoaderSnippet(): string {
  return `
(function(m,e,t,r,i,k,a){
  m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
  m[i].l=1*new Date();
  for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
  k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
})(window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
  `
}

function initMetrikaCounter(): void {
  if (window.__mitaYmInited || Number.isNaN(counterId) || typeof window.ym !== 'function') {
    return
  }

  window.ym(counterId, 'init', {
    defer: true,
    clickmap: true,
    trackLinks: true,
    accurateTrackBounce: true,
    webvisor: true,
    triggerEvent: true,
  })
  window.__mitaYmInited = true
}

function sendPageHit(url: string, referer?: string): void {
  if (Number.isNaN(counterId) || typeof window.ym !== 'function') return

  const options: { title: string; referer?: string } = {
    title: document.title,
  }
  if (referer) {
    options.referer = referer
  }

  window.ym(counterId, 'hit', url, options)
}

/**
 * Яндекс.Метрика для Next.js (App Router / SPA).
 * @see https://yandex.ru/support/metrica/ru/code/counter-spa-setup.html
 * @see https://yandex.ru/support/metrica/ru/code/counter-initialize.html
 */
export default function YandexMetrika() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const lastUrlRef = useRef<string | null>(null)

  useEffect(() => {
    if (Number.isNaN(counterId)) return

    const pageUrl = buildPageUrl(pathname, searchParams)

    const track = (): boolean => {
      if (typeof window.ym !== 'function') return false

      initMetrikaCounter()

      if (lastUrlRef.current === pageUrl) return true

      const referer =
        lastUrlRef.current ?? (document.referrer || undefined)

      sendPageHit(pageUrl, referer)
      lastUrlRef.current = pageUrl

      if (process.env.NODE_ENV === 'development') {
        console.info('[Metrika] hit', pageUrl, referer ? { referer } : {})
      }

      return true
    }

    if (track()) return

    const readyEvent = `yacounter${counterId}inited`
    const onReady = () => {
      track()
    }
    document.addEventListener(readyEvent, onReady)

    const timer = window.setInterval(() => {
      if (track()) {
        window.clearInterval(timer)
        document.removeEventListener(readyEvent, onReady)
      }
    }, 200)

    return () => {
      window.clearInterval(timer)
      document.removeEventListener(readyEvent, onReady)
    }
  }, [pathname, searchParams])

  if (Number.isNaN(counterId)) {
    if (process.env.NODE_ENV === 'development' && counterIdRaw) {
      console.warn(
        '[Metrika] NEXT_PUBLIC_YANDEX_METRIKA_ID должна быть числом (8–10 цифр), получено:',
        counterIdRaw
      )
    }
    return null
  }

  return (
    <>
      <Script id="yandex-metrika-loader" strategy="afterInteractive">
        {getMetrikaLoaderSnippet()}
      </Script>
      <noscript>
        <div>
          <img
            src={`https://mc.yandex.ru/watch/${counterId}`}
            style={{ position: 'absolute', left: '-9999px' }}
            alt=""
          />
        </div>
      </noscript>
    </>
  )
}
