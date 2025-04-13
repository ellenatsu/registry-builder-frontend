import React from "react";
import * as Sentry from "@sentry/react";
import {
    createRoutesFromChildren,
    matchRoutes,
    useLocation,
    useNavigationType,
  } from "react-router-dom";

Sentry.init({
  dsn: import.meta.env.VITE_SENTRY_DSN,
  integrations: [
    Sentry.reactRouterV6BrowserTracingIntegration({
      useEffect: React.useEffect,
      useLocation,
      useNavigationType,
      createRoutesFromChildren,
      matchRoutes,
    }),
    Sentry.browserTracingIntegration(),
    Sentry.replayIntegration(),
  ],

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for tracing.
  // Learn more at
  // https://docs.sentry.io/platforms/javascript/configuration/options/#traces-sample-rate
  tracesSampleRate: 1.0,
  // Set `tracePropagationTargets` to control for which URLs trace propagation should be enabled
  tracePropagationTargets: [/^\//, /^https:\/\/gift-funding-backend-4d9ac9345f3e\.herokuapp\.com\/api/],



  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
});
