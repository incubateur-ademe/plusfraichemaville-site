import { getUniteCoutFromCode } from "@/src/helpers/cout/cout-common";
import { formatNumberWithSpaces } from "../common";
import { Materiau } from "@/src/lib/strapi/types/api/materiau";

export const materiauHasNoCost = (materiauAttributes: Materiau["attributes"]) =>
  !materiauAttributes.cout_minimum_fourniture &&
  !materiauAttributes.cout_maximum_fourniture &&
  !materiauAttributes.cout_minimum_entretien &&
  !materiauAttributes.cout_maximum_entretien;

export const getLabelCoutFourniture = (materiauAttributes: Materiau["attributes"]) =>
  materiauAttributes.cout_minimum_fourniture != null && materiauAttributes.cout_maximum_fourniture != null
    ? `${materiauAttributes.cout_minimum_fourniture} - ${materiauAttributes.cout_maximum_fourniture} € HT / ${
        getUniteCoutFromCode(materiauAttributes.cout_unite).unitLabel
      }`
    : "NA";

export const getLabelCoutFournitureByQuantite = (
  materiauAttributes: Materiau["attributes"] | undefined,
  quantite: number,
) =>
  materiauAttributes &&
  materiauAttributes.cout_minimum_fourniture != null &&
  materiauAttributes.cout_maximum_fourniture != null &&
  quantite
    ? `${formatNumberWithSpaces(materiauAttributes.cout_minimum_fourniture * quantite)} - ${formatNumberWithSpaces(
        materiauAttributes.cout_maximum_fourniture * quantite,
      )} €`
    : "0 €";

export const getLabelCoutEntretien = (materiauAttributes: Materiau["attributes"]) =>
  materiauAttributes.cout_minimum_entretien != null && materiauAttributes.cout_maximum_entretien != null
    ? `${materiauAttributes.cout_minimum_entretien} - ${materiauAttributes.cout_maximum_entretien} € HT / ${
        getUniteCoutFromCode(materiauAttributes.cout_unite).unitLabel
      } / an`
    : "NA";

export const getLabelCoutEntretienByQuantite = (
  materiauAttributes: Materiau["attributes"] | undefined,
  quantite: number,
) =>
  materiauAttributes &&
  materiauAttributes.cout_minimum_entretien != null &&
  materiauAttributes.cout_maximum_entretien != null &&
  quantite
    ? `${formatNumberWithSpaces(materiauAttributes.cout_minimum_entretien * quantite)} - ${formatNumberWithSpaces(
        materiauAttributes.cout_maximum_entretien * quantite,
      )} € / an`
    : "0 € / an";
