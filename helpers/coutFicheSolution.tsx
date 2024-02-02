import React from "react";

type CoutFicheSolution = {
  coutMax: number;
  shortLabel: string;
  icons: (_?: string) => React.ReactNode;
};

const COUT_CHEAP: CoutFicheSolution = {
  coutMax: 400,
  shortLabel: "Peu coûteux",
  icons: (extraClasses?) => (
    <>
      <span className={`fr-icon-money-euro-circle-fill text-dsfr-text-label-blue-france ${extraClasses}`} />
      <span className={`fr-icon-money-euro-circle-fill text-pfmv-light-grey ${extraClasses}`} />
      <span className={`fr-icon-money-euro-circle-fill text-pfmv-light-grey ${extraClasses}`} />
    </>
  ),
};

const COUT_AVERAGE: CoutFicheSolution = {
  coutMax: 1000,
  shortLabel: "Peu coûteux",
  icons: (extraClasses?) => (
    <>
      <span className={`fr-icon-money-euro-circle-fill text-dsfr-text-label-blue-france ${extraClasses}`} />
      <span className={`fr-icon-money-euro-circle-fill text-dsfr-text-label-blue-france ${extraClasses}`} />
      <span className={`fr-icon-money-euro-circle-fill text-pfmv-light-grey ${extraClasses}`} />
    </>
  ),
};

const COUT_EXPENSIVE: CoutFicheSolution = {
  coutMax: Number.MAX_SAFE_INTEGER,
  shortLabel: "Coûteux",
  icons: (extraClasses?) => (
    <>
      <span className={`fr-icon-money-euro-circle-fill text-dsfr-text-label-blue-france ${extraClasses}`} />
      <span className={`fr-icon-money-euro-circle-fill text-dsfr-text-label-blue-france ${extraClasses}`} />
      <span className={`fr-icon-money-euro-circle-fill text-dsfr-text-label-blue-france ${extraClasses}`} />
    </>
  ),
};

export const ALL_COUTS_FICHE_SOLUTION: CoutFicheSolution[] = [COUT_CHEAP, COUT_AVERAGE, COUT_EXPENSIVE];

export const getCoutFicheSolution = (coutMin?: number, coutMax?: number) =>
  coutMin == undefined || coutMax == undefined
    ? null
    : ALL_COUTS_FICHE_SOLUTION.find((cout) => cout.coutMax >= (coutMax + coutMin) / 2) || COUT_EXPENSIVE;
