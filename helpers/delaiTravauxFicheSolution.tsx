import React from "react";

type DelaiTravauxFicheSolution = {
  code: number;
  label: string;
  icons: (_?: string) => React.ReactNode;
};
export const ALL_DELAIS_TRAVAUX_FICHE_SOLUTION: DelaiTravauxFicheSolution[] = [
  {
    code: 1,
    label: "moins de 6 mois",
    icons: (extraClasses?) => (
      <>
        <span className={`fr-icon-time-fill text-dsfr-text-label-blue-france ${extraClasses}`} />
        <span className={`fr-icon-time-fill text-pfmv-light-grey ${extraClasses}`} />
        <span className={`fr-icon-time-fill text-pfmv-light-grey ${extraClasses}`} />
      </>
    ),
  },
  {
    code: 2,
    label: "moins de 1 an",
    icons: (extraClasses?) => (
      <>
        <span className={`fr-icon-time-fill text-dsfr-text-label-blue-france ${extraClasses}`} />
        <span className={`fr-icon-time-fill text-dsfr-text-label-blue-france ${extraClasses}`} />
        <span className={`fr-icon-time-fill text-pfmv-light-grey ${extraClasses}`} />
      </>
    ),
  },
  {
    code: 3,
    label: "plus de 1 an",
    icons: (extraClasses?) => (
      <>
        <span className={`fr-icon-time-fill fr-icon--sm text-dsfr-text-label-blue-france ${extraClasses}`} />
        <span className={`fr-icon-time-fill fr-icon--sm text-dsfr-text-label-blue-france ${extraClasses}`} />
        <span className={`fr-icon-time-fill fr-icon--sm text-dsfr-text-label-blue-france ${extraClasses}`} />
      </>
    ),
  },
];

export const getDelaiTravauxFicheSolutionFromCode = (delaiTravauxCode?: number | null) =>
  delaiTravauxCode ? ALL_DELAIS_TRAVAUX_FICHE_SOLUTION.find((r) => r.code === delaiTravauxCode) : null;
