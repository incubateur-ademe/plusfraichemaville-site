import {
  IndiEnGroupeQuestion,
  IndiEnQuestion,
  INDIEN_UNITE_METRE_ARBRE,
  INDIEN_UNITE_METRE_CARRE,
} from "@/src/helpers/indicateurs-environnementaux/indi-en-types";

export const INDIEN_QUESTION_NOMBRE_ARBRES_JEUNES: IndiEnQuestion = {
  code: "nbArbresJeunes",
  label: "Combien d’arbres ont été plantés au cours des 20 dernières années ?",
  unite: INDIEN_UNITE_METRE_ARBRE,
  coeffRafraichissementUrbain: 8,
  coeffBiodiversite: 5,
  coeffPermeabilite: 1,
  surfaceCanopee: 8,
  image: "/images/fiches-diagnostic/indicateurs-environnementaux/question/nbArbresJeunes.jpg",
  priseEnCompteEmprise: false,
};

export const INDIEN_QUESTION_NOMBRE_ARBRES_MOYENS: IndiEnQuestion = {
  code: "nbArbresMoyens",
  label: "Combien d’arbres ont entre 20 et 50 ans ?",
  unite: INDIEN_UNITE_METRE_ARBRE,
  coeffRafraichissementUrbain: 30,
  coeffBiodiversite: 20,
  coeffPermeabilite: 1,
  surfaceCanopee: 30,
  image: "/images/fiches-diagnostic/indicateurs-environnementaux/question/nbArbresMoyens.jpg",
  priseEnCompteEmprise: false,
};

export const INDIEN_QUESTION_NOMBRE_ARBRES_VIEUX: IndiEnQuestion = {
  code: "nbArbresVieux",
  label: "Combien d’arbres ont plus de 50 ans ?",
  unite: INDIEN_UNITE_METRE_ARBRE,
  coeffRafraichissementUrbain: 90,
  coeffBiodiversite: 70,
  coeffPermeabilite: 1,
  surfaceCanopee: 90,
  image: "/images/fiches-diagnostic/indicateurs-environnementaux/question/nbArbresMoyens.jpg",
  priseEnCompteEmprise: false,
};

export const INDIEN_QUESTION_GROUPE_ARBRE: IndiEnGroupeQuestion = {
  questions: [
    INDIEN_QUESTION_NOMBRE_ARBRES_JEUNES,
    INDIEN_QUESTION_NOMBRE_ARBRES_MOYENS,
    INDIEN_QUESTION_NOMBRE_ARBRES_VIEUX,
  ],
  label: "Arbres",
  image: "/images/fiches-diagnostic/indicateurs-environnementaux/question/groupe-arbre.svg",
};

export const INDIEN_QUESTION_SURFACE_DALLE_SOUS_SOL: IndiEnQuestion = {
  code: "surfaceDalleSousSol",
  label: "Quelle est la superficie du végétal sur dalle de sous-sol (avec une épaisseur supérieure à 20 cm) ?",
  unite: INDIEN_UNITE_METRE_CARRE,
  coeffRafraichissementUrbain: 0.4,
  coeffBiodiversite: 0.6,
  coeffPermeabilite: 0.6,
  surfaceCanopee: 0,
  image: "/images/fiches-diagnostic/indicateurs-environnementaux/question/surfaceDalleSousSol.jpg",
  priseEnCompteEmprise: true,
};

export const INDIEN_QUESTION_SURFACE_HERBACEE: IndiEnQuestion = {
  code: "surfaceHerbacee",
  label: "Quelle est la surface de pleine terre végétalisée en strate herbacée ?",
  unite: INDIEN_UNITE_METRE_CARRE,
  coeffRafraichissementUrbain: 0.5,
  coeffBiodiversite: 0.6,
  coeffPermeabilite: 1,
  surfaceCanopee: 0,
  image: "/images/fiches-diagnostic/indicateurs-environnementaux/question/surfaceHerbacee.jpg",
  priseEnCompteEmprise: true,
};

export const INDIEN_QUESTION_SURFACE_BUISSONANTE: IndiEnQuestion = {
  code: "surfaceBuissonante",
  label: "Quelle est la surface de pleine terre végétalisée en strate buissonante ?",
  unite: INDIEN_UNITE_METRE_CARRE,
  coeffRafraichissementUrbain: 0.7,
  coeffBiodiversite: 1,
  coeffPermeabilite: 1,
  surfaceCanopee: 0,
  image: "/images/fiches-diagnostic/indicateurs-environnementaux/question/surfaceBuissonante.jpg",
  priseEnCompteEmprise: true,
};

