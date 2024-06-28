/* eslint-disable max-len */
import { PropsWithChildren } from "react";
import { AideEstimationsPanelHeader } from "./aide-estimations-panel-header";
import { AideCardWithFetcher } from "./aide-card-with-fetcher";
import { EstimationWithAides } from "@/lib/prisma/prismaCustomTypes";
import { countAidesByTypeFromDB, sumbissionDateSortBase } from "../helpers";

type AideEstimationsCardWithSelectionProps = {
  estimationsAides: EstimationWithAides["estimations_aides"];
} & PropsWithChildren;

export const AideEstimationsCardWithSelection = ({
  estimationsAides,
  children,
}: AideEstimationsCardWithSelectionProps) => {
  const aidesId = estimationsAides.sort(sumbissionDateSortBase).map(({ aideId }) => aideId);
  const aidesTerritoires = estimationsAides.map((ea) => ea.aide);
  const { aideFinanciereCount, aideTechniqueCount } = countAidesByTypeFromDB(aidesTerritoires);

  const aidesFinancieres =
    aideFinanciereCount > 0
      ? `${aideFinanciereCount} financements sélectionnés`
      : `${aideFinanciereCount} financement sélectionné`;

  const aidesTechniques =
    aideTechniqueCount > 0
      ? `${aideTechniqueCount} soutiens à l'ingénierie sélectionnés`
      : `${aideTechniqueCount} soutien à l'ingénierie sélectionné`;

  return (
    <>
      <div className="absolute right-8 top-8 flex w-fit items-center gap-3 rounded-[4px] p-3 shadow-[0px_2px_6px_0px_rgba(0,_0,_18,_0.16)]">
        <i className="fr-icon-success-fill text-dsfr-background-action-high-success-hover"></i>
        <div>
          <span className="mb-1 block font-bold leading-[120%] text-pfmv-navy">Ma sélection</span>
          <span className="block leading-[120%]">
            {aidesFinancieres}, {aidesTechniques}
          </span>
        </div>
      </div>
      <AideEstimationsPanelHeader />
      <div className="aide-card mb-9 flex flex-wrap gap-6">
        {aidesId.map((aideId) => (
          <AideCardWithFetcher aideId={aideId} key={aideId} />
        ))}
      </div>
      {children}
    </>
  );
};
