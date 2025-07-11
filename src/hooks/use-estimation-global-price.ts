import { formatNumberWithSpaces } from "@/src/helpers/common";
import { computeGlobalFicheSolutionPrice } from "@/src/helpers/cout/cout-materiau";
import { EstimationMateriauxFicheSolution } from "@/src/lib/prisma/prismaCustomTypes";
import { estimation } from "@/src/generated/prisma/client";
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
