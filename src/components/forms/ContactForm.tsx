// src/components/forms/ContactForm.tsx

'use client';

import { useState, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { motion } from 'framer-motion';
import { trackFormSubmit, trackFormError } from '@/lib/analytics/track';
import { useUTM } from '@/lib/hooks/use-utm';
import Link from 'next/link';

interface FormData {
  name: string;
  phone: string;
  email: string;
  company?: string;
  message: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  form_name: string;
  timestamp: string;
  consent_pd: boolean;
}

interface ContactFormProps {
  formName?: string;
  serviceName?: string;
}

export function ContactForm({ formName = 'contact_form', serviceName }: ContactFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  
  // Получаем UTM метки из хука
  const utm = useUTM();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    defaultValues: {
      consent_pd: false,
    },
  });

  // Обновляем скрытые поля UTM метками
  useEffect(() => {
    if (utm.utm_source || utm.utm_medium || utm.utm_campaign) {
      // UTM метки доступны, можно обновить форму
    }
  }, [utm]);

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    try {
      const formData = {
        ...data,
        form_name: formName,
        service: serviceName,
        timestamp: new Date().toISOString(),
        // Добавляем UTM метки из хука
        utm_source: utm.utm_source || data.utm_source || '',
        utm_medium: utm.utm_medium || data.utm_medium || '',
        utm_campaign: utm.utm_campaign || data.utm_campaign || '',
      };

      const response = await fetch('/api/submit-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Ошибка отправки формы');
      }

      setSubmitStatus('success');
      trackFormSubmit(formName, serviceName);
      reset();
    } catch (error) {
      setSubmitStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'Произошла ошибка');
      trackFormError(formName, error instanceof Error ? error.message : 'Unknown error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-2xl">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Имя */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-white/90 mb-2">
            Имя *
          </label>
          <input
            id="name"
            type="text"
            {...register('name', { required: 'Имя обязательно' })}
            className="w-full px-4 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-direct-primary/50 focus:border-transparent transition-all"
            placeholder="Ваше имя"
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-400">{errors.name.message}</p>
          )}
        </div>

        {/* Телефон */}
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-white/90 mb-2">
            Телефон *
          </label>
          <input
            id="phone"
            type="tel"
            {...register('phone', {
              required: 'Телефон обязателен',
              pattern: {
                value: /^[\d\s\+\-\(\)]{10,}$/,
                message: 'Некорректный формат телефона',
              },
            })}
            className="w-full px-4 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-direct-primary/50 focus:border-transparent transition-all"
            placeholder="+7 (___) ___-__-__"
          />
          {errors.phone && (
            <p className="mt-1 text-sm text-red-400">{errors.phone.message}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-white/90 mb-2">
            Email *
          </label>
          <input
            id="email"
            type="email"
            {...register('email', {
              required: 'Email обязателен',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Некорректный формат email',
              },
            })}
            className="w-full px-4 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-direct-primary/50 focus:border-transparent transition-all"
            placeholder="example@mail.ru"
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-400">{errors.email.message}</p>
          )}
        </div>

        {/* Компания */}
        <div>
          <label htmlFor="company" className="block text-sm font-medium text-white/90 mb-2">
            Компания
          </label>
          <input
            id="company"
            type="text"
            {...register('company')}
            className="w-full px-4 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-direct-primary/50 focus:border-transparent transition-all"
            placeholder="Название компании"
          />
        </div>

        {/* Сообщение */}
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-white/90 mb-2">
            Сообщение *
          </label>
          <textarea
            id="message"
            {...register('message', { required: 'Сообщение обязательно' })}
            rows={4}
            className="w-full px-4 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all resize-none"
            placeholder="Опишите вашу задачу"
          />
          {errors.message && (
            <p className="mt-1 text-sm text-red-400">{errors.message.message}</p>
          )}
        </div>

        {/* Скрытые поля */}
        <input type="hidden" {...register('utm_source')} defaultValue="" />
        <input type="hidden" {...register('utm_medium')} defaultValue="" />
        <input type="hidden" {...register('utm_campaign')} defaultValue="" />
        <input type="hidden" {...register('form_name')} value={formName} />
        <input type="hidden" {...register('timestamp')} value={new Date().toISOString()} />

        <div className="flex items-start gap-3">
          <input
            id="contact-consent-pd"
            type="checkbox"
            {...register('consent_pd', {
              required: 'Подтвердите согласие на обработку персональных данных',
            })}
            className="mt-1 h-4 w-4 rounded border-white/20 bg-white/10 text-direct-primary focus:ring-direct-primary"
          />
          <label htmlFor="contact-consent-pd" className="text-sm text-gray-300 leading-relaxed">
            Я согласен(на) на{' '}
            <Link href="/legal/personal-data-consent" className="text-direct-primary hover:underline">
              обработку персональных данных
            </Link>
            . Ознакомлен(а) с{' '}
            <Link href="/legal/privacy" className="text-direct-primary hover:underline">
              Политикой конфиденциальности
            </Link>
            .
          </label>
        </div>
        {errors.consent_pd && (
          <p className="text-sm text-red-400">{errors.consent_pd.message}</p>
        )}

        {/* Кнопка отправки */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          disabled={isSubmitting}
          className="w-full py-4 bg-gradient-to-r from-direct-primary to-direct-accent hover:from-direct-primary/90 hover:to-direct-accent/90 text-white font-semibold rounded-xl shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          {isSubmitting ? 'Отправка...' : 'Отправить заявку'}
        </motion.button>

        {/* Сообщения об успехе/ошибке */}
        {submitStatus === 'success' && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 bg-green-500/20 border border-green-500/30 rounded-xl text-green-300"
          >
            ✓ Заявка успешно отправлена! Мы свяжемся с вами в ближайшее время.
          </motion.div>
        )}

        {submitStatus === 'error' && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 bg-red-500/20 border border-red-500/30 rounded-xl text-red-300"
          >
            ✗ {errorMessage}
          </motion.div>
        )}
      </form>
    </div>
  );
}
