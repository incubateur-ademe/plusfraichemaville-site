"use client";

import { useEffect } from "react";
import "leaflet/dist/leaflet.css";
import { MapContainer, Marker, ScaleControl, TileLayer, useMap, ZoomControl } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import { useCurrentProjetCoordinates } from "../hooks";
import { createClusterCustomIcon, createCustomIcon } from "../helpers-client";
import { SourcingMapLegend } from "./sourcing-map-legend";
import { SourcingMapFocus } from "./sourcing-map-focus";
import { CustomMarker, ZOOM_LEVELS, ZoomLevelKey } from "../types";
import { SourcingSidePanelContainer } from "../side-panel/sourcing-side-panel-container";
import { LatLngTuple } from "leaflet";

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

  return (
    <div className="flex">
      <div className="h-[715px] w-full max-w-[50rem]">
        <MapContainer
          className="relative h-full"
          center={currentProjetCoordinates || undefined}
          zoom={8}
          zoomControl={false}
          attributionControl={false}
        >
          <MapFocus mapFocus={mapFocus} />
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.basemaps.cartocdn.com/rastertiles/light_all/{z}/{x}/{y}.png"
            subdomains="abcd"
          />
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
          {currentProjetCoordinates && (
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
          <SourcingMapFocus coordinates={currentProjetCoordinates} />
        </MapContainer>
      </div>
      <div className="h-[715px] w-[400px] shrink-0 overflow-y-auto">
        <SourcingSidePanelContainer marker={selectedMarker} />
      </div>
    </div>
  );
};

export default SourcingMapClient;
