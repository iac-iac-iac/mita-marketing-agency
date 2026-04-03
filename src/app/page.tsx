'use client'

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

export default function HomePage() {
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

        {/* Калькулятор услуг */}
        <ServicesCalculator />

        {/* Work Process секция */}
        <WorkProcessSection steps={defaultWorkProcess} />

        {/* Testimonials секция */}
        <TestimonialsSection
          title="Что говорят клиенты"
          intro="Наши клиенты довольны результатами работы и рекомендуют нас партнёрам"
          layout="wide"
          items={[
            {
              name: 'Алексей Петров',
              role: 'Коммерческий директор',
              company: 'Автосалон «АвтоПремиум»',
              quote: 'За 3 месяца получили 500+ лидов. Конверсия в продажу — 15%. Это лучший результат, что у нас был.',
            },
            {
              name: 'Дмитрий Соколов',
              role: 'Руководитель отдела продаж',
              company: 'ТехноСтарт',
              quote: 'Рекрутинг от М.И.Т.А. помог нам закрыть 50 вакансий за 2 месяца. Быстро, качественно, с гарантией.',
            },
            {
              name: 'Елена Волкова',
              role: 'Маркетинг директор',
              company: 'СтройМастер',
              quote: 'Продвижение на Авито дало нам на 40% больше заявок при том же бюджете. Отличная работа!',
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
            title="Готовы увеличить поток клиентов?"
            description="Оставьте заявку сейчас и получите бесплатную консультацию по стратегии лидогенерации для вашего бизнеса."
            primaryCtaLabel="Оставить заявку"
            primaryCtaUrl="#contact"
          />
        </div>
      </main>

      <Footer />

      {/* Онлайн-чат виджет */}
      <ChatWidget />
    </>
  )
}
