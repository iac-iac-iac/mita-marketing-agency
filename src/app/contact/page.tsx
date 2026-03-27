import { Metadata } from 'next'
import ContactPageContent from '@/components/contact/ContactPageContent'

export const metadata: Metadata = {
  title: 'Контакты | Direct-line',
  description: 'Свяжитесь с Direct-line для консультации по услугам лидогенерации, продвижения на Авито и рекрутинга.',
}

export default function ContactPage() {
  return <ContactPageContent />
}
