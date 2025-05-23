import {
  INDIEN_BIODIVERSITE_RANGE_1,
  INDIEN_BIODIVERSITE_RANGE_2,
  INDIEN_BIODIVERSITE_RANGE_3,
  INDIEN_BIODIVERSITE_RANGE_4,
  INDIEN_BIODIVERSITE_RANGE_5,
  INDIEN_CANOPE_RANGE_1,
  INDIEN_CANOPE_RANGE_2,
  INDIEN_CANOPE_RANGE_3,
  INDIEN_PERMEABILITE_RANGE_1,
  INDIEN_PERMEABILITE_RANGE_2,
  INDIEN_PERMEABILITE_RANGE_3,
  INDIEN_PERMEABILITE_RANGE_4,
  INDIEN_PERMEABILITE_RANGE_5,
  INDIEN_RAFRAICHISSEMENT_URBAIN_RANGE_1,
  INDIEN_RAFRAICHISSEMENT_URBAIN_RANGE_2,
  INDIEN_RAFRAICHISSEMENT_URBAIN_RANGE_3,
  INDIEN_RAFRAICHISSEMENT_URBAIN_RANGE_4,
  INDIEN_RAFRAICHISSEMENT_URBAIN_RANGE_5,
  IndienRangeType,
} from "@/src/helpers/indicateurs-environnementaux/indicateurs-environnementaux-ranges";

export type IndienType = {
  label: string;
  explanation: string;
  icone: string;
  textColor: string;
  ranges: IndienRangeType[];
  explanationTitle: string;
  scale?: {
    image: string;
    steps: number;
    minLabel: string;
    maxLabel: string;
  };
};

export const INDIEN_RAFRAICHISSEMENT_URBAIN: IndienType = {
  label: "Rafraîchissement urbain",
  explanation:
    "Il évalue l’impact des surfaces sur la surchauffe urbaine (îlot de chaleur et confort extérieur en " +
    "été) en fonction de plusieurs critères : leur capacité à réfléchir la chaleur (albédo), à l’absorber ou la " +
    "restituer (inertie thermique), l’évaporation de l’eau et la transpiration des végétaux. Cet indicateur compare " +
    "l’efficacité des solutions entre elles sans fournir de valeur absolue. Il s’applique principalement aux climats " +
    "tempérés et méditerranéens, actuels et futurs en France métropolitaine.",
  icone: "/images/fiches-diagnostic/indicateurs-environnementaux/rafraichissement-urbain.svg",
  textColor: "text-coeff-rafraichissement-urbain",
  ranges: [
    INDIEN_RAFRAICHISSEMENT_URBAIN_RANGE_1,
    INDIEN_RAFRAICHISSEMENT_URBAIN_RANGE_2,
    INDIEN_RAFRAICHISSEMENT_URBAIN_RANGE_3,
    INDIEN_RAFRAICHISSEMENT_URBAIN_RANGE_4,
    INDIEN_RAFRAICHISSEMENT_URBAIN_RANGE_5,
  ],
  explanationTitle: "Qu'est ce que le coefficient de rafraîchissement urbain ?",
  scale: {
    image: "/images/fiches-diagnostic/indicateurs-environnementaux/echelle-rafraichissement-urbain.svg",
    steps: 4,
    minLabel: "Espace public très réchauffant",
    maxLabel: "Espace public très rafraîchissant",
  },
};

export const INDIEN_PERMEABILITE: IndienType = {
  label: "Perméabilité",
  explanation:
    "Il mesure la capacité d’un sol à infiltrer l’eau de pluie, sur une échelle de 0 (surface totalement " +
    "imperméable) à 1 (surface entièrement perméable). Cet indicateur simplifié ne prend pas en compte l’intensité " +
    "des pluies ni la pente du terrain. Il donne une tendance sur la gestion des eaux pluviales, mais ne permet pas " +
    "un dimensionnement précis des infrastructures de rétention.",
  icone: "/images/fiches-diagnostic/indicateurs-environnementaux/permeabilite.svg",
  textColor: "text-coeff-permeabilite",
  ranges: [
    INDIEN_PERMEABILITE_RANGE_1,
    INDIEN_PERMEABILITE_RANGE_2,
    INDIEN_PERMEABILITE_RANGE_3,
    INDIEN_PERMEABILITE_RANGE_4,
    INDIEN_PERMEABILITE_RANGE_5,
  ],
  explanationTitle: "Qu'est ce que le coefficient de perméabilité ?",
  scale: {
    image: "/images/fiches-diagnostic/indicateurs-environnementaux/echelle-permeabilite.svg",
    steps: 0,
    minLabel: "Sols très imperméables",
    maxLabel: "Sols très perméables",
  },
};

export const INDIEN_BIODIVERSITE: IndienType = {
  label: "Biodiversité",
  explanation:
    "Il évalue le potentiel d’un espace à accueillir la biodiversité, sur une échelle de 0 (surface " +
    "totalement minérale) à 1 (espace végétalisé comme un parc). Il prend en compte le type de végétation (prairie, " +
    "buissons, canopée, etc.), et la présence d’arbres augmente la valeur. Cet indicateur mesure un potentiel " +
    "d’accueil, mais ne garantit pas la présence effective des espèces après aménagement.",
  icone: "/images/fiches-diagnostic/indicateurs-environnementaux/biodiversite.svg",
  textColor: "text-coeff-biodiversite",
  ranges: [
    INDIEN_BIODIVERSITE_RANGE_1,
    INDIEN_BIODIVERSITE_RANGE_2,
    INDIEN_BIODIVERSITE_RANGE_3,
    INDIEN_BIODIVERSITE_RANGE_4,
    INDIEN_BIODIVERSITE_RANGE_5,
  ],
  explanationTitle: "Qu'est ce que le coefficient de biodiversité ?",
  scale: {
    image: "/images/fiches-diagnostic/indicateurs-environnementaux/echelle-biodiversite.svg",
    steps: 0,
    minLabel: "Biodiversité inexistante",
    maxLabel: "Potentiel écosystème-relais",
  },
};

export const INDIEN_CANOPEE = {
  label: "Part de canopée",
  explanation: "Il s’agit de la part de surface de canopée par rapport à la surface au sol.",
  icone: "/images/fiches-diagnostic/indicateurs-environnementaux/canopee.svg",
  textColor: "text-coeff-canopee",
  ranges: [INDIEN_CANOPE_RANGE_1, INDIEN_CANOPE_RANGE_2, INDIEN_CANOPE_RANGE_3],
  explanationTitle: "Qu'est ce que la part de canopée ?",
};

export const getRangeFromValue = (value: number, indienType: IndienType) => {
  return indienType.ranges.find((range) => range.maxValue > value) || indienType.ranges[0];
};
