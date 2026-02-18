"use client";

import { Button } from "@codegouvfr/react-dsfr/Button";
import { useImmutableSwrWithFetcher } from "@/src/hooks/use-swr-with-fetcher";
import { makeFicheSolutionCompleteUrlApi } from "@/src/components/ficheSolution/helpers";
import { FicheSolution } from "@/src/lib/strapi/types/api/fiche-solution";
import { EstimationWithAides } from "@/src/lib/prisma/prismaCustomTypes";
import { isFicheSolutionEstimated } from "@/src/helpers/estimation";
import { FicheSolutionSmallCard } from "../ficheSolution/fiche-solution-small-card";
import { EstimationCardPriceInfo } from "@/src/components/estimation/estimation-card-price-info";
import { FicheSolutionDeleteModal } from "@/src/components/estimation/fiche-solution-delete-modal";

export const FicheSolutionSmallCardWithActions = ({
  ficheSolutionId,
  estimation,
  isEditMode,
  onEdit,
}: {
  ficheSolutionId: number;
  estimation: EstimationWithAides;
  isEditMode?: boolean;
  onEdit(ficheSolutionId: number): void;
}) => {
  const { data: ficheSolutionData } = useImmutableSwrWithFetcher<FicheSolution[]>(
    makeFicheSolutionCompleteUrlApi(ficheSolutionId),
  );
  const ficheSolution = ficheSolutionData?.[0];

  const estimationFicheSolution = estimation.estimations_fiches_solutions?.find(
    (em) => em.fiche_solution_id === ficheSolutionId,
  );

  const isEstimated = estimationFicheSolution ? isFicheSolutionEstimated(estimationFicheSolution) : false;

  return (
    <FicheSolutionSmallCard
      ficheSolutionId={ficheSolutionId}
      className="rounded-2xl border-[1px] border-dsfr-border-default-grey"
    >
      <div className="w-full">
        <hr className="mt-6 pb-4" />
        <EstimationCardPriceInfo estimationInfo={estimationFicheSolution} />
        {isEditMode && (
          <div className="mt-4 flex flex-row gap-2">
            <Button priority="primary" size="small" onClick={() => onEdit(ficheSolutionId)} className="rounded-3xl">
              {isEstimated ? "Modifier" : "Estimer"}
            </Button>
            <FicheSolutionDeleteModal
              estimation={estimation}
              ficheSolutionId={ficheSolutionId}
              ficheSolutionTitle={ficheSolution?.attributes.titre || ""}
            />
          </div>
        )}
      </div>
    </FicheSolutionSmallCard>
  );
};
