import { trackEvent } from "@/src/helpers/matomo/track-matomo";
import { useEffect, useRef } from "react";
import { ANNUAIRE_SIDE_PANEL_OPEN_REX, ANNUAIRE_SIDE_PANEL_OPEN_IN_PROGRESS } from "@/src/helpers/matomo/matomo-tags";

export const AnnuaireSidePanelTracking = ({ type, name }: { type: "rex" | "in-progress"; name: string }) => {
  const hasTracked = useRef(false);

  useEffect(() => {
    if (!hasTracked.current) {
      trackEvent(type === "rex" ? ANNUAIRE_SIDE_PANEL_OPEN_REX(name) : ANNUAIRE_SIDE_PANEL_OPEN_IN_PROGRESS(name));
      hasTracked.current = true;
    }
  }, [name, type]);

  return null;
};
