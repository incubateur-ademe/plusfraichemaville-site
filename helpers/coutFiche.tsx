import React from "react";
import clsx from "clsx";

export enum TypeFiche {
  // eslint-disable-next-line no-unused-vars
  solution,
  // eslint-disable-next-line no-unused-vars
  diagnostic,
}

export const highlightedIconClass = (typeFiche: TypeFiche) =>
  typeFiche === TypeFiche.solution ? "text-dsfr-text-label-blue-france" : "text-dsfr-background-flat-warning";

type CoutFiche = {
  coutMax(_: TypeFiche): number;
  shortLabel: string;
  icons: (_t: TypeFiche, _?: string) => React.ReactNode;
};

const COUT_CHEAP: CoutFiche = {
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

const COUT_AVERAGE: CoutFiche = {
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

const COUT_EXPENSIVE: CoutFiche = {
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

export const ALL_COUTS_FICHE: CoutFiche[] = [COUT_CHEAP, COUT_AVERAGE, COUT_EXPENSIVE];

export const getCoutFiche = (typeFiche: TypeFiche, coutMin?: number, coutMax?: number) =>
  coutMin == undefined || coutMax == undefined
    ? null
    : ALL_COUTS_FICHE.find((cout) => cout.coutMax(typeFiche) >= (coutMax + coutMin) / 2) || COUT_EXPENSIVE;
