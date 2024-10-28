"use client";

import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import { Icon, LatLngTuple, divIcon, point } from "leaflet";

type MapProps = {
  markers: {
    geocode: LatLngTuple;
    popup?: string;
  }[];
};
export const Map = ({ markers }: MapProps) => {
  const customIcon = new Icon({
    iconUrl: "/images/sourcing/sourcing-projet-rex.svg",
    iconSize: [54, 65],
  });

  const createClusterCustomIcon = function (cluster: any) {
    return divIcon({
      html: `<span class="cluster-icon">${cluster.getChildCount()}</span>`,
      className: "custom-marker-cluster",
      iconSize: point(33, 33, true),
    });
  };
  return (
    <MapContainer className="h-[715px]" center={[48.8566, 2.3522]} zoom={10}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <MarkerClusterGroup chunkedLoading iconCreateFunction={createClusterCustomIcon}>
        {markers.map((marker, index) => (
          <Marker position={marker.geocode} key={index} icon={customIcon}>
            {marker.popup && <Popup>{marker.popup}</Popup>}
          </Marker>
        ))}
      </MarkerClusterGroup>
    </MapContainer>
  );
};
