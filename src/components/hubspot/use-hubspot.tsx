import { HubspotSetTrackEventProps, UseHubspotProps } from "./types";

export const useHubspot = (): UseHubspotProps => {
  const isProd = process.env.NODE_ENV !== "production";
  const _hsq = typeof window !== "undefined" && isProd && window._hsq ? window._hsq : [];
  const _hsp = typeof window !== "undefined" && isProd && window._hsp ? window._hsp : [];

  const setTrackPageView = () => {
    _hsq.push(["trackPageView"]);
  };

  const setPathPageView = (path: string) => {
    _hsq.push(["setPath", path]);
    setTrackPageView();
  };

  const setIdentity = (email: string, customProperties?: {}) => {
    _hsq.push([
      "identify",
      {
        email,
        ...customProperties,
      },
    ]);
  };

  const setTrackEvent = ({ eventId, value }: HubspotSetTrackEventProps) => {
    _hsq.push([
      "trackEvent",
      {
        id: eventId,
        value,
      },
    ]);
  };

  const trackUserWithEmail = (path: string, email: string) => {
    setPathPageView(path);
    setIdentity(email, { path });
  };

  const declineCookie = () => {
    _hsq.push(["doNotTrack"]);
    _hsp.push(["revokeCookieConsent"]);
  };

  const acceptCookie = () => {
    _hsq.push(["doNotTrack", { track: true }]);
  };

  return {
    setPathPageView,
    setTrackPageView,
    setIdentity,
    setTrackEvent,
    trackUserWithEmail,
    declineCookie,
    acceptCookie,
  };
};
