# Формы и интеграции с CRM Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Создать систему форм (ContactForm, LeadForm), модальные окна, API для отправки заявок и аналитику событий для Direct-line.

**Architecture:** Компонентный подход с разделением на UI компоненты (Modal), формы (ContactForm, LeadForm), утилиты аналитики и API routes. Валидация через React Hook Form, стилизация через Tailwind CSS с 3D Glass Design.

**Tech Stack:** Next.js 14, TypeScript, React Hook Form, Tailwind CSS, 3D Glass Design, Magic UI

---

### Task 1: Создать типы для аналитики

**Files:**
- Create: `src/lib/analytics/events.ts`

**Step 1: Создать файл с типами событий**

```typescript
// src/lib/analytics/events.ts

export type EventType = 
  | 'form_submit'
  | 'form_error'
  | 'modal_open'
  | 'modal_close'
  | 'cta_click'
  | 'page_view'
  | 'service_select';

export interface FormSubmitEvent {
  type: 'form_submit';
  form_name: string;
  service?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  timestamp: string;
}

export interface FormErrorEvent {
  type: 'form_error';
  form_name: string;
  error: string;
  field?: string;
  timestamp: string;
}

export interface ModalOpenEvent {
  type: 'modal_open';
  modal_name: string;
  source_page: string;
  timestamp: string;
}

export interface ModalCloseEvent {
  type: 'modal_close';
  modal_name: string;
  closed_by: 'button' | 'backdrop' | 'escape';
  timestamp: string;
}

export interface CtaClickEvent {
  type: 'cta_click';
  cta_name: string;
  source_page: string;
  timestamp: string;
}

export type AnalyticsEvent = 
  | FormSubmitEvent 
  | FormErrorEvent 
  | ModalOpenEvent 
  | ModalCloseEvent 
  | CtaClickEvent;
```

**Step 2: Commit**

```bash
git add src/lib/analytics/events.ts
git commit -m "feat: add analytics event types"
```

---

### Task 2: Создать утилиты для отправки событий аналитики

**Files:**
- Create: `src/lib/analytics/track.ts`

**Step 1: Создать файл с функциями трекинга**

```typescript
// src/lib/analytics/track.ts

import { AnalyticsEvent, FormSubmitEvent, FormErrorEvent, ModalOpenEvent, ModalCloseEvent, CtaClickEvent } from './events';

export function trackEvent(event: AnalyticsEvent) {
  if (typeof window === 'undefined') return;
  
  // Отправка в Яндекс.Метрику
  if (window.ym) {
    window.ym(98765432, 'reachGoal', event.type, event);
  }
  
  // Отправка в Google Analytics
  if (window.gtag) {
    window.gtag('event', event.type, event);
  }
  
  // Логирование в development
  if (process.env.NODE_ENV === 'development') {
    console.log('[Analytics Event]', event);
  }
}

export function trackFormSubmit(formName: string, service?: string) {
  const utm = getUTMParams();
  const event: FormSubmitEvent = {
    type: 'form_submit',
    form_name: formName,
    service,
    ...utm,
    timestamp: new Date().toISOString(),
  };
  trackEvent(event);
}

export function trackFormError(formName: string, error: string, field?: string) {
  const event: FormErrorEvent = {
    type: 'form_error',
    form_name: formName,
    error,
    field,
    timestamp: new Date().toISOString(),
  };
  trackEvent(event);
}

export function trackModalOpen(modalName: string) {
  const event: ModalOpenEvent = {
    type: 'modal_open',
    modal_name: modalName,
    source_page: window.location.pathname,
    timestamp: new Date().toISOString(),
  };
  trackEvent(event);
}

export function trackModalClose(modalName: string, closedBy: 'button' | 'backdrop' | 'escape') {
  const event: ModalCloseEvent = {
    type: 'modal_close',
    modal_name: modalName,
    closed_by: closedBy,
    timestamp: new Date().toISOString(),
  };
  trackEvent(event);
}

export function trackCtaClick(ctaName: string) {
  const event: CtaClickEvent = {
    type: 'cta_click',
    cta_name: ctaName,
    source_page: window.location.pathname,
    timestamp: new Date().toISOString(),
  };
  trackEvent(event);
}

function getUTMParams() {
  if (typeof window === 'undefined') return {};
  
  const params = new URLSearchParams(window.location.search);
  return {
    utm_source: params.get('utm_source') || undefined,
    utm_medium: params.get('utm_medium') || undefined,
    utm_campaign: params.get('utm_campaign') || undefined,
  };
}

declare global {
  interface Window {
    ym?: (counterId: number, action: string, event: string, params?: any) => void;
    gtag?: (action: string, eventName: string, params?: any) => void;
  }
}
```

**Step 2: Commit**

```bash
git add src/lib/analytics/track.ts
git commit -m "feat: add analytics tracking utilities"
```

---

### Task 3: Создать Modal UI компонент

**Files:**
- Create: `src/components/ui/Modal.tsx`
- Check: `src/styles/globals.css` (для 3D Glass Design)

