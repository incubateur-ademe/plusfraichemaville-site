const enableHubspotTracking = process.env.NODE_ENV === "production";

export const trackUserWithEmail = (path: string, email?: string | null) => {
  if (email) {
    if (!enableHubspotTracking) {
      console.debug("Hubspot trackUserWithEmail => ", path, email);
      return;
    }
    window?._hsq?.push(["setPath", path]);
    window?._hsq?.push(["trackPageView"]);
    window?._hsq?.push(["identify", { email, path }]);
  }
};

export const declineHubspotCookie = () => {
  if (!enableHubspotTracking) {
    console.debug("declineHubspotCookie");
    return;
  }
  const hubspotCookies = ["__hssc", "__hssrc", "__hs_do_not_track", "__hstc", "hubspotutk", "messagesUtk", "testrt"];
  hubspotCookies.forEach((cookieName) => {
    document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/;`;
  });
  window?._hsq?.push(["doNotTrack"]);
  window?._hsp?.push(["revokeCookieConsent"]);
};

export const acceptHubspotCookie = () => {
  if (!enableHubspotTracking) {
    console.debug("acceptHubspotCookie");
    return;
  }
  window?._hsq?.push(["doNotTrack", { track: true }]);
};