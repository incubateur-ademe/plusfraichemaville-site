"use client";

import "leaflet/dist/leaflet.css";
import { MapContainer, Marker, ScaleControl, ZoomControl } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import { useCurrentProjetCoordinates } from "../hooks";
import { createClusterCustomIcon, createCustomIcon } from "../helpers-client";
import { SourcingMapLegend } from "./sourcing-map-legend";
import { SourcingMapFocus } from "./sourcing-map-focus";
import { CustomMarker } from "../types";
import { SourcingSidePanelContainer } from "../side-panel/sourcing-side-panel-container";
import { SourcingMapTileLayer } from "@/src/components/sourcing/map/sourcing-map-tile-layer";

export type SourcingMapClientProps = {
  markers: CustomMarker[];
  setSelectedMarker: (_: CustomMarker) => void;
  selectedMarker?: CustomMarker;
};

const SourcingMapClient = ({ markers, setSelectedMarker, selectedMarker }: SourcingMapClientProps) => {
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
          <SourcingMapTileLayer />
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
