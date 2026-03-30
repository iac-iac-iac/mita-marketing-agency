import ServiceHero from '@/components/blocks/ServiceHero'
import ProblemStatement from '@/components/blocks/ProblemStatement'
import ServiceFeatures from '@/components/blocks/ServiceFeatures'
import ServiceProcess from '@/components/blocks/ServiceProcess'
import TestimonialsSection from '@/components/blocks/TestimonialsSection'
import PricingSection from '@/components/blocks/PricingSection'
import FaqSection from '@/components/blocks/FaqSection'
import ClosingCta from '@/components/blocks/ClosingCta'
import SpeedMetrics from '@/components/blocks/SpeedMetrics'
import RecruitmentFunnel from '@/components/blocks/RecruitmentFunnel'
import VacancyCases from '@/components/blocks/VacancyCases'
import GuaranteeSection from '@/components/blocks/GuaranteeSection'
import Header from '@/components/layout/Header'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Рекрутинг | Direct-line',
  description: 'Профессиональный поиск и подбор персонала. Массовый рекрутинг с использованием call-центра. Воронка кандидатов от первичного контакта до выхода на работу.',
  keywords: ['рекрутинг', 'подбор персонала', 'найм сотрудников', 'массовый подбор', 'HR', 'вакансии'],
  openGraph: {
    title: 'Рекрутинг | Direct-line',
    description: 'Команда продаж, которая вывезет объем лидов. Профессиональный подбор персонала с гарантией.',
    type: 'website',
    locale: 'ru_RU',
  },
}

