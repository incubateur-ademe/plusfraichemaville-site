"use client";

import { useEffect } from "react";
import "leaflet/dist/leaflet.css";
import { MapContainer, Marker, ScaleControl, useMap, ZoomControl } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import { useCurrentProjetCoordinates } from "../hooks";
import { createClusterCustomIcon, createCustomIcon } from "../helpers-client";
import { AnnuaireMapLegend } from "./annuaire-map-legend";
import { CustomMarker, ZOOM_LEVELS, ZoomLevelKey } from "../types";
import { AnnuaireSidePanelContainer } from "../side-panel/annuaire-side-panel-container";
import { AnnuaireMapTileLayer } from "@/src/components/annuaire/map/annuaire-map-tile-layer";
import { LatLngTuple } from "leaflet";
import { AnnuaireMapFocus } from "@/src/components/annuaire/map/annuaire-map-focus";
import clsx from "clsx";

export const MAP_FALLBACK_DEFAULT_LOCATION: LatLngTuple = [48.8566, 2.3522];

export type AnnuaireMapClientProps = {
  markers: CustomMarker[];
  setSelectedMarker: (_: CustomMarker) => void;
  selectedMarker?: CustomMarker;
  mapFocus?: { coordinates?: LatLngTuple; zoom?: ZoomLevelKey };
  className?: string;
};

const MapFocus = ({ mapFocus }: { mapFocus?: { coordinates?: LatLngTuple; zoom?: ZoomLevelKey } }) => {
  const map = useMap();
  useEffect(() => {
    if (mapFocus?.coordinates) {
      map.setView(mapFocus.coordinates, mapFocus.zoom && ZOOM_LEVELS[mapFocus.zoom]);
    }
  }, [mapFocus, map]);

  return null;
};

const AnnuaireMapClient = ({
  markers,
  setSelectedMarker,
  selectedMarker,
  mapFocus,
  className,
}: AnnuaireMapClientProps) => {
  const currentProjetCoordinates = useCurrentProjetCoordinates();

  const handleMarkerClick = (selectedMarker: CustomMarker) => {
    setSelectedMarker(selectedMarker);
  };

  if (!currentProjetCoordinates) {
    return null;
  }

  return (
    <div className={clsx("flex", className)}>
      <div className="h-[715px] w-full max-w-[50rem]">
        <MapContainer
          className="mapAnnuaire relative h-full"
          center={currentProjetCoordinates[0] ? currentProjetCoordinates : MAP_FALLBACK_DEFAULT_LOCATION}
          zoom={8}
          zoomControl={false}
          attributionControl={false}
        >
          <AnnuaireMapTileLayer />
          <MapFocus mapFocus={mapFocus} />
          <MarkerClusterGroup chunkedLoading iconCreateFunction={createClusterCustomIcon} showCoverageOnHover={false}>
            {markers.map((marker, index) => (
              <Marker
                position={marker.geocode}
                key={index}
                icon={createCustomIcon(
                  marker.type,
                  marker.type === selectedMarker?.type && marker.idProjet === selectedMarker.idProjet,
                )}
                eventHandlers={{ click: () => handleMarkerClick(marker) }}
              />
            ))}
          </MarkerClusterGroup>
          {currentProjetCoordinates[0] && (
            <Marker
              position={currentProjetCoordinates}
              zIndexOffset={9999}
              icon={createCustomIcon("ma-collectivite", selectedMarker?.type === "ma-collectivite")}
              eventHandlers={{
                click: () =>
                  handleMarkerClick({
                    geocode: currentProjetCoordinates,
                    type: "ma-collectivite",
                  }),
              }}
            />
          )}
          <ZoomControl position="topleft" />
          <AnnuaireMapLegend />
          <ScaleControl position="bottomright" imperial={false} />
          {currentProjetCoordinates[0] && <AnnuaireMapFocus coordinates={currentProjetCoordinates} />}
        </MapContainer>
      </div>
      <div className="h-[715px] w-[400px] shrink-0 overflow-y-auto">
        <AnnuaireSidePanelContainer marker={selectedMarker} />
      </div>
    </div>
  );
};

export default AnnuaireMapClient;
