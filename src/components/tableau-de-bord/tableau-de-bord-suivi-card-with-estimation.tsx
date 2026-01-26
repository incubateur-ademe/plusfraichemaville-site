"use client";

import { useProjetsStore } from "@/src/stores/projets/provider";
import { useMemo } from "react";
import { getLastCompletedEstimation } from "@/src/helpers/estimation";
import { formatNumberWithSpaces } from "@/src/helpers/common";
import { useEstimationFSGlobalPrice } from "@/src/hooks/use-estimation-fs-global-price";

export const TableauDeBordSuiviWithEstimation = () => {
  const projet = useProjetsStore((state) => state.getCurrentProjet());

  const lastCompletedEstimation = useMemo(() => getLastCompletedEstimation(projet?.estimations), [projet?.estimations]);
  if (!lastCompletedEstimation) {
    return (
      <span className="text-sm">Choisir les matériaux adéquats pour faire une estimation du coût des solutions.</span>
    );
  }
  const { fournitureMin, fournitureMax, entretienMin, entretienMax, isLoading } = useEstimationFSGlobalPrice(
    lastCompletedEstimation.estimations_fiches_solutions,
  );

  return (
    <div className="mt-auto flex flex-row justify-between text-sm">
      <div className="font-bold">Dernière estimation :</div>
      <div className="text-right">
        {isLoading ? (
          <div className="animate-pulse">
            <div className="mb-2 ml-auto h-4 w-28 rounded-sm bg-dsfr-contrast-grey"></div>
            <div className="h-4 w-32 rounded-sm bg-dsfr-contrast-grey"></div>
          </div>
        ) : (
          <>
            <div>
              {formatNumberWithSpaces(fournitureMin)} - {formatNumberWithSpaces(fournitureMax)} € HT
            </div>
            <div className="text-dsfr-text-mention-grey">
              {formatNumberWithSpaces(entretienMin)} - {formatNumberWithSpaces(entretienMax)} € HT / an
            </div>
          </>
        )}
      </div>
    </div>
  );
};
