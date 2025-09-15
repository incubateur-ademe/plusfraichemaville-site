import { CustomMarker } from "@/src/components/annuaire/types";
import { Case, Conditional, Default } from "@/src/components/common/conditional-renderer";
import { AnnuaireRexSidePanelContainer } from "@/src/components/annuaire/side-panel/annuaire-rex-container";
import { AnnuaireInProgressSidePanelContainer } from "@/src/components/annuaire/side-panel/annuaire-in-progress-projet-container";
import { AnnuaireNoSelection } from "@/src/components/annuaire/side-panel/annuaire-no-selection";
import { AnnuaireUserProjetLocation } from "./annuaire-user-projet-location";

export const AnnuaireSidePanelContainer = ({ marker }: { marker: CustomMarker | undefined }) => {
  return (
    <Conditional>
      {marker?.idProjet && (
        <Case condition={marker?.type === "in-progress"}>
          <AnnuaireInProgressSidePanelContainer projetId={marker?.idProjet} />
        </Case>
      )}
      {marker?.idProjet && (
        <Case condition={marker?.type === "rex"}>
          <AnnuaireRexSidePanelContainer rexId={marker?.idProjet} />
        </Case>
      )}
      <Case condition={marker?.type === "ma-collectivite"}>
        <AnnuaireUserProjetLocation />
      </Case>
      <Default>
        <AnnuaireNoSelection />
      </Default>
    </Conditional>
  );
};
