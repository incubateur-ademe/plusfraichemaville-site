import React from "react";

type CoutFicheSolution = {
  code: number;
  coutMax: number;
  shortLabel: string;
  icons: (_?: string) => React.ReactNode;
};
export const ALL_COUTS_FICHE_SOLUTION: CoutFicheSolution[] = [
  {
    code: 1,
    coutMax: 500,
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
    coutMax: 2000,
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
    coutMax: Number.MAX_SAFE_INTEGER,
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

export const getCoutFicheSolutionFromCode = (coutMin: number, coutMax: number) =>
  ALL_COUTS_FICHE_SOLUTION.find((cout) => cout.coutMax >= (coutMax - coutMin) / 2);
