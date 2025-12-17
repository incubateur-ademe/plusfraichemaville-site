import {
  EstimationFicheSolution,
  EstimationMateriau,
  EstimationMateriauForm,
  EstimationSimpleFicheSolutionForm,
  ProjetIndiEnSimuation,
  SimpleEstimationFicheSolution,
} from "@/src/lib/prisma/prismaCustomTypes";
import { Materiau } from "@/src/lib/strapi/types/api/materiau";
import { IndicateursEnvironnementauxFormData } from "@/src/forms/indicateursEnvironnementaux/indicateurs-environnementaux-form-schema";
import {
  findIndiEnGroupeQuestionFromQuestionCode,
  findIndiEnQuestionFromCode,
  INDIEN_QUESTION_GROUPE_BASSIN,
  INDIEN_QUESTION_GROUPE_REVETEMENT_SOL,
  INDIEN_QUESTION_GROUPE_SURFACE_VEGETALISEE,
  INDIEN_QUESTION_GROUPE_TOITURE,
} from "@/src/helpers/indicateurs-environnementaux/indi-en-questions";
import { IndiEnGroupeQuestion } from "@/src/helpers/indicateurs-environnementaux/indi-en-types";

export const mapStrapiEstimationMateriauxToFormValues = (
  ficheSolutionMateriaux: Materiau[] | undefined,
  defaultEstimationMateriaux: EstimationFicheSolution | undefined,
) => {
  return ficheSolutionMateriaux?.map((materiau) => {
    const existingEstimation = defaultEstimationMateriaux?.estimation_materiaux?.find(
      (e) => e.materiau_id == materiau.id,
    );
    return {
      materiauId: +materiau.id,
      quantite: existingEstimation?.quantite || 0,
      coutInvestissementOverride: existingEstimation?.cout_investissement_override ?? undefined,
      coutEntretienOverride: existingEstimation?.cout_entretien_override ?? undefined,
    };
  });
};

export const mapEstimationMateriauFormToDb = (estimationMateriauForm: EstimationMateriauForm): EstimationMateriau => ({
  quantite: estimationMateriauForm.quantite,
  materiau_id: estimationMateriauForm.materiauId,
  cout_investissement_override: estimationMateriauForm.coutInvestissementOverride ?? null,
  cout_entretien_override: estimationMateriauForm.coutEntretienOverride ?? null,
});

export const mapEstimationSimpleFicheSolutionFormToDb = (
  estimationMateriauForm: EstimationSimpleFicheSolutionForm,
): SimpleEstimationFicheSolution => ({
  fiche_solution_id: estimationMateriauForm.ficheSolutionId,
  quantite: estimationMateriauForm.quantite,
  cout_investissement_override: estimationMateriauForm.coutInvestissementOverride || null,
  cout_entretien_override: estimationMateriauForm.coutEntretienOverride || null,
});

export const calculateCoeffsDiagnosticSimulation = (
  questions: ProjetIndiEnSimuation["questions"] | IndicateursEnvironnementauxFormData["questions"],
): Omit<ProjetIndiEnSimuation, "questions"> => {
  let sommeRafraichissementUrbain = 0;
  let sommeBiodiversite = 0;
  let sommePermeabilite = 0;
  let sommeCanopee = 0;
  let empriseTotale = 0;
  const sommesSurfaces: Map<IndiEnGroupeQuestion["code"], number> = new Map([]);
  questions.forEach((formQuestion) => {
    const fullQuestion = findIndiEnQuestionFromCode(formQuestion.questionCode);
    const questionGroup = findIndiEnGroupeQuestionFromQuestionCode(formQuestion.questionCode);
    sommeRafraichissementUrbain += formQuestion.quantite * (fullQuestion?.coeffRafraichissementUrbain || 0);
    sommeBiodiversite += formQuestion.quantite * (fullQuestion?.coeffBiodiversite || 0);
    sommePermeabilite += formQuestion.quantite * (fullQuestion?.coeffPermeabilite || 0);
    sommeCanopee += formQuestion.quantite * (fullQuestion?.surfaceCanopee || 0);
    if (questionGroup) {
      sommesSurfaces.set(questionGroup.code, (sommesSurfaces.get(questionGroup.code) || 0) + formQuestion.quantite);
    }

    if (fullQuestion?.priseEnCompteEmprise) {
      empriseTotale += formQuestion.quantite;
    }
  });

  return {
    coeffRafraichissementUrbain: sanitizeCoeffEnvValue(sommeRafraichissementUrbain / empriseTotale),
    coeffBiodiversite: sanitizeCoeffEnvValue(sommeBiodiversite / empriseTotale),
    coeffPermeabilite: sanitizeCoeffEnvValue(sommePermeabilite / empriseTotale),
    partCanopee: Math.min(Math.round((100 * sommeCanopee) / empriseTotale || 0), 100),
    partSurfaceVegetalisee: Math.min(
      Math.round(
        (100 * (sommesSurfaces.get(INDIEN_QUESTION_GROUPE_SURFACE_VEGETALISEE.code) || 0)) / empriseTotale || 0,
      ),
      100,
    ),
    partRevetementSol: Math.min(
      Math.round((100 * (sommesSurfaces.get(INDIEN_QUESTION_GROUPE_REVETEMENT_SOL.code) || 0)) / empriseTotale || 0),
      100,
    ),
    partFontainerie: Math.min(
      Math.round((100 * (sommesSurfaces.get(INDIEN_QUESTION_GROUPE_BASSIN.code) || 0)) / empriseTotale || 0),
      100,
    ),
    partToiture: Math.min(
      Math.round((100 * (sommesSurfaces.get(INDIEN_QUESTION_GROUPE_TOITURE.code) || 0)) / empriseTotale || 0),
      100,
    ),
  };
};

const sanitizeCoeffEnvValue = (value: number) => Math.min(Math.round((value || 0) * 100) / 100, 1);
