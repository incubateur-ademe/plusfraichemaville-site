"use client";

import { createModal } from "@codegouvfr/react-dsfr/Modal";
import { AideFiche } from "@/src/components/financement/aide/aide-fiche";
import { useModalStore } from "@/src/stores/modal/provider";
import { useIsModalOpen } from "@codegouvfr/react-dsfr/Modal/useIsModalOpen";
import { useEffect } from "react";
import { useCapturePostHogEvent } from "@/src/hooks/useCapturePostHogEvent";
import { POSTHOG_EVENTS } from "@/src/helpers/posthog/posthog-events";

const modal = createModal({
  id: "detailed-aide-modal",
  isOpenedByDefault: false,
});

export const AideFicheModal = () => {
  const currentDetailedAide = useModalStore((state) => state.currentDetailedAide);
  const setCurrentDetailedAide = useModalStore((state) => state.setCurrentDetailedAide);
  const { capturePostHogEvent } = useCapturePostHogEvent();
  useEffect(() => {
    if (currentDetailedAide) {
      modal.open();
    }
  }, [currentDetailedAide]);

  useIsModalOpen(modal, {
    onConceal: () => {
      setCurrentDetailedAide(null);
      capturePostHogEvent(POSTHOG_EVENTS.CLOSE_AIDE_MODAL);
    },
  });

  return (
    <>
      <modal.Component
        title={
          <span aria-hidden className="hidden">
            {currentDetailedAide?.name_initial ?? "Détail de l'aide financière"}
          </span>
        }
        size="large"
        className="xl-modal"
      >
        {currentDetailedAide ? <AideFiche aide={currentDetailedAide} /> : <div>Chargement en cours...</div>}
      </modal.Component>
    </>
  );
};
