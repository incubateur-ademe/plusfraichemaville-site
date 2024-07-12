"use client";

import { createModal } from "@codegouvfr/react-dsfr/Modal";
import { useModalStore } from "@/stores/modal/provider";
import { useIsModalOpen } from "@codegouvfr/react-dsfr/Modal/useIsModalOpen";
import { useEffect } from "react";

const modal = createModal({
  id: "user-status-modification",
  isOpenedByDefault: false,
});

export const PartageOverviewMemberStatusAdminModificationModale = () => {
  const currentUserStatusModification = useModalStore((state) => state.currentUserStatusModification);
  const setCurrentUserStatusModification = useModalStore((state) => state.setCurrentUserStatusModification);
  useEffect(() => {
    if (currentUserStatusModification) {
      modal.open();
    }
  }, [currentUserStatusModification]);

  useIsModalOpen(modal, {
    onConceal: () => setCurrentUserStatusModification(null),
  });

  return (
    <>
      <modal.Component title="" size="small" className="current-user-status-modale">
        {currentUserStatusModification ? (
          <>
            {`${currentUserStatusModification.email} 
            ${currentUserStatusModification.name} 
            ${currentUserStatusModification.poste}`}
          </>
        ) : (
          <div>Chargement en cours...</div>
        )}
      </modal.Component>
    </>
  );
};
