'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface FaqItem {
  question: string;
  answer: string;
}

interface FaqSectionProps {
  items?: FaqItem[];
  title?: string;
  subtitle?: string;
}

const defaultFaqs: FaqItem[] = [
  {
    question: 'Что такое лидогенерация и как она работает?',
    answer: 'Лидогенерация — это процесс привлечения потенциальных клиентов (лидов) для вашего бизнеса. Мы настраиваем рекламные кампании, оптимизируем воронку продаж и обеспечиваем стабильный поток заявок. Каждый лид проходит квалификацию перед передачей вам.',
  },
  {
    question: 'Сколько стоит услуга лидогенерации?',
    answer: 'Стоимость зависит от ниши, региона и конкуренции. Мы предлагаем пакеты от 30 000 ₽/мес с гарантированным количеством лидов. Точную стоимость рассчитаем после анализа вашего бизнеса — оставьте заявку на бесплатную консультацию.',
  },
  {
    question: 'Как быстро будут первые результаты?',
    answer: 'Первые лиды обычно появляются в течение 1-2 недель после запуска кампании. Стабильный поток заявок формируется за 3-4 недели, когда система оптимизации настроится на вашу аудиторию.',
  },
  {
    question: 'Работаете ли вы с регионами?',
    answer: 'Да, мы работаем с клиентами из любых регионов России. Все процессы настроены удалённо: от анализа бизнеса до запуска и оптимизации кампаний. Регулярные отчёты и связь с персональным менеджером.',
  },
  {
    question: 'Что если лиды некачественные?',
    answer: 'Мы гарантируем качество лидов. Если в течение первых 2 недель вы получаете нерелевантные заявки, мы бесплатно скорректируем настройки кампании. Также предусмотрена гарантия возврата средств.',
  },
];

export default function FaqSection({ items, title, subtitle }: FaqSectionProps) {
  const faqs = items || defaultFaqs;
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 md:py-28">
      <div className="container mx-auto px-4">
        {/* Заголовок */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
            {title || 'Часто задаваемые вопросы'}
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            {subtitle || 'Ответы на популярные вопросы о наших услугах и процессе работы'}
          </p>
        </div>

        {/* FAQ Список */}
        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="glass rounded-2xl overflow-hidden"
            >
              <button
                onClick={() => toggleFaq(index)}
                className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-white/5 transition-colors"
                aria-expanded={openIndex === index}
              >
                <span className="text-lg font-semibold text-white pr-4">
                  {faq.question}
                </span>
                <svg
                  className={`w-6 h-6 text-direct-primary flex-shrink-0 transition-transform duration-300 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="px-6 pb-5 text-gray-300 leading-relaxed">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
