import { ALL_INDIEN_QUESTIONS } from "@/src/helpers/indicateurs-environnementaux/indi-en-questions";
import { ProjetIndiEnSimuation } from "@/src/lib/prisma/prismaCustomTypes";
import { IndiEnQuestion } from "@/src/helpers/indicateurs-environnementaux/indi-en-types";

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
  return projetSimulation?.questions.find((question) => question.questionCode === questionnCode)?.quantite || 0;
};
