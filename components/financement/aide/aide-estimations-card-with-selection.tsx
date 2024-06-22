/* eslint-disable max-len */
import { estimations_aides } from "@prisma/client";

import { PropsWithChildren } from "react";
import { AideEstimationsPanelHeader } from "./aide-estimations-panel-header";
import { AideCardWithFetcher } from "./aide-card-with-fetcher";

type AideEstimationsCardWithSelectionProps = {
  estimationsAides: estimations_aides[];
} & PropsWithChildren;

export const AideEstimationsCardWithSelection = ({
  estimationsAides,
  children,
}: AideEstimationsCardWithSelectionProps) => {
  const aidesId = estimationsAides.map(({ aideId }) => aideId);

  return (
    <>
      <AideEstimationsPanelHeader />
      <div className="aide-card flex flex-wrap gap-6">
        {aidesId.map((aideId) => (
          <AideCardWithFetcher aideId={aideId} key={aideId} />
        ))}
      </div>
      {children}
    </>
  );
};
