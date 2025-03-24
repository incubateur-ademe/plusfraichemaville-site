import { EstimationMateriauxFicheSolution, ProjetIndiEnSimuation } from "@/src/lib/prisma/prismaCustomTypes";
import { Materiau } from "@/src/lib/strapi/types/api/materiau";
// eslint-disable-next-line max-len
import { IndicateursEnvironnementauxFormData } from "@/src/forms/indicateursEnvironnementaux/indicateurs-environnementaux-form-schema";
import { findIndiEnQuestionFromCode } from "@/src/helpers/indicateurs-environnementaux/indi-en-questions";

export const mapStrapiEstimationMateriauxToFormValues = (
  ficheSolutionMateriaux: Materiau[] | undefined,
  defaultEstimationMateriaux: EstimationMateriauxFicheSolution | undefined,
) => {
  return ficheSolutionMateriaux?.map((materiau) => ({
    materiauId: `${materiau.id}`,
    quantite:
      defaultEstimationMateriaux?.estimationMateriaux?.find((e) => +e.materiauId == +materiau.id)?.quantite || 0,
  }));
};

export const calculateCoeffsDiagnosticSimulation = (
  questions: ProjetIndiEnSimuation["questions"] | IndicateursEnvironnementauxFormData["questions"],
) => {
  let sommeRafraichissementUrbain = 0;
  let sommeBiodiversite = 0;
  let sommePermeabilite = 0;
  let sommeCanopee = 0;
  let empriseTotale = 0;
  questions.forEach((formQuestion) => {
    const fullQuestion = findIndiEnQuestionFromCode(formQuestion.questionCode);
    sommeRafraichissementUrbain += formQuestion.quantite * (fullQuestion?.coeffRafraichissementUrbain || 0);
    sommeBiodiversite += formQuestion.quantite * (fullQuestion?.coeffBiodiversite || 0);
    sommePermeabilite += formQuestion.quantite * (fullQuestion?.coeffPermeabilite || 0);
    sommeCanopee += formQuestion.quantite * (fullQuestion?.surfaceCanopee || 0);
    if (fullQuestion?.priseEnCompteEmprise) {
      empriseTotale += formQuestion.quantite;
    }
  });

  return {
    coeffRafraichissementUrbain: sanitizeCoeffEnvValue((sommeRafraichissementUrbain) / empriseTotale),
    coeffBiodiversite: sanitizeCoeffEnvValue((sommeBiodiversite) / empriseTotale),
    coeffPermeabilite: sanitizeCoeffEnvValue((sommePermeabilite) / empriseTotale),
    partCanopee: Math.min(Math.round((100 * sommeCanopee) / empriseTotale || 0), 100),
  };
};

const sanitizeCoeffEnvValue = (value: number) => Math.min(Math.round((value || 0) * 100) / 100, 1);
