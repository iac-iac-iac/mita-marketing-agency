import Header from '@/components/layout/Header'
import ScrollToTopButton from '@/components/ui/ScrollToTopButton'
import Link from 'next/link'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Согласие на обработку персональных данных | М.И.Т.А.',
  description:
    'Текст согласия на обработку персональных данных при отправке заявок на сайте М.И.Т.А.',
}

const sectionClass =
  'mb-12 p-8 rounded-2xl bg-white/[0.05] border border-white/10'

export default function PersonalDataConsentPage() {
  return (
    <>
      <Header showBackButton showHamburgerMenu />

      <main className="min-h-screen pt-20 pb-20" style={{ background: '#0a0a0f' }}>
        <section className="py-16 px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Согласие на обработку персональных данных
          </h1>
          <p className="text-xl text-gray-400 mb-2">
            Документ в соответствии с Федеральным законом № 152-ФЗ «О персональных данных»
          </p>
          <p className="text-sm text-gray-500">Последнее обновление: 27 апреля 2026</p>
        </section>

        <section className="container mx-auto px-4 max-w-4xl">
          <div className={sectionClass}>
            <h2 className="text-2xl font-bold text-white mb-6">1. Общие положения</h2>
            <div className="space-y-4 text-gray-300">
              <p>
                Настоящим я (далее — «Субъект персональных данных») даю свободное, конкретное,
                информированное и сознательное согласие Оператору — маркетинговому IT-агентству
                М.И.Т.А. (далее — «Оператор») на обработку моих персональных данных на условиях,
                изложенных ниже.
              </p>
              <p>
                Подробный порядок обработки и защиты персональных данных изложен в{' '}
                <Link
                  href="/legal/privacy"
                  className="text-direct-primary hover:underline"
                >
                  Политике конфиденциальности
                </Link>
                .
              </p>
            </div>
          </div>

          <div className={sectionClass}>
            <h2 className="text-2xl font-bold text-white mb-6">2. Состав персональных данных</h2>
            <div className="space-y-4 text-gray-300">
              <p>Согласие распространяется на персональные данные, которые я указываю при заполнении форм на сайте, в том числе:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>фамилия, имя, отчество (при указании);</li>
                <li>номер телефона;</li>
                <li>адрес электронной почты;</li>
                <li>наименование организации, должность (при указании);</li>
                <li>иные сведения, добровольно указанные в полях формы или сообщении.</li>
              </ul>
              <p>
                Также могут обрабатываться технические данные (например, UTM-метки, сведения об
                источнике обращения), если они передаются вместе с формой.
              </p>
            </div>
          </div>

          <div className={sectionClass}>
            <h2 className="text-2xl font-bold text-white mb-6">3. Цели обработки</h2>
            <div className="space-y-4 text-gray-300">
              <p>Персональные данные обрабатываются в целях:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>обработки заявки и обратной связи по моему обращению;</li>
                <li>связи со мной по указанным контактам (телефон, email, мессенджеры при согласовании);</li>
                <li>подготовки и направления информации об услугах Оператора, если это вытекает из моего запроса;</li>
                <li>ведения внутреннего учёта обращений и улучшения качества сервиса.</li>
              </ul>
            </div>
          </div>

          <div className={sectionClass}>
            <h2 className="text-2xl font-bold text-white mb-6">4. Действия с персональными данными</h2>
            <div className="space-y-4 text-gray-300">
              <p>
                Оператор вправе осуществлять сбор, запись, систематизацию, накопление, хранение,
                уточнение (обновление, изменение), извлечение, использование, передачу (предоставление,
                доступ), обезличивание, блокирование, удаление и уничтожение персональных данных —
                в объёме, необходимом для достижения указанных целей, в соответствии с 152-ФЗ.
              </p>
            </div>
          </div>

          <div className={sectionClass}>
            <h2 className="text-2xl font-bold text-white mb-6">5. Срок действия согласия</h2>
            <div className="space-y-4 text-gray-300">
              <p>
                Согласие действует до достижения целей обработки или до момента его отзыва мной,
                в зависимости от того, какое событие наступит ранее, если иное не предусмотрено
                законодательством РФ или договором с Оператором.
              </p>
            </div>
          </div>

          <div className={sectionClass}>
            <h2 className="text-2xl font-bold text-white mb-6">6. Отзыв согласия</h2>
            <div className="space-y-4 text-gray-300">
              <p>
                Я уведомлён(а), что вправе отозвать настоящее согласие, направив Оператору обращение
                по контактам, указанным в разделе «Контакты»{' '}
                <Link href="/legal/privacy" className="text-direct-primary hover:underline">
                  Политики конфиденциальности
                </Link>{' '}
                или на странице{' '}
                <Link href="/contact" className="text-direct-primary hover:underline">
                  Контакты
                </Link>
                . Отзыв не влияет на законность обработки до момента отзыва.
              </p>
            </div>
          </div>
        </section>

        <ScrollToTopButton />
      </main>
    </>
  )
}
