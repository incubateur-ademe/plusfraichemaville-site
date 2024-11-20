"use client";

import { createModal } from "@codegouvfr/react-dsfr/Modal";
import { useModalStore } from "@/src/stores/modal/provider";
import { useIsModalOpen } from "@codegouvfr/react-dsfr/Modal/useIsModalOpen";
import { useEffect, Suspense } from "react";
import { SourcingRexContentSeeProjetModalSkeleton } from "./sourcing-rex-content-see-projet-modal-skeleton";
import { RetourExperienceClient } from "../../projet/projet-retour-experience-client";

const modal = createModal({
  id: "sourcing-rex-projet-modal",
  isOpenedByDefault: false,
});

export const SourcingRexContentSeeProjetModal = () => {
  const currentSourcingRexProjet = useModalStore((state) => state.currentSourcingRexProjet);
  const setCurrentSourcingRexProjet = useModalStore((state) => state.setCurrentSourcingRexProjet);

  useEffect(() => {
    if (currentSourcingRexProjet) {
      modal.open();
    }
  }, [currentSourcingRexProjet]);

  useIsModalOpen(modal, {
    onConceal: () => setCurrentSourcingRexProjet(null),
  });

  return (
    <>
      <modal.Component
        title={
          <span aria-hidden className="hidden">
            Détail du projet
          </span>
        }
        size="large"
        className="xl-modal"
      >
        {currentSourcingRexProjet && (
          <Suspense fallback={<SourcingRexContentSeeProjetModalSkeleton />}>
            <RetourExperienceClient isModal params={{ retourExperienceSlug: currentSourcingRexProjet }} />
          </Suspense>
        )}
      </modal.Component>
    </>
  );
};
