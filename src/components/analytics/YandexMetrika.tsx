'use client'

import { useEffect, useRef } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import Script from 'next/script'

const counterIdRaw = process.env.NEXT_PUBLIC_YANDEX_METRIKA_ID
const counterId = counterIdRaw ? parseInt(counterIdRaw, 10) : NaN

function buildPagePath(pathname: string, searchParams: URLSearchParams): string {
  const query = searchParams.toString()
  return query ? `${pathname}?${query}` : pathname
}

/**
 * Официальный сниппет Метрики (вкладка HTML в кабинете).
 * Для Next.js дополнительно отправляем ym('hit') при смене маршрута (SPA).
 */
function getMetrikaSnippet(id: number): string {
  return `
    (function(m,e,t,r,i,k,a){
      m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
      m[i].l=1*new Date();
      for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
      k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
    })(window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

    ym(${id}, "init", {
      ssr:true,
      webvisor:true,
      clickmap:true,
      ecommerce:"dataLayer",
      referrer: document.referrer,
      url: location.href,
      accurateTrackBounce:true,
      trackLinks:true
    });
  `
}

export default function YandexMetrika() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const lastHitPathRef = useRef<string | null>(null)

  useEffect(() => {
    if (Number.isNaN(counterId)) return

    const path = buildPagePath(pathname, searchParams)

    const trackSpaNavigation = () => {
      if (!window.ym) return false
      if (lastHitPathRef.current === path) return true
      if (lastHitPathRef.current !== null) {
        window.ym(counterId, 'hit', path)
      }
      lastHitPathRef.current = path
      return true
    }

    if (trackSpaNavigation()) return

    const timer = window.setInterval(() => {
      if (trackSpaNavigation()) {
        window.clearInterval(timer)
      }
    }, 200)

    return () => window.clearInterval(timer)
  }, [pathname, searchParams])

  if (Number.isNaN(counterId)) {
    return null
  }

  return (
    <>
      <Script id="yandex-metrika" strategy="afterInteractive">
        {getMetrikaSnippet(counterId)}
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
