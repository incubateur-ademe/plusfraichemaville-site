import {
  EstimationFicheSolutionDto,
  EstimationMateriauDto,
  EstimationWithAidesDto,
  SimpleEstimationFicheSolutionDto,
} from "@/src/types/dto";
import orderBy from "lodash/orderBy";
import { FicheSolution } from "@/src/lib/strapi/types/api/fiche-solution";

export const isComplete = (estimation: EstimationWithAidesDto) => {
  const notEstimatedSolutionIndex = estimation.estimationsFichesSolutions.findIndex(
    (efm) => !isFicheSolutionEstimated(efm),
  );
  return notEstimatedSolutionIndex === -1;
};

export const getLastCompletedEstimation = (estimations: EstimationWithAidesDto[] | undefined) => {
  if (!estimations || estimations.length === 0) {
    return null;
  }
  const sortedEstimations = orderBy(estimations, "updatedAt", "desc");
  return sortedEstimations.find(isComplete);
};

export const isFicheSolutionEstimated = (estimationFicheSolution: EstimationFicheSolutionDto) =>
  (estimationFicheSolution.quantite || 0) > 0 ||
  estimationFicheSolution.coutEntretienOverride != null ||
  estimationFicheSolution.coutInvestissementOverride != null ||
  estimationFicheSolution.estimationMateriaux.find(
    (em) => em.quantite !== 0 || em.coutEntretienOverride != null || em.coutInvestissementOverride != null,
  );

export const computePriceEstimationSimpleFicheSolution = (
  ficheSolution: FicheSolution,
  estimation: SimpleEstimationFicheSolutionDto,
) => {
  const quantite = estimation.quantite || 0;
  return {
    entretien: {
      min: estimation.coutEntretienOverride ?? quantite * (ficheSolution.attributes.cout_minimum_entretien || 0),
      max: estimation.coutEntretienOverride ?? quantite * (ficheSolution.attributes.cout_maximum_entretien || 0),
    },
    fourniture: {
      min: estimation.coutInvestissementOverride ?? quantite * (ficheSolution.attributes.cout_minimum || 0),
      max: estimation.coutInvestissementOverride ?? quantite * (ficheSolution.attributes.cout_maximum || 0),
    },
  };
};

export const computePriceEstimationFicheSolution = (
  ficheSolution: FicheSolution,
  estimationMateriaux: EstimationMateriauDto[],
) => {
  return ficheSolution.attributes.materiaux?.data.reduce(
    (acc, materiauCMS) => {
      const estimationMateriau = estimationMateriaux.find((f) => +f.materiauId === +materiauCMS.id);
      const quantiteMateriau = estimationMateriau?.quantite || 0;
      const coutInvestissementOverride = estimationMateriau?.coutInvestissementOverride;
      const coutEntretienOverride = estimationMateriau?.coutEntretienOverride;

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
