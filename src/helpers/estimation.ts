import { EstimationFicheSolution, EstimationMateriau, EstimationWithAides } from "@/src/lib/prisma/prismaCustomTypes";
import orderBy from "lodash/orderBy";
import { FicheSolution } from "@/src/lib/strapi/types/api/fiche-solution";
import { isEmpty } from "@/src/helpers/listUtils";

export const isComplete = (estimation: EstimationWithAides) => {
  const notEstimatedSolutionIndex = estimation.estimations_fiches_solutions.findIndex(
    (efm) => !isFicheSolutionEstimated(efm),
  );
  return notEstimatedSolutionIndex === -1;
};

export const getLastCompletedEstimation = (estimations: EstimationWithAides[] | undefined) => {
  if (!estimations || estimations.length === 0) {
    return null;
  }
  const sortedEstimations = orderBy(estimations, "updated_at", "desc");
  return sortedEstimations.find(isComplete);
};

const isFicheSolutionEstimated = (estimationFicheSolution: EstimationFicheSolution) =>
  estimationFicheSolution.quantite != null || !isEmpty(estimationFicheSolution.estimation_materiaux);

export const computePriceEstimationFicheSolution = (
  ficheSolution: FicheSolution,
  estimationMateriaux: EstimationMateriau[],
) => {
  return ficheSolution.attributes.materiaux?.data.reduce(
    (acc, materiauCMS) => {
      const estimationMateriau = estimationMateriaux.find((f) => +f.materiau_id === +materiauCMS.id);
      const quantiteMateriau = estimationMateriau?.quantite || 0;
      const coutInvestissementOverride = estimationMateriau?.cout_investissement_override;
      const coutEntretienOverride = estimationMateriau?.cout_entretien_override;

      const investissementMin =
        coutInvestissementOverride ?? quantiteMateriau * (materiauCMS.attributes.cout_minimum_fourniture || 0);
      const investissementMax =
        coutInvestissementOverride ?? quantiteMateriau * (materiauCMS.attributes.cout_maximum_fourniture || 0);

      const entretienMin =
        coutEntretienOverride ?? quantiteMateriau * (materiauCMS.attributes.cout_minimum_entretien || 0);
      const entretienMax =
        coutEntretienOverride ?? quantiteMateriau * (materiauCMS.attributes.cout_maximum_entretien || 0);

      return {
        entretien: {
          min: entretienMin + acc.entretien.min,
          max: entretienMax + acc.entretien.max,
        },
        fourniture: {
          min: investissementMin + acc.fourniture.min,
          max: investissementMax + acc.fourniture.max,
        },
      };
    },
    { entretien: { min: 0, max: 0 }, fourniture: { min: 0, max: 0 } },
  );
};
