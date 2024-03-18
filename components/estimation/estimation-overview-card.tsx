"use client";
import { estimation } from "@prisma/client";
import clsx from "clsx";

import { EstimationCardPriceInfo } from "@/components/estimation/estimation-card-price-info";
import { EstimationMateriauxFicheSolution } from "@/lib/prisma/prismaCustomTypes";
import React, { useMemo } from "react";
import { EstimationDeleteModal } from "@/components/estimation/estimation-delete-modal";
import { EstimationMateriauModal } from "@/components/estimation/materiaux-modal/estimation-materiaux-modal";
import { FicheSolutionSmallCard } from "../ficheSolution/fiche-solution-small-card";
import { computeGlobalFicheSolutionPrice } from "@/helpers/coutMateriau";
import { isComplete } from "@/helpers/estimation";
import { dateToStringWithTime } from "@/helpers/dateUtils";

export const EstimationOverviewCard = ({ estimation }: { estimation: estimation }) => {
  const estimationMateriaux = estimation.materiaux as EstimationMateriauxFicheSolution[] | null;
  const globalPrice = useMemo(() => computeGlobalFicheSolutionPrice(estimationMateriaux), [estimationMateriaux]);

  const isEstimationCompleted = useMemo(() => isComplete(estimation), [estimation]);

  if (estimation.fiches_solutions_id.length < 1) {
    return null;
  }

  return (
    <div className={clsx("pfmv-strong-card pt-8 pb-12 px-12")}>
      <div className="flex flex-row justify-between mb-6">
        <div className="mb-6 text-xl font-bold">{`Estimation du ${dateToStringWithTime(estimation.created_at)}`}</div>

        {isEstimationCompleted ? (
          <div className="text-xs text-right text-dsfr-text-default-grey">
            <i className="fr-icon-success-fill text-dsfr-border-default-grey mr-1" />
            Complétée
          </div>
        ) : (
          <div className="text-xs text-right text-dsfr-text-default-grey">
            <i className="fr-icon--sm ri-circle-fill text-dsfr-background-action-high-success-hover mr-1" />
            En cours
          </div>
        )}
      </div>
      <div className={clsx("flex flex-wrap gap-6 mb-12")}>
        {estimation.fiches_solutions_id.map((ficheSolutionId) => (
          <FicheSolutionSmallCard
            key={ficheSolutionId}
            ficheSolutionId={ficheSolutionId}
            className="border-[1px] border-dsfr-border-default-grey rounded-2xl"
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
      <div className={clsx("text-lg", !isEstimationCompleted && "text-dsfr-text-disabled-grey")}>
        <div className="font-bold">Estimation totale des solutions envisagées</div>
        <div>(hors travaux complémentaires de voirie, consolidation etc)</div>
        <div className="flex flex-row justify-between mt-6">
          <div className="font-bold">Investissement</div>
          <div>
            <strong>{`${globalPrice.fourniture.min} - ${globalPrice.fourniture.max} € `}</strong>HT
          </div>
        </div>
        <div className="flex flex-row justify-between">
          <div className="font-bold">Entretien</div>
          <div>{`${globalPrice.entretien.min} - ${globalPrice.entretien.max} € HT / an`}</div>
        </div>
      </div>
      <div className="float-right flex flex-row gap-6 mt-12">
        <EstimationMateriauModal estimation={estimation} />
        <EstimationDeleteModal estimation={estimation} />
      </div>
    </div>
  );
};
