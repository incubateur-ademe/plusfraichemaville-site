import {
  EstimationFicheSolution,
  EstimationMateriau,
  EstimationWithAides,
  SimpleEstimationFicheSolution,
} from "@/src/lib/prisma/prismaCustomTypes";
import orderBy from "lodash/orderBy";
import { FicheSolution } from "@/src/lib/strapi/types/api/fiche-solution";

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

export const isFicheSolutionEstimated = (estimationFicheSolution: EstimationFicheSolution) =>
  estimationFicheSolution.quantite ||
  0 > 0 ||
  estimationFicheSolution.estimation_materiaux.find((em) => em.quantite !== 0);

export const computePriceEstimationSimpleFicheSolution = (
  ficheSolution: FicheSolution,
  estimation: SimpleEstimationFicheSolution,
) => {
  const quantite = estimation.quantite || 0;
  return {
    entretien: {
      min: estimation.cout_entretien_override ?? quantite * (ficheSolution.attributes.cout_minimum_entretien || 0),
      max: estimation.cout_entretien_override ?? quantite * (ficheSolution.attributes.cout_maximum_entretien || 0),
    },
    fourniture: {
      min: estimation.cout_investissement_override ?? quantite * (ficheSolution.attributes.cout_minimum || 0),
      max: estimation.cout_investissement_override ?? quantite * (ficheSolution.attributes.cout_maximum || 0),
    },
  };
};

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
