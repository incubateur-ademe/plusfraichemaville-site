"use client";

import { useProjetsStore } from "@/src/stores/projets/provider";
import { useMemo } from "react";
import { getLastCompletedEstimation } from "@/src/helpers/estimation";
import { EstimationFicheSolution } from "@/src/lib/prisma/prismaCustomTypes";
import { computeGlobalFicheSolutionPrice } from "@/src/helpers/cout/cout-materiau";
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
  const { fournitureMin, fournitureMax, entretienMin, entretienMax } = useEstimationFSGlobalPrice(
    lastCompletedEstimation.estimations_fiches_solutions,
  );


  return (
    <div className="mt-auto flex flex-row justify-between text-sm">
      <div className="font-bold">Dernière estimation :</div>
      <div className="text-right">
        <div>
          {formatNumberWithSpaces(fournitureMin)} - {formatNumberWithSpaces(fournitureMax)} € HT
        </div>
        <div className="text-dsfr-text-mention-grey">
          {formatNumberWithSpaces(entretienMin)} - {formatNumberWithSpaces(entretienMax)} € HT / an
        </div>
      </div>
    </div>
  );
};
