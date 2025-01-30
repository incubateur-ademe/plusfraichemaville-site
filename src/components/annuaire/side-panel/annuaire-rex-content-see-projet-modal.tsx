"use client";

import { createModal } from "@codegouvfr/react-dsfr/Modal";
import { useModalStore } from "@/src/stores/modal/provider";
import { useIsModalOpen } from "@codegouvfr/react-dsfr/Modal/useIsModalOpen";
import { useEffect, Suspense } from "react";
import { AnnuaireRexContentSeeProjetModalSkeleton } from "./annuaire-rex-content-see-projet-modal-skeleton";
import { RetourExperienceWithFetcher } from "../../projet/projet-retour-experience-with-fetcher";

const modal = createModal({
  id: "annuaire-rex-projet-modal",
  isOpenedByDefault: false,
});

export const AnnuaireRexContentSeeProjetModal = () => {
  const currentAnnuaireRexProjet = useModalStore((state) => state.currentAnnuaireRexProjet);
  const setCurrentAnnuaireRexProjet = useModalStore((state) => state.setAnnuaireRexProjetSlug);

  useEffect(() => {
    if (currentAnnuaireRexProjet) {
      modal.open();
    }
  }, [currentAnnuaireRexProjet]);

  useIsModalOpen(modal, {
    onConceal: () => setCurrentAnnuaireRexProjet(null),
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
        className="custom-modal xl-modal"
      >
        {currentAnnuaireRexProjet && (
          <Suspense fallback={<AnnuaireRexContentSeeProjetModalSkeleton />}>
            <RetourExperienceWithFetcher isModal retourExperienceSlug={currentAnnuaireRexProjet} />
          </Suspense>
        )}
      </modal.Component>
    </>
  );
};
