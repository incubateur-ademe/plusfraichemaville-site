"use client";
import { estimation } from "@prisma/client";
import clsx from "clsx";
import FicheSolutionEstimationCard from "@/components/ficheSolution/FicheSolutionEstimationCard";
import React from "react";

export const EstimationOverviewCard = ({ estimation }: { estimation: estimation }) => {
  if (estimation.fiches_solutions_id.length < 1) {
    return null;
  }
  return (
    <div className={clsx("pfmv-strong-card pt-12 pb-12 px-12")}>
      <div className="mb-6 text-lg">{"Votre simulation pour ces solutions et matériaux choisis pour chacune."}</div>
      <div className={clsx("flex flex-wrap gap-6 mb-12")}>
        {estimation.fiches_solutions_id.map((ficheSolutionId) => (
          <FicheSolutionEstimationCard
            key={ficheSolutionId}
            ficheSolutionId={ficheSolutionId}
            className="border-[1px] border-dsfr-border-default-grey rounded-2xl"
          >
            <div>
              <hr className="mt-6" />
              Non complétée
            </div>
          </FicheSolutionEstimationCard>
        ))}
      </div>
    </div>
  );
};
