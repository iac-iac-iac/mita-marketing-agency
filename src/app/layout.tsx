import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import '../styles/globals.css'
import { logEnvValidation } from '@/lib/utils/env'
import ScrollToTop from '@/components/ui/ScrollToTop'
import PWAInstallPrompt from '@/components/ui/PWAInstallPrompt'
import ServiceWorkerRegistration from '@/components/ui/ServiceWorkerRegistration'

const inter = Inter({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-inter',
  display: 'swap',
})

// Валидация переменных окружения при старте (только в development)
if (process.env.NODE_ENV === 'development') {
  logEnvValidation()
}

export const viewport: Viewport = {
  themeColor: '#7274B3',
}

export const metadata: Metadata = {
  title: 'Direct-line — Маркетинговое IT-агентство полного цикла',
  description: 'Комплексная система лидогенерации: от привлечения клиентов до обработки звонков. Call-центр, продвижение на Авито, рекрутинг. Все модули работают как единый механизм.',
  keywords: ['маркетинговое агентство', 'лидогенерация', 'call-центр', 'авито', 'рекрутинг', 'продвижение бизнеса'],
  authors: [{ name: 'Direct-line' }],
  creator: 'Direct-line',
  publisher: 'Direct-line',
  icons: {
    icon: '/images/icons/Favicon.ico',
    shortcut: '/images/icons/Favicon.ico',
    apple: '/images/icons/Favicon.ico',
  },
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Direct-line',
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: 'website',
    locale: 'ru_RU',
    url: 'https://direct-line.ru',
    siteName: 'Direct-line',
    title: 'Direct-line — Маркетинговое IT-агентство полного цикла',
    description: 'Комплексная система лидогенерации: от привлечения клиентов до обработки звонков.',
    images: [
      {
        url: '/images/icons/Favicon.ico',
        width: 512,
        height: 512,
        alt: 'Direct-line OG Image',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Direct-line — Маркетинговое IT-агентство полного цикла',
    description: 'Комплексная система лидогенерации: от привлечения клиентов до обработки звонков.',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru" className={inter.variable}>
      <body className={inter.className}>
        {children}
        <ScrollToTop />
        <PWAInstallPrompt />
        <ServiceWorkerRegistration />
      </body>
    </html>
  )
}
