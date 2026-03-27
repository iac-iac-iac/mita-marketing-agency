// src/components/forms/LeadForm.tsx

'use client';

import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { motion } from 'framer-motion';
import { trackFormSubmit, trackFormError } from '@/lib/analytics/track';

interface FormData {
  name: string;
  phone: string;
  email: string;
  service?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  form_name: string;
  timestamp: string;
}

interface LeadFormProps {
  formName?: string;
  serviceName?: string;
  onSuccess?: () => void;
}

export function LeadForm({ formName = 'lead_form', serviceName, onSuccess }: LeadFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>();

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
      
      if (onSuccess) {
        setTimeout(onSuccess, 2000);
      }
    } catch (error) {
      setSubmitStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'Произошла ошибка');
      trackFormError(formName, error instanceof Error ? error.message : 'Unknown error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* Имя */}
      <div>
        <label htmlFor="lead-name" className="block text-sm font-medium text-white/90 mb-2">
          Имя *
        </label>
        <input
          id="lead-name"
          type="text"
          {...register('name', { required: 'Имя обязательно' })}
          className="w-full px-4 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all"
          placeholder="Ваше имя"
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-400">{errors.name.message}</p>
        )}
      </div>

      {/* Телефон */}
      <div>
        <label htmlFor="lead-phone" className="block text-sm font-medium text-white/90 mb-2">
          Телефон *
        </label>
        <input
          id="lead-phone"
          type="tel"
          {...register('phone', {
            required: 'Телефон обязателен',
            pattern: {
              value: /^[\d\s\+\-\(\)]{10,}$/,
              message: 'Некорректный формат телефона',
            },
          })}
          className="w-full px-4 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all"
          placeholder="+7 (___) ___-__-__"
        />
        {errors.phone && (
          <p className="mt-1 text-sm text-red-400">{errors.phone.message}</p>
        )}
      </div>

      {/* Email */}
      <div>
        <label htmlFor="lead-email" className="block text-sm font-medium text-white/90 mb-2">
          Email *
        </label>
        <input
          id="lead-email"
          type="email"
          {...register('email', {
            required: 'Email обязателен',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Некорректный формат email',
            },
          })}
          className="w-full px-4 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all"
          placeholder="example@mail.ru"
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-400">{errors.email.message}</p>
        )}
      </div>

      {/* Услуга (если передана) */}
      {serviceName && (
        <div>
          <label className="block text-sm font-medium text-white/90 mb-2">
            Выбранная услуга
          </label>
          <div className="px-4 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl text-white/70">
            {serviceName}
          </div>
        </div>
      )}

      {/* Скрытые поля */}
      <input type="hidden" {...register('utm_source')} defaultValue="" />
      <input type="hidden" {...register('utm_medium')} defaultValue="" />
      <input type="hidden" {...register('utm_campaign')} defaultValue="" />
      <input type="hidden" {...register('form_name')} value={formName} />
      <input type="hidden" {...register('timestamp')} value={new Date().toISOString()} />

      {/* Кнопка отправки */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        type="submit"
        disabled={isSubmitting}
        className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-xl shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all"
      >
        {isSubmitting ? 'Отправка...' : 'Отправить заявку'}
      </motion.button>

      {/* Сообщения об успехе/ошибке */}
      {submitStatus === 'success' && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 bg-green-500/20 border border-green-500/30 rounded-xl text-green-300 text-center"
        >
          ✓ Заявка успешно отправлена!
        </motion.div>
      )}

      {submitStatus === 'error' && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 bg-red-500/20 border border-red-500/30 rounded-xl text-red-300 text-center"
        >
          ✗ {errorMessage}
        </motion.div>
      )}
    </form>
  );
}
