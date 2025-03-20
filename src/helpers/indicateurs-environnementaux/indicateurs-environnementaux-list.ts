export type IndienType = {
  label: string;
  explanation: string;
  icone: string;
  textColor: string;
  scaleImage: string;
  scaleSteps: number;
  scaleMinLabel: string;
  scaleMaxLabel: string;
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
  scaleImage: "/images/fiches-diagnostic/indicateurs-environnementaux/echelle-rafraichissement-urbain.svg",
  scaleSteps: 4,
  scaleMinLabel: "Espace public très réchauffant",
  scaleMaxLabel: "Espace public très rafraîchissant",
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
  scaleImage: "/images/fiches-diagnostic/indicateurs-environnementaux/echelle-permeabilite.svg",
  scaleSteps: 0,
  scaleMinLabel: "Sols très imperméables",
  scaleMaxLabel: "Sols très perméables",
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
  scaleImage: "/images/fiches-diagnostic/indicateurs-environnementaux/echelle-biodiversite.svg",
  scaleSteps: 0,
  scaleMinLabel: "Biodiversité inexistante",
  scaleMaxLabel: "Potentiel écosystème-relais",
};

export const INDIEN_CANOPEE = {
  label: "Part de canopée",
  explanation:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod  tempor incididunt ut " +
    "labore et dolore magna aliqua. Ut enim ad minim  veniam, quis nostrud exercitation",
  icone: "/images/fiches-diagnostic/indicateurs-environnementaux/canopee.svg",
  textColor: "text-coeff-canopee",
};
