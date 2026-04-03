import Header from '@/components/layout/Header'
import ScrollToTopButton from '@/components/ui/ScrollToTopButton'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Политика конфиденциальности | М.И.Т.А.',
  description: 'Защита и обработка персональных данных в М.И.Т.А.',
}

export default function PrivacyPage() {
  return (
    <>
      <Header showBackButton showHamburgerMenu />
      
      <main className="min-h-screen pt-20 pb-20" style={{ background: '#0a0a0f' }}>
        {/* Hero */}
        <section className="py-16 px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Политика конфиденциальности
          </h1>
          <p className="text-xl text-gray-400 mb-2">
            Защита и обработка персональных данных
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
              <p>1.1. Настоящая Политика конфиденциальности (далее — «Политика») определяет порядок обработки и защиты персональных данных пользователей сайта М.И.Т.А.</p>
              <p>1.2. Политика разработана в соответствии с Федеральным законом №152-ФЗ «О персональных данных».</p>
              <p>1.3. Используя сайт и услуги М.И.Т.А., вы соглашаетесь с условиями Политики.</p>
            </div>
          </div>

          {/* Секция 2 */}
          <div className="mb-12 p-8 rounded-2xl" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
            <h2 className="text-2xl font-bold text-white mb-6">2. Сбор персональных данных</h2>
            <div className="space-y-4 text-gray-300">
              <p>2.1. Мы собираем следующие данные:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Имя, телефон, email (при заполнении форм)</li>
                <li>Название компании, должность</li>
                <li>UTM-метки и данные об источнике трафика</li>
              </ul>
              <p>2.2. Сбор данных осуществляется через формы на сайте, по телефону, через мессенджеры.</p>
            </div>
          </div>

          {/* Секция 3 */}
          <div className="mb-12 p-8 rounded-2xl" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
            <h2 className="text-2xl font-bold text-white mb-6">3. Цели обработки данных</h2>
            <div className="space-y-4 text-gray-300">
              <p>3.1. Обработка данных осуществляется для:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Связи с клиентами и потенциальными заказчиками</li>
                <li>Оказания услуг (лидогенерация, call-центр, рекрутинг)</li>
                <li>Отправки коммерческих предложений (с согласия)</li>
                <li>Внутренней аналитики и улучшения качества услуг</li>
              </ul>
            </div>
          </div>

          {/* Секция 4 */}
          <div className="mb-12 p-8 rounded-2xl" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
            <h2 className="text-2xl font-bold text-white mb-6">4. Правовые основания обработки</h2>
            <div className="space-y-4 text-gray-300">
              <p>4.1. Обработка данных осуществляется на основании:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Согласия субъекта персональных данных</li>
                <li>Договора на оказание услуг</li>
                <li>Законодательства РФ (152-ФЗ)</li>
              </ul>
            </div>
          </div>

          {/* Секция 5 */}
          <div className="mb-12 p-8 rounded-2xl" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
            <h2 className="text-2xl font-bold text-white mb-6">5. Обработка и хранение данных</h2>
            <div className="space-y-4 text-gray-300">
              <p>5.1. Данные хранятся на локальных серверах компании в г. Саратов.</p>
              <p>5.2. Срок хранения данных определяется договором с клиентом или до отзыва согласия на обработку.</p>
              <p>5.3. После окончания сотрудничества данные могут быть удалены по запросу клиента.</p>
            </div>
          </div>

          {/* Секция 6 */}
          <div className="mb-12 p-8 rounded-2xl" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
            <h2 className="text-2xl font-bold text-white mb-6">6. Защита данных</h2>
            <div className="space-y-4 text-gray-300">
              <p>6.1. Мы применяем следующие меры защиты:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Разграничение доступа по ролям</li>
                <li>Регулярное резервное копирование</li>
                <li>Мониторинг безопасности</li>
                <li>Сотрудники подписывают NDA</li>
              </ul>
            </div>
          </div>

          {/* Секция 7 */}
          <div className="mb-12 p-8 rounded-2xl" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
            <h2 className="text-2xl font-bold text-white mb-6">7. Передача данных третьим лицам</h2>
            <div className="space-y-4 text-gray-300">
              <p>7.1. Мы не передаем персональные данные третьим лицам, за исключением:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Случаев, предусмотренных законодательством РФ</li>
                <li>Партнеров, участвующих в оказании услуг (с согласия клиента)</li>
              </ul>
              <p>7.2. Данные клиентов используются исключительно для оказания услуг в рамках договора.</p>
            </div>
          </div>

          {/* Секция 8 */}
          <div className="mb-12 p-8 rounded-2xl" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
            <h2 className="text-2xl font-bold text-white mb-6">8. Права субъекта персональных данных</h2>
            <div className="space-y-4 text-gray-300">
              <p>8.1. Вы имеете право:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Получить информацию о своих данных</li>
                <li>Требовать уточнения, блокирования или удаления данных</li>
                <li>Отозвать согласие на обработку данных</li>
                <li>Обжаловать действия Исполнителя в суде</li>
              </ul>
            </div>
          </div>

          {/* Секция 9 */}
          <div className="mb-12 p-8 rounded-2xl" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
            <h2 className="text-2xl font-bold text-white mb-6">9. Cookies и автоматический сбор данных</h2>
            <div className="space-y-4 text-gray-300">
              <p>9.1. Сайт использует cookies для улучшения качества услуг и аналитики.</p>
              <p>9.2. Вы можете отключить cookies в настройках браузера, но это может ограничить функциональность сайта.</p>
            </div>
          </div>

          {/* Секция 10 */}
          <div className="mb-12 p-8 rounded-2xl" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
            <h2 className="text-2xl font-bold text-white mb-6">10. Изменения в Политике конфиденциальности</h2>
            <div className="space-y-4 text-gray-300">
              <p>10.1. Мы оставляем за собой право вносить изменения в Политику.</p>
              <p>10.2. Актуальная версия Политики размещена на сайте.</p>
            </div>
          </div>

          {/* Секция 11 */}
          <div className="mb-12 p-8 rounded-2xl" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
            <h2 className="text-2xl font-bold text-white mb-6">11. Контакты</h2>
            <div className="space-y-4 text-gray-300">
              <p>11.1. По вопросам обработки персональных данных обращайтесь:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Адрес: г. Саратов, Астраханская ул., 87В</li>
              </ul>
            </div>
          </div>
        </section>

        <ScrollToTopButton />
      </main>
    </>
  )
}
