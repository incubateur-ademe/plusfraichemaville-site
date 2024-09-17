export type HubspotQueryParams =
  | "setPath"
  | "trackPageView"
  | "identify"
  | "trackEvent"
  | "revokeCookieConsent"
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
  declineCookie: () => void;
};
