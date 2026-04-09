import MainHeader from '@/components/layout/MainHeader'
import Footer from '@/components/layout/Footer'
import Hero from '@/components/blocks/Hero'
import ProblemStatement from '@/components/blocks/ProblemStatement'
import TestimonialsSection from '@/components/blocks/TestimonialsSection'
import BlogPreview from '@/components/blocks/BlogPreview'
import CasePreview from '@/components/blocks/CasePreview'
import ClosingCta from '@/components/blocks/ClosingCta'
import ServicesSection, { defaultServices } from '@/components/blocks/ServicesSection'
import WorkProcessSection, { defaultWorkProcess } from '@/components/blocks/WorkProcessSection'
import ServicesCalculator from '@/components/blocks/ServicesCalculator'
import ChatWidget from '@/components/ui/ChatWidget'
import { getPublishedPosts } from '@/lib/cms/db-blog'
import { getPublishedCases } from '@/lib/cms/db-cases'
import { getAllTestimonials } from '@/lib/cms/db-testimonials'

export default function HomePage() {
  // Читаем из SQLite на сервере
  const allPosts = getPublishedPosts()
  const allCases = getPublishedCases()
  const allTestimonials = getAllTestimonials()

  // Берём последние 3 поста и 2 кейса
  const posts = allPosts.slice(0, 3).map(p => ({
    slug: p.slug,
    title: p.title,
    excerpt: p.excerpt,
    category: p.category,
    author: p.author,
    published_at: p.published_at,
  }))

  const cases = allCases.slice(0, 2).map(c => ({
    slug: c.slug,
    title: c.title,
    excerpt: c.excerpt,
    client: c.client,
    industry: c.industry,
  }))

  return (
    <>
      <MainHeader />

      <main className="animate-fade-in-up">
        {/* Hero секция */}
        <Hero
          eyebrow="Маркетинговое IT-агентство"
          title="Постоянный поток клиентов для вашего бизнеса"
          subtitle="Комплексные маркетинговые решения и IT-сервисы для стабильного роста продаж. От лидогенерации до рекрутинга — всё в одном месте."
          primaryCtaLabel="Оставить заявку"
          primaryCtaUrl="/contact"
          secondaryCtaLabel="Узнать больше"
          secondaryCtaUrl="#services"
          mediaSrc="/images/hero-banner/Hero-banner_main_link.mp4"
          mediaType="video"
          videoPoster="/images/hero-banner/Hero-banner_main_link.png"
        />

        {/* Услуги */}
        <ServicesSection items={defaultServices} />

        {/* Процесс работы */}
        <WorkProcessSection steps={defaultWorkProcess} />

        {/* Калькулятор */}
        <ServicesCalculator />

        {/* Проблема */}
        <ProblemStatement
          title="Знакомы проблемы?"
          description="Мы знаем как решить каждый из них"
          painPoints={[
            'Лиды дорогие и их мало',
            'Рекламный бюджет сливается впустую',
            'Call-центр не обрабатывает входящие заявки',
            'Сотрудники не справляются с объёмом звонков',
            'Нет системы аналитики — непонятно что работает',
          ]}
        />

        {/* Отзывы */}
        <TestimonialsSection
          title="Что говорят клиенты"
          items={allTestimonials.length > 0
            ? allTestimonials.filter(t => !t.category).map(t => ({ name: t.name, role: t.role, company: t.company, quote: t.quote }))
            : [
                { name: 'Алексей Петров', role: 'Генеральный директор', company: 'АвтоПремиум', quote: 'Благодаря М.И.Т.А. мы получили +147% лидов за первый квартал. Система работает как часы.' },
                { name: 'Мария Козлова', role: 'Руководитель отдела продаж', company: 'СтройМастер', quote: 'Call-центр от М.И.Т.А. обработал 3000+ звонков за месяц. Качество на высоте.' },
              ]
          }
        />

        {/* Блог — показываем только если есть посты */}
        {posts.length > 0 && (
          <BlogPreview
            title="Последние статьи"
            posts={posts}
          />
        )}

        {/* Кейсы — показываем только если есть кейсы */}
        {cases.length > 0 && (
          <CasePreview
            title="Наши кейсы"
            cases={cases}
          />
        )}

        {/* CTA */}
        <ClosingCta
          title="Готовы к росту?"
          description="Оставьте заявку и мы свяжемся с вами в ближайшее время"
          primaryCtaLabel="Оставить заявку"
          primaryCtaUrl="/contact"
        />
      </main>

      <Footer />
      <ChatWidget />
    </>
  )
}
