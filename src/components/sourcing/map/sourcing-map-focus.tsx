import Button from "@codegouvfr/react-dsfr/Button";
import clsx from "clsx";
import { LatLngTuple } from "leaflet";
import { useCallback } from "react";
import { useMap } from "react-leaflet";

export const SourcingMapFocus = ({ coordinates }: { coordinates: LatLngTuple | null }) => {
  const map = useMap();
  const handleFocus = useCallback(() => {
    coordinates && map.setView(coordinates, map.getZoom());
  }, [map, coordinates]);

  return (
    <Button
      iconId="ri-home-7-line"
      className={clsx(
        "absolute left-5 top-5 z-[999] rounded-[30px] !bg-white shadow-pfmv-card-shadow",
        "font-[marianne] !font-normal !text-dsfr-action-high-red-hover",
      )}
      onClick={handleFocus}
    >
      <span className="text-black">Recentrer sur mon projet</span>
    </Button>
  );
};