**Step 1: Создать Modal компонент с 3D Glass Design**

```typescript
// src/components/ui/Modal.tsx

'use client';

import { useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}

export function Modal({ isOpen, onClose, title, children, footer }: ModalProps) {
  const handleEscape = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    }
  }, [onClose]);

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }
    
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, handleEscape]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />
          
          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-lg"
            >
              {/* 3D Glass Container */}
              <div className="relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl overflow-hidden">
                {/* Glass shine effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent pointer-events-none" />
                
                {/* Content */}
                <div className="relative">
                  {/* Header */}
                  {title && (
                    <div className="flex items-center justify-between p-6 border-b border-white/10">
                      <h2 className="text-2xl font-bold text-white">{title}</h2>
                      <button
                        onClick={onClose}
                        className="p-2 hover:bg-white/10 rounded-full transition-colors"
                      >
                        <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  )}
                  
                  {/* Body */}
                  <div className="p-6">
                    {children}
                  </div>
                  
                  {/* Footer */}
                  {footer && (
                    <div className="p-6 border-t border-white/10">
                      {footer}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
```

**Step 2: Commit**

```bash
git add src/components/ui/Modal.tsx
git commit -m "feat: add Modal UI component with 3D Glass Design"
```

---

### Task 4: Создать ContactForm компонент

**Files:**
- Create: `src/components/forms/ContactForm.tsx`
- Check: `src/lib/analytics/track.ts`

**Step 1: Создать ContactForm компонент**

```typescript
// src/components/forms/ContactForm.tsx

'use client';

import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { motion } from 'framer-motion';
import { trackFormSubmit, trackFormError } from '@/lib/analytics/track';

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
}

interface ContactFormProps {
  formName?: string;
  serviceName?: string;
}

export function ContactForm({ formName = 'contact_form', serviceName }: ContactFormProps) {
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
            className="w-full px-4 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all"
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
            className="w-full px-4 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all"
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
            className="w-full px-4 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all"
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
            className="w-full px-4 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all"
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
```

**Step 2: Commit**

```bash
git add src/components/forms/ContactForm.tsx
git commit -m "feat: add ContactForm component with validation"
```

---

### Task 5: Создать LeadForm компонент

**Files:**
- Create: `src/components/forms/LeadForm.tsx`

**Step 1: Создать LeadForm компонент для модальных окон**

```typescript
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
```

**Step 2: Commit**

```bash
git add src/components/forms/LeadForm.tsx
git commit -m "feat: add LeadForm component for modal windows"
```

---

### Task 6: Создать API route для отправки форм

**Files:**
- Create: `src/app/api/submit-lead/route.ts`

**Step 1: Создать API route**

```typescript
// src/app/api/submit-lead/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';

interface LeadData {
  name: string;
  phone: string;
  email: string;
  company?: string;
  message?: string;
  service?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  form_name: string;
  timestamp: string;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, phone, email, form_name, timestamp } = body as LeadData;

    // Валидация обязательных полей
    if (!name || !phone || !email || !form_name) {
      return NextResponse.json(
        { error: 'Заполните все обязательные поля' },
        { status: 400 }
      );
    }

    // Валидация email
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Некорректный формат email' },
        { status: 400 }
      );
    }

    // Валидация телефона (базовая)
    const phoneRegex = /^[\d\s\+\-\(\)]{10,}$/;
    if (!phoneRegex.test(phone)) {
      return NextResponse.json(
        { error: 'Некорректный формат телефона' },
        { status: 400 }
      );
    }

    // Логирование в консоль (в production можно заменить на отправку в CRM)
    console.log('=== NEW LEAD ===');
    console.log(`Form: ${form_name}`);
    console.log(`Name: ${name}`);
    console.log(`Phone: ${phone}`);
    console.log(`Email: ${email}`);
    if (body.company) console.log(`Company: ${body.company}`);
    if (body.message) console.log(`Message: ${body.message}`);
    if (body.service) console.log(`Service: ${body.service}`);
    if (body.utm_source) console.log(`UTM Source: ${body.utm_source}`);
    if (body.utm_medium) console.log(`UTM Medium: ${body.utm_medium}`);
    if (body.utm_campaign) console.log(`UTM Campaign: ${body.utm_campaign}`);
    console.log(`Timestamp: ${timestamp}`);
    console.log('================');

    // Опционально: сохранение в файл (для development)
    if (process.env.NODE_ENV === 'development') {
      try {
        const leadsDir = join(process.cwd(), 'leads');
        await mkdir(leadsDir, { recursive: true });
        
        const fileName = `lead_${Date.now()}.json`;
        const filePath = join(leadsDir, fileName);
        
        await writeFile(filePath, JSON.stringify(body, null, 2));
        console.log(`Lead saved to: ${filePath}`);
      } catch (fileError) {
        console.error('Failed to save lead to file:', fileError);
      }
    }

    // TODO: Интеграция с CRM (Bitrix24, AmoCRM и т.д.)
    // await sendToCRM(body);

    return NextResponse.json(
      { success: true, message: 'Заявка успешно отправлена' },
      { status: 200 }
    );
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Внутренняя ошибка сервера' },
      { status: 500 }
    );
  }
}
```

