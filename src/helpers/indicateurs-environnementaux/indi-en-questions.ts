import {
  INDIEN_GORUPE_QUESTIONS,
  INDIEN_QUESTION,
  INDIEN_UNITE_METRE_ARBRE,
  INDIEN_UNITE_METRE_CARRE,
} from "@/src/helpers/indicateurs-environnementaux/indi-en-types";

export const INDIEN_QUESTION_SURFACE_HERBACEE: INDIEN_QUESTION = {
  code: "surfaceHerbacee",
  label: "Quelle est la surface de pleine terre végétalisée en strate herbacée ?",
  unite: INDIEN_UNITE_METRE_CARRE,
  coeffRafraichissementUrbain: 0.5,
  coeffBiodiversite: 0.6,
  coeffPermeabilite: 0.8,
  surfaceCanopee: 0,
  image: "/images/fiches-diagnostic/indicateurs-environnementaux/question/surface-herbacee.jpg",
};

export const INDIEN_QUESTION_SURFACE_BASSIN_PAYSAGER: INDIEN_QUESTION = {
  code: "surfaceBassinPaysager",
  label: "Quelle est la surface des bassins secs ou noues paysagées pour la gestion des eaux d'orage ?",
  unite: INDIEN_UNITE_METRE_CARRE,
  coeffRafraichissementUrbain: 0.8,
  coeffBiodiversite: 1,
  coeffPermeabilite: 0.1,
  surfaceCanopee: 0,
  image: "/images/fiches-diagnostic/indicateurs-environnementaux/question/surface-bassin-paysager.jpg",
};

export const INDIEN_QUESTION_NOMBRE_ARBRES_JEUNES: INDIEN_QUESTION = {
  code: "nbArbresJeunes",
  label: "Combien existe-t-il d'arbres avec un âge inférieur à 20 ans) ?",
  unite: INDIEN_UNITE_METRE_ARBRE,
  coeffRafraichissementUrbain: 8,
  coeffBiodiversite: 5,
  coeffPermeabilite: 1,
  surfaceCanopee: 8,
  image: "/images/fiches-diagnostic/indicateurs-environnementaux/question/nombre-arbres-jeunes.jpg",
};

export const INDIEN_QUESTION_GROUPE_ARBRE: INDIEN_GORUPE_QUESTIONS = {
  questions: [INDIEN_QUESTION_NOMBRE_ARBRES_JEUNES],
  label: "Arbres",
  image: "/images/fiches-diagnostic/indicateurs-environnementaux/question/groupe-arbre.svg",
};

export const INDIEN_QUESTION_GROUPE_SURFACE_VEGETALISEE: INDIEN_GORUPE_QUESTIONS = {
  questions: [INDIEN_QUESTION_SURFACE_HERBACEE, INDIEN_QUESTION_SURFACE_BASSIN_PAYSAGER],
  label: "Surface végétalisées au sol",
  image: "/images/fiches-diagnostic/indicateurs-environnementaux/question/groupe-surface-vegetalisee.svg",
};

export const ALL_INDIEN_QUESTIONS = [INDIEN_QUESTION_GROUPE_ARBRE, INDIEN_QUESTION_GROUPE_SURFACE_VEGETALISEE];
