export type IndiEnQuestionUnite = {
  label: string;
};

export const INDIEN_UNITE_METRE_CARRE: IndiEnQuestionUnite = {
  label: "m²",
};

export const INDIEN_UNITE_METRE_ARBRE: IndiEnQuestionUnite = {
  label: "arbres",
};

export type IndiEnQuestion = {
  code: string;
  label: string;
  moreInfo?: string;
  image: string;
  coeffRafraichissementUrbain: number;
  coeffBiodiversite: number;
  coeffPermeabilite: number;
  surfaceCanopee: number;
  priseEnCompteEmprise: boolean;
  unite: IndiEnQuestionUnite;
};

export type IndiEnGroupeQuestion = {
  label: string;
  image: string;
  questions: IndiEnQuestion[];
};
