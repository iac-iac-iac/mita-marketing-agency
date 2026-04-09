import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { Metadata } from 'next'
import Link from 'next/link'
import FaqItem from '@/components/security/FaqItem'

export const metadata: Metadata = {
  title: 'Безопасность данных | М.И.Т.А.',
  description: 'Защита информации и конфиденциальность клиентов — приоритет М.И.Т.А.',
  openGraph: {
    title: 'Безопасность данных | М.И.Т.А.',
    description: 'Защита информации и конфиденциальность клиентов — приоритет М.И.Т.А.',
    type: 'website',
    locale: 'ru_RU',
  },
}

export default function SecurityPage() {
  return (
    <>
      <Header showBackButton showHamburgerMenu />

      <main className="min-h-screen">
        {/* Hero секция */}
        <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
          {/* Фон */}
          <div className="absolute inset-0 bg-gradient-to-br from-direct-dark via-direct-surface to-direct-dark" />
          
          {/* Декоративные элементы */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-direct-primary/10 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-direct-primary/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />

          <div className="container mx-auto px-4 relative z-10 text-center animate-fade-in">
            <div className="inline-block mb-6">
              <svg className="w-16 h-16 mx-auto text-direct-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Безопасность данных
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">
              Защита информации и конфиденциальность клиентов — наш главный приоритет
            </p>
          </div>
        </section>

        {/* Основной контент */}
        <section className="py-20 md:py-28">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8">
              {/* Карточка 1: Хранение данных */}
              <div className="glass p-8 rounded-2xl animate-fade-in" style={{ animationDelay: '0.1s' }}>
                <div className="w-12 h-12 mb-6 rounded-xl bg-direct-primary/20 flex items-center justify-center">
                  <svg className="w-6 h-6 text-direct-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-4">Хранение данных</h3>
                <p className="text-gray-300 leading-relaxed">
                  Локальные серверы в г. Саратов обеспечивают полный контроль над доступом. 
                  Разграничение по ролям: операторы, менеджеры, руководители, IT-отдел.
                </p>
              </div>

              {/* Карточка 2: CRM и телефония */}
              <div className="glass p-8 rounded-2xl animate-fade-in" style={{ animationDelay: '0.2s' }}>
                <div className="w-12 h-12 mb-6 rounded-xl bg-direct-primary/20 flex items-center justify-center">
                  <svg className="w-6 h-6 text-direct-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-4">CRM и телефония</h3>
                <p className="text-gray-300 leading-relaxed">
                  Битрикс24 для управления лидами. IP-телефония с записью всех разговоров. 
                  4 отдела КЦ (~70-80 сотрудников) используют защищенные каналы связи.
                </p>
              </div>

              {/* Карточка 3: Юридические гарантии */}
              <div className="glass p-8 rounded-2xl animate-fade-in" style={{ animationDelay: '0.3s' }}>
                <div className="w-12 h-12 mb-6 rounded-xl bg-direct-primary/20 flex items-center justify-center">
                  <svg className="w-6 h-6 text-direct-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-4">Юридические гарантии</h3>
                <p className="text-gray-300 leading-relaxed">
                  NDA и договоры на оказание услуг. Соответствие 152-ФЗ «О персональных данных». 
                  Ответственность за сохранность и уведомление об инцидентах.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Детали безопасности */}
        <section className="py-20 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-direct-dark via-direct-surface/50 to-direct-dark" />
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
                Уровни защиты данных
              </h2>

              <div className="space-y-6">
                {[
                  {
                    icon: (
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                    ),
                    title: 'Физическая защита серверов',
                    description: 'Серверы расположены в охраняемом помещении с ограниченным доступом. Только уполномоченные сотрудники IT-отдела имеют физический доступ.',
                  },
                  {
                    icon: (
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    ),
                    title: 'Разграничение доступа по ролям',
                    description: 'Операторы видят только текущие лиды, менеджеры — данные своих клиентов, руководители — расширенный доступ, IT — только техническая поддержка.',
                  },
                  {
                    icon: (
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                      </svg>
                    ),
                    title: 'Регулярное резервное копирование',
                    description: 'Автоматическое резервное копирование данных еженедельно/ежемесячно. Хранение бэкапов в защищенном хранилище с шифрованием.',
                  },
                  {
                    icon: (
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                    ),
                    title: 'Мониторинг и логирование',
                    description: 'Непрерывный мониторинг доступа к данным. Все действия логируются и отслеживаются. При обнаружении аномалий — мгновенное реагирование.',
                  },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="glass p-6 rounded-2xl flex items-start gap-6 animate-fade-in"
                    style={{ animationDelay: `${0.1 + index * 0.1}s` }}
                  >
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-direct-primary/20 flex items-center justify-center text-direct-primary">
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                      <p className="text-gray-300 leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-20 md:py-28">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
                Часто задаваемые вопросы
              </h2>

              <div className="space-y-4">
                {[
                  {
                    question: 'Как вы обеспечиваете безопасность моих данных?',
                    answer: 'Мы используем многоуровневую систему защиты: локальное хранение данных, разграничение доступа по ролям, регулярное резервное копирование и непрерывный мониторинг безопасности.',
                  },
                  {
                    question: 'Где хранятся данные?',
                    answer: 'Основные данные хранятся на локальных серверах компании в г. Саратов. Доступ к серверам имеют только уполномоченные сотрудники IT-отдела.',
                  },
                  {
                    question: 'Используете ли вы облачные решения?',
                    answer: 'В настоящее время мы используем локальные сервера. Облачные решения планируются к внедрению для масштабирования и обеспечения высокой доступности.',
                  },
                  {
                    question: 'Как долго хранятся данные?',
                    answer: 'Срок хранения данных определяется договором с клиентом. После окончания сотрудничества данные могут быть удалены по запросу клиента.',
                  },
                  {
                    question: 'Кто имеет доступ к данным?',
                    answer: 'Доступ предоставляется строго по ролям: операторы — только текущие лиды, менеджеры — данные своих клиентов, руководители — расширенный доступ, IT-отдел — только технический доступ.',
                  },
                  {
                    question: 'Что происходит с данными после окончания сотрудничества?',
                    answer: 'По умолчанию данные архивируются. Клиент может запросить полное удаление своих данных в любое время — мы обязаны выполнить это в течение 30 дней.',
                  },
                  {
                    question: 'Используете ли вы данные для собственных нужд?',
                    answer: 'Нет, данные клиентов используются исключительно для оказания услуг в рамках договора. Мы не продаем, не передаем и не используем данные в своих интересах.',
                  },
                ].map((item, index) => (
                  <FaqItem key={index} question={item.question} answer={item.answer} index={index} />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 md:py-28 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-direct-primary/10 via-direct-dark to-direct-primary/5" />

          <div className="container mx-auto px-4 relative z-10">
            <div className="glass p-10 md:p-16 text-center max-w-4xl mx-auto animate-fade-in">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
                Готовы обеспечить постоянный поток клиентов?
              </h2>
              <p className="text-xl text-gray-300 mb-8">
                Узнайте больше о наших услугах и начните работу с М.И.Т.А. уже сегодня
              </p>
              <Link
                href="/contact"
                className="inline-block px-8 py-4 bg-direct-primary hover:bg-direct-secondary text-white font-semibold text-lg rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-direct-primary/30"
              >
                Заказать консультацию
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
