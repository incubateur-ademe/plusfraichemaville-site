export type HubspotQueryParams =
  | "setPath"
  | "trackPageView"
  | "identify"
  | "trackEvent"
  | "revokeCookieConsent"
  | "doNotTrack"
  | "addPrivacyConsentListener"
  | "addIdentityListener";

export type HubspotSetTrackEventProps = {
  eventId: string;
  value?: number | string;
};

export type HubspotQuery = [HubspotQueryParams, (string | object)?];

export type UseHubspotProps = {
  setPathPageView: (_path: string) => void;
  setTrackPageView: () => void;
  setIdentity: (_email: string, _customProperties?: {}) => void;
  setTrackEvent: (_event: HubspotSetTrackEventProps) => void;
  trackUserWithEmail: (_path: string, _email?: string | null) => void;
  declineCookie: () => void;
  acceptCookie: () => void;
};

type HubspotCookieConsentCategory = {
  necessary: boolean;
  analytics: boolean;
  advertisement: boolean;
  functionality: boolean;
};

export type HubspotCookieConsent = {
  allowed: boolean;
  previousCategories: HubspotCookieConsentCategory;
  categories: HubspotCookieConsentCategory;
};
