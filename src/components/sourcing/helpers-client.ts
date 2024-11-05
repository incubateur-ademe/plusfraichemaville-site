import { divIcon, Icon, LatLngTuple, point } from "leaflet";

export type CustomMarker = {
  geocode: LatLngTuple;
  type: "in-progress" | "rex" | "ma-collectivite";
  idProjet?: number;
};

export const createCustomIcon = (type: CustomMarker["type"]) =>
  new Icon({
    iconUrl: `/images/sourcing/sourcing-projet-${type}.svg`,
    iconSize: [64, 77],
    iconAnchor: [32, 77],
  });

export const createClusterCustomIcon = function (cluster: any) {
  return divIcon({
    html: `<span>${cluster.getChildCount()}</span>`,
    className: "custom-marker-cluster",
    iconSize: point(33, 33, true),
    iconAnchor: [50, 12],
  });
};
