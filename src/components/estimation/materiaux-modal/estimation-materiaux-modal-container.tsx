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
  const currentEstimationData = useModalStore((state) => state.currentEstimation);
  const setCurrentEstimation = useModalStore((state) => state.setCurrentEstimation);
  const currentProjet = useProjetsStore((state) => state.getCurrentProjet());
  useIsModalOpen(estimationModal, {
    onConceal: () => {
      setCurrentEstimation(null);
    },
  });
  const currentEstimation = useMemo(() => {
    if (currentEstimationData && currentProjet) {
      const estimationToOpen = currentProjet.estimations.find((e) => e.id === currentEstimationData.id);
      if (estimationToOpen) {
        return estimationToOpen;
      }
    }
  }, [currentEstimationData, currentProjet]);

  useEffect(() => {
    if (currentEstimation?.id) {
      estimationModal.open();
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
