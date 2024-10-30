"use client";

import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, ZoomControl } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import { LatLngTuple } from "leaflet";
import { useCurrentProjetCoordinates } from "./hooks";
import { createClusterCustomIcon, createCustomIcon } from "./helpers-client";
import { SourcingMapLegend } from "./sourcing-map-legend";
import { ScaleControl } from "react-leaflet";

export type SourcingMapClientProps = {
  markers: {
    geocode: LatLngTuple;
    type: "in-progress" | "rex" | "ma-collectivite";
  }[];
};

const SourcingMapClient = ({ markers }: SourcingMapClientProps) => {
  const currentProjetCoordinates = useCurrentProjetCoordinates();

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
          <Marker position={marker.geocode} key={index} icon={createCustomIcon(marker.type)} />
        ))}
      </MarkerClusterGroup>
      {currentProjetCoordinates && (
        <Marker position={currentProjetCoordinates} icon={createCustomIcon("ma-collectivite")} />
      )}
      <ZoomControl position="topleft" />
      <SourcingMapLegend />
      <ScaleControl position="bottomright" imperial={false} />
    </MapContainer>
  );
};

export default SourcingMapClient;
