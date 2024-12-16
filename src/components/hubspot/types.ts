export type HubspotQueryParams =
  | "setPath"
  | "trackPageView"
  | "identify"
  | "trackEvent"
  | "revokeCookieConsent"
  | "doNotTrack"
  | "addPrivacyConsentListener"
  | "addIdentityListener";

export type HubspotQuery = [HubspotQueryParams, (string | object)?];
