import React from "react";

type DelaiTravaux = {
  code: number;
  label: string;
  icons: (_?: string) => React.ReactNode;
};
export const ALL_DELAIS_TRAVAUX: DelaiTravaux[] = [
  {
    code: 1,
    label: "moins de 6 mois",
    icons: (extraClasses?) => (
      <span className={extraClasses}>
        <span className={"fr-icon-time-fill fr-icon--sm text-dsfr-text-label-blue-france"} />
        <span className={"fr-icon-time-fill fr-icon--sm text-pfmv-light-grey"} />
        <span className={"fr-icon-time-fill fr-icon--sm text-pfmv-light-grey"} />
      </span>
    ),
  },
  {
    code: 2,
    label: "moins de 1 an",
    icons: (extraClasses?) => (
      <span className={extraClasses}>
        <span className={"fr-icon-time-fill fr-icon--sm text-dsfr-text-label-blue-france"} />
        <span className={"fr-icon-time-fill fr-icon--sm text-dsfr-text-label-blue-france"} />
        <span className={"fr-icon-time-fill fr-icon--sm text-pfmv-light-grey"} />
      </span>
    ),
  },
  {
    code: 3,
    label: "plus de 1 an",
    icons: (extraClasses?) => (
      <span className={extraClasses}>
        <span className={"fr-icon-time-fill fr-icon--sm text-dsfr-text-label-blue-france"} />
        <span className={"fr-icon-time-fill fr-icon--sm text-dsfr-text-label-blue-france"} />
        <span className={"fr-icon-time-fill fr-icon--sm text-dsfr-text-label-blue-france"} />
      </span>
    ),
  },

];

export const getDelaTravauxFromCode = (delauTravauxCode?: number | null) =>
  delauTravauxCode ? ALL_DELAIS_TRAVAUX.find((r) => r.code === delauTravauxCode) : null;
