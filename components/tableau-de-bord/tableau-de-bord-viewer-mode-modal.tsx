import { useProjetsStore } from "@/stores/projets/provider";
import { useUserStore } from "@/stores/user/provider";
import Button from "@codegouvfr/react-dsfr/Button";
import Checkbox from "@codegouvfr/react-dsfr/Checkbox";
import { createModal } from "@codegouvfr/react-dsfr/Modal";
import Image from "next/image";
import { useTransition } from "react";
import { getCurrentUserRole } from "../partage/helpers";
import { discardInformationAction } from "@/actions/users/discard-information-action";

const MODAL_ID = "tableau-de-bord-lecteur-mode-modal";

export const TableauDeBordViewerModeModal = () => {
  const [isPending, startTransition] = useTransition();

  const discardedInformation = useUserStore((state) => state.userInfos?.discardedInformation);
  const hasAlreadyDiscard = discardedInformation?.some((d) => d === MODAL_ID);
  const currentProject = useProjetsStore((state) => state.getCurrentProjet());
  const userId = useUserStore((state) => state.userInfos?.id);
  const isLecteur = (currentProject && getCurrentUserRole(currentProject.users, userId) === "LECTEUR") ?? false;

  if (!isLecteur) {
    return null;
  }

  const modal = createModal({
    isOpenedByDefault: !hasAlreadyDiscard && isLecteur,
    id: MODAL_ID,
  });

  const handleDiscardInformation = () => {
    startTransition(async () => {
      try {
        if (userId) {
          await discardInformationAction(userId, MODAL_ID);
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
    <div>
      <modal.Component title="" size="large">
        <h2 className="mb-4 flex gap-4 text-2xl">
          <Image src="/images/espace-projet/viewer-mode.svg" width={46} height={35} alt="" />
          Mode lecteur
        </h2>
        <div className="mb-6">
          Vous allez consulter ce projet en <strong>mode lecteur</strong>, sans possibilité de modification. Pour
          ajuster vos droits {"d'accès"}, veuillez contacter l’administrateur du projet.
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
    </div>
  );
};
