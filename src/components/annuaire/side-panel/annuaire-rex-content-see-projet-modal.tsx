"use client";

import { createModal } from "@codegouvfr/react-dsfr/Modal";
import { useModalStore } from "@/src/stores/modal/provider";
import { useIsModalOpen } from "@codegouvfr/react-dsfr/Modal/useIsModalOpen";
import { useEffect, Suspense } from "react";
import { AnnuaireRexContentSeeProjetModalSkeleton } from "./annuaire-rex-content-see-projet-modal-skeleton";
import { RetourExperienceWithFetcher } from "../../projet/projet-retour-experience-with-fetcher";

const modal = createModal({
  id: "sourcing-rex-projet-modal",
  isOpenedByDefault: false,
});

export const AnnuaireRexContentSeeProjetModal = () => {
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
          <Suspense fallback={<AnnuaireRexContentSeeProjetModalSkeleton />}>
            <RetourExperienceWithFetcher isModal retourExperienceSlug={currentSourcingRexProjet} />
          </Suspense>
        )}
      </modal.Component>
    </>
  );
};
