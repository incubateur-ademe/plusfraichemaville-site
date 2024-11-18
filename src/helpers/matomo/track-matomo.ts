import { MATOMO_EVENT } from "@/src/helpers/matomo/matomo-tags";
import { sanitizeUrlForAnalyticTool } from "@/src/components/analytics/helpers";

const shouldUseDevTracker = process.env.NODE_ENV !== "production";

declare global {
  // eslint-disable-next-line no-unused-vars
  interface Window {
    _paq: any[];
  }
}

export const trackEvent = (event: MATOMO_EVENT) => {
  if (shouldUseDevTracker || !window?._paq) {
    console.debug("trackEvent => ", event);
    return;
  }
  window?._paq?.push(["trackEvent", event.category, event.action, event.name]);
};

export const trackPageView = (url: string) => {
  if (shouldUseDevTracker) {
    console.debug("trackPageView => ", sanitizeUrlForAnalyticTool(url));
    return;
  }
  window?._paq?.push(["setCustomUrl", sanitizeUrlForAnalyticTool(url)]);
  window?._paq?.push(["trackPageView"]);
};

export const acceptCookie = () => {
  if (shouldUseDevTracker) {
    console.debug("rememberCookieConsentGiven");
    console.debug("HeatmapSessionRecording::enable");
  }
  window?._paq?.push(["rememberCookieConsentGiven"]);
  window?._paq?.push(["HeatmapSessionRecording::enable"]);
};

export const declineCookie = () => {
  if (shouldUseDevTracker) {
    console.debug("forgetCookieConsentGiven");
    console.debug("HeatmapSessionRecording::disable");
  }
  window?._paq?.push(["forgetCookieConsentGiven"]);
  window?._paq?.push(["HeatmapSessionRecording::disable"]);
};
