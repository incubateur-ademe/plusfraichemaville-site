import { HubspotSetTrackEventProps, UseHubspotProps } from "./types";

export const useHubspot = (): UseHubspotProps => {
  const _hsq = typeof window !== "undefined" && window._hsq ? window._hsq : [];

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

  const declineCookie = () => {
    _hsq.push(["revokeCookieConsent"]);
  };

  return {
    setPathPageView,
    setTrackPageView,
    setIdentity,
    setTrackEvent,
    declineCookie,
  };
};
