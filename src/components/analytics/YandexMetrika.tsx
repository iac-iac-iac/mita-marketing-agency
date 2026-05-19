'use client'

import { useEffect, useState } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import Script from 'next/script'
import {
  ANALYTICS_CONSENT_EVENT,
  hasAnalyticsConsent,
} from '@/lib/analytics/consent'

const counterIdRaw = process.env.NEXT_PUBLIC_YANDEX_METRIKA_ID
const counterId = counterIdRaw ? parseInt(counterIdRaw, 10) : NaN

export default function YandexMetrika() {
  const [enabled, setEnabled] = useState(false)
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    setEnabled(hasAnalyticsConsent())

    const onConsent = () => setEnabled(true)
    window.addEventListener(ANALYTICS_CONSENT_EVENT, onConsent)
    return () => window.removeEventListener(ANALYTICS_CONSENT_EVENT, onConsent)
  }, [])

  useEffect(() => {
    if (!enabled || Number.isNaN(counterId) || typeof window === 'undefined' || !window.ym) {
      return
    }

    const query = searchParams.toString()
    const url = query ? `${pathname}?${query}` : pathname
    window.ym(counterId, 'hit', url)
  }, [pathname, searchParams, enabled])

  if (!enabled || Number.isNaN(counterId)) {
    return null
  }

  return (
    <>
      <Script id="yandex-metrika" strategy="afterInteractive">
        {`
          (function(m,e,t,r,i,k,a){
            m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
            m[i].l=1*new Date();
            for (var j = 0; j < document.scripts.length; j++) {
              if (document.scripts[j].src === r) { return; }
            }
            k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
          })(window, document, 'script', 'https://mc.yandex.ru/metrika/tag.js', 'ym');

          ym(${counterId}, 'init', {
            clickmap: true,
            trackLinks: true,
            accurateTrackBounce: true,
            webvisor: true,
            ecommerce: 'dataLayer',
            ssr: true
          });
        `}
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
