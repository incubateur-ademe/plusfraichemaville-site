import { CustomMarker } from "@/src/components/sourcing/types";
import { Case, Conditional, Default } from "@/src/components/common/conditional-renderer";
import { SourcingMyLocationSidePanel } from "@/src/components/sourcing/sidePanel/sourcing-my-location-side-panel";
import { SourcingNoSelectionSidePanel } from "@/src/components/sourcing/sidePanel/sourcing-no-selection-side-panel";

// eslint-disable-next-line max-len
import { SourcingInProgressSidePanelContainer } from "@/src/components/sourcing/sidePanel/sourcing-in-progress-projet-side-panel-container";
// eslint-disable-next-line max-len
import { SourcingRetourExperienceSidePanel } from "@/src/components/sourcing/sidePanel/sourcing-retour-experience-side-panel";

export const SourcingSidePanelContainer = ({ marker }: { marker: CustomMarker | undefined }) => {
  return (
    <div>
      <Conditional>
        <Case condition={marker?.type === "in-progress"}>
          <SourcingInProgressSidePanelContainer projetId={marker?.idProjet!} />
        </Case>
        <Case condition={marker?.type === "rex"}>
          <SourcingRetourExperienceSidePanel retourExperienceId={marker?.idProjet!} />
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
