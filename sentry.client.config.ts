// This file configures the initialization of Sentry on the client.
// The config you add here will be used whenever a user loads a page in their browser.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,

  // Add optional integrations for additional features
  integrations: [
    Sentry.replayIntegration(),
  ],

  // Define how often traces are sent to Sentry
  tracesSampleRate: 0.1,

  // Define how often Replay sessions are sent to Sentry
  replaysSessionSampleRate: 0.1,

  // Define how often Replay sessions are sent to Sentry when an error occurs
  replaysOnErrorSampleRate: 1.0,

  // You can remove this option if you want to send all errors
  beforeSend(event, hint) {
    // Check if it's an exception
    if (event.exception) {
      // Filter out specific errors
      const error = hint.originalException as Error;
      
      // Ignore network errors
      if (error?.message?.includes('fetch') || error?.message?.includes('network')) {
        return null;
      }
      
      // Ignore errors from extensions
      if (error?.message?.includes('extension') || error?.message?.includes('chrome-extension')) {
        return null;
      }
    }
    
    return event;
  },
});
