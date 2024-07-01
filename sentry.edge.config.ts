// This file configures the initialization of Sentry for edge features (middleware, edge routes, and so on).
// The config you add here will be used whenever one of the edge features is loaded.
// Note that this config is unrelated to the Vercel Edge Runtime and is also required when running locally.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: "https://8d4940c318ab411f9ce8eb5d095f5373@sentry.incubateur.net/120",

  // Adjust this value in production, or use tracesSampler for greater control
  tracesSampleRate: 0.2,
  environment: process.env.NEXT_PUBLIC_SENTRY_ENV,

  // Setting this option to true will print useful information to the console while you're setting up Sentry.
  debug: false,
});
