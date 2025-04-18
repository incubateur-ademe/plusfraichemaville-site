import { ReactNode } from "react";
import { TypeSolution } from "@/src/lib/strapi/types/api/fiche-solution";

export type TypeFicheSolutionExample = { slug: string; title: string };

export type TypeFicheSolution = {
  code: TypeSolution;
  label: string;
  bannerClass: string;
  colorClass: string;
  titleExplanation: string;
  explanation: string;
  cardImage: string;
  icon: (_?: string) => ReactNode;
  coloredIcon: (_?: string) => ReactNode;
  exampleCards: TypeFicheSolutionExample[];
  textButton: string;
};

export const TYPE_SOLUTION_VERTE: TypeFicheSolution = {
  code: TypeSolution.Verte,
  label: "Solution verte",
  bannerClass: " greenSolutionBanner ",
  colorClass: " typeSolutionGreenIcon ",
  titleExplanation: "Les solutions vertes",
  explanation:
    "Une solution verte est une solution de végétalisation qui fonctionne grâce " +
    "à l’action conjointe de l’évapotranspiration et de l’ombrage.",
  cardImage: "/images/homepage/solution-verte.jpg",
  icon: (extraClasses?) => <i className={`fr-icon-leaf-fill ${extraClasses}`} />,
  coloredIcon: (extraClasses?) => <i className={`fr-icon-leaf-fill typeSolutionGreenIcon ${extraClasses}`} />,
  exampleCards: [
    { title: "Planter un  arbre", slug: "planter-un-arbre" },
    { title: "Toiture végétalisée", slug: "toiture-vegetalisee" },
    { title: "Façade végétalisée", slug: "facade-vegetalisee" },
  ],
  textButton: "Voir les solutions vertes",
};

export const TYPE_SOLUTION_BLEUE: TypeFicheSolution = {
  code: TypeSolution.Bleue,
  label: "Solution bleue",
  bannerClass: " blueSolutionBanner ",
  colorClass: " typeSolutionBlueIcon ",
  titleExplanation: "Les solutions bleues",
  explanation:
    "Une solution bleue est liée à la présence et à la gestion de l'eau " +
    "en ville qui amplifie l'effet de rafraîchissement des espaces végétalisés.",
  cardImage: "/images/homepage/solution-bleue.jpg",
  icon: (extraClasses?) => <i className={`ri-drop-fill ${extraClasses}`} />,
  coloredIcon: (extraClasses?) => <i className={`ri-drop-fill typeSolutionBlueIcon ${extraClasses}`} />,
  exampleCards: [
    { title: "Désimperméabilisation", slug: "desimpermabilisation" },
    { title: "Fontaines et réseaux de fontainerie", slug: "fontaines-reseau-fontainerie" },
    { title: "Jeux d'eau", slug: "jeux-eau" },
  ],
  textButton: "Voir les solutions bleues",
};

export const TYPE_SOLUTION_GRISE: TypeFicheSolution = {
  code: TypeSolution.Grise,
  label: "Solution grise",
  bannerClass: " graySolutionBanner ",
  colorClass: " typeSolutionGrayIcon ",
  titleExplanation: "Les solutions grises",
  explanation:
    "Une solution grise agit sur lesmatériaux utilisés dans " +
    "la construction de la voirie, des bâtiments et sur les morphologies urbaines.",
  cardImage: "/images/homepage/solution-grise.jpg",
  icon: (extraClasses?) => <i className={`ri-home-fill ${extraClasses}`} />,
  coloredIcon: (extraClasses?) => <i className={`ri-home-fill typeSolutionGrayIcon ${extraClasses}`} />,
  exampleCards: [
    { title: "Revêtement à albédo élevé", slug: "revetement-albedo-eleve" },
    { title: "Revêtement drainant / perméable", slug: "revetement-drainant" },
    { title: "Structure d'ombrage", slug: "structure-ombrage" },
  ],
  textButton: "Voir les solutions grises",
};

export const TYPE_SOLUTION_DOUCE: TypeFicheSolution = {
  code: TypeSolution.Douce,
  label: "Solution douce",
  bannerClass: " softSolutionBanner ",
  colorClass: " typeSolutionSoftIcon ",
  titleExplanation: "Les solutions douces",
  explanation:
    "Une solution douce désigne l’accompagnement des changements de comportement, " +
    "d’usages et de pratiques face aux fortes chaleurs.",
  cardImage: "/images/homepage/solution-douce.jpg",
  icon: (extraClasses?) => <i className={`ri-user-voice-fill ${extraClasses}`} />,
  coloredIcon: (extraClasses?) => <i className={`ri-user-voice-fill typeSolutionSoftIcon ${extraClasses}`} />,
  exampleCards: [
    { title: "Comportements individuels face à la chaleur", slug: "comportements-individuels" },
    { title: "Comportements collectifs face à la chaleur", slug: "comportements-collectifs" },
  ],
  textButton: "Voir les solutions douces",
};

export const ALL_TYPES_SOLUTION: TypeFicheSolution[] = [
  TYPE_SOLUTION_VERTE,
  TYPE_SOLUTION_BLEUE,
  TYPE_SOLUTION_GRISE,
  TYPE_SOLUTION_DOUCE,
];

export const getTypeSolutionFromCode = (typeSolutionCode?: string | null) =>
  typeSolutionCode ? ALL_TYPES_SOLUTION.find((r) => r.code === typeSolutionCode) : null;
