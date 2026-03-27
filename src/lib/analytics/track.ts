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
