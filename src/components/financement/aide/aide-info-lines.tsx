import { AidesTerritoiresAide, TypeAidesTerritoiresAide } from "@/src/components/financement/types";
import { dateToStringWithoutTime } from "@/src/helpers/dateUtils";
import { resolveAidType } from "@/src/components/financement/helpers";
import { ReactNode } from "react";
import { AideProjetCardWarningRemainingDays } from "./aide-projet-card-warning-remaining-day";

export type AidesTerritoiresAideLine = {
  title: string;
  picto: string;
  description: ReactNode | string | string[] | null;
  showMore?: boolean;
};

const AideLinePorteurAide = (aide: AidesTerritoiresAide, showMore?: boolean): AidesTerritoiresAideLine => ({
  title: "Porteur(s) d'aide",
  picto: "ri-hand-coin-line",
  description: aide.financers,
  showMore,
});

const AideLineSubvention = (aide: AidesTerritoiresAide, showMore?: boolean): AidesTerritoiresAideLine => ({
  title: "Subvention",
  picto: "ri-percent-line",
  description: [
    `${aide.subvention_rate_lower_bound ? `Min: ${aide.subvention_rate_lower_bound}% - ` : ""}${
      aide.subvention_rate_upper_bound ? `Max: ${aide.subvention_rate_upper_bound}%` : ""
    }`,
    aide.subvention_comment ?? "",
  ],
  showMore,
});

const AideLineRecurrence = (aide: AidesTerritoiresAide): AidesTerritoiresAideLine => ({
  title: "Récurrence",
  picto: "ri-loop-left-line",
  description: aide.recurrence,
});

const AideLineBeneficiaire = (aide: AidesTerritoiresAide, showMore?: boolean): AidesTerritoiresAideLine => ({
  title: "Bénéficiaires",
  picto: "ri-user-add-line",
  description: aide.targeted_audiences,
  showMore,
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
    <div className="flex items-center gap-3">
      {aide.submission_deadline && (
        <AideProjetCardWarningRemainingDays submissionDeadline={new Date(aide.submission_deadline)} size="small" />
      )}
      <span>
        {aide.submission_deadline
          ? `Échéance : ${dateToStringWithoutTime(new Date(aide.submission_deadline))}`
          : "Non communiqué"}
      </span>
    </div>
  ),
});

export const AidesTerritoiresFullDetailedLines = (aide: AidesTerritoiresAide): AidesTerritoiresAideLine[] => {
  return resolveAidType(aide.aid_types_full) === TypeAidesTerritoiresAide.financement
    ? [
        AideLinePorteurAide(aide, true),
        AideLineSubvention(aide, true),
        AideLineRecurrence(aide),
        AideLineBeneficiaire(aide, true),
        AideLineZone(aide),
        AideLineDateMaj(aide),
      ]
    : [
        AideLinePorteurAide(aide, true),
        AideLineRecurrence(aide),
        AideLineBeneficiaire(aide, true),
        AideLineZone(aide),
        AideLineDateMaj(aide),
      ];
};

export const AidesTerritoiresCardLines = (aide: AidesTerritoiresAide): AidesTerritoiresAideLine[] => {
  return resolveAidType(aide.aid_types_full) === TypeAidesTerritoiresAide.financement
    ? [AideLinePorteurAide(aide, false), AideLineCalendrier(aide)]
    : [AideLinePorteurAide(aide, false), AideLineCalendrier(aide)];
};
