'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { mitaGoldText } from '@/lib/mita-landing-styles';
import { cn } from '@/lib/utils/cn';

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
    answer: 'Лидогенерация — это процесс привлечения потенциальных клиентов (лидов) для вашего бизнеса. Мы настраиваем маркетинговые инструменты, оптимизируем воронку продаж и обеспечиваем стабильный поток заявок. Каждый лид проходит квалификацию перед передачей вам.',
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
    <section className="relative py-20 md:py-28">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0D0D0D] via-[#0D0D0D] to-[#0D0D0D]" />
      <div className="container relative z-10 mx-auto px-4">
        <div className="mb-16 text-center">
          <h2
            className={cn(
              mitaGoldText,
              'mb-6 text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl'
            )}
          >
            {title || 'Часто задаваемые вопросы'}
          </h2>
          <p className="mx-auto max-w-3xl text-xl text-white/60">
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
              className="glass overflow-hidden rounded-2xl border border-white/8"
            >
              <button
                onClick={() => toggleFaq(index)}
                className="flex w-full items-center justify-between px-6 py-5 text-left transition-colors hover:bg-white/5"
                aria-expanded={openIndex === index}
              >
                <span className="pr-4 text-lg font-semibold text-white">
                  {faq.question}
                </span>
                <svg
                  className={`h-6 w-6 flex-shrink-0 text-[#D4A84B] transition-transform duration-300 ${
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
                    <div className="px-6 pb-5 leading-relaxed text-white/60">
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
