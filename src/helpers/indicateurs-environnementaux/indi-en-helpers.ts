import { ALL_INDIEN_QUESTIONS } from "@/src/helpers/indicateurs-environnementaux/indi-en-questions";
import { ProjetIndiEnSimuation } from "@/src/lib/prisma/prismaCustomTypes";
import { IndiEnQuestion } from "@/src/helpers/indicateurs-environnementaux/indi-en-types";
import { diagnostic_simulation } from "@/src/generated/prisma/client";

export const mapAllIndiEnQuestionsToFormValues = (projetSimulation?: ProjetIndiEnSimuation) => {
  return ALL_INDIEN_QUESTIONS?.flatMap((groupQuestion) => {
    return groupQuestion.questions.map((question) => {
      return {
        questionCode: question.code,
        quantite: getProjetValurForIndienQuestion(question.code, projetSimulation),
      };
    });
  });
};

export const getProjetValurForIndienQuestion = (
  questionnCode: IndiEnQuestion["code"],
  projetSimulation?: ProjetIndiEnSimuation,
): number => {
  return projetSimulation?.questions?.find((question) => question.questionCode === questionnCode)?.quantite || 0;
};

/**
 * Results of the project's analyse simplifiée (indicateurs environnementaux), only once the
 * user has validated it — undefined while it hasn't been made yet or is still a draft.
 */
export const getValidatedIndiEnSimulationResults = (
  projet?: { diagnostic_simulations: diagnostic_simulation[] } | null,
): ProjetIndiEnSimuation | undefined => {
  const diagnosticSimulation = projet?.diagnostic_simulations?.[0];
  if (!diagnosticSimulation?.validated || !diagnosticSimulation.initial_values) {
    return undefined;
  }
  return diagnosticSimulation.initial_values as ProjetIndiEnSimuation;
};
