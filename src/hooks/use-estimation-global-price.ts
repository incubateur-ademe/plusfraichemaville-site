import { formatNumberWithSpaces } from "@/src/helpers/common";
import { computeGlobalFicheSolutionPrice } from "@/src/helpers/cout/cout-materiau";
import { EstimationFicheSolution, EstimationWithAides } from "@/src/lib/prisma/prismaCustomTypes";
import { useMemo } from "react";

export const useEstimationGlobalPrice = (estimation: EstimationWithAides) => {
  const estimationMateriaux: EstimationFicheSolution[] = useMemo(() => {
    return (
      estimation.estimations_fiches_solutions?.map((efs) => ({
        ficheSolutionId: efs.fiche_solution_id,
        coutMinInvestissement: efs.cout_min_investissement,
        coutMaxInvestissement: efs.cout_max_investissement,
        coutMinEntretien: efs.cout_min_entretien,
        coutMaxEntretien: efs.cout_max_entretien,
        quantite: efs.quantite ?? undefined,
        estimationMateriaux: efs.estimation_materiaux.map((em) => ({
          materiauId: em.materiau_id.toString(),
          quantite: em.quantite,
          coutInvestissementOverride: em.cout_investissement_override ?? undefined,
          coutEntretienOverride: em.cout_entretien_override ?? undefined,
        })),
      })) || []
    );
  }, [estimation.estimations_fiches_solutions]);

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
