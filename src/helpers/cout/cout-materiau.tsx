import { EstimationMateriauxFicheSolution } from "@/src/lib/prisma/prismaCustomTypes";
import sumBy from "lodash/sumBy";
import { getUniteCoutFromCode } from "@/src/helpers/cout/cout-common";
import { Materiau } from "@/src/components/ficheSolution/type";
import { formatNumberWithSpaces } from "../common";

export const materiauHasNoCost = (materiau: Materiau) =>
  !materiau.cout_minimum_fourniture &&
  !materiau.cout_maximum_fourniture &&
  !materiau.cout_minimum_entretien &&
  !materiau.cout_maximum_entretien;

export const getLabelCoutFourniture = (materiau: Materiau) =>
  materiau.cout_minimum_fourniture != null && materiau.cout_maximum_fourniture != null
    ? `${materiau.cout_minimum_fourniture} - ${materiau.cout_maximum_fourniture} € HT / ${
        getUniteCoutFromCode(materiau.cout_unite).unitLabel
      }`
    : "NA";

export const getLabelCoutFournitureByQuantite = (materiau: Materiau | undefined, quantite: number) =>
  materiau && materiau.cout_minimum_fourniture != null && materiau.cout_maximum_fourniture != null && quantite
    ? `${formatNumberWithSpaces(materiau.cout_minimum_fourniture * quantite)} - ${formatNumberWithSpaces(
        materiau.cout_maximum_fourniture * quantite,
      )} €`
    : "0 €";

export const getLabelCoutEntretien = (materiau: Materiau) =>
  materiau.cout_minimum_entretien != null && materiau.cout_maximum_entretien != null
    ? `${materiau.cout_minimum_entretien} - ${materiau.cout_maximum_entretien} € HT / ${
        getUniteCoutFromCode(materiau.cout_unite).unitLabel
      } / an`
    : "NA";

export const getLabelCoutEntretienByQuantite = (materiau: Materiau | undefined, quantite: number) =>
  materiau && materiau.cout_minimum_entretien != null && materiau.cout_maximum_entretien != null && quantite
    ? `${formatNumberWithSpaces(materiau.cout_minimum_entretien * quantite)} - ${formatNumberWithSpaces(
        materiau.cout_maximum_entretien * quantite,
      )} € / an`
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
