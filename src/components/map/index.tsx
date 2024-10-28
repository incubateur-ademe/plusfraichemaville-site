"use client";

import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import { Icon, LatLngTuple, divIcon, point } from "leaflet";

export type SourcingMapElementProps = {
  markers: {
    geocode: LatLngTuple;
    type: "in-progress" | "rex" | "collectivite";
    popup?: string;
  }[];
};

const customIcon = (type: SourcingMapElementProps["markers"][number]["type"]) =>
  new Icon({
    iconUrl: `/images/sourcing/sourcing-projet-${type}.svg`,
    iconSize: [54, 65],
  });

const createClusterCustomIcon = function (cluster: any) {
  return divIcon({
    html: `<span>${cluster.getChildCount()}</span>`,
    className: "custom-marker-cluster",
    iconSize: point(33, 33, true),
  });
};

export const Map = ({ markers }: SourcingMapElementProps) => {
  // const user = useUserStore((state) => state.userInfos);
  // const projet = useProjetsStore((state) => state.getCurrentProjet());
  console.log({ markers });

  return (
    <MapContainer className="h-[715px]" center={[48.8566, 2.3522]} zoom={5}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <MarkerClusterGroup chunkedLoading iconCreateFunction={createClusterCustomIcon}>
        {markers.map((marker, index) => (
          <Marker position={marker.geocode} key={index} icon={customIcon(marker.type)}>
            {marker.popup && <Popup>{marker.popup}</Popup>}
          </Marker>
        ))}
      </MarkerClusterGroup>
    </MapContainer>
  );
};
