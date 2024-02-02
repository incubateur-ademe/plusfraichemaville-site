import React from "react";

type DelaiTravauxFicheSolution = {
  delaiMax: number;
  icons: (_?: string) => React.ReactNode;
};

const DELAI_TRAVAUX_FAST: DelaiTravauxFicheSolution = {
  delaiMax: 3,
  icons: (extraClasses?) => (
    <>
      <span className={`fr-icon-time-fill text-dsfr-text-label-blue-france ${extraClasses}`} />
      <span className={`fr-icon-time-fill text-pfmv-light-grey ${extraClasses}`} />
      <span className={`fr-icon-time-fill text-pfmv-light-grey ${extraClasses}`} />
    </>
  ),
};

const DELAI_TRAVAUX_AVERAGE: DelaiTravauxFicheSolution = {
  delaiMax: 7,
  icons: (extraClasses?) => (
    <>
      <span className={`fr-icon-time-fill text-dsfr-text-label-blue-france ${extraClasses}`} />
      <span className={`fr-icon-time-fill text-dsfr-text-label-blue-france ${extraClasses}`} />
      <span className={`fr-icon-time-fill text-pfmv-light-grey ${extraClasses}`} />
    </>
  ),
};

const DELAI_TRAVAUX_SLOW: DelaiTravauxFicheSolution = {
  delaiMax: Number.MAX_SAFE_INTEGER,
  icons: (extraClasses?) => (
    <>
      <span className={`fr-icon-time-fill text-dsfr-text-label-blue-france ${extraClasses}`} />
      <span className={`fr-icon-time-fill text-dsfr-text-label-blue-france ${extraClasses}`} />
      <span className={`fr-icon-time-fill text-dsfr-text-label-blue-france ${extraClasses}`} />
    </>
  ),
};

export const ALL_DELAIS_TRAVAUX_FICHE_SOLUTION: DelaiTravauxFicheSolution[] = [
  DELAI_TRAVAUX_FAST,
  DELAI_TRAVAUX_AVERAGE,
  DELAI_TRAVAUX_SLOW,
];

export const getDelaiTravauxFicheSolution = (delaiMin?: number, delaiMax?: number) =>
  delaiMin == undefined || delaiMax == undefined
    ? null
    : ALL_DELAIS_TRAVAUX_FICHE_SOLUTION.find((delaiTravaux) => delaiTravaux.delaiMax >= (delaiMax + delaiMin) / 2) ||
      DELAI_TRAVAUX_SLOW;
