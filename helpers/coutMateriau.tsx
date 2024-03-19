import { GetValues } from "@/lib/strapi/types/types";
import { EstimationMateriauxFicheSolution } from "@/lib/prisma/prismaCustomTypes";
import sumBy from "lodash/sumBy";

type UniteCoutMateriau = {
  code: string;
  unitLabel: string;
  estimationLabel: string;
};

const UNITE_COUT_MATERIAU_LINEAIRE: UniteCoutMateriau = {
  code: "lineaire",
  unitLabel: "mètre linéaire",
  estimationLabel: "Nombre de mètre linéaire",
};
const UNITE_COUT_MATERIAU_METRE_CARRE: UniteCoutMateriau = {
  code: "metreCarre",
  unitLabel: "m²",
  estimationLabel: "Nombre de m²",
};
const UNITE_COUT_MATERIAU_METRE_CUBE: UniteCoutMateriau = {
  code: "metreCube",
  unitLabel: "m³",
  estimationLabel: "Nombre de m³",
};
const UNITE_COUT_MATERIAU_UNITE: UniteCoutMateriau = {
  code: "unite",
  unitLabel: "unité",
  estimationLabel: "Nombre d'unité",
};

export const ALL_UNITES_COUT_MATERIAU: UniteCoutMateriau[] = [
  UNITE_COUT_MATERIAU_LINEAIRE,
  UNITE_COUT_MATERIAU_METRE_CARRE,
  UNITE_COUT_MATERIAU_METRE_CUBE,
  UNITE_COUT_MATERIAU_UNITE,
];

export const getUniteCoutMateriauFromCode = (code?: string) =>
  ALL_UNITES_COUT_MATERIAU.find((cout) => cout.code === code) || UNITE_COUT_MATERIAU_METRE_CARRE;

export const getLabelCoutFourniture = (materiau: GetValues<"api::materiau.materiau">) =>
  materiau.cout_minimum_fourniture != null && materiau.cout_maximum_fourniture != null
    ? `${materiau.cout_minimum_fourniture} - ${materiau.cout_maximum_fourniture} € HT / ${
        getUniteCoutMateriauFromCode(materiau.cout_unite).unitLabel
      }`
    : "NA";

export const getLabelCoutFournitureByQuantite = (
  materiau: GetValues<"api::materiau.materiau"> | undefined,
  quantite: number,
) =>
  materiau && materiau.cout_minimum_fourniture && materiau.cout_maximum_fourniture && quantite
    ? `${materiau.cout_minimum_fourniture * quantite} - ${materiau.cout_maximum_fourniture * quantite} €`
    : "0 €";

export const getLabelCoutEntretien = (materiau: GetValues<"api::materiau.materiau">) =>
  materiau.cout_minimum_entretien != null && materiau.cout_maximum_entretien != null
    ? `${materiau.cout_minimum_entretien} - ${materiau.cout_maximum_entretien} € HT / ${
        getUniteCoutMateriauFromCode(materiau.cout_unite).unitLabel
      } / an`
    : "NA";

export const getLabelCoutEntretienByQuantite = (
  materiau: GetValues<"api::materiau.materiau"> | undefined,
  quantite: number,
) =>
  materiau && materiau.cout_minimum_entretien && materiau.cout_maximum_entretien && quantite
    ? `${materiau.cout_minimum_entretien * quantite} - ${materiau.cout_maximum_entretien * quantite} € / an`
    : "0 € / an";

export const computeGlobalFicheSolutionPrice = (estimationMateriaux: EstimationMateriauxFicheSolution[] | null) => {
  return {
    fourniture: {
      min: sumBy(estimationMateriaux, "coutMinInvestissement"),
      max: sumBy(estimationMateriaux, "coutMaxInvestissement"),
    },
    entretien: {
      min: sumBy(estimationMateriaux, "coutMinEntretien"),
      max: sumBy(estimationMateriaux, "coutMaxEntretien"),
    },
  };
};
