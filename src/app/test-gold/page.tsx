/**
 * Тестовая страница: Чёрное золото (Вариант 1)
 * URL: /test-gold
 * 
 * Демонстрация новой цветовой палитры без изменения основной темы
 */
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

import '@/styles/gold-theme.css'

export default function TestGoldPage() {
  return (
    <>
      <MainHeader />

      <main className="gold-theme animate-fade-in-up">
        {/* Hero секция */}
        <Hero
          eyebrow="Маркетинговое IT-агентство"
          title="Постоянный поток клиентов для вашего бизнеса"
          subtitle="Комплексные маркетинговые решения и IT-сервисы для стабильного роста продаж. От лидогенерации до рекрутинга — всё в одном месте."
          primaryCtaLabel="Оставить заявку"
          primaryCtaUrl="#contact"
          secondaryCtaLabel="Узнать больше"
          secondaryCtaUrl="#services"
          mediaSrc="/images/hero-banner/Hero-banner_main_link.mp4"
          mediaType="video"
          videoPoster="/images/hero-banner/Hero-banner_main_link.png"
        />

        {/* Problem Statement секция */}
        <ProblemStatement
          title="Знакомые проблемы?"
          description="Большинство бизнесов сталкиваются с одними и теми же вызовами в маркетинге и продажах:"
          painPoints={[
            'Недостаточно качественных лидов для отдела продаж',
            'Высокая стоимость привлечения клиента в контекстной рекламе',
            'Менеджеры тратят время на «холодные» и нецелевые контакты',
            'Нет прозрачной аналитики и понимания ROI маркетинга',
            'Сложно масштабировать продажи без потери качества',
          ]}
        />

        {/* Services секция */}
        <ServicesSection items={defaultServices} />

        {/* Work Process секция */}
        <WorkProcessSection items={defaultWorkProcess} />

        {/* Calculator секция */}
        <ServicesCalculator />

        {/* Testimonials секция */}
        <TestimonialsSection
          title="Что говорят наши клиенты"
          testimonials={[
            {
              name: 'Алексей Смирнов',
              company: 'CEO, TechStart',
              content: 'Благодаря М.И.Т.А. мы получили стабильный поток качественных лидов. За 3 месяца конверсия выросла на 45%.',
              rating: 5,
            },
            {
              name: 'Мария Козлова',
              company: 'CMO, RetailPro',
              content: 'Профессиональный подход к аналитике и оптимизации. ROI от рекламных кампаний увеличился в 2.5 раза.',
              rating: 5,
            },
            {
              name: 'Дмитрий Волков',
              company: 'Founder, AutoPremium',
              content: 'Комплексная работа с воронкой продаж дала результат: +147% новых клиентов за первый квартал.',
              rating: 5,
            },
          ]}
        />

        {/* Blog Preview секция */}
        <BlogPreview
          title="Последние статьи"
          postsLimit={3}
        />

        {/* Case Preview секция */}
        <CasePreview
          title="Наши кейсы"
          casesLimit={2}
        />

        {/* Closing CTA секция */}
        <div id="contact">
          <ClosingCta
            title="Готовы к росту продаж?"
            subtitle="Оставьте заявку — и мы рассчитаем стоимость привлечения клиентов для вашего бизнеса"
            ctaLabel="Получить консультацию"
            ctaUrl="#contact"
          />
        </div>
      </main>

      <Footer />
    </>
  )
}
