"use client";

import { useEffect } from "react";
import "leaflet/dist/leaflet.css";
import { MapContainer, Marker, ScaleControl, useMap, ZoomControl } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import { useCurrentProjetCoordinates } from "../hooks";
import { createClusterCustomIcon, createCustomIcon } from "../helpers-client";
import { SourcingMapLegend } from "./sourcing-map-legend";
import { CustomMarker, ZOOM_LEVELS, ZoomLevelKey } from "../types";
import { SourcingSidePanelContainer } from "../side-panel/sourcing-side-panel-container";
import { SourcingMapTileLayer } from "@/src/components/sourcing/map/sourcing-map-tile-layer";
import { LatLngTuple } from "leaflet";
import { SourcingMapFocus } from "@/src/components/sourcing/map/sourcing-map-focus";

export const MAP_FALLBACK_DEFAULT_LOCATION: LatLngTuple = [48.8566, 2.3522];

export type SourcingMapClientProps = {
  markers: CustomMarker[];
  setSelectedMarker: (_: CustomMarker) => void;
  selectedMarker?: CustomMarker;
  mapFocus?: { coordinates?: LatLngTuple; zoom?: ZoomLevelKey };
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

const SourcingMapClient = ({ markers, setSelectedMarker, selectedMarker, mapFocus }: SourcingMapClientProps) => {
  const currentProjetCoordinates = useCurrentProjetCoordinates();

  const handleMarkerClick = (selectedMarker: CustomMarker) => {
    setSelectedMarker(selectedMarker);
  };

  if (!currentProjetCoordinates) {
    return null;
  }

  return (
    <div className="flex">
      <div className="h-[715px] w-full max-w-[50rem]">
        <MapContainer
          className="relative h-full"
          center={currentProjetCoordinates[0] ? currentProjetCoordinates : MAP_FALLBACK_DEFAULT_LOCATION}
          zoom={8}
          zoomControl={false}
          attributionControl={false}
        >
          <SourcingMapTileLayer />
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
          <SourcingMapLegend />
          <ScaleControl position="bottomright" imperial={false} />
          {currentProjetCoordinates[0] && <SourcingMapFocus coordinates={currentProjetCoordinates} />}
        </MapContainer>
      </div>
      <div className="h-[715px] w-[400px] shrink-0 overflow-y-auto">
        <SourcingSidePanelContainer marker={selectedMarker} />
      </div>
    </div>
  );
};

export default SourcingMapClient;
