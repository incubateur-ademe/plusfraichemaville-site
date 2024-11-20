import { highlightedIconClass, TypeFiche } from "@/src/helpers/common";
import clsx from "clsx";

type DelaiTravauxFiche = {
  delaiMax(_: TypeFiche): number;
  icons: (_t: TypeFiche, _?: string) => React.ReactNode;
};

const DELAI_TRAVAUX_FAST: DelaiTravauxFiche = {
  delaiMax: (typeFiche) => (typeFiche === TypeFiche.solution ? 3 : 2),
  icons: (typeFiche, extraClasses?) => (
    <>
      <span className={clsx("fr-icon-time-fill", highlightedIconClass(typeFiche), extraClasses)} />
      <span className={clsx("fr-icon-time-fill", "text-pfmv-light-grey", extraClasses)} />
      <span className={clsx("fr-icon-time-fill", "text-pfmv-light-grey", extraClasses)} />
    </>
  ),
};

const DELAI_TRAVAUX_AVERAGE: DelaiTravauxFiche = {
  delaiMax: (typeFiche) => (typeFiche === TypeFiche.solution ? 7 : 5),
  icons: (typeFiche, extraClasses?) => (
    <>
      <span className={clsx("fr-icon-time-fill", highlightedIconClass(typeFiche), extraClasses)} />
      <span className={clsx("fr-icon-time-fill", highlightedIconClass(typeFiche), extraClasses)} />
      <span className={clsx("fr-icon-time-fill", "text-pfmv-light-grey", extraClasses)} />
    </>
  ),
};

const DELAI_TRAVAUX_SLOW: DelaiTravauxFiche = {
  delaiMax: (_) => Number.MAX_SAFE_INTEGER,
  icons: (typeFiche, extraClasses?) => (
    <>
      <span className={clsx("fr-icon-time-fill", highlightedIconClass(typeFiche), extraClasses)} />
      <span className={clsx("fr-icon-time-fill", highlightedIconClass(typeFiche), extraClasses)} />
      <span className={clsx("fr-icon-time-fill", highlightedIconClass(typeFiche), extraClasses)} />
    </>
  ),
};

export const ALL_DELAIS_TRAVAUX_FICHE_SOLUTION: DelaiTravauxFiche[] = [
  DELAI_TRAVAUX_FAST,
  DELAI_TRAVAUX_AVERAGE,
  DELAI_TRAVAUX_SLOW,
];

export const getDelaiTravauxFiche = (typeFiche: TypeFiche, delaiMin?: number, delaiMax?: number) =>
  delaiMin == undefined || delaiMax == undefined
    ? null
    : ALL_DELAIS_TRAVAUX_FICHE_SOLUTION.find(
        (delaiTravaux) => delaiTravaux.delaiMax(typeFiche) >= (delaiMax + delaiMin) / 2,
      ) || DELAI_TRAVAUX_SLOW;