export default function RecruitingPage() {
  return (
    <>
      <Header showBackButton showHamburgerMenu />

      <main className="animate-fade-in-up">
        <ServiceHero
          eyebrow="Рекрутинг"
          title="Команда продаж, которая вывезет объем лидов"
          subtitle="Профессиональный поиск и подбор персонала. Массовый рекрутинг с использованием call-центра для быстрого результата"
          primaryCtaLabel="Заказать подбор"
          primaryCtaUrl="/contact"
          secondaryCtaLabel="Узнать подробнее"
          secondaryCtaUrl="#process"
          mediaSrc="/images/hero-banner/Hero-banner_recruiting.mp4"
          mediaType="video"
          videoPoster="/images/hero-banner/Hero-banner_recruiting.png"
        />

        {/* Скорость подбора */}
        <SpeedMetrics
          metrics={[
            {
              label: 'Дней на закрытие вакансии',
              value: 14,
              suffix: ' дней',
              description: 'Средний срок подбора',
            },
            {
              label: 'Звонков в день',
              value: 200,
              suffix: '',
              description: 'На одного рекрутера',
            },
            {
              label: 'Собеседований в неделю',
              value: 50,
              suffix: '',
              description: 'С квалифицированными кандидатами',
            },
          ]}
          title="Скорость подбора"
          description="Наши показатели эффективности"
        />

        {/* Воронка кандидатов */}
        <RecruitmentFunnel
          stages={[
            {
              number: 1,
              name: 'Заявок получено',
              count: 1000,
              conversion: 100,
              description: 'Первичный контакт',
            },
            {
              number: 2,
              name: 'Дозвонились',
              count: 650,
              conversion: 65,
              description: 'Установлен контакт',
            },
            {
              number: 3,
              name: 'Заинтересовались',
              count: 400,
              conversion: 40,
              description: 'Выразили интерес к вакансии',
            },
            {
              number: 4,
              name: 'Прошли собеседование',
              count: 200,
              conversion: 20,
              description: 'Успешное интервью',
            },
            {
              number: 5,
              name: 'Вышли на работу',
              count: 100,
              conversion: 10,
              description: 'Трудоустроены',
            },
          ]}
          title="Воронка кандидатов"
          description="Прозрачный процесс подбора от звонка до выхода на работу"
        />

        {/* Кейсы по вакансиям */}
        <VacancyCases
          cases={[
            {
              niche: 'Продажи',
              position: 'Менеджер по продажам',
              deadline: '14 дней',
              result: '25 кандидатов',
            },
            {
              niche: 'Производство',
              position: 'Оператор станка ЧПУ',
              deadline: '21 день',
              result: '18 кандидатов',
            },
            {
              niche: 'Ритейл',
              position: 'Продавец-консультант',
              deadline: '10 дней',
              result: '40 кандидатов',
            },
            {
              niche: 'Логистика',
              position: 'Водитель-экспедитор',
              deadline: '7 дней',
              result: '12 кандидатов',
            },
          ]}
          title="Закрытые вакансии"
          description="Реальные результаты подбора по разным нишам"
        />

        {/* Гарантии */}
        <GuaranteeSection
          guarantees={[
            {
              title: 'Замена кандидата',
              description: 'Если кандидат не прошёл испытательный срок, найдём замену бесплатно в течение 14 дней',
              color: 'blue',
            },
            {
              title: 'Возврат денег',
              description: 'Если не закроем вакансию в срок, вернём 100% предоплаты без вопросов',
              color: 'green',
            },
            {
              title: 'Соблюдение сроков',
              description: 'Гарантируем передачу кандидатов точно в оговоренные даты по договору',
              color: 'purple',
            },
          ]}
        />

        {/* Проблемы */}
        <ProblemStatement
          title="Знакомые проблемы?"
          description="Компании теряют время и деньги из-за сложностей с подбором персонала:"
          painPoints={[
            "Долго ищут сотрудников — вакансии висят месяцами",
            "Текучка кадров — люди увольняются через испытательный срок",
            "Нет системы — хаотичный поиск без результата",
            "HR не справляются с массовым подбором",
            "Кандидаты не выходят на работу после собеседования",
          ]}
        />

        {/* Фичи услуги */}
        <ServiceFeatures
          title="Как мы решаем проблемы"
          features={[
          {
          name: "Массовый обзвон",
          description: "Call-центр делает сотни звонков потенциальным кандидатам. Быстрый охват большой аудитории",
          },
          {
            name: "Тестовые задания",
          description: "Проверка навыков кандидатов перед передачей клиенту. Только квалифицированные специалисты",
          },
          {
            name: "Адаптация",
            description: "Сопровождение новых сотрудников на испытательном сроке. Снижение текучести",
          },
          {
          name: "Составление сценария",
            description: "Разработка скриптов для обзвона кандидатов. Адаптация под конкретную вакансию",
          },
          {
          name: "Интеграция с CRM",
          description: "Все кандидаты вносятся в Битрикс24. Прозрачная статистика и отчётность",
          },
          ]}
        />

        {/* Процесс работы */}
        <ServiceProcess
          title="Как мы работаем"
          steps={[
            {
              number: 1,
              title: "Приём заявки на подбор",
              description: "Получаем от клиента описание вакансии, требования к кандидатам, определяем объём подбора (10/100/300/1000 кандидатов).",
              kpi: "1 день",
            },
            {
              number: 2,
              title: "Составление сценария",
              description: "Разрабатываем скрипт обзвона, адаптируем под вакансию клиента. Обучаем операторов call-центра.",
              kpi: "1-2 дня",
            },
            {
              number: 3,
              title: "Массовый обзвон и отбор",
              description: "Call-центр обзванивает потенциальных кандидатов, проводит первичное интервью. Отдел рекрутинга проверяет соответствие требованиям.",
              kpi: "100-200 звонков/день",
            },
            {
              number: 4,
              title: "Передача базы кандидатов",
              description: "Формируем базу отобранных кандидатов с контактами и результатами интервью. Передаём клиенту с отчётом.",
              kpi: "Конверсия 10-20%",
            },
          ]}
        />

        {/* Отзывы */}
        <TestimonialsSection
          title="Что говорят клиенты"
          layout="wide"
          items={[
            {
              name: "Сергей Волков",
              role: "Руководитель отдела продаж",
              company: "Телеком-компания",
              quote: "За 2 недели нам подобрали 15 менеджеров по продажам. 12 вышли на работу, 10 прошли испытательный срок. Отличный результат!",
            },
            {
              name: "Наталья Федорова",
              role: "HR-директор",
              company: "Ритейл",
              quote: "Заказывали массовый подбор линейного персонала. Direct-line закрыли 50 вакансий за месяц. Текучка на испытательном сроке минимальная.",
            },
          ]}
        />

        {/* Тарифы */}
        <PricingSection
          title="Тарифы на подбор персонала"
          plans={[
            {
              name: "Тест",
              price: "10 000 ₽",
              description: "Для знакомства с услугой",
              features: [
                "10 кандидатов",
                "1 000 ₽ за кандидата",
                "Первичный отбор",
                "Телефонное интервью",
                "База контактов",
                "Срок: 3-5 дней",
              ],
              ctaLabel: "Попробовать",
              ctaUrl: "/contact",
            },
            {
              name: "Пилот",
              price: "130 000 ₽",
              description: "Для небольших команд",
              features: [
                "100 кандидатов",
                "1 300 ₽ за кандидата",
                "Разработка скрипта",
                "Массовый обзвон",
                "Первичный отбор",
                "Интеграция с CRM",
              ],
              ctaLabel: "Заказать",
              ctaUrl: "/contact",
            },
            {
              name: "Стандарт",
              price: "355 000 ₽",
              description: "Оптимальный выбор",
              features: [
                "300 кандидатов",
                "1 183 ₽ за кандидата",
                "Расширенный отбор",
                "Тестовые задания",
                "Сопровождение",
                "Персональный менеджер",
              ],
              ctaLabel: "Заказать",
              ctaUrl: "/contact",
              isHighlighted: true,
            },
            {
              name: "Премиум",
              price: "1 080 000 ₽",
              description: "Для масштабного найма",
              features: [
                "1000 кандидатов",
                "1 080 ₽ за кандидата",
                "Приоритетный старт",
                "Выделенная команда",
                "Расширенная аналитика",
                "Гарантия замены",
              ],
              ctaLabel: "Заказать",
              ctaUrl: "/contact",
            },
          ]}
        />

        {/* FAQ */}
        <FaqSection
          title="Частые вопросы"
          items={[
            {
              question: "Сколько времени занимает подбор?",
              answer: "Срок зависит от тарифа и сложности вакансии. Тест (10 кандидатов) — 3-5 дней, Пилот (100 кандидатов) — 1-2 недели, Стандарт (300 кандидатов) — 2-3 недели, Премиум (1000 кандидатов) — 3-4 недели.",
            },
            {
              question: "Что входит в стоимость?",
              answer: "В стоимость входит: работа call-центра, составление сценария обзвона, первичный отбор кандидатов, телефонное интервью, формирование базы с контактами и результатами.",
            },
            {
              question: "Какая конверсия в кандидата?",
              answer: "Средняя конверсия составляет 10-20% от числа contacted. Это зависит от привлекательности вакансии, уровня зарплаты и требований к кандидатам.",
            },
            {
              question: "Можно ли заказать тест перед большим объёмом?",
              answer: "Да, рекомендуем начать с тарифа Тест за 10 000 руб. Это позволит оценить качество нашей работы и принять решение о более крупном заказе.",
            },
            {
              question: "Работаете ли вы с редкими вакансиями?",
              answer: "Да, мы работаем с различными вакансиями. Для редких или узкоспециализированных позиций срок подбора может быть больше, а стоимость за кандидата — выше.",
            },
            {
              question: "Что если кандидат не выйдет на работу?",
              answer: "Мы передаём вам базу отобранных кандидатов, которые согласились на вакансию. Дальнейшее трудоустройство — ваша зона ответственности. При заказе тарифа Премиум возможна гарантия замены.",
            },
            {
              question: "Как происходит оплата?",
              answer: "Оплата производится по факту заключения договора. Для крупных проектов возможна поэтапная оплата. Обсудите условия с менеджером.",
            },
          ]}
        />

        {/* Закрывающий CTA */}
        <ClosingCta
          title="Готовы закрыть вакансии быстро и качественно?"
          description="Начните с теста за 10 000 ₽ и оцените наш подход к рекрутингу"
          primaryCtaLabel="Заказать подбор"
          primaryCtaUrl="/contact"
        />
      </main>
    </>
  )
}
