"use client";
import clsx from "clsx";

import { EstimationCardPriceInfo } from "@/src/components/estimation/estimation-card-price-info";
import { EstimationWithAides } from "@/src/lib/prisma/prismaCustomTypes";
import { useEffect, useMemo, useState } from "react";
import { EstimationDeleteModal } from "@/src/components/estimation/estimation-delete-modal";
import { FicheSolutionSmallCard } from "../ficheSolution/fiche-solution-small-card";
import { isComplete, isFicheSolutionEstimated } from "@/src/helpers/estimation";
import { dateToStringWithTime } from "@/src/helpers/dateUtils";
import { Button } from "@codegouvfr/react-dsfr/Button";
import { useModalStore } from "@/src/stores/modal/provider";
import { useEstimationFSGlobalPrice } from "@/src/hooks/use-estimation-fs-global-price";
import { formatNumberWithSpaces } from "@/src/helpers/common";
import { FicheSolutionDeleteModal } from "@/src/components/estimation/fiche-solution-delete-modal";
import { useImmutableSwrWithFetcher } from "@/src/hooks/use-swr-with-fetcher";
import { makeFicheSolutionCompleteUrlApi } from "@/src/components/ficheSolution/helpers";
import { FicheSolution } from "@/src/lib/strapi/types/api/fiche-solution";
import { PFMV_ROUTES } from "@/src/helpers/routes";
import { useProjetsStore } from "@/src/stores/projets/provider";
import { getProjetFichesIdsByType } from "@/src/components/common/generic-save-fiche/helpers";
import { TypeFiche } from "@/src/helpers/common";
import { useRouter } from "next/navigation";

const FicheSolutionSmallCardWithActions = ({
  ficheSolutionId,
  estimation,
  isEditMode,
  onEdit,
}: {
  ficheSolutionId: number;
  estimation: EstimationWithAides;
  isEditMode?: boolean;
  onEdit: (ficheSolutionId: number) => void;
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

export const EstimationOverviewCard = ({
  estimation,
  canEditEstimation,
}: {
  estimation: EstimationWithAides;
  canEditEstimation?: boolean;
}) => {
  const router = useRouter();
  const { fournitureMin, fournitureMax, entretienMin, entretienMax } = useEstimationFSGlobalPrice(
    estimation.estimations_fiches_solutions,
  );

  const setCurrentEstimation = useModalStore((state) => state.setCurrentEstimation);
  const currentProjet = useProjetsStore((state) => state.getCurrentProjet());

  const [isEditMode, setIsEditMode] = useState(false);

  const isEstimationCompleted = useMemo(() => isComplete(estimation), [estimation]);

  const projetFichesSolutionsIds = useMemo(
    () => getProjetFichesIdsByType({ projet: currentProjet, typeFiche: TypeFiche.solution }) ?? [],
    [currentProjet],
  );

  const fichesSolutionsIdsNotInEstimation = useMemo(() => {
    const estimationFicheSolutionIds = estimation.estimations_fiches_solutions.map((efs) => efs.fiche_solution_id);
    return projetFichesSolutionsIds.filter((id) => !estimationFicheSolutionIds.includes(id));
  }, [estimation.estimations_fiches_solutions, projetFichesSolutionsIds]);

  useEffect(() => {
    if (isEditMode && estimation.estimations_fiches_solutions.length === 0) {
      setIsEditMode(false);
    }
  }, [estimation.estimations_fiches_solutions.length, isEditMode]);

  const handleEditFicheSolution = (ficheSolutionId: number) => {
    const index = estimation.estimations_fiches_solutions.findIndex(
      (efs) => efs.fiche_solution_id === +ficheSolutionId,
    );
    if (index !== -1) {
      setCurrentEstimation({ id: estimation.id, startingStep: index + 1 });
    }
  };

  if (estimation.estimations_fiches_solutions.length < 1) {
    return null;
  }

  return (
    <section className={clsx("pfmv-strong-card px-12 pb-12 pt-8")}>
      <div className="mb-6 flex flex-row justify-between">
        <h2 className="mb-6 text-xl font-bold">{`Estimation du ${dateToStringWithTime(estimation.created_at)}`}</h2>

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
        {estimation.estimations_fiches_solutions.map((estimationFicheSolution) => (
          <FicheSolutionSmallCardWithActions
            key={estimationFicheSolution.fiche_solution_id}
            ficheSolutionId={estimationFicheSolution.fiche_solution_id}
            estimation={estimation}
            isEditMode={isEditMode && canEditEstimation}
            onEdit={handleEditFicheSolution}
          />
        ))}
        {isEditMode && canEditEstimation && fichesSolutionsIdsNotInEstimation.length > 0 && (
          <button
            onClick={() =>
              router.push(PFMV_ROUTES.ESPACE_PROJET_ESTIMATION_AJOUTER_SOLUTIONS(currentProjet!.id, estimation.id))
            }
            className={clsx(
              "fr-btn !h-32 !w-32 rounded-[10px] bg-dsfr-text-label-blue-france",
              "flex !flex-col items-center justify-center",
              "self-center",
            )}
          >
            <i className="ri-add-circle-fill mb-2 text-sm text-white"></i>
            <span className="text-center text-white">Ajouter une solution</span>
          </button>
        )}
      </div>
      <div className={clsx("text-lg", !isEstimationCompleted && "text-pfmv-grey")}>
        <div className="font-bold">Estimation totale des solutions envisagées</div>
        <div>(hors travaux complémentaires de voirie, consolidation etc)</div>
        <div className="mt-6 flex flex-row justify-between">
          <div className="font-bold">Investissement</div>
          <div>
            <strong>{`${formatNumberWithSpaces(fournitureMin)} - ${formatNumberWithSpaces(fournitureMax)} € `}</strong>
            HT
          </div>
        </div>
        <div className="flex flex-row justify-between">
          <div className="font-bold">Entretien</div>
          <div>{`${formatNumberWithSpaces(entretienMin)} - ${formatNumberWithSpaces(entretienMax)} € HT / an`}</div>
        </div>
        <div className="mt-4 justify-self-end">
          <Button
            priority="tertiary no outline"
            onClick={() =>
              setCurrentEstimation({
                id: estimation.id,
                startingStep: estimation.estimations_fiches_solutions.length + 1,
              })
            }
            className="fr-link underline"
          >
            Voir le détail
          </Button>
        </div>
      </div>
      {canEditEstimation && (
        <div className="float-right mt-12 flex flex-row gap-6">
          {!isEditMode ? (
            <Button priority="primary" onClick={() => setIsEditMode(true)} className="rounded-3xl">
              Modifier
            </Button>
          ) : (
            <Button priority="primary" onClick={() => setIsEditMode(false)} className="rounded-3xl">
              Valider
            </Button>
          )}
          <EstimationDeleteModal estimation={estimation} />
        </div>
      )}
    </section>
  );
};
