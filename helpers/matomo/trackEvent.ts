const shouldUseDevTracker = process.env.NODE_ENV !== "production";

declare global {
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
    console.debug("trackPageView => ", sanitizeMatomoUrl(url));
    return;
  }
  window?._paq?.push(["setCustomUrl", sanitizeMatomoUrl(url)]);
  window?._paq?.push(["trackPageView"]);
};

export const sanitizeMatomoUrl = (url: string) => {
  const splittedUrl = url.split("/espace-projet/");
  const espaceProjetSubstring = splittedUrl[1];
  if (!espaceProjetSubstring) {
    return url;
  }
  const projetId = espaceProjetSubstring.split("/")[0];
  return !isNaN(+projetId) ? url.replace(projetId, "[projetId]") : url;
};
