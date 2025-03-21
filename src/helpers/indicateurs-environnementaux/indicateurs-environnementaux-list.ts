import {
  INDIEN_BIODIVERSITE_RANGE_1,
  INDIEN_CANOPE_RANGE_1,
  INDIEN_PERMEABILITE_RANGE_1,
  INDIEN_RAFRAICHISSEMENT_URBAIN_RANGE_1,
  INDIEN_RAFRAICHISSEMENT_URBAIN_RANGE_2,
  IndienRangeType,
} from "@/src/helpers/indicateurs-environnementaux/indicateurs-environnementaux-ranges";

export type IndienType = {
  label: string;
  explanation: string;
  icone: string;
  textColor: string;
  scale?: {
    image: string;
    steps: number;
    minLabel: string;
    maxLabel: string;
  };
  ranges: IndienRangeType[];
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
  scale: {
    image: "/images/fiches-diagnostic/indicateurs-environnementaux/echelle-rafraichissement-urbain.svg",
    steps: 4,
    minLabel: "Espace public très réchauffant",
    maxLabel: "Espace public très rafraîchissant",
  },
  ranges: [INDIEN_RAFRAICHISSEMENT_URBAIN_RANGE_1, INDIEN_RAFRAICHISSEMENT_URBAIN_RANGE_2],
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
  scale: {
    image: "/images/fiches-diagnostic/indicateurs-environnementaux/echelle-permeabilite.svg",
    steps: 0,
    minLabel: "Sols très imperméables",
    maxLabel: "Sols très perméables",
  },
  ranges: [INDIEN_PERMEABILITE_RANGE_1],
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
  scale: {
    image: "/images/fiches-diagnostic/indicateurs-environnementaux/echelle-biodiversite.svg",
    steps: 0,
    minLabel: "Biodiversité inexistante",
    maxLabel: "Potentiel écosystème-relais",
  },
  ranges: [INDIEN_BIODIVERSITE_RANGE_1],
};

export const INDIEN_CANOPEE = {
  label: "Part de canopée",
  explanation:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod  tempor incididunt ut " +
    "labore et dolore magna aliqua. Ut enim ad minim  veniam, quis nostrud exercitation",
  icone: "/images/fiches-diagnostic/indicateurs-environnementaux/canopee.svg",
  textColor: "text-coeff-canopee",
  ranges: [INDIEN_CANOPE_RANGE_1],
};

export const getRangeFromValue = (value: number, indienType: IndienType) => {
  return indienType.ranges.find((range) => range.maxValue >= value) || indienType.ranges[0];
};
