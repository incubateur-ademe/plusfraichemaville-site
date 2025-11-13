import { CustomMarker } from "@/src/components/annuaire/types";
import { Case, Conditional, Default } from "@/src/components/common/conditional-renderer";
import { AnnuaireNoVisibleMarkers } from "@/src/components/annuaire/side-panel/annuaire-no-visible-markers";
import { isEmpty } from "@/src/helpers/listUtils";
import { AnnuaireProjetListCards } from "@/src/components/annuaire/side-panel/projet-card/annuaire-projet-list-cards";
import { MapGeoJSONFeature } from "react-map-gl/mapbox-legacy";
import { AnnuaireOnlyVisibleClusters } from "@/src/components/annuaire/side-panel/annuaire-only-visible-clusters";

export const AnnuaireSidePanelListContainer = ({
  visibleMarkers,
  visibleClusters,
  selectMarkerByProjetId,
}: {
  visibleMarkers: CustomMarker[];
  visibleClusters: MapGeoJSONFeature[];
  selectMarkerByProjetId: (markerType: CustomMarker["type"], idProjet?: number) => void;
}) => {
  return (
    <Conditional>
      <Case condition={!isEmpty(visibleMarkers)}>
        <AnnuaireProjetListCards markers={visibleMarkers} selectMarkerByProjetId={selectMarkerByProjetId} />
      </Case>
      <Case condition={isEmpty(visibleMarkers) && !isEmpty(visibleClusters)}>
        <AnnuaireOnlyVisibleClusters />
      </Case>
      <Default>
        <AnnuaireNoVisibleMarkers />
      </Default>
    </Conditional>
  );
};