export const INDIEN_QUESTION_GROUPE_SURFACE_VEGETALISEE: IndiEnGroupeQuestion = {
  questions: [
    INDIEN_QUESTION_SURFACE_DALLE_SOUS_SOL,
    INDIEN_QUESTION_SURFACE_HERBACEE,
    INDIEN_QUESTION_SURFACE_BUISSONANTE,
  ],
  label: "Surface végétalisées au sol",
  image: "/images/fiches-diagnostic/indicateurs-environnementaux/question/groupe-surface-vegetalisee.svg",
};

export const INDIEN_QUESTION_REVETEMENT_PAVES: IndiEnQuestion = {
  code: "revetementPaves",
  label: "Quelle est la superficie totale des surfaces recouvertes de pavés à joints végétalisés ?",
  unite: INDIEN_UNITE_METRE_CARRE,
  coeffRafraichissementUrbain: 0.25,
  coeffBiodiversite: 0.3,
  coeffPermeabilite: 0.3,
  surfaceCanopee: 0,
  image: "/images/fiches-diagnostic/indicateurs-environnementaux/question/revetementPaves.jpg",
  priseEnCompteEmprise: true,
};

export const INDIEN_QUESTION_REVETEMENT_BIOSOURCES: IndiEnQuestion = {
  code: "revetementBiosources",
  label: "Quelle est la superficie totale des revêtements biosourcés ou des sols en bois fragmenté ?",
  unite: INDIEN_UNITE_METRE_CARRE,
  coeffRafraichissementUrbain: 0.2,
  coeffBiodiversite: 0.1,
  coeffPermeabilite: 0.3,
  surfaceCanopee: 0,
  image: "/images/fiches-diagnostic/indicateurs-environnementaux/question/revetementBiosources.jpg",
  priseEnCompteEmprise: true,
};

export const INDIEN_QUESTION_REVETEMENT_BETION: IndiEnQuestion = {
  code: "revetementBeton",
  label:
    "Quelle est la superficie cumulée des surfaces en béton désactivé, béton sablé, béton balayé, sol " +
    "stabilisé et sol en pierre à joint ciment ?",
  unite: INDIEN_UNITE_METRE_CARRE,
  coeffRafraichissementUrbain: 0.15,
  coeffBiodiversite: 0,
  coeffPermeabilite: 0,
  surfaceCanopee: 0,
  image: "/images/fiches-diagnostic/indicateurs-environnementaux/question/revetementBeton.jpg",
  priseEnCompteEmprise: true,
};

export const INDIEN_QUESTION_REVETEMENT_GRENAILLE: IndiEnQuestion = {
  code: "revetementGrenaille",
  label:
    "Quelle est la superficie totale des zones recouvertes d'enrobé grenaillé avec granulats clairs et de sol " +
    "souple en caoutchouc ?",
  unite: INDIEN_UNITE_METRE_CARRE,
  coeffRafraichissementUrbain: 0.1,
  coeffBiodiversite: 0,
  coeffPermeabilite: 0,
  surfaceCanopee: 0,
  image: "/images/fiches-diagnostic/indicateurs-environnementaux/question/revetementGrenaille.jpg",
  priseEnCompteEmprise: true,
};

export const INDIEN_QUESTION_REVETEMENT_BITUME: IndiEnQuestion = {
  code: "revetementBitume",
  label:
    "Quelle est la superficie totale des surfaces en enrobé bitumineux, asphalte et sols sombres sur l'espace étudié ?",
  unite: INDIEN_UNITE_METRE_CARRE,
  coeffRafraichissementUrbain: 0,
  coeffBiodiversite: 0,
  coeffPermeabilite: 0,
  surfaceCanopee: 0,
  image: "/images/fiches-diagnostic/indicateurs-environnementaux/question/revetementBitume.jpg",
  priseEnCompteEmprise: true,
};

export const INDIEN_QUESTION_GROUPE_REVETEMENT_SOL: IndiEnGroupeQuestion = {
  questions: [
    INDIEN_QUESTION_REVETEMENT_PAVES,
    INDIEN_QUESTION_REVETEMENT_BIOSOURCES,
    INDIEN_QUESTION_REVETEMENT_BETION,
    INDIEN_QUESTION_REVETEMENT_GRENAILLE,
    INDIEN_QUESTION_REVETEMENT_BITUME,
  ],
  label: "Revêtement de sol",
  image: "/images/fiches-diagnostic/indicateurs-environnementaux/question/groupe-revetement-sol.svg",
};

