import React from "react";
import clsx from "clsx";
import { highlightedIconClass, TypeFiche } from "@/helpers/common";
import { getUniteCoutFromCode, UNITE_COUT_MEGAWATTHEURE } from "@/helpers/cout/cout-common";
import { FicheSolution } from "@/components/ficheSolution/type";

type CoutFicheSolution = {
  coutMax(_: TypeFiche): number;
  shortLabel: string;
  icons: (_t: TypeFiche, _?: string) => React.ReactNode;
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
    ? `de ${ficheSolution.cout_minimum} à ${ficheSolution.cout_maximum} € HT / ${
        getUniteCoutFromCode(ficheSolution.cout_unite).unitLabel
      }`
    : "Coût non disponible";
