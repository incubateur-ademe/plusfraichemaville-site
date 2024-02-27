"use client";

import { createModal } from "@codegouvfr/react-dsfr/Modal";
import { Button } from "@codegouvfr/react-dsfr/Button";
import { projet } from "@prisma/client";
import { deleteProjetAction } from "@/actions/projets/delete-projet-action";
import { notifications } from "../common/notifications";

type ListeProjetsCardDeleteModalProps = {
  projetNom: projet["nom"];
  projetId: projet["id"];
  createdBy: projet["created_by"];
};

const modal = createModal({
  id: "delete-projet-modal",
  isOpenedByDefault: false,
});

export function ListeProjetsCardDeleteModal({ projetId, projetNom, createdBy }: ListeProjetsCardDeleteModalProps) {
  return (
    <>
      <Button
        size="small"
        priority="secondary"
        nativeButtonProps={modal.buttonProps}
        className="fr-btn fr-btn--icon-left rounded-3xl"
      >
        Supprimer
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
              const res = await deleteProjetAction(createdBy, projetId);
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
          <svg
            className="mr-3"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="32"
            height="32"
            fill="currentColor"
          >
            {/* eslint-disable-next-line max-len */}
            <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"></path>
          </svg>
          <span className="text-2xl font-bold">
            Êtes-vous certains de vouloir supprimer le projet <br />
            <span className="text-dsfr-text-label-blue-france">{projetNom} ?</span>
          </span>
        </div>
      </modal.Component>
    </>
  );
}
