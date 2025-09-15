"use client";

import { useProjetsStore } from "@/src/stores/projets/provider";
import { createModal } from "@codegouvfr/react-dsfr/Modal";
import { EstimationMateriauModalContent } from "@/src/components/estimation/materiaux-modal/estimation-materiaux-modal-content";
import { useEffect, useMemo } from "react";
import { useIsModalOpen } from "@codegouvfr/react-dsfr/Modal/useIsModalOpen";
import { useModalStore } from "@/src/stores/modal/provider";

export const estimationModal = createModal({
  id: "estimation-modal",
  isOpenedByDefault: false,
});

export function EstimationMateriauModalContainer() {
  const currentEstimationId = useModalStore((state) => state.currentEstimationId);
  const setCurrentEstimationId = useModalStore((state) => state.setCurrentEstimationId);
  const currentProjet = useProjetsStore((state) => state.getCurrentProjet());
  useIsModalOpen(estimationModal, {
    onConceal: () => {
      setCurrentEstimationId(null);
    },
  });
  const currentEstimation = useMemo(() => {
    if (currentEstimationId && currentProjet) {
      const estimationToOpen = currentProjet.estimations.find((e) => e.id === currentEstimationId);
      if (estimationToOpen) {
        return estimationToOpen;
      }
    }
  }, [currentEstimationId, currentProjet]);

  useEffect(() => {
    if (currentEstimation?.id) {
      setTimeout(() => {
        estimationModal.open();
      }, 150);
    }
  }, [currentEstimation?.id]);

  return (
    <estimationModal.Component title="" size="large" className="xl-modal">
      {currentEstimation ? (
        <EstimationMateriauModalContent estimation={currentEstimation} />
      ) : (
        <div>Chargement en cours...</div>
      )}
    </estimationModal.Component>
  );
}
