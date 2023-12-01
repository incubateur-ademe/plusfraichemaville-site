import React from "react";

type CoutFicheSolution = {
  code: number;
  label: string;
  shortLabel: string;
  icons: (_?: string) => React.ReactNode;
};
export const ALL_COUTS_FICHE_SOLUTION: CoutFicheSolution[] = [
  {
    code: 1,
    label: "de 0 à 5000 €",
    shortLabel: "Peu coûteux",
    icons: (extraClasses?) => (
      <>
        <span className={`fr-icon-money-euro-circle-fill text-dsfr-text-label-blue-france ${extraClasses}`} />
        <span className={`fr-icon-money-euro-circle-fill text-pfmv-light-grey ${extraClasses}`} />
        <span className={`fr-icon-money-euro-circle-fill text-pfmv-light-grey ${extraClasses}`} />
      </>
    ),
  },
  {
    code: 2,
    label: "moins de 5000 €",
    shortLabel: "Peu coûteux",
    icons: (extraClasses?) => (
      <>
        <span className={`fr-icon-money-euro-circle-fill text-dsfr-text-label-blue-france ${extraClasses}`} />
        <span className={`fr-icon-money-euro-circle-fill text-dsfr-text-label-blue-france ${extraClasses}`} />
        <span className={`fr-icon-money-euro-circle-fill text-pfmv-light-grey ${extraClasses}`} />
      </>
    ),
  },
  {
    code: 3,
    label: "plus de 5000 €",
    shortLabel: "Coûteux",
    icons: (extraClasses?) => (
      <>
        <span className={`fr-icon-money-euro-circle-fill text-dsfr-text-label-blue-france ${extraClasses}`} />
        <span className={`fr-icon-money-euro-circle-fill text-dsfr-text-label-blue-france ${extraClasses}`} />
        <span className={`fr-icon-money-euro-circle-fill text-dsfr-text-label-blue-france ${extraClasses}`} />
      </>
    ),
  },
];

export const getCoutFicheSolutionFromCode = (coutCode?: number | null) =>
  coutCode ? ALL_COUTS_FICHE_SOLUTION.find((r) => r.code === coutCode) : null;
