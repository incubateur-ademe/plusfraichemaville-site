"use client";

import { createModal } from "@codegouvfr/react-dsfr/Modal";
import { Button } from "@codegouvfr/react-dsfr/Button";
import { projet } from "@prisma/client";

import clsx from "clsx";
import { useProjetsStore } from "@/src/stores/projets/provider";
import { notifications } from "../common/notifications";
import { deleteProjetAction } from "@/src/actions/projets/delete-projet-action";

type ListeProjetsCardDeleteModalProps = {
  projetNom: projet["nom"];
  projetId: projet["id"];
};

export function ListeProjetsCardDeleteModal({ projetId, projetNom }: ListeProjetsCardDeleteModalProps) {
  const modal = createModal({
    id: `delete-projet-modal-${projetId}`,
    isOpenedByDefault: false,
  });
  const deleteStoredProjet = useProjetsStore((state) => state.deleteProjet);
  return (
    <>
      <Button
        size="small"
        priority="secondary"
        nativeButtonProps={modal.buttonProps}
        className={clsx(
          "fr-btn fr-btn--icon-left flex items-center justify-center rounded-3xl",
          "!h-4 !w-8 border-dsfr-text-disabled-grey !p-0 !shadow-pfmv-light-grey",
          "!shadow-[inset_0_0_0_1px]",
        )}
      >
        <i className="ri-delete-bin-fill h-4 w-4 before:!h-4 before:!w-4 before:!align-[0]"></i>
      </Button>
      <modal.Component
        title=""
        size="large"
        buttons={[
          {
            doClosesModal: false,
            children: "Supprimer",
            priority: "primary",
            className: "rounded-3xl !min-h-fit !text-sm mr-4",
            onClick: async () => {
              const res = await deleteProjetAction(projetId);
              if (res.type === "success") {
                deleteStoredProjet(projetId);
                modal.close();
              }
              notifications(res.type, res.message);
            },
          },
          {
            doClosesModal: true,
            children: "Annuler",
            priority: "secondary",
            className: "rounded-3xl !min-h-fit !text-sm mr-4",
          },
        ]}
      >
        <div className="flex items-center">
          <i className={"fr-icon--lg fr-icon-arrow-right-line mr-4"} />
          <span className="text-2xl font-bold">
            Êtes-vous certain de vouloir supprimer le projet <br />
            <span className="text-dsfr-text-label-blue-france">{projetNom} ?</span>
          </span>
        </div>
      </modal.Component>
    </>
  );
}
