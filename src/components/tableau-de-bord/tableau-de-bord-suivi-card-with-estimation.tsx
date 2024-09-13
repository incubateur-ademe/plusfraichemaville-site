"use client";

import { useProjetsStore } from "@/stores/projets/provider";
import { useMemo } from "react";
import { getLastCompletedEstimation } from "@/helpers/estimation";
import { EstimationMateriauxFicheSolution } from "@/lib/prisma/prismaCustomTypes";
import { computeGlobalFicheSolutionPrice } from "@/helpers/cout/cout-materiau";
import { formatNumberWithSpaces } from "@/helpers/common";

export const TableauDeBordSuiviWithEstimation = () => {
  const projet = useProjetsStore((state) => state.getCurrentProjet());

  const lastCompletedEstimation = useMemo(() => getLastCompletedEstimation(projet?.estimations), [projet?.estimations]);
  const globalPrice = useMemo(
    () =>
      computeGlobalFicheSolutionPrice(lastCompletedEstimation?.materiaux as EstimationMateriauxFicheSolution[] | null),
    [lastCompletedEstimation],
  );
  if (!globalPrice || !lastCompletedEstimation) {
    return (
      <span className="text-sm">Choisir les matériaux adéquats pour faire une estimation du coût des solutions.</span>
    );
  }

  return (
    <div className="mt-auto flex flex-row justify-between text-sm">
      <div className="font-bold">Dernière estimation :</div>
      <div className="text-right">
        <div>
          {formatNumberWithSpaces(globalPrice.fourniture.min)} - {formatNumberWithSpaces(globalPrice.fourniture.max)} €
          HT
        </div>
        <div className="text-dsfr-text-mention-grey">
          {formatNumberWithSpaces(globalPrice.entretien.min)} - {formatNumberWithSpaces(globalPrice.entretien.max)} € HT
          / an
        </div>
      </div>
    </div>
  );
};
