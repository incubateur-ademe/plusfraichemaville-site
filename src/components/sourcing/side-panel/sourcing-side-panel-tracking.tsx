import { trackEvent } from "@/src/helpers/matomo/track-matomo";
import { useEffect, useRef } from "react";
import { SOURCING_SIDE_PANEL_OPEN_REX, SOURCING_SIDE_PANEL_OPEN_IN_PROGRESS } from "@/src/helpers/matomo/matomo-tags";

export const SourcingSidePanelTracking = ({ type, name }: { type: "rex" | "in-progress"; name: string }) => {
  const hasTracked = useRef(false);

  useEffect(() => {
    if (!hasTracked.current) {
      trackEvent(type === "rex" ? SOURCING_SIDE_PANEL_OPEN_REX(name) : SOURCING_SIDE_PANEL_OPEN_IN_PROGRESS(name));
      hasTracked.current = true;
    }
  }, [name, type]);

  return null;
};
