import { AidesTerritoiresAide } from "@/components/financement/types";
import React from "react";
// eslint-disable-next-line max-len
import { AideEstimationsCardWarningRemainingDays } from "@/components/financement/aide/aide-estimations-card-warning-remaining-day";
import { dateToStringWithoutTime } from "@/helpers/dateUtils";

export type AidesTerritoiresAideLine = {
  title: string;
  picto: string;
  description: React.ReactNode | string | string[] | null;
  showMore?: boolean;
};

const AideLinePorteurAide = (aide: AidesTerritoiresAide, showMore?: boolean): AidesTerritoiresAideLine => ({
  title: "Porteur(s) d'aide",
  picto: "ri-hand-coin-line",
  description: aide.financers,
  showMore,
});

const AideLineSubvention = (aide: AidesTerritoiresAide): AidesTerritoiresAideLine => ({
  title: "Subvention",
  picto: "ri-percent-line",
  description: [
    `${aide.subvention_rate_lower_bound ? `Min: ${aide.subvention_rate_lower_bound}% -` : ""}  ${
      aide.subvention_rate_upper_bound ? `Max: ${aide.subvention_rate_upper_bound}%` : ""
    }`,
    aide.subvention_comment ?? "",
  ],
});

const AideLineRecurrence = (aide: AidesTerritoiresAide): AidesTerritoiresAideLine => ({
  title: "Récurrence",
  picto: "ri-loop-left-line",
  description: aide.recurrence,
});

const AideLineBeneficiaire = (aide: AidesTerritoiresAide): AidesTerritoiresAideLine => ({
  title: "Bénéficiaires",
  picto: "ri-user-add-line",
  description: aide.targeted_audiences,
});

const AideLineZone = (aide: AidesTerritoiresAide): AidesTerritoiresAideLine => ({
  title: "Zone géographique couverte par l'aide",
  picto: "ri-map-pin-line",
  description: aide.perimeter,
});

const AideLineDateMaj = (aide: AidesTerritoiresAide): AidesTerritoiresAideLine => ({
  title: "Dernières mises à jour",
  picto: "ri-flashlight-line",
  description: aide.date_updated && dateToStringWithoutTime(new Date(aide.date_updated)),
});

const AideLineCalendrier = (aide: AidesTerritoiresAide): AidesTerritoiresAideLine => ({
  title: "Calendrier",
  picto: "ri-calendar-2-line",
  description: (
    <div className="flex items-center gap-4">
      {aide.submission_deadline && (
        <AideEstimationsCardWarningRemainingDays submissionDeadline={new Date(aide.submission_deadline)} />
      )}
      <span>
        {aide.submission_deadline
          ? `Échéance : ${dateToStringWithoutTime(new Date(aide.submission_deadline))}`
          : "Non communiqué"}
      </span>
    </div>
  ),
});

export const AidesTerritoiresFullDetailedLines = (aide: AidesTerritoiresAide): AidesTerritoiresAideLine[] => [
  AideLinePorteurAide(aide, true),
  AideLineSubvention(aide),
  AideLineRecurrence(aide),
  AideLineBeneficiaire(aide),
  AideLineZone(aide),
  AideLineDateMaj(aide),
];

export const AidesTerritoiresCardLines = (aide: AidesTerritoiresAide): AidesTerritoiresAideLine[] => [
  AideLinePorteurAide(aide, false),
  AideLineRecurrence(aide),
  AideLineSubvention(aide),
  AideLineCalendrier(aide),
];
