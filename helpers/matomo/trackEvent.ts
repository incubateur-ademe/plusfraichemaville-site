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
    console.debug("trackPageView => ", url);
    return;
  }
  window?._paq?.push(["setCustomUrl", url]);
  window?._paq?.push(["trackPageView"]);
};
