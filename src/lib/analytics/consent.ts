export const ANALYTICS_CONSENT_KEY = 'mita_cookie_consent_v1'

export const ANALYTICS_CONSENT_EVENT = 'mita:analytics-consent'

export function hasAnalyticsConsent(): boolean {
  if (typeof window === 'undefined') return false
  try {
    return localStorage.getItem(ANALYTICS_CONSENT_KEY) === '1'
  } catch {
    return false
  }
}

export function setAnalyticsConsent(): void {
  if (typeof window === 'undefined') return
  try {
    localStorage.setItem(ANALYTICS_CONSENT_KEY, '1')
  } catch {
    /* ignore */
  }
  window.dispatchEvent(new Event(ANALYTICS_CONSENT_EVENT))
}
