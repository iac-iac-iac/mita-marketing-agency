import { Metadata } from 'next'
import ContactPageContent from '@/components/contact/ContactPageContent'

export const metadata: Metadata = {
  title: 'Контакты | М.И.Т.А.',
  description: 'Свяжитесь с М.И.Т.А. для консультации по услугам лидогенерации, продвижения на Авито и рекрутинга.',
}

export default function ContactPage() {
  return <ContactPageContent />
}
