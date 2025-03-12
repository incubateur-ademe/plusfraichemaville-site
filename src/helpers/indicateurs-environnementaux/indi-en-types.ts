export type INDIEN_QUESTION_UNITE = {
  label: string;
};

export const INDIEN_UNITE_METRE_CARRE : INDIEN_QUESTION_UNITE = {
  label: "m²",
};

export const INDIEN_UNITE_METRE_ARBRE : INDIEN_QUESTION_UNITE = {
  label: "arbre",
};


export type INDIEN_QUESTION = {
  code: string;
  label: string;
  moreInfo?: string;
  image: string;
  coeffRafraichissementUrbain: number;
  coeffBiodiversite: number;
  coeffPermeabilite: number;
  surfaceCanopee: number;
  unite: INDIEN_QUESTION_UNITE;
};

export type INDIEN_GORUPE_QUESTIONS = {
  label: string;
  image: string;
  questions: INDIEN_QUESTION[];
}


export type INDIEN_ITEM_SAISIE = {
  questionCode: INDIEN_QUESTION["code"];
  quantite: number;
};

