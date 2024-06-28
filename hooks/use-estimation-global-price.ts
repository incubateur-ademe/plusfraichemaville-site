import { formatNumberWithSpaces } from "@/helpers/common";
import { computeGlobalFicheSolutionPrice } from "@/helpers/cout/cout-materiau";
import { EstimationMateriauxFicheSolution } from "@/lib/prisma/prismaCustomTypes";
import { estimation } from "@prisma/client";
import { useMemo } from "react";

export const useEstimationGlobalPrice = (estimation: estimation) => {
  const estimationMateriaux = estimation.materiaux as EstimationMateriauxFicheSolution[] | null;
  const { fourniture, entretien } = useMemo(
    () => computeGlobalFicheSolutionPrice(estimationMateriaux),
    [estimationMateriaux],
  );

  const fournitureMin = formatNumberWithSpaces(fourniture.min);
  const fournitureMax = formatNumberWithSpaces(fourniture.max);
  const entretienMin = formatNumberWithSpaces(entretien.min);
  const entretienMax = formatNumberWithSpaces(entretien.max);

  return { fournitureMin, fournitureMax, entretienMin, entretienMax };
};
