import {
  IndiEnGroupeQuestion,
  IndiEnQuestion,
  INDIEN_UNITE_METRE_ARBRE,
  INDIEN_UNITE_METRE_CARRE,
} from "@/src/helpers/indicateurs-environnementaux/indi-en-types";

export const INDIEN_QUESTION_SURFACE_HERBACEE: IndiEnQuestion = {
  code: "surfaceHerbacee",
  label: "Quelle est la surface de pleine terre végétalisée en strate herbacée ?",
  unite: INDIEN_UNITE_METRE_CARRE,
  coeffRafraichissementUrbain: 0.5,
  coeffBiodiversite: 0.6,
  coeffPermeabilite: 1,
  surfaceCanopee: 0,
  image: "/images/fiches-diagnostic/indicateurs-environnementaux/question/surface-herbacee.jpg",
  priseEnCompteEmprise: true,
};

export const INDIEN_QUESTION_SURFACE_BUISSONANTE: IndiEnQuestion = {
  code: "surfaceBsuissonante",
  label: "Quelle est la surface de pleine terre végétalisée en strate buissonante ?",
  unite: INDIEN_UNITE_METRE_CARRE,
  coeffRafraichissementUrbain: 0.7,
  coeffBiodiversite: 1,
  coeffPermeabilite: 1,
  surfaceCanopee: 0,
  image: "/images/fiches-diagnostic/indicateurs-environnementaux/question/surface-bassin-paysager.jpg",
  priseEnCompteEmprise: true,
};

export const INDIEN_QUESTION_NOMBRE_ARBRES_JEUNES: IndiEnQuestion = {
  code: "nbArbresJeunes",
  label: "Combien existe-t-il d'arbres avec un âge inférieur à 20 ans ?",
  unite: INDIEN_UNITE_METRE_ARBRE,
  coeffRafraichissementUrbain: 8,
  coeffBiodiversite: 5,
  coeffPermeabilite: 1,
  surfaceCanopee: 8,
  image: "/images/fiches-diagnostic/indicateurs-environnementaux/question/nombre-arbres-jeunes.jpg",
  priseEnCompteEmprise: false,
};

export const INDIEN_QUESTION_GROUPE_ARBRE: IndiEnGroupeQuestion = {
  questions: [INDIEN_QUESTION_NOMBRE_ARBRES_JEUNES],
  label: "Arbres",
  image: "/images/fiches-diagnostic/indicateurs-environnementaux/question/groupe-arbre.svg",
};

export const INDIEN_QUESTION_GROUPE_SURFACE_VEGETALISEE: IndiEnGroupeQuestion = {
  questions: [INDIEN_QUESTION_SURFACE_HERBACEE, INDIEN_QUESTION_SURFACE_BUISSONANTE],
  label: "Surface végétalisées au sol",
  image: "/images/fiches-diagnostic/indicateurs-environnementaux/question/groupe-surface-vegetalisee.svg",
};

export const ALL_INDIEN_QUESTIONS = [INDIEN_QUESTION_GROUPE_ARBRE, INDIEN_QUESTION_GROUPE_SURFACE_VEGETALISEE];

export const findIndiEnQuestionFromCode = (code: string) => {
  const allQuestions = ALL_INDIEN_QUESTIONS.flatMap((groupe) => groupe.questions);
  return allQuestions.find((question) => question.code === code);
};
