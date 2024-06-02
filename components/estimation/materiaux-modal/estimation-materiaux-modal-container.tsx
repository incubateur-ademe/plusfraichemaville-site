"use client";

import { useProjetsStore } from "@/stores/projets/provider";
import { createModal } from "@codegouvfr/react-dsfr/Modal";
import CustomDSFRModal from "@/components/common/CustomDSFRModal";
import { EstimationMateriauModalContent } from "@/components/estimation/materiaux-modal/estimation-materiaux-modal-content";
import { useEffect, useMemo } from "react";

export const estimationModal = createModal({
  id: "estimation-modal",
  isOpenedByDefault: false,
});

export function EstimationMateriauModalContainer() {
  const currentEstimationId = useProjetsStore((state) => state.currentEstimationId);
  const currentProjet = useProjetsStore((state) => state.getCurrentProjet());

  const currentEstimation = useMemo(() => {
    if (currentEstimationId && currentProjet) {
      const estimationToOpen = currentProjet.estimations.find((e) => e.id === currentEstimationId);
      if (estimationToOpen) {
        return estimationToOpen;
      }
    }
  }, [currentEstimationId, currentProjet]);

  useEffect(() => {
    if (currentEstimation) {
      estimationModal.open();
    }
  }, [currentEstimation]);

  return (
    <CustomDSFRModal modalId={estimationModal.id} close={estimationModal.close}>
      {currentEstimation ? (
        <EstimationMateriauModalContent estimation={currentEstimation} />
      ) : (
        <div>Chargement en cours...</div>
      )}
    </CustomDSFRModal>
  );
}
