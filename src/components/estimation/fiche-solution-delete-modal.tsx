"use client";

import { createModal } from "@codegouvfr/react-dsfr/Modal";
import { Button } from "@codegouvfr/react-dsfr/Button";
import { EstimationWithAides } from "@/src/lib/prisma/prismaCustomTypes";
import { notifications } from "../common/notifications";
import { useProjetsStore } from "@/src/stores/projets/provider";
import { deleteFicheSolutionInEstimationAction } from "@/src/actions/estimation/delete-fiche-solution-in-estimation-action";
import { estimationModal } from "./materiaux-modal/estimation-materiaux-modal-container";
import { useModalStore } from "@/src/stores/modal/provider";

type FicheSolutionDeleteModalProps = {
  estimation: EstimationWithAides;
  ficheSolutionId: number;
  ficheSolutionTitle: string;
};

export function FicheSolutionDeleteModal({
  estimation,
  ficheSolutionId,
  ficheSolutionTitle,
}: FicheSolutionDeleteModalProps) {
  const getProjetById = useProjetsStore((state) => state.getProjetById);
  const updateProjetInStore = useProjetsStore((state) => state.addOrUpdateProjet);
  const currentEstimationData = useModalStore((state) => state.currentEstimation);

  const isLastFicheSolution = estimation.estimations_fiches_solutions.length === 1;

  const modal = createModal({
    id: `delete-fiche-solution-modal-${estimation.id}-${ficheSolutionId}`,
    isOpenedByDefault: false,
  });

  return (
    <>
      <Button priority="secondary" size="small" nativeButtonProps={modal.buttonProps} className="rounded-3xl">
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
              const actionResult = await deleteFicheSolutionInEstimationAction(estimation.id, ficheSolutionId);
              notifications(actionResult.type, actionResult.message);
              const impactedProjet = getProjetById(estimation.projet_id);

              if (actionResult.type === "success" && impactedProjet) {
                modal.close();

                if (currentEstimationData?.id === estimation.id) {
                  estimationModal.close();
                }

                if (actionResult.estimationDeleted) {
                  // L'estimation a été supprimée (c'était la dernière fiche solution)
                  updateProjetInStore({
                    ...impactedProjet,
                    estimations: impactedProjet.estimations?.filter((es) => es.id !== estimation.id),
                  });
                } else if (actionResult.estimation) {
                  // L'estimation a été mise à jour
                  updateProjetInStore({
                    ...impactedProjet,
                    estimations: impactedProjet.estimations?.map((es) =>
                      es.id === estimation.id ? actionResult.estimation! : es,
                    ),
                  });
                }
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
          <span className="text-2xl font-bold">
            Êtes-vous certain de vouloir retirer la solution &ldquo;{ficheSolutionTitle}&rdquo; de cette estimation ?
            {isLastFicheSolution && (
              <>
                <br />
                <span className="text-base mt-2 block">
                  Attention : Il s&apos;agit de la dernière fiche solution de cette estimation. L&apos;estimation sera
                  également supprimée.
                </span>
              </>
            )}
          </span>
        </div>
      </modal.Component>
    </>
  );
}