export const INDIEN_QUESTION_BASSIN_PAYSAGER: IndiEnQuestion = {
  code: "bassinPaysager",
  label: "Quelle est la superficie totale des bassins en eau paysagers présents sur l'espace concerné ?",
  unite: INDIEN_UNITE_METRE_CARRE,
  coeffRafraichissementUrbain: 0.8,
  coeffBiodiversite: 1,
  coeffPermeabilite: 0.5,
  surfaceCanopee: 0,
  image: "/images/fiches-diagnostic/indicateurs-environnementaux/question/bassinPaysager.jpg",
  priseEnCompteEmprise: true,
};

export const INDIEN_QUESTION_BASSIN_MINERAUX: IndiEnQuestion = {
  code: "bassinMineraux",
  label: "Quelle est la superficie des bassins minéraux sur le site ?",
  unite: INDIEN_UNITE_METRE_CARRE,
  coeffRafraichissementUrbain: 0.8,
  coeffBiodiversite: 0,
  coeffPermeabilite: 0,
  surfaceCanopee: 0,
  image: "/images/fiches-diagnostic/indicateurs-environnementaux/question/bassinMineraux.jpg",
  priseEnCompteEmprise: true,
};

export const INDIEN_QUESTION_BASSIN_FONTAINE: IndiEnQuestion = {
  code: "bassinFontaine",
  label: "Quelle est la superficie totale des zones dédiées aux fontaines à jets d'eau ou à la brumisation ?",
  unite: INDIEN_UNITE_METRE_CARRE,
  coeffRafraichissementUrbain: 1,
  coeffBiodiversite: 0,
  coeffPermeabilite: 0,
  surfaceCanopee: 0,
  image: "/images/fiches-diagnostic/indicateurs-environnementaux/question/bassinFontaine.jpg",
  priseEnCompteEmprise: true,
};

export const INDIEN_QUESTION_GROUPE_BASSIN: IndiEnGroupeQuestion = {
  questions: [INDIEN_QUESTION_BASSIN_PAYSAGER, INDIEN_QUESTION_BASSIN_MINERAUX, INDIEN_QUESTION_BASSIN_FONTAINE],
  label: "Fontainerie, bassins en eau",
  image: "/images/fiches-diagnostic/indicateurs-environnementaux/question/groupe-bassin.svg",
};

export const INDIEN_QUESTION_OMBRAGE_VEGETALISE: IndiEnQuestion = {
  code: "ombrageVegetalise",
  label: "Quelle est la superficie des structures d'ombrage végétalisées ?",
  unite: INDIEN_UNITE_METRE_CARRE,
  coeffRafraichissementUrbain: 0.7,
  coeffBiodiversite: 0.2,
  coeffPermeabilite: 0.1,
  surfaceCanopee: 1,
  image: "/images/fiches-diagnostic/indicateurs-environnementaux/question/ombrageVegetalise.jpg",
  priseEnCompteEmprise: false,
};

export const INDIEN_QUESTION_OMBRAGE_NON_VEGETALISE: IndiEnQuestion = {
  code: "ombrageNonVegetalise",
  label: "Quelle est la superficie des autres structures d'ombrage (non végétalisées) ?",
  unite: INDIEN_UNITE_METRE_CARRE,
  coeffRafraichissementUrbain: 0.5,
  coeffBiodiversite: 0,
  coeffPermeabilite: 0,
  surfaceCanopee: 1,
  image: "/images/fiches-diagnostic/indicateurs-environnementaux/question/ombrageNonVegetalise.jpg",
  priseEnCompteEmprise: false,
};

export const INDIEN_QUESTION_GROUPE_OMBRAGE: IndiEnGroupeQuestion = {
  questions: [INDIEN_QUESTION_OMBRAGE_VEGETALISE, INDIEN_QUESTION_OMBRAGE_NON_VEGETALISE],
  label: "Structures d'ombrage",
  image: "/images/fiches-diagnostic/indicateurs-environnementaux/question/groupe-ombrage.svg",
};

export const INDIEN_QUESTION_TOITURE_TUILES: IndiEnQuestion = {
  code: "toitureTuile",
  label: "Quelle est la superficie des toitures recouvertes de tuiles ?",
  unite: INDIEN_UNITE_METRE_CARRE,
  coeffRafraichissementUrbain: 0.1,
  coeffBiodiversite: 0,
  coeffPermeabilite: 0,
  surfaceCanopee: 0,
  image: "/images/fiches-diagnostic/indicateurs-environnementaux/question/toitureTuile.jpg",
  priseEnCompteEmprise: true,
};

