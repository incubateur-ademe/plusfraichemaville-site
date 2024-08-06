import { useProjetsStore } from "@/stores/projets/provider";
import { useUserStore } from "@/stores/user/provider";
import Button from "@codegouvfr/react-dsfr/Button";
import Checkbox from "@codegouvfr/react-dsfr/Checkbox";
import { createModal } from "@codegouvfr/react-dsfr/Modal";

import { useEffect, useTransition } from "react";

import { discardInformationAction } from "@/actions/users/discard-information-action";
import { useModalStore } from "@/stores/modal/provider";
import { useIsModalOpen } from "@codegouvfr/react-dsfr/Modal/useIsModalOpen";
import { LecteurModeLabel } from "../common/lecteur-mode-label";

const MODAL_ID = "tableau-de-bord-lecteur-mode-modal";

const modal = createModal({
  isOpenedByDefault: false,
  id: MODAL_ID,
});

export const TableauDeBordDiscardViewerModeModal = () => {
  const [isPending, startTransition] = useTransition();

  const currentDiscardViewerMode = useModalStore((state) => state.currentDiscardViewerMode);
  const setCurrentDiscardViewerMode = useModalStore((state) => state.setCurrentDiscardViewerMode);

  const currentProject = useProjetsStore((state) => state.getCurrentProjet());
  const userId = useUserStore((state) => state.userInfos?.id);

  useEffect(() => {
    if (currentDiscardViewerMode) {
      setTimeout(() => {
        modal.open();
      }, 350);
    }
  }, [currentDiscardViewerMode]);

  useIsModalOpen(modal, {
    onConceal: () => setCurrentDiscardViewerMode(null),
  });

  const handleDiscardInformation = () => {
    startTransition(async () => {
      try {
        if (userId) {
          await discardInformationAction(userId, MODAL_ID, currentProject?.id);
        }
      } catch (error) {
        throw new Error();
      }
    });
  };

  const confirm = () => {
    const discard = document.querySelector<HTMLInputElement>("#discarded-info-input-0")?.checked;
    if (discard) {
      handleDiscardInformation();
    }
    modal.close();
  };

  return (
    <modal.Component title="" size="large">
      <h2 className="mb-4 flex gap-4 text-2xl">
        <LecteurModeLabel />
      </h2>
      <div className="mb-6">
        Vous allez consulter ce projet en <strong>mode lecteur</strong>, sans possibilité de modification. Pour ajuster
        vos droits {"d'accès"}, veuillez contacter l’administrateur du projet.
      </div>
      <Checkbox
        id="discarded-info-input"
        options={[
          {
            label: "Ne plus afficher",
            nativeInputProps: {
              name: "discarded-info-input",
              value: "discarded-info-input",
            },
          },
        ]}
      />
      <Button className="!ml-auto !block" onClick={confirm} disabled={isPending}>
        Confirmer
      </Button>
    </modal.Component>
  );
};
