"use client";

import "leaflet/dist/leaflet.css";
import { MapContainer, Marker, ScaleControl, TileLayer, ZoomControl } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import { useCurrentProjetCoordinates } from "./hooks";
import { createClusterCustomIcon, createCustomIcon, CustomMarker } from "./helpers-client";
import { SourcingMapLegend } from "./sourcing-map-legend";

export type SourcingMapClientProps = {
  markers: CustomMarker[];
  setSelectedMarker: (_: CustomMarker) => void;
};

const SourcingMapClient = ({ markers, setSelectedMarker }: SourcingMapClientProps) => {
  const currentProjetCoordinates = useCurrentProjetCoordinates();

  const handleMarkerClick = (selectedMarker: CustomMarker) => {
    setSelectedMarker(selectedMarker);
  };

  return (
    <MapContainer
      className="relative h-[715px]"
      center={[48.8566, 2.3522]}
      zoom={5}
      zoomControl={false}
      attributionControl={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MarkerClusterGroup chunkedLoading iconCreateFunction={createClusterCustomIcon}>
        {markers.map((marker, index) => (
          <Marker
            position={marker.geocode}
            key={index}
            icon={createCustomIcon(marker.type)}
            eventHandlers={{ click: () => handleMarkerClick(marker) }}
          />
        ))}
      </MarkerClusterGroup>
      {currentProjetCoordinates && (
        <Marker
          position={currentProjetCoordinates}
          icon={createCustomIcon("ma-collectivite")}
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
    </MapContainer>
  );
};

export default SourcingMapClient;
