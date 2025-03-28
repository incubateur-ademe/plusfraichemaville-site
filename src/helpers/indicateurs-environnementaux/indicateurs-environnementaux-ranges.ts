export type IndienRangeType = {
  maxValue: number;
  title: string;
};

export const INDIEN_RAFRAICHISSEMENT_URBAIN_RANGE_1: IndienRangeType = {
  maxValue: 0.2,
  title:
    "Espace qui participe fortement à la surchauffe urbaine : il participe à l'îlot de chaleur urbain et a un " +
    "inconfort thermique très élevé",
};

export const INDIEN_RAFRAICHISSEMENT_URBAIN_RANGE_2: IndienRangeType = {
  maxValue: 0.4,
  title:
    "Espace qui participe moyennement à la surchauffe urbaine :  il participe moyennement à l'îlot de chaleur urbain " +
    "avec un inconfort thermique modéré",
};

export const INDIEN_RAFRAICHISSEMENT_URBAIN_RANGE_3: IndienRangeType = {
  maxValue: 0.6,
  title: "Espace qui a un impact neutre sur la surchauffe urbaine",
};
export const INDIEN_RAFRAICHISSEMENT_URBAIN_RANGE_4: IndienRangeType = {
  maxValue: 0.8,
  title: "Espace qui participe au rafraichissement urbain",
};
export const INDIEN_RAFRAICHISSEMENT_URBAIN_RANGE_5: IndienRangeType = {
  maxValue: Infinity,
  title: "Espace véritable refuge de fraîcheur",
};

export const INDIEN_PERMEABILITE_RANGE_1: IndienRangeType = {
  maxValue: 0.2,
  title: "Espace très imperméable avec un fort ruissellement des eaux en cas de pluie",
};

export const INDIEN_PERMEABILITE_RANGE_2: IndienRangeType = {
  maxValue: 0.4,
  title: "Espace plutôt imperméable avec ruissellement des eaux en cas de pluie",
};

export const INDIEN_PERMEABILITE_RANGE_3: IndienRangeType = {
  maxValue: 0.6,
  title: "Espace moyennement perméable, plutôt favorable à l'infiltration et au tamponnage des eaux de pluie en " +
    "milieu urbain",
};

export const INDIEN_PERMEABILITE_RANGE_4: IndienRangeType = {
  maxValue: 0.8,
  title: "Espace perméable favorable à l'infiltration et au tamponnage des eaux de pluie",
};

export const INDIEN_PERMEABILITE_RANGE_5: IndienRangeType = {
  maxValue: Infinity,
  title: "Espace très perméable très favorable à l'infiltration et au tamponnage des eaux de pluie",
};

export const INDIEN_BIODIVERSITE_RANGE_1: IndienRangeType = {
  maxValue: 0.15,
  title: "Espace avec un très faible potentiel d'accueil de la biodiversité",
};

export const INDIEN_BIODIVERSITE_RANGE_2: IndienRangeType = {
  maxValue: 0.25,
  title: "Espace avec un faible potentiel d'accueil de la biodiversité",
};

export const INDIEN_BIODIVERSITE_RANGE_3: IndienRangeType = {
  maxValue: 0.35,
  title: "Espace avec un potentiel d'accueil de la biodiversité ",
};

export const INDIEN_BIODIVERSITE_RANGE_4: IndienRangeType = {
  maxValue: 0.6,
  title: "Espace avec un bon potentiel d'accueil de la biodiversité",
};

export const INDIEN_BIODIVERSITE_RANGE_5: IndienRangeType = {
  maxValue: Infinity,
  title: "Espace avec une potentiel d'écosystème relais pour la biodiversité",
};

export const INDIEN_CANOPE_RANGE_1: IndienRangeType = {
  maxValue: 33,
  title: "La part de canopée est faible",
};
export const INDIEN_CANOPE_RANGE_2: IndienRangeType = {
  maxValue: 66,
  title: "La part de canopée est moyenne",
};
export const INDIEN_CANOPE_RANGE_3: IndienRangeType = {
  maxValue: Infinity,
  title: "La part de canopée est importante",
};
