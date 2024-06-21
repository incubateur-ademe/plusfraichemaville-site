import { estimations_aides } from "@prisma/client";

import { AideCard } from "./aide-card";
import { PropsWithChildren } from "react";
import { AideEstimationsPanelHeader } from "./aide-estimations-panel-header";

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
          <AideCard aideId={aideId} key={aideId} />
        ))}
      </div>
      {children}
    </>
  );
};
