import { HubspotSetTrackEventProps, UseHubspotProps } from "./types";

export const useHubspot = (): UseHubspotProps => {
  const isProd = process.env.NODE_ENV === "production";
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
    if (!isProd) {
      console.debug("Hubspot trackUserWithEmail => ", path, email);
      return;
    }

    setPathPageView(path);
    setIdentity(email, { path });
  };

  const declineCookie = () => {
    const hubspotCookies = ["__hssc", "__hssrc", "__hs_do_not_track", "__hstc", "hubspotutk", "messagesUtk", "testrt"];
    hubspotCookies.forEach((cookieName) => {
      document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/;`;
    });

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
