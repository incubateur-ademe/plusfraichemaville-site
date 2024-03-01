"use client";

import { createModal } from "@codegouvfr/react-dsfr/Modal";
import { Button } from "@codegouvfr/react-dsfr/Button";
import { projet } from "@prisma/client";
import { deleteProjetAction } from "@/actions/projets/delete-projet-action";
import { notifications } from "../common/notifications";
import { useSession } from "next-auth/react";

type ListeProjetsCardDeleteModalProps = {
  projetNom: projet["nom"];
  projetId: projet["id"];
};

export function ListeProjetsCardDeleteModal({ projetId, projetNom }: ListeProjetsCardDeleteModalProps) {
  const session = useSession();
  const userId = session.data?.user.id;

  if (!userId) {
    return null;
  }

  const modal = createModal({
    id: `delete-projet-modal-${projetId}`,
    isOpenedByDefault: false,
  });

  return (
    <>
      <Button
        size="small"
        priority="secondary"
        nativeButtonProps={modal.buttonProps}
        className="fr-btn fr-btn--icon-left rounded-[50%] relative !w-8 flex justify-center items-center"
      >
        <i className="ri-delete-bin-fill before:!w-4"></i>
      </Button>
      <modal.Component
        title=""
        size="large"
        buttons={[
          {
            doClosesModal: true,
            children: "Supprimer",
            priority: "primary",
            className: "rounded-3xl !min-h-fit !text-sm mr-4",

            onClick: async () => {
              const res = await deleteProjetAction(userId, projetId);
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
            Êtes-vous certains de vouloir supprimer le projet <br />
            <span className="text-dsfr-text-label-blue-france">{projetNom} ?</span>
          </span>
        </div>
      </modal.Component>
    </>
  );
}
