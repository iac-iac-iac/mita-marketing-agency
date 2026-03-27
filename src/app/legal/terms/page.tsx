import Header from '@/components/layout/Header'
import ScrollToTopButton from '@/components/ui/ScrollToTopButton'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Условия оказания услуг | Direct-line',
  description: 'Публичная оферта на услуги Direct-line.',
}

export default function TermsPage() {
  return (
    <>
      <Header showBackButton showHamburgerMenu />
      
      <main className="min-h-screen pt-20 pb-20" style={{ background: '#0a0a0f' }}>
        {/* Hero */}
        <section className="py-16 px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Условия оказания услуг
          </h1>
          <p className="text-xl text-gray-400 mb-2">
            Публичная оферта на услуги Direct-line
          </p>
          <p className="text-sm text-gray-500">
            Последнее обновление: 24 марта 2026
          </p>
        </section>

        {/* Контент */}
        <section className="container mx-auto px-4 max-w-4xl">
          {/* Секция 1 */}
          <div className="mb-12 p-8 rounded-2xl" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
            <h2 className="text-2xl font-bold text-white mb-6">1. Общие положения</h2>
            <div className="space-y-4 text-gray-300">
              <p>1.1. Настоящая публичная оферта (далее — «Оферта») является официальным предложением компании Direct-line (далее — «Исполнитель») заключить договор на оказание маркетинговых и консультационных услуг.</p>
              <p>1.2. Оферта адресована любому физическому или юридическому лицу (далее — «Заказчик») и определяет условия оказания услуг.</p>
              <p>1.3. Полная и безоговорочная акцептация Оферты (принятие условий) осуществляется путем оплаты Заказчиком услуг Исполнителя.</p>
              <p>1.4. Дата акцепта Оферты — дата поступления денежных средств на расчетный счет Исполнителя.</p>
            </div>
          </div>

          {/* Секция 2 */}
          <div className="mb-12 p-8 rounded-2xl" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
            <h2 className="text-2xl font-bold text-white mb-6">2. Услуги Исполнителя</h2>
            <div className="space-y-4 text-gray-300">
              <p>2.1. Исполнитель обязуется оказать следующие услуги:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong className="text-white">Лидогенерация</strong> — поиск и квалификация потенциальных клиентов</li>
                <li><strong className="text-white">Call-центр</strong> — обзвон базы клиентов для получения горячих лидов</li>
                <li><strong className="text-white">Продвижение на Авито</strong> — публикация и ведение объявлений</li>
                <li><strong className="text-white">Рекрутинг</strong> — подбор персонала для Заказчика</li>
              </ul>
              <p>2.2. Подробное описание услуг, сроки и стоимость определяются в индивидуальном порядке и фиксируются в договоре или счете на оплату.</p>
            </div>
          </div>

          {/* Секция 3 */}
          <div className="mb-12 p-8 rounded-2xl" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
            <h2 className="text-2xl font-bold text-white mb-6">3. Порядок оказания услуг</h2>
            <div className="space-y-4 text-gray-300">
              <p>3.1. Для заказа услуги Заказчик:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Оставляет заявку на сайте или по телефону</li>
                <li>Получает счет на оплату</li>
                <li>Оплачивает счет</li>
              </ul>
              <p>3.2. Срок оказания услуг зависит от выбранного тарифа и типа услуги и указывается в договоре.</p>
              <p>3.3. Исполнитель обязуется предоставлять отчетность по результатам оказания услуг.</p>
            </div>
          </div>

          {/* Секция 4 */}
          <div className="mb-12 p-8 rounded-2xl" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
            <h2 className="text-2xl font-bold text-white mb-6">4. Стоимость и порядок расчетов</h2>
            <div className="space-y-4 text-gray-300">
              <p>4.1. Стоимость услуг определяется согласно прайс-листу Исполнителя, действующему на момент заказа.</p>
              <p>4.2. Оплата производится в рублях РФ путем безналичного перечисления денежных средств на расчетный счет Исполнителя.</p>
              <p>4.3. Услуги считаются оказанными надлежащим образом с момента подписания Акта сдачи-приемки услуг.</p>
            </div>
          </div>

          {/* Секция 5 */}
          <div className="mb-12 p-8 rounded-2xl" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
            <h2 className="text-2xl font-bold text-white mb-6">5. Ответственность сторон</h2>
            <div className="space-y-4 text-gray-300">
              <p>5.1. Исполнитель несет ответственность за качество оказываемых услуг в соответствии с условиями договора.</p>
              <p>5.2. Исполнитель не гарантирует конкретные финансовые результаты (количество продаж, прибыль), так как они зависят от множества факторов, включая качество продукта Заказчика, рыночную ситуацию и др.</p>
              <p>5.3. Заказчик несет ответственность за достоверность предоставленной информации.</p>
            </div>
          </div>

          {/* Секция 6 */}
          <div className="mb-12 p-8 rounded-2xl" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
            <h2 className="text-2xl font-bold text-white mb-6">6. Конфиденциальность</h2>
            <div className="space-y-4 text-gray-300">
              <p>6.1. Стороны обязуются сохранять конфиденциальность коммерческой информации, полученной в ходе сотрудничества.</p>
              <p>6.2. Персональные данные обрабатываются в соответствии с Федеральным законом №152-ФЗ «О персональных данных».</p>
            </div>
          </div>

          {/* Секция 7 */}
          <div className="mb-12 p-8 rounded-2xl" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
            <h2 className="text-2xl font-bold text-white mb-6">7. Разрешение споров</h2>
            <div className="space-y-4 text-gray-300">
              <p>7.1. Все споры и разногласия решаются путем переговоров.</p>
              <p>7.2. При недостижении согласия спор передается на рассмотрение в суд по месту нахождения Исполнителя.</p>
            </div>
          </div>

          {/* Секция 8 */}
          <div className="mb-12 p-8 rounded-2xl" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
            <h2 className="text-2xl font-bold text-white mb-6">8. Заключительные положения</h2>
            <div className="space-y-4 text-gray-300">
              <p>8.1. Исполнитель оставляет за собой право вносить изменения в Оферту в одностороннем порядке.</p>
              <p>8.2. Актуальная версия Оферты размещена на сайте Исполнителя.</p>
              <p>8.3. Срок действия Оферты — бессрочно.</p>
            </div>
          </div>
        </section>

        <ScrollToTopButton />
      </main>
    </>
  )
}
