import type { Metadata } from 'next'
import PreviewLanding from '@/components/preview-home/PreviewLanding'

export const metadata: Metadata = {
  title: 'Прототип главной (тест) — М.И.Т.А.',
  robots: { index: false, follow: false },
}

export default function PreviewHomePage() {
  return <PreviewLanding />
}
