import Link from 'next/link'
import Image from 'next/image'

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Фоновое изображение 404 */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/error/404_error.png"
          alt="404 Error Background"
          fill
          className="object-cover"
          priority
        />
        {/* Затемнение поверх изображения */}
        <div className="absolute inset-0 bg-gradient-to-br from-direct-dark/80 via-direct-dark/60 to-direct-dark/80" />
      </div>

      {/* Декоративные элементы */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-direct-primary/10 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-direct-accent/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />

      {/* Контент */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="glass p-10 md:p-16 text-center max-w-2xl mx-auto animate-fade-in">
          {/* Иконка 404 */}
          <div className="mb-8">
            <svg
              className="w-32 h-32 mx-auto text-direct-primary/50"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>

          {/* Заголовок */}
          <h1 className="text-6xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-direct-primary to-direct-accent bg-clip-text text-transparent">
            404
          </h1>

          {/* Подзаголовок */}
          <p className="text-2xl md:text-3xl text-gray-300 mb-8">
            Страница не найдена
          </p>

          {/* Описание */}
          <p className="text-gray-400 mb-10 leading-relaxed">
            К сожалению, страница, которую вы ищете, не существует или была перемещена.
            Проверьте правильность URL или вернитесь на главную страницу.
          </p>

          {/* CTA кнопка */}
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-8 py-4 bg-direct-primary hover:bg-direct-primary/80 rounded-xl font-semibold transition-all hover:scale-105 hover:shadow-lg hover:shadow-direct-primary/25"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            На главную
          </Link>

          {/* Дополнительные ссылки */}
          <div className="mt-10 pt-8 border-t border-white/10">
            <p className="text-gray-400 mb-4">Возможно, вас заинтересует:</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/#services"
                className="text-direct-primary hover:text-direct-primary/80 transition-colors"
              >
                Услуги
              </Link>
              <Link
                href="/cases"
                className="text-direct-primary hover:text-direct-primary/80 transition-colors"
              >
                Кейсы
              </Link>
              <Link
                href="/blog"
                className="text-direct-primary hover:text-direct-primary/80 transition-colors"
              >
                Блог
              </Link>
              <Link
                href="/contact"
                className="text-direct-primary hover:text-direct-primary/80 transition-colors"
              >
                Контакты
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
