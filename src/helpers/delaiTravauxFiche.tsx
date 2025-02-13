import { IconColorsType, TypeFiche } from "@/src/helpers/common";
import clsx from "clsx";
import { ReactNode } from "react";

type DelaiTravauxFiche = {
  delaiMax(_: TypeFiche): number;
  // eslint-disable-next-line no-unused-vars
  icons: (_: IconColorsType) => ReactNode;
};

const DELAI_TRAVAUX_FAST: DelaiTravauxFiche = {
  delaiMax: (typeFiche) => (typeFiche === TypeFiche.solution ? 3 : 2),
  icons: ({ highlightClass, fadedClass }) => (
    <>
      <span className={clsx("fr-icon-time-fill fr-icon--sm", highlightClass)} />
      <span className={clsx("fr-icon-time-fill fr-icon--sm", fadedClass)} />
      <span className={clsx("fr-icon-time-fill fr-icon--sm", fadedClass)} />
    </>
  ),
};

const DELAI_TRAVAUX_AVERAGE: DelaiTravauxFiche = {
  delaiMax: (typeFiche) => (typeFiche === TypeFiche.solution ? 7 : 5),
  icons: ({ highlightClass, fadedClass }) => (
    <>
      <span className={clsx("fr-icon-time-fill fr-icon--sm", highlightClass)} />
      <span className={clsx("fr-icon-time-fill fr-icon--sm", highlightClass)} />
      <span className={clsx("fr-icon-time-fill fr-icon--sm", fadedClass)} />
    </>
  ),
};

const DELAI_TRAVAUX_SLOW: DelaiTravauxFiche = {
  delaiMax: (_) => Number.MAX_SAFE_INTEGER,
  icons: ({ highlightClass }) => (
    <>
      <span className={clsx("fr-icon-time-fill fr-icon--sm", highlightClass)} />
      <span className={clsx("fr-icon-time-fill fr-icon--sm", highlightClass)} />
      <span className={clsx("fr-icon-time-fill fr-icon--sm", highlightClass)} />
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
