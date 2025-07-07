"use client";
import { Climadiag } from "@/src/components/climadiag/types";
import { addOverlay, mapStyles, Overlay } from "carte-facile";
import { useCallback, useRef } from "react";
import { Map } from "@vis.gl/react-maplibre";
import { MapRef, NavigationControl } from "react-map-gl/maplibre";
import { LCZMapMlFocus } from "@/src/components/surchauffe-urbaine/territoire/surchauffe-urbaine-lcz-map-ml-focus";
import "maplibre-gl/dist/maplibre-gl.css";
import "carte-facile/carte-facile.css";
import { addLCZLayers } from "@/src/components/surchauffe-urbaine/territoire/surchauffe-urbaine-lcz-map-ml-helpers";

type SurchauffeUrbaineLCZMapProps = {
  climadiagInfo: Climadiag;
};

export const SurchauffeUrbaineLCZMapMapLibre = ({ climadiagInfo }: SurchauffeUrbaineLCZMapProps) => {
  const mapRef = useRef<MapRef>(null);
  const onMapLoad = useCallback(() => {
    if (!mapRef.current) return;
    const map = mapRef.current.getMap();
    addOverlay(map, Overlay.administrativeBoundaries);
    addLCZLayers(mapRef.current);
  }, []);

  return (
    <Map
      ref={mapRef}
      initialViewState={{
        zoom: 11,
      }}
      onLoad={onMapLoad}
      style={{ width: "100%", height: "100%" }}
      mapStyle={mapStyles.desaturated}
    >
      <LCZMapMlFocus climadiagInfo={climadiagInfo} />
      <NavigationControl position="top-left" showCompass={false} />
    </Map>
  );
};

export default SurchauffeUrbaineLCZMapMapLibre;
