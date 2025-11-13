import { CustomMarker } from "@/src/components/annuaire/types";
import { Case, Conditional, Default } from "@/src/components/common/conditional-renderer";
import { AnnuaireNoSelection } from "@/src/components/annuaire/side-panel/annuaire-no-selection";
import { isEmpty } from "@/src/helpers/listUtils";
import { AnnuaireProjetListCards } from "@/src/components/annuaire/side-panel/projet-card/annuaire-projet-list-cards";

export const AnnuaireSidePanelListContainer = ({
  visibleMarkers,
  selectMarkerByProjetId,
}: {
  visibleMarkers: CustomMarker[];
  selectMarkerByProjetId: (markerType: CustomMarker["type"], idProjet?: number) => void;
}) => {
  return (
    <Conditional>
      <Case condition={!isEmpty(visibleMarkers)}>
        <AnnuaireProjetListCards markers={visibleMarkers} selectMarkerByProjetId={selectMarkerByProjetId} />
      </Case>
      <Default>
        <AnnuaireNoSelection />
      </Default>
    </Conditional>
  );
};
