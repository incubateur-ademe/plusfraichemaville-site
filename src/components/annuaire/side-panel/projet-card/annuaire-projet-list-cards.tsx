import { CustomMarker } from "@/src/components/annuaire/types";
import { Case, Conditional } from "@/src/components/common/conditional-renderer";
import { AnnuaireRexCardContainer } from "@/src/components/annuaire/side-panel/projet-card/annuaire-rex-card-container";
import { AnnuaireInProgressCardPanelContainer } from "@/src/components/annuaire/side-panel/projet-card/annuaire-in-progress-card-container";
import clsx from "clsx";

export const AnnuaireProjetListCards = ({
  markers,
  selectMarkerByProjetId,
  focusedMarker,
  focusMarkerByProjetId,
  unfocusMarker,
}: {
  markers: CustomMarker[];
  selectMarkerByProjetId: (markerType: CustomMarker["type"], idProjet?: number) => void;
  focusMarkerByProjetId: (markerType: CustomMarker["type"], idProjet?: number) => void;
  focusedMarker?: CustomMarker | null;
  unfocusMarker: () => void;
}) => {
  return (
    <div className="flex flex-col gap-4 px-2 pt-1">
      {markers.map((marker) => (
        <div
          key={marker.idProjet}
          onMouseEnter={() => focusMarkerByProjetId(marker.type, marker.idProjet)}
          onMouseLeave={unfocusMarker}
          className={clsx(
            "rounded-2xl",
            "outline-bg-dsfr-background-alt-blue-france-hover outline-1 outline-offset-0 hover:outline",
            focusedMarker?.idProjet === marker.idProjet && focusedMarker?.type === marker.type && "outline",
          )}
        >
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
