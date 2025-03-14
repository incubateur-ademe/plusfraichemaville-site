import { ALL_INDIEN_QUESTIONS } from "@/src/helpers/indicateurs-environnementaux/indi-en-questions";

export const mapAllIndiEnQuestionsToFormValues = () => {
  return ALL_INDIEN_QUESTIONS?.flatMap((groupQuestion) => {
    return groupQuestion.questions.map((question) => {
      return {
        code: question.code,
        quantite: 0,
      };
    });
  });
};
