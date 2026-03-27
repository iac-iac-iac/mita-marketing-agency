// src/lib/analytics/track.ts

import { AnalyticsEvent, FormSubmitEvent, FormErrorEvent, ModalOpenEvent, ModalCloseEvent, CtaClickEvent } from './events';

export function trackEvent(event: AnalyticsEvent) {
  if (typeof window === 'undefined') return;

  // Получаем ID счётчиков из переменных окружения
  const yandexCounterId = process.env.NEXT_PUBLIC_YANDEX_METRIKA_ID;
  const googleAnalyticsId = process.env.NEXT_PUBLIC_GA_ID;

  // Отправка в Яндекс.Метрику
  if (window.ym && yandexCounterId) {
    const counterId = parseInt(yandexCounterId, 10);
    if (!isNaN(counterId)) {
      window.ym(counterId, 'reachGoal', event.type, event);
    }
  }

  // Отправка в Google Analytics
  if (window.gtag && googleAnalyticsId) {
    window.gtag('event', event.type, {
      ...event,
      send_to: googleAnalyticsId,
    });
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
