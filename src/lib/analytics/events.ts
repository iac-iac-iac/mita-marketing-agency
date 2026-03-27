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
