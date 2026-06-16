import { trackEvent } from "@/src/helpers/matomo/track-matomo";
import { useEffect, useRef } from "react";
import { ANNUAIRE_SIDE_PANEL_OPEN_REX, ANNUAIRE_SIDE_PANEL_OPEN_IN_PROGRESS } from "@/src/helpers/matomo/matomo-tags";
import { addAnnuaireProjetClickedAction } from "@/src/actions/userProjet/add-annuaire-projet-clicked-action";
import { useProjetsStore } from "@/src/stores/projets/provider";
import { useUserStore } from "@/src/stores/user/provider";
import { useCapturePostHogEvent } from "@/src/hooks/useCapturePostHogEvent";
import { POSTHOG_EVENTS } from "@/src/helpers/posthog/posthog-events";

export const AnnuaireSidePanelTracking = ({
  type,
  name,
  clickedProjetId,
}: {
  type: "rex" | "in-progress";
  name: string;
  clickedProjetId: number;
}) => {
  const hasTracked = useRef(false);
  const currentProjetId = useProjetsStore((state) => state.currentProjetId);
  const userId = useUserStore((state) => state.userInfos?.id);
  const { capturePostHogEvent } = useCapturePostHogEvent();

  useEffect(() => {
    if (!hasTracked.current) {
      trackEvent(type === "rex" ? ANNUAIRE_SIDE_PANEL_OPEN_REX(name) : ANNUAIRE_SIDE_PANEL_OPEN_IN_PROGRESS(name));
      capturePostHogEvent(POSTHOG_EVENTS.ANNUAIRE_CLIC_PROJET);
      hasTracked.current = true;
    }
  }, [name, type]);

  useEffect(() => {
    if (userId && currentProjetId) {
      addAnnuaireProjetClickedAction(userId, currentProjetId, +clickedProjetId, type);
    }
  }, [userId, currentProjetId, type, clickedProjetId]);

  return null;
};
