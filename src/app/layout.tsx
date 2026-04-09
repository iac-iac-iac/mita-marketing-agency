import type { Metadata, Viewport } from 'next'
import localFont from 'next/font/local'
import '../styles/globals.css'
import { logEnvValidation } from '@/lib/utils/env'
import ScrollToTop from '@/components/ui/ScrollToTop'
import PWAInstallPrompt from '@/components/ui/PWAInstallPrompt'
import ServiceWorkerRegistration from '@/components/ui/ServiceWorkerRegistration'

// Используем системные шрифты вместо Google Fonts (проблемы с загрузкой)
const inter = localFont({
  src: [],
  variable: '--font-inter',
  display: 'swap',
  fallback: [
    'Inter',
    'system-ui',
    '-apple-system',
    'Segoe UI',
    'Roboto',
    'Arial',
    'sans-serif',
  ],
  preload: false,
})

// Валидация переменных окружения при старте (только в development)
if (process.env.NODE_ENV === 'development') {
  logEnvValidation()
}

export const viewport: Viewport = {
  themeColor: '#D4A84B',
}

export const metadata: Metadata = {
  title: 'М.И.Т.А. — Маркетинговое IT-агентство полного цикла',
  description: 'Комплексная система лидогенерации: от привлечения клиентов до обработки звонков. Call-центр, продвижение на Авито, рекрутинг. Все модули работают как единый механизм.',
  keywords: ['маркетинговое агентство', 'лидогенерация', 'call-центр', 'авито', 'рекрутинг', 'продвижение бизнеса'],
  authors: [{ name: 'М.И.Т.А.' }],
  creator: 'М.И.Т.А.',
  publisher: 'М.И.Т.А.',
  icons: {
    icon: '/images/icons/Favicon.ico',
    shortcut: '/images/icons/Favicon.ico',
    apple: '/images/icons/Favicon.ico',
  },
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'М.И.Т.А.',
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: 'website',
    locale: 'ru_RU',
    url: 'https://mita.ru',
    siteName: 'М.И.Т.А.',
    title: 'М.И.Т.А. — Маркетинговое IT-агентство полного цикла',
    description: 'Комплексная система лидогенерации: от привлечения клиентов до обработки звонков.',
    images: [
      {
        url: '/images/icons/Favicon.ico',
        width: 512,
        height: 512,
        alt: 'М.И.Т.А. OG Image',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'М.И.Т.А. — Маркетинговое IT-агентство полного цикла',
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
