"use client";

import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, ZoomControl } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import { LatLngTuple } from "leaflet";
import { useProjetCoordinates } from "./hooks";
import { createClusterCustomIcon, createCustomIcon } from "./helpers-client";
import { SourcingMapLegend } from "./sourcing-map-legend";

export type SourcingMapClientProps = {
  markers: {
    geocode: LatLngTuple;
    type: "in-progress" | "rex" | "collectivite";
  }[];
};

export const SourcingMapClient = ({ markers }: SourcingMapClientProps) => {
  const coordinates = useProjetCoordinates();
  return (
    <MapContainer className="relative h-[715px]" center={[48.8566, 2.3522]} zoom={5} zoomControl={false}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MarkerClusterGroup chunkedLoading iconCreateFunction={createClusterCustomIcon}>
        {markers.map((marker, index) => (
          <Marker position={marker.geocode} key={index} icon={createCustomIcon(marker.type)} />
        ))}
      </MarkerClusterGroup>
      {coordinates && <Marker position={coordinates} icon={createCustomIcon("collectivite")} />}
      <ZoomControl position="topleft" />
      <SourcingMapLegend />
    </MapContainer>
  );
};
