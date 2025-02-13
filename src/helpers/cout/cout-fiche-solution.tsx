import clsx from "clsx";
import { formatNumberWithSpaces, IconColorsType, TypeFiche } from "@/src/helpers/common";
import { getUniteCoutFromCode, UNITE_COUT_MEGAWATTHEURE } from "@/src/helpers/cout/cout-common";
import { ReactNode } from "react";
import { FicheSolution } from "@/src/lib/strapi/types/api/fiche-solution";

type CoutFicheSolution = {
  coutMax(_: TypeFiche): number;
  shortLabel: string;
  // eslint-disable-next-line no-unused-vars
  icons: (_: IconColorsType) => ReactNode;
};

const COUT_CHEAP: CoutFicheSolution = {
  coutMax: (typeFiche) => (typeFiche === TypeFiche.solution ? 400 : 5000),
  shortLabel: "Peu coûteux",
  icons: ({ highlightClass, fadedClass }) => (
    <>
      <span className={clsx("fr-icon-money-euro-circle-fill fr-icon--sm", highlightClass)} />
      <span className={clsx("fr-icon-money-euro-circle-fill fr-icon--sm", fadedClass)} />
      <span className={clsx("fr-icon-money-euro-circle-fill fr-icon--sm", fadedClass)} />
    </>
  ),
};

const COUT_AVERAGE: CoutFicheSolution = {
  coutMax: (typeFiche) => (typeFiche === TypeFiche.solution ? 1000 : 15000),
  shortLabel: "Peu coûteux",
  icons: ({ highlightClass, fadedClass }) => (
    <>
      <span className={clsx("fr-icon-money-euro-circle-fill fr-icon--sm", highlightClass)} />
      <span className={clsx("fr-icon-money-euro-circle-fill fr-icon--sm", highlightClass)} />
      <span className={clsx("fr-icon-money-euro-circle-fill fr-icon--sm", fadedClass)} />
    </>
  ),
};

const COUT_EXPENSIVE: CoutFicheSolution = {
  coutMax: (_) => Number.MAX_SAFE_INTEGER,
  shortLabel: "Coûteux",
  icons: ({ highlightClass }) => (
    <>
      <span className={clsx("fr-icon-money-euro-circle-fill fr-icon--sm", highlightClass)} />
      <span className={clsx("fr-icon-money-euro-circle-fill fr-icon--sm", highlightClass)} />
      <span className={clsx("fr-icon-money-euro-circle-fill fr-icon--sm", highlightClass)} />
    </>
  ),
};

export const ALL_COUTS_FICHE: CoutFicheSolution[] = [COUT_CHEAP, COUT_AVERAGE, COUT_EXPENSIVE];

export const getCoutFiche = (typeFiche: TypeFiche, coutMin?: number, coutMax?: number, coutUniteCode?: string) => {
  if (coutMin == undefined || coutMax == undefined) {
    return null;
  }
  if (coutUniteCode === UNITE_COUT_MEGAWATTHEURE.code) {
    return COUT_EXPENSIVE;
  }
  return ALL_COUTS_FICHE.find((cout) => cout.coutMax(typeFiche) >= (coutMax + coutMin) / 2) || COUT_EXPENSIVE;
};

export const getLabelCoutFourniture = (ficheSolutionAttributes: FicheSolution["attributes"]) =>
  ficheSolutionAttributes.cout_minimum != null && ficheSolutionAttributes.cout_maximum != null
    ? `de ${formatNumberWithSpaces(ficheSolutionAttributes.cout_minimum)} à ${formatNumberWithSpaces(
        ficheSolutionAttributes.cout_maximum,
      )} € HT / ${getUniteCoutFromCode(ficheSolutionAttributes.cout_unite).unitLabel}`
    : "Coût non disponible";

export const getLabelCoutEntretien = (ficheSolutionAttributes: FicheSolution["attributes"]) =>
  ficheSolutionAttributes.cout_minimum_entretien != null && ficheSolutionAttributes.cout_maximum_entretien != null
    ? `de ${ficheSolutionAttributes.cout_minimum_entretien} à ${
        ficheSolutionAttributes.cout_maximum_entretien
      } € HT / ${getUniteCoutFromCode(ficheSolutionAttributes.cout_entretien_unite).unitLabel}`
    : "Coût non disponible";

export const getLabelCoutFournitureByQuantite = (
  ficheSolutionAttributes: FicheSolution["attributes"],
  quantite: number,
) =>
  ficheSolutionAttributes.cout_minimum != null && ficheSolutionAttributes.cout_maximum != null && quantite
    ? `${formatNumberWithSpaces(ficheSolutionAttributes.cout_minimum * quantite)} - ${formatNumberWithSpaces(
        ficheSolutionAttributes.cout_maximum * quantite,
      )} €`
    : "0 €";

export const getLabelCoutEntretienByQuantite = (
  ficheSolutionAttributes: FicheSolution["attributes"],
  quantite: number,
) =>
  ficheSolutionAttributes.cout_minimum_entretien != null &&
  ficheSolutionAttributes.cout_maximum_entretien != null &&
  quantite
    ? `${formatNumberWithSpaces(ficheSolutionAttributes.cout_minimum_entretien * quantite)} - ${formatNumberWithSpaces(
        ficheSolutionAttributes.cout_maximum_entretien * quantite,
      )} € / an`
    : "0 € / an";
