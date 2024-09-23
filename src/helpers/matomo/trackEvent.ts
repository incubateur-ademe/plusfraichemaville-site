import { sanitizeUrlForAnalyticTool } from "@/src/components/analytics/helpers";

const shouldUseDevTracker = process.env.NODE_ENV !== "production";

declare global {
  // eslint-disable-next-line no-unused-vars
  interface Window {
    _paq: any[];
  }
}

export const trackEvent = (args: (string | null)[]) => {
  if (shouldUseDevTracker || !window?._paq) {
    console.debug("trackEvent => ", args.join(" => "));
    return;
  }
  // Pass a copy of the array to avoid mutation
  window?._paq?.push([...args]);
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
  }
  window?._paq?.push(["rememberCookieConsentGiven"]);
};

export const declineCookie = () => {
  if (shouldUseDevTracker) {
    console.debug("forgetCookieConsentGiven");
  }
  window?._paq?.push(["forgetCookieConsentGiven"]);
};
