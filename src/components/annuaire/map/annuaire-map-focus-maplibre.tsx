import Button from "@codegouvfr/react-dsfr/Button";
import clsx from "clsx";
import { LatLngTuple } from "leaflet";
import { useCallback } from "react";
import { useMap } from "react-map-gl/maplibre";

export const AnnuaireMapFocusMaplibre = ({ coordinates }: { coordinates: LatLngTuple | null }) => {
  const map = useMap();
  const handleFocus = useCallback(() => {
    if (coordinates != null) {
      map.current?.easeTo({
        center: [coordinates[1], coordinates[0]],
        zoom: 8,
        duration: 1000,
      });
    }
  }, [map, coordinates]);

  return (
    <Button
      className={clsx(
        "absolute left-5 top-5 z-[500] rounded-[30px] !bg-white shadow-pfmv-card-shadow",
        "font-[marianne] !font-normal",
      )}
      onClick={handleFocus}
    >
      <span>
        <i className="ri-home-7-line mr-2 !text-dsfr-action-high-red-hover"></i>
        <span className="text-black">Recentrer sur mon projet</span>
      </span>
    </Button>
  );
};
