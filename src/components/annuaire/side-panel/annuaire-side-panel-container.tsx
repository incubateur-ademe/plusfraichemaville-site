import { CustomMarker } from "@/src/components/annuaire/types";
import { Case, Conditional, Default } from "@/src/components/common/conditional-renderer";

import { SourcingRexSidePanelContainer } from "@/src/components/annuaire/side-panel/annuaire-rex-container";
// eslint-disable-next-line max-len
import { SourcingInProgressSidePanelContainer } from "@/src/components/annuaire/side-panel/annuaire-in-progress-projet-container";
import { AnnuaireNoSelection } from "@/src/components/annuaire/side-panel/annuaire-no-selection";
import { AnnuaireUserProjetLocation } from "./annuaire-user-projet-location";

export const AnnuaireSidePanelContainer = ({ marker }: { marker: CustomMarker | undefined }) => {
  return (
    <Conditional>
      <Case condition={marker?.type === "in-progress"}>
        <SourcingInProgressSidePanelContainer projetId={marker?.idProjet!} />
      </Case>
      <Case condition={marker?.type === "rex"}>
        <SourcingRexSidePanelContainer rexId={marker?.idProjet!} />
      </Case>
      <Case condition={marker?.type === "ma-collectivite"}>
        <AnnuaireUserProjetLocation />
      </Case>
      <Default>
        <AnnuaireNoSelection />
      </Default>
    </Conditional>
  );
};