export const INDIEN_QUESTION_TOITURE_CLAIRE: IndiEnQuestion = {
  code: "toitureClaire",
  label: "Quelle est la superficie totale des toitures claires (bac acier clair, étanchéité EPDM) ?",
  unite: INDIEN_UNITE_METRE_CARRE,
  coeffRafraichissementUrbain: 0.3,
  coeffBiodiversite: 0,
  coeffPermeabilite: 0,
  surfaceCanopee: 0,
  image: "/images/fiches-diagnostic/indicateurs-environnementaux/question/toitureClaire.jpg",
  priseEnCompteEmprise: true,
};

export const INDIEN_QUESTION_TOITURE_FONCEE: IndiEnQuestion = {
  code: "toitureFoncee",
  label: "Quelle est la superficie totale des toitures foncées (ardoise, bac acier noir, bitumineuses) ?",
  unite: INDIEN_UNITE_METRE_CARRE,
  coeffRafraichissementUrbain: 0,
  coeffBiodiversite: 0,
  coeffPermeabilite: 0,
  surfaceCanopee: 0,
  image: "/images/fiches-diagnostic/indicateurs-environnementaux/question/toitureFoncee.jpg",
  priseEnCompteEmprise: true,
};

export const INDIEN_QUESTION_TOITURE_VEGETALISEE_MINCE: IndiEnQuestion = {
  code: "toitureVegetaliseeMince",
  label: "Quelle est la superficie des toitures végétalisées intensives (épaisseur inférieur à 10 cm) ?",
  unite: INDIEN_UNITE_METRE_CARRE,
  coeffRafraichissementUrbain: 0.2,
  coeffBiodiversite: 0.3,
  coeffPermeabilite: 0.2,
  surfaceCanopee: 0,
  image: "/images/fiches-diagnostic/indicateurs-environnementaux/question/toitureVegetaliseeMince.jpg",
  priseEnCompteEmprise: true,
};

export const INDIEN_QUESTION_TOITURE_VEGETALISEE_EPAISSE: IndiEnQuestion = {
  code: "toitureVegetaliseeEpaisse",
  label: "Quelle est la surface de toit végétalisé intensif (épaisseur supérieure à 10 cm) ?",
  unite: INDIEN_UNITE_METRE_CARRE,
  coeffRafraichissementUrbain: 0.3,
  coeffBiodiversite: 0.3,
  coeffPermeabilite: 0.4,
  surfaceCanopee: 0,
  image: "/images/fiches-diagnostic/indicateurs-environnementaux/question/toitureVegetaliseeEpaisse.jpg",
  priseEnCompteEmprise: true,
};

export const INDIEN_QUESTION_TOITURE_PANNEAU_PHOTO: IndiEnQuestion = {
  code: "toiturePanneauxPhoto",
  label: "Quelle est la superficie des toitures équipées de panneaux photovoltaïques ?",
  unite: INDIEN_UNITE_METRE_CARRE,
  coeffRafraichissementUrbain: 0.2,
  coeffBiodiversite: 0,
  coeffPermeabilite: 0,
  surfaceCanopee: 0,
  image: "/images/fiches-diagnostic/indicateurs-environnementaux/question/toiturePanneauxPhoto.jpg",
  priseEnCompteEmprise: true,
};

export const INDIEN_QUESTION_GROUPE_TOITURE: IndiEnGroupeQuestion = {
  questions: [
    INDIEN_QUESTION_TOITURE_TUILES,
    INDIEN_QUESTION_TOITURE_CLAIRE,
    INDIEN_QUESTION_TOITURE_FONCEE,
    INDIEN_QUESTION_TOITURE_VEGETALISEE_MINCE,
    INDIEN_QUESTION_TOITURE_VEGETALISEE_EPAISSE,
    INDIEN_QUESTION_TOITURE_PANNEAU_PHOTO,
  ],
  label: "Toitures",
  image: "/images/fiches-diagnostic/indicateurs-environnementaux/question/groupe-toiture.svg",
};

export const ALL_INDIEN_QUESTIONS = [
  INDIEN_QUESTION_GROUPE_ARBRE,
  INDIEN_QUESTION_GROUPE_SURFACE_VEGETALISEE,
  INDIEN_QUESTION_GROUPE_REVETEMENT_SOL,
  INDIEN_QUESTION_GROUPE_BASSIN,
  INDIEN_QUESTION_GROUPE_OMBRAGE,
  INDIEN_QUESTION_GROUPE_TOITURE,
];

export const findIndiEnQuestionFromCode = (code: string) => {
  const allQuestions = ALL_INDIEN_QUESTIONS.flatMap((groupe) => groupe.questions);
  return allQuestions.find((question) => question.code === code);
};