**Step 2: Commit**

```bash
git add src/app/api/submit-lead/route.ts
git commit -m "feat: add submit-lead API endpoint with validation"
```

---

### Task 7: Обновить страницу /contact с ContactForm

**Files:**
- Modify: `src/app/contact/page.tsx`
- Check: `src/app/contact/page.tsx` (текущая структура)

**Step 1: Обновить страницу contact**

```typescript
// src/app/contact/page.tsx

'use client';

import { ContactForm } from '@/components/forms/ContactForm';
import { motion } from 'framer-motion';

export default function ContactPage() {
  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Заголовок */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold text-white mb-4">
            Свяжитесь с нами
          </h1>
          <p className="text-xl text-white/70">
            Оставьте заявку и мы свяжемся с вами в ближайшее время
          </p>
        </motion.div>

        {/* Форма */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex justify-center"
        >
          <ContactForm formName="contact_page" />
        </motion.div>

        {/* Контактная информация */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center">
              <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Email</h3>
            <p className="text-white/70">info@direct-line.ru</p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center">
              <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Телефон</h3>
            <p className="text-white/70">+7 (XXX) XXX-XX-XX</p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center">
              <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Адрес</h3>
            <p className="text-white/70">г. Москва, ул. Примерная, 1</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
```

**Step 2: Commit**

```bash
git add src/app/contact/page.tsx
git commit -m "feat: integrate ContactForm on contact page"
```

---

### Task 8: Добавить модальные окна с LeadForm на главную страницу

**Files:**
- Modify: `src/app/page.tsx`
- Check: `src/app/page.tsx` (текущая структура)

**Step 1: Обновить главную страницу с модальными окнами**

Добавить импорты:
```typescript
import { Modal } from '@/components/ui/Modal';
import { LeadForm } from '@/components/forms/LeadForm';
import { trackModalOpen, trackModalClose, trackCtaClick } from '@/lib/analytics/track';
import { useState } from 'react';
```

Добавить состояние:
```typescript
const [isModalOpen, setIsModalOpen] = useState(false);
const [selectedService, setSelectedService] = useState<string | undefined>();
```

Добавить функции:
```typescript
const handleOpenModal = (serviceName?: string) => {
  setSelectedService(serviceName);
  setIsModalOpen(true);
  trackModalOpen('lead_form_main');
};

const handleCloseModal = () => {
  setIsModalOpen(false);
  setSelectedService(undefined);
  trackModalClose('lead_form_main', 'button');
};
```

Заменить CTA кнопки:
```typescript
// Было: <button>...</button>
// Стало:
<motion.button
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
  onClick={() => {
    trackCtaClick('main_cta');
    handleOpenModal();
  }}
  className="..."
>
  Оставить заявку
</motion.button>
```

Для карточек услуг добавить кнопку "Заказать":
```typescript
<motion.button
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
  onClick={() => {
    trackCtaClick(`service_${serviceName}`);
    handleOpenModal(serviceName);
  }}
  className="..."
>
  Заказать
</motion.button>
```

Добавить Modal в конец компонента:
```typescript
<Modal
  isOpen={isModalOpen}
  onClose={handleCloseModal}
  title="Оставить заявку"
>
  <LeadForm 
    formName="modal_main" 
    serviceName={selectedService}
    onSuccess={handleCloseModal}
  />
</Modal>
```

**Step 2: Commit**

```bash
git add src/app/page.tsx
git commit -m "feat: add modal windows with LeadForm to main page"
```

---

### Task 9: Проверка и тестирование

**Files:**
- Test: Все созданные компоненты

**Step 1: Запустить development сервер**

```bash
npm run dev
```

**Step 2: Проверить формы**

- Открыть http://localhost:3000/contact
- Заполнить форму ContactForm
- Проверить валидацию полей
- Проверить отправку формы
- Проверить сообщение об успехе

**Step 3: Проверить модальные окна**

- Открыть http://localhost:3000
- Нажать на CTA кнопку
- Проверить открытие модального окна
- Заполнить LeadForm
- Проверить закрытие по Esc и клику вне модалки

**Step 4: Проверить API**

- Проверить консоль сервера на наличие логов
- Проверить создание файлов в папке `leads/` (в development)

**Step 5: Commit**

```bash
git add .
git commit -m "chore: test all forms and modals"
```

---

## Завершение

После выполнения всех задач:
1. Проверить, что все файлы созданы
2. Запустить `npm run build` для проверки сборки
3. Создать pull request или закоммитить изменения

**Созданные файлы:**
- `src/lib/analytics/events.ts`
- `src/lib/analytics/track.ts`
- `src/components/ui/Modal.tsx`
- `src/components/forms/ContactForm.tsx`
- `src/components/forms/LeadForm.tsx`
- `src/app/api/submit-lead/route.ts`
- `src/app/contact/page.tsx` (обновлен)
- `src/app/page.tsx` (обновлен)
