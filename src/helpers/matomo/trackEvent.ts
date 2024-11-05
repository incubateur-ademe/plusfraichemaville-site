import { MATOMO_EVENT } from "@/src/helpers/matomo/matommo-tags";

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
  }
  window?._paq?.push(["trackEvent", event.category, event.action, event.name]);
};

export const trackPageView = (url: string) => {
  if (shouldUseDevTracker) {
    console.debug("trackPageView => ", sanitizeMatomoUrl(url));
    return;
  }
  window?._paq?.push(["setCustomUrl", sanitizeMatomoUrl(url)]);
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

export const sanitizeMatomoUrl = (url: string) => {
  const splittedUrl = url.split("/espace-projet/");
  const espaceProjetSubstring = splittedUrl[1];
  if (!espaceProjetSubstring) {
    return url;
  }
  const projetId = espaceProjetSubstring.split("/")[0];
  const urlWithoutProjetId = !isNaN(+projetId) ? url.replace(projetId, "[projetId]") : url;
  const financementId = urlWithoutProjetId.split("/")[5];
  return !isNaN(+financementId) ? urlWithoutProjetId.replace(financementId, "[financementId]") : urlWithoutProjetId;
};
