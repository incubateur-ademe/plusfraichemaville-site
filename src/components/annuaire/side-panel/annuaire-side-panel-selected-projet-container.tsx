import { CustomMarker } from "@/src/components/annuaire/types";
import { Case, Conditional } from "@/src/components/common/conditional-renderer";
import { AnnuaireRexSidePanelContainer } from "@/src/components/annuaire/side-panel/annuaire-rex-container";
import { AnnuaireInProgressSidePanelContainer } from "@/src/components/annuaire/side-panel/annuaire-in-progress-projet-container";
import { AnnuaireUserProjetLocation } from "./annuaire-user-projet-location";
import { AnnuaireSidePanelCloseSelectedProjet } from "@/src/components/annuaire/side-panel/annuaire-side-panel-close-selected-projet";

export const AnnuaireSidePanelSelectedProjetContainer = ({
  selectedMarker,
  closePanel,
}: {
  selectedMarker?: CustomMarker | null;
  closePanel: () => void;
}) => {
  return (
    <>
      <AnnuaireSidePanelCloseSelectedProjet closePanel={closePanel} />
      <Conditional>
        {selectedMarker?.idProjet && (
          <Case condition={selectedMarker?.type === "in-progress"}>
            <AnnuaireInProgressSidePanelContainer projetId={selectedMarker?.idProjet} />
          </Case>
        )}
        {selectedMarker?.idProjet && (
          <Case condition={selectedMarker?.type === "rex"}>
            <AnnuaireRexSidePanelContainer rexId={selectedMarker?.idProjet} />
          </Case>
        )}
        <Case condition={selectedMarker?.type === "ma-collectivite"}>
          <AnnuaireUserProjetLocation />
        </Case>
      </Conditional>
    </>
  );
};
