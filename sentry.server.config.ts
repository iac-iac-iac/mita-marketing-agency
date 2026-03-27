// This file configures the initialization of Sentry on the server.
// The config you add here will be used whenever a page is rendered on the server.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,

  // Define how often traces are sent to Sentry
  tracesSampleRate: 0.1,

  // Define how often profiles are sent to Sentry
  profilesSampleRate: 0.1,
});
