/* eslint-disable max-len */
import { AideFiche } from "./aide-fiche";
import { AideFicheModal } from "./aide-fiche-modal";
import { AidesTerritoiresAide } from "../types";
import Image from "next/image";
import { resolveAidType } from "../helpers";
import clsx from "clsx";
import { AideCardLine } from "./aide-card-line";
import { AideEstimationsCardWarningRemainingDay } from "./aide-estimations-card-warning-remaining-day";

type AideCardProps = {
  aide: AidesTerritoiresAide;
};

export const AideCard = ({ aide }: AideCardProps) => {
  const type = resolveAidType(aide.aid_types_full);
  const isAideFinanciere = type === "Aide financière";

  return (
    <div
      className="pfmv-card no-shadow w-fit max-w-[266px] shrink-0 overflow-hidden hover:outline-none"
      id={`aide-card-${aide.id}`}
      data-type={type}
    >
      <div
        className={clsx("h-24 px-5 py-4", {
          "bg-dsfr-background-alt-blue-france": isAideFinanciere,
          "bg-dsfr-background-alt-brown-cafe-creme": !isAideFinanciere,
        })}
      >
        <Image
          src={`/images/financement/${isAideFinanciere ? "financement" : "ingenierie"}.svg`}
          className="mb-2"
          width={32}
          height={32}
          alt=""
        />
        <span
          className={clsx("text-sm font-bold", {
            "text-dsfr-background-flat-info": isAideFinanciere,
            "text-dsfr-background-flat-orange-terre-battue": !isAideFinanciere,
          })}
        >
          {isAideFinanciere ? "Financemement" : "Soutien à l'ingénierie"}
        </span>
      </div>
      <div className="p-5">
        <div className="mb-4 w-fit rounded-[4px] bg-dsfr-background-alt-blue-france px-[6px] py-[2px] text-sm font-bold text-pfmv-navy">
          {aide.perimeter_scale}
        </div>
        <h2 className="mb-6 text-lg">{aide.name}</h2>
        <AideCardLine isAideFinanciere={isAideFinanciere} icon="porteur">
          {aide.financers.join(", ")}
        </AideCardLine>
        <AideCardLine isAideFinanciere={isAideFinanciere} icon="recurrence">
          {aide.recurrence}
        </AideCardLine>
        <AideCardLine isAideFinanciere={isAideFinanciere} icon="subvention">
          {aide.subvention_rate_lower_bound && (
            <span className="mb-2 block">Min: {aide.subvention_rate_lower_bound}%</span>
          )}
          {aide.subvention_rate_upper_bound && (
            <span className="mb-2 block">Max: {aide.subvention_rate_upper_bound}%</span>
          )}
          {aide.subvention_comment && <span className="mb-2 block">{aide.subvention_comment}%</span>}
        </AideCardLine>
        <AideCardLine isAideFinanciere={isAideFinanciere} icon="calendrier">
          <div className="flex items-center gap-4">
            <AideEstimationsCardWarningRemainingDay submissionDeadline={aide.submission_deadline} />
            <span>Échéance : {aide.submission_deadline}</span>
          </div>
        </AideCardLine>
      </div>
      <AideFicheModal id={aide.id}>
        <AideFiche aide={aide} type={type} />
      </AideFicheModal>
    </div>
  );
};
