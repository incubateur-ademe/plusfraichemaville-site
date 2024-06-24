"use client";

import { createModal } from "@codegouvfr/react-dsfr/Modal";
import { AideFiche } from "@/components/financement/aide/aide-fiche";
import { useModalStore } from "@/stores/modal/provider";
import { useIsModalOpen } from "@codegouvfr/react-dsfr/Modal/useIsModalOpen";
import { useEffect } from "react";

const modal = createModal({
  id: "detailed-aide-modal",
  isOpenedByDefault: false,
});

export const AideFicheModal = () => {
  const currentDetailedAide = useModalStore((state) => state.currentDetailedAide);
  const setCurrentDetailedAide = useModalStore((state) => state.setCurrentDetailedAide);
  useEffect(() => {
    if (currentDetailedAide) {
      modal.open();
    }
  }, [currentDetailedAide]);
  useIsModalOpen(modal, {
    onConceal: () => setCurrentDetailedAide(null),
  });

  return (
    <>
      <modal.Component title="" size="large" className="aide-modal relative">
        {currentDetailedAide ? <AideFiche aide={currentDetailedAide} /> : <div>Chargement en cours...</div>}
      </modal.Component>
    </>
  );
};
