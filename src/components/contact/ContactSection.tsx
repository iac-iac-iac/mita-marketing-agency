'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useScrollReveal } from '@/lib/hooks/use-scroll-reveal'

export default function ContactSection() {
  const titleRef = useScrollReveal()
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    company: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Имитация отправки
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    setIsSubmitting(false)
    setSubmitted(true)
    setFormData({ name: '', phone: '', email: '', company: '', message: '' })
    
    setTimeout(() => setSubmitted(false), 5000)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const contactInfo = [
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      title: 'Адрес',
      value: 'г. Саратов, Астраханская ул., 87В',
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      title: 'Email',
      value: 'info@direct-line.ru',
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      ),
      title: 'Телефон',
      value: '+7 (XXX) XXX-XX-XX',
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: 'Режим работы',
      value: 'Пн-Пт: 9:00 - 18:00',
    },
  ]

  return (
    <section className="py-20 md:py-28 relative">
      {/* Фоновый градиент */}
      <div className="absolute inset-0 bg-gradient-to-b from-direct-dark via-direct-primary/10 to-direct-dark" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Заголовок */}
        <div ref={titleRef} className="scroll-reveal">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-6">
            Свяжитесь с нами
          </h2>
          <p className="text-xl text-gray-300 text-center max-w-2xl mx-auto mb-12">
            Оставьте заявку и мы свяжемся с вами в ближайшее время
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Контактная информация */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-bold text-white mb-6">
              Контактная информация
            </h3>
            
            {contactInfo.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start gap-4 p-4 rounded-xl glass hover:bg-white/10 transition-colors"
              >
                <div className="w-12 h-12 rounded-xl bg-direct-primary/20 flex items-center justify-center text-direct-primary flex-shrink-0">
                  {item.icon}
                </div>
                <div>
                  <p className="text-sm text-gray-400 mb-1">{item.title}</p>
                  <p className="text-lg text-white font-medium">{item.value}</p>
                </div>
              </motion.div>
            ))}

            {/* Социальные сети */}
            <div className="pt-6">
              <p className="text-sm text-gray-400 mb-4">Мы в социальных сетях:</p>
              <div className="flex gap-4">
                {['vk', 'telegram', 'whatsapp'].map((social, index) => (
                  <motion.a
                    key={social}
                    href="#"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.1 }}
                    className="w-12 h-12 rounded-xl glass hover:bg-direct-primary/20 flex items-center justify-center transition-colors"
                  >
                    <span className="text-white text-sm font-medium capitalize">{social[0].toUpperCase()}</span>
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Форма заявки */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="glass p-8 rounded-3xl">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-6">
                    <svg className="w-10 h-10 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">
                    Заявка отправлена!
                  </h3>
                  <p className="text-gray-300">
                    Мы свяжемся с вами в ближайшее время
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Имя *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-xl glass bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-direct-primary/50 focus:ring-2 focus:ring-direct-primary/20 transition-all"
                        placeholder="Иван Иванов"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Телефон *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-xl glass bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-direct-primary/50 focus:ring-2 focus:ring-direct-primary/20 transition-all"
                        placeholder="+7 (___) ___-__-__"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl glass bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-direct-primary/50 focus:ring-2 focus:ring-direct-primary/20 transition-all"
                      placeholder="example@mail.ru"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Компания
                    </label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl glass bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-direct-primary/50 focus:ring-2 focus:ring-direct-primary/20 transition-all"
                      placeholder="Название компании"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Сообщение
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={4}
                      className="w-full px-4 py-3 rounded-xl glass bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-direct-primary/50 focus:ring-2 focus:ring-direct-primary/20 transition-all resize-none"
                      placeholder="Расскажите о вашем проекте..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-direct-primary to-direct-accent text-white font-semibold hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Отправка...
                      </>
                    ) : (
                      'Отправить заявку'
                    )}
                  </button>

                  <p className="text-xs text-gray-500 text-center">
                    Нажимая кнопку, вы соглашаетесь с{' '}
                    <a href="/legal/privacy" className="text-direct-primary hover:underline">
                      политикой конфиденциальности
                    </a>
                  </p>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
