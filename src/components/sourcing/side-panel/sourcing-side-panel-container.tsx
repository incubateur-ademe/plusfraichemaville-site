import { CustomMarker } from "@/src/components/sourcing/types";
import { Case, Conditional, Default } from "@/src/components/common/conditional-renderer";
import { SourcingMyLocation } from "@/src/components/sourcing/side-panel/sourcing-my-location";
import { SourcingNoSelection } from "@/src/components/sourcing/side-panel/sourcing-no-selection";
import { SourcingRexSidePanelContainer } from "@/src/components/sourcing/side-panel/sourcing-rex-container";
// eslint-disable-next-line max-len
import { SourcingInProgressSidePanelContainer } from "@/src/components/sourcing/side-panel/sourcing-in-progress-projet-container";

export const SourcingSidePanelContainer = ({ marker }: { marker: CustomMarker | undefined }) => {
  return (
    <div>
      <Conditional>
        <Case condition={marker?.type === "in-progress"}>
          <SourcingInProgressSidePanelContainer projetId={marker?.idProjet!} />
        </Case>
        <Case condition={marker?.type === "rex"}>
          <SourcingRexSidePanelContainer rexId={marker?.idProjet!} />
        </Case>
        <Case condition={marker?.type === "ma-collectivite"}>
          <SourcingMyLocation />
        </Case>
        <Default>
          <SourcingNoSelection />
        </Default>
      </Conditional>
    </div>
  );
};
