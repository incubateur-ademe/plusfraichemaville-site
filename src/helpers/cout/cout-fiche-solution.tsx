import clsx from "clsx";
import { formatNumberWithSpaces, highlightedIconClass, TypeFiche } from "@/src/helpers/common";
import { getUniteCoutFromCode, UNITE_COUT_MEGAWATTHEURE } from "@/src/helpers/cout/cout-common";
import { FicheSolution } from "@/src/components/ficheSolution/type";
import { ReactNode } from "react";

type CoutFicheSolution = {
  coutMax(_: TypeFiche): number;
  shortLabel: string;
  icons: (_t: TypeFiche, _?: string) => ReactNode;
};

const COUT_CHEAP: CoutFicheSolution = {
  coutMax: (typeFiche) => (typeFiche === TypeFiche.solution ? 400 : 5000),
  shortLabel: "Peu coûteux",
  icons: (typeFiche, extraClasses?) => (
    <>
      <span className={clsx("fr-icon-money-euro-circle-fill", highlightedIconClass(typeFiche), extraClasses)} />
      <span className={clsx("fr-icon-money-euro-circle-fill", "text-pfmv-light-grey", extraClasses)} />
      <span className={clsx("fr-icon-money-euro-circle-fill", "text-pfmv-light-grey", extraClasses)} />
    </>
  ),
};

const COUT_AVERAGE: CoutFicheSolution = {
  coutMax: (typeFiche) => (typeFiche === TypeFiche.solution ? 1000 : 15000),
  shortLabel: "Peu coûteux",
  icons: (typeFiche, extraClasses?) => (
    <>
      <span className={clsx("fr-icon-money-euro-circle-fill", highlightedIconClass(typeFiche), extraClasses)} />
      <span className={clsx("fr-icon-money-euro-circle-fill", highlightedIconClass(typeFiche), extraClasses)} />
      <span className={clsx("fr-icon-money-euro-circle-fill", "text-pfmv-light-grey", extraClasses)} />
    </>
  ),
};

const COUT_EXPENSIVE: CoutFicheSolution = {
  coutMax: (_) => Number.MAX_SAFE_INTEGER,
  shortLabel: "Coûteux",
  icons: (typeFiche, extraClasses?) => (
    <>
      <span className={clsx("fr-icon-money-euro-circle-fill", highlightedIconClass(typeFiche), extraClasses)} />
      <span className={clsx("fr-icon-money-euro-circle-fill", highlightedIconClass(typeFiche), extraClasses)} />
      <span className={clsx("fr-icon-money-euro-circle-fill", highlightedIconClass(typeFiche), extraClasses)} />
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

export const getLabelCoutFourniture = (ficheSolution: FicheSolution) =>
  ficheSolution.cout_minimum != null && ficheSolution.cout_maximum != null
    ? `de ${formatNumberWithSpaces(ficheSolution.cout_minimum)} à ${formatNumberWithSpaces(
        ficheSolution.cout_maximum,
      )} € HT / ${getUniteCoutFromCode(ficheSolution.cout_unite).unitLabel}`
    : "Coût non disponible";

export const getLabelCoutEntretien = (ficheSolution: FicheSolution) =>
  ficheSolution.cout_minimum_entretien != null && ficheSolution.cout_maximum_entretien != null
    ? `de ${ficheSolution.cout_minimum_entretien} à ${ficheSolution.cout_maximum_entretien} € HT / ${
        getUniteCoutFromCode(ficheSolution.cout_entretien_unite).unitLabel
      }`
    : "Coût non disponible";

export const getLabelCoutFournitureByQuantite = (ficheSolution: FicheSolution, quantite: number) =>
  ficheSolution.cout_minimum != null && ficheSolution.cout_maximum != null && quantite
    ? `${formatNumberWithSpaces(ficheSolution.cout_minimum * quantite)} - ${formatNumberWithSpaces(
        ficheSolution.cout_maximum * quantite,
      )} €`
    : "0 €";

export const getLabelCoutEntretienByQuantite = (ficheSolution: FicheSolution, quantite: number) =>
  ficheSolution.cout_minimum_entretien != null && ficheSolution.cout_maximum_entretien != null && quantite
    ? `${formatNumberWithSpaces(ficheSolution.cout_minimum_entretien * quantite)} - ${formatNumberWithSpaces(
        ficheSolution.cout_maximum_entretien * quantite,
      )} € / an`
    : "0 € / an";
