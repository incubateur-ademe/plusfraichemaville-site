"use client";
import { estimation } from "@/src/generated/prisma/client";
import clsx from "clsx";

import { EstimationCardPriceInfo } from "@/src/components/estimation/estimation-card-price-info";
import { EstimationMateriauxFicheSolution } from "@/src/lib/prisma/prismaCustomTypes";
import { useMemo } from "react";
import { EstimationDeleteModal } from "@/src/components/estimation/estimation-delete-modal";
import { FicheSolutionSmallCard } from "../ficheSolution/fiche-solution-small-card";
import { isComplete } from "@/src/helpers/estimation";
import { dateToStringWithTime } from "@/src/helpers/dateUtils";
import { Button } from "@codegouvfr/react-dsfr/Button";
import { estimationModal } from "@/src/components/estimation/materiaux-modal/estimation-materiaux-modal-container";
import { useEstimationGlobalPrice } from "@/src/hooks/use-estimation-global-price";
import { useModalStore } from "@/src/stores/modal/provider";

export const EstimationOverviewCard = ({
  estimation,
  canEditEstimation,
}: {
  estimation: estimation;
  canEditEstimation?: boolean;
}) => {
  const { fournitureMin, fournitureMax, entretienMin, entretienMax } = useEstimationGlobalPrice(estimation);

  const estimationMateriaux = estimation.materiaux as EstimationMateriauxFicheSolution[] | null;
  const setCurrentEstimationId = useModalStore((state) => state.setCurrentEstimationId);

  const isEstimationCompleted = useMemo(() => isComplete(estimation), [estimation]);

  if (estimation.fiches_solutions_id.length < 1) {
    return null;
  }

  return (
    <div className={clsx("pfmv-strong-card px-12 pb-12 pt-8")}>
      <div className="mb-6 flex flex-row justify-between">
        <div className="mb-6 text-xl font-bold">{`Estimation du ${dateToStringWithTime(estimation.created_at)}`}</div>

        {isEstimationCompleted ? (
          <div className="text-right text-xs text-dsfr-text-default-grey">
            <i className="fr-icon-success-fill mr-1 text-dsfr-background-action-high-success-hover" />
            Complétée
          </div>
        ) : (
          <div className="text-right text-xs text-dsfr-text-default-grey">
            <i className="fr-icon--sm ri-circle-fill mr-1 text-dsfr-background-action-high-success-hover" />
            En cours
          </div>
        )}
      </div>
      <div className={clsx("mb-12 flex flex-wrap gap-6")}>
        {estimation.fiches_solutions_id.map((ficheSolutionId) => (
          <FicheSolutionSmallCard
            key={ficheSolutionId}
            ficheSolutionId={ficheSolutionId}
            className="rounded-2xl border-[1px] border-dsfr-border-default-grey"
          >
            <div className="w-full">
              <hr className="mt-6 pb-4" />
              <EstimationCardPriceInfo
                estimationInfo={estimationMateriaux?.find((em) => em.ficheSolutionId === ficheSolutionId)}
              />
            </div>
          </FicheSolutionSmallCard>
        ))}
      </div>
      <div className={clsx("text-lg", !isEstimationCompleted && "text-pfmv-grey")}>
        <div className="font-bold">Estimation totale des solutions envisagées</div>
        <div>(hors travaux complémentaires de voirie, consolidation etc)</div>
        <div className="mt-6 flex flex-row justify-between">
          <div className="font-bold">Investissement</div>
          <div>
            <strong>{`${fournitureMin} - ${fournitureMax} € `}</strong>
            HT
          </div>
        </div>
        <div className="flex flex-row justify-between">
          <div className="font-bold">Entretien</div>
          <div>{`${entretienMin} - ${entretienMax} € HT / an`}</div>
        </div>
      </div>
      {canEditEstimation && (
        <div className="float-right mt-12 flex flex-row gap-6">
          <Button
            nativeButtonProps={estimationModal.buttonProps}
            onClick={() => {
              setCurrentEstimationId(estimation.id);
            }}
            className="rounded-3xl"
          >
            Modifier
          </Button>
          <EstimationDeleteModal estimation={estimation} />
        </div>
      )}
    </div>
  );
};
