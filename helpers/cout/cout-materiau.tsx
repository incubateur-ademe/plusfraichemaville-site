import { GetValues } from "@/lib/strapi/types/types";
import { EstimationMateriauxFicheSolution } from "@/lib/prisma/prismaCustomTypes";
import sumBy from "lodash/sumBy";
import { getUniteCoutFromCode } from "@/helpers/cout/cout-common";

export const getLabelCoutFourniture = (materiau: GetValues<"api::materiau.materiau">) =>
  materiau.cout_minimum_fourniture != null && materiau.cout_maximum_fourniture != null
    ? `${materiau.cout_minimum_fourniture} - ${materiau.cout_maximum_fourniture} € HT / ${
        getUniteCoutFromCode(materiau.cout_unite).unitLabel
      }`
    : "NA";

export const getLabelCoutFournitureByQuantite = (
  materiau: GetValues<"api::materiau.materiau"> | undefined,
  quantite: number,
) =>
  materiau && materiau.cout_minimum_fourniture != null && materiau.cout_maximum_fourniture != null && quantite
    ? `${materiau.cout_minimum_fourniture * quantite} - ${materiau.cout_maximum_fourniture * quantite} €`
    : "0 €";

export const getLabelCoutEntretien = (materiau: GetValues<"api::materiau.materiau">) =>
  materiau.cout_minimum_entretien != null && materiau.cout_maximum_entretien != null
    ? `${materiau.cout_minimum_entretien} - ${materiau.cout_maximum_entretien} € HT / ${
        getUniteCoutFromCode(materiau.cout_unite).unitLabel
      } / an`
    : "NA";

export const getLabelCoutEntretienByQuantite = (
  materiau: GetValues<"api::materiau.materiau"> | undefined,
  quantite: number,
) =>
  materiau && materiau.cout_minimum_entretien != null && materiau.cout_maximum_entretien != null && quantite
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
