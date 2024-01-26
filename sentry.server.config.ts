// This file configures the initialization of Sentry on the server.
// The config you add here will be used whenever the server handles a request.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: "https://8d4940c318ab411f9ce8eb5d095f5373@sentry.incubateur.net/120",

  // Adjust this value in production, or use tracesSampler for greater control
  tracesSampleRate: 1,
  environment: process.env.NEXT_PUBLIC_SENTRY_ENV,

  // Setting this option to true will print useful information to the console while you're setting up Sentry.
  debug: false,
});
