import { useUserStore } from "@/src/stores/user/provider";
import Button from "@codegouvfr/react-dsfr/Button";
import Checkbox from "@codegouvfr/react-dsfr/Checkbox";
import { createModal } from "@codegouvfr/react-dsfr/Modal";

import { useEffect, useTransition } from "react";

import { discardInformationAction } from "@/src/actions/users/discard-information-action";
import { useModalStore } from "@/src/stores/modal/provider";
import { useIsModalOpen } from "@codegouvfr/react-dsfr/Modal/useIsModalOpen";
import { LecteurModeLabel } from "../common/lecteur-mode-label";

export const MODE_LECTEUR_MODAL_ID = "mode-lecteur-modal";

const modal = createModal({
  isOpenedByDefault: false,
  id: MODE_LECTEUR_MODAL_ID,
});

export const ViewerModeModal = () => {
  const [isPending, startTransition] = useTransition();

  const showInfoViewerMode = useModalStore((state) => state.showInfoViewerMode);
  const setShowInfoViewerMode = useModalStore((state) => state.setShowInfoViewerMode);

  const userId = useUserStore((state) => state.userInfos?.id);
  const setUserInfos = useUserStore((state) => state.setUserInfos);

  useEffect(() => {
    if (showInfoViewerMode) {
      setTimeout(() => {
        modal.open();
      }, 350);
    }
  }, [showInfoViewerMode]);

  useIsModalOpen(modal, {
    onConceal: () => setShowInfoViewerMode(false),
  });

  const handleDiscardInformation = () => {
    startTransition(async () => {
      if (userId) {
        const result = await discardInformationAction(userId, MODE_LECTEUR_MODAL_ID);
        if (result.type === "success") {
          setUserInfos(result.updatedUser);
        }
      }
    });
  };
  const confirm = () => {
    const discardInput = document.querySelector<HTMLInputElement>("#discarded-info-input-0");
    if (discardInput?.checked) {
      handleDiscardInformation();
    }
    modal.close();
  };

  return (
    <modal.Component
      title={
        <>
          <span className="mb-4 flex gap-4 text-2xl">
            <LecteurModeLabel />
          </span>
        </>
      }
      size="large"
    >
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
