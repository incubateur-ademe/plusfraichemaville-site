import { PropsWithChildren } from "react";
import { AideEstimationsPanelHeader } from "./aide-estimations-panel-header";
import { AideCardWithFetcher } from "./aide-card-with-fetcher";
import { EstimationWithAides } from "@/src/lib/prisma/prismaCustomTypes";
import { countAidesByTypeFromDB, sumbissionDateSortBase } from "../helpers";

import { AideEstimationsCardRecap } from "./aide-estimations-recap";

type AideEstimationsCardWithSelectionProps = {
  estimation: EstimationWithAides;
} & PropsWithChildren;

export const AideEstimationsCardWithSelection = ({ estimation, children }: AideEstimationsCardWithSelectionProps) => {
  const aidesId = estimation.estimations_aides.sort(sumbissionDateSortBase).map(({ aideId }) => aideId);
  const aidesTerritoires = estimation.estimations_aides.map((ea) => ea.aide);
  const { aideFinanciereCount, aideTechniqueCount } = countAidesByTypeFromDB(aidesTerritoires);

  return (
    <>
      <AideEstimationsPanelHeader estimation={estimation} />
      <div className="aide-card mb-9 flex flex-wrap gap-6">
        {aidesId.map((aideId) => (
          <AideCardWithFetcher aideId={aideId} key={aideId} />
        ))}
      </div>
      <AideEstimationsCardRecap
        isLoading={false}
        countAides={{ aideFinanciereCount, aideTechniqueCount, verb: "sélectionné" }}
      >
        {children}
      </AideEstimationsCardRecap>
    </>
  );
};
