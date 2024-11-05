import { CustomMarker } from "@/src/components/sourcing/types";
import { Case, Conditional, Default } from "@/src/components/common/conditional-renderer";
import { SourcingMyLocationSidePanel } from "@/src/components/sourcing/side-panel/sourcing-my-location-side-panel";
import { SourcingNoSelectionSidePanel } from "@/src/components/sourcing/side-panel/sourcing-no-selection-side-panel";
import { SourcingRexSidePanelContainer } from "@/src/components/sourcing/side-panel/sourcing-rex-side-panel-container";
// eslint-disable-next-line max-len
import { SourcingInProgressSidePanel } from "@/src/components/sourcing/side-panel/sourcing-in-progress-projet-side-panel";

export const SourcingSidePanelContainer = ({ marker }: { marker: CustomMarker | undefined }) => {
  return (
    <div>
      <Conditional>
        <Case condition={marker?.type === "in-progress"}>
          <SourcingInProgressSidePanel projetId={marker?.idProjet!} />
        </Case>
        <Case condition={marker?.type === "rex"}>
          <SourcingRexSidePanelContainer retourExperienceId={marker?.idProjet!} />
        </Case>
        <Case condition={marker?.type === "ma-collectivite"}>
          <SourcingMyLocationSidePanel />
        </Case>
        <Default>
          <SourcingNoSelectionSidePanel />
        </Default>
      </Conditional>
    </div>
  );
};
