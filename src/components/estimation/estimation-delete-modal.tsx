"use client";

import { createModal } from "@codegouvfr/react-dsfr/Modal";
import { Button } from "@codegouvfr/react-dsfr/Button";
import { estimation } from "@prisma/client";
import { notifications } from "../common/notifications";
import { useProjetsStore } from "@/src/stores/projets/provider";
import { deleteEstimationAction } from "@/src/actions/estimation/delete-estimation-action";

type ListeProjetsCardDeleteModalProps = {
  estimation: estimation;
};

export function EstimationDeleteModal({ estimation }: ListeProjetsCardDeleteModalProps) {
  const getProjetById = useProjetsStore((state) => state.getProjetById);
  const updateProjetInStore = useProjetsStore((state) => state.addOrUpdateProjet);

  const modal = createModal({
    id: `delete-estimation-modal-${estimation.id}`,
    isOpenedByDefault: false,
  });

  return (
    <>
      <Button
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
            doClosesModal: false,
            children: "Supprimer",
            priority: "primary",
            className: "rounded-3xl !min-h-fit !text-sm mr-4",

            onClick: async () => {
              const res = await deleteEstimationAction(estimation.id);
              notifications(res.type, res.message);
              const impactedProjet = getProjetById(estimation.projet_id);
              if (res.type === "success" && impactedProjet) {
                modal.close();
                updateProjetInStore({
                  ...impactedProjet,
                  estimations: impactedProjet.estimations?.filter((es) => es.id !== estimation.id),
                });
              }
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
          <span className="text-2xl font-bold">Êtes-vous certain de vouloir supprimer cette estimation ?</span>
        </div>
      </modal.Component>
    </>
  );
}
