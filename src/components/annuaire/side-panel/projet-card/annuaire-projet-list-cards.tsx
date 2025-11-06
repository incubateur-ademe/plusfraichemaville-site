import { CustomMarker } from "@/src/components/annuaire/types";
import { Case, Conditional } from "@/src/components/common/conditional-renderer";
import { AnnuaireRexCardContainer } from "@/src/components/annuaire/side-panel/projet-card/annuaire-rex-card-container";
import { AnnuaireInProgressCardPanelContainer } from "@/src/components/annuaire/side-panel/projet-card/annuaire-in-progress-card-container";

export const AnnuaireProjetListCards = ({
  markers,
  selectMarkerByProjetId,
}: {
  markers: CustomMarker[];
  selectMarkerByProjetId: (markerType: CustomMarker["type"], idProjet?: number) => void;
}) => {
  return (
    <div className="flex flex-col gap-4 px-2">
      {markers.map((marker) => (
        <div key={marker.idProjet}>
          <Conditional>
            <Case condition={marker.type === "rex" && !!marker.idProjet}>
              <AnnuaireRexCardContainer
                rexId={marker.idProjet!}
                onClick={() => selectMarkerByProjetId(marker.type, marker.idProjet)}
              />
            </Case>
            <Case condition={marker.type === "in-progress" && !!marker.idProjet}>
              <AnnuaireInProgressCardPanelContainer
                projetId={marker.idProjet!}
                onClick={() => selectMarkerByProjetId(marker.type, marker.idProjet)}
              />
            </Case>
          </Conditional>
        </div>
      ))}
    </div>
  );
};
