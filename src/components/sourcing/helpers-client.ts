import { divIcon, Icon, point } from "leaflet";
import { CustomMarker } from "./types";

export const createCustomIcon = (type: CustomMarker["type"], isActive: boolean) => {
  const WIDTH = 44;
  const HEIGHT = 53;
  return new Icon({
    iconUrl: `/images/sourcing/sourcing-projet-${type}${isActive ? "-active" : ""}.svg`,
    iconSize: [WIDTH, HEIGHT],
    iconAnchor: [WIDTH / 2, HEIGHT],
  });
};

export const createClusterCustomIcon = function (cluster: any) {
  const count = cluster.getChildCount();

  const BASE_SIZE = 35;
  const MAX_SIZE = 100;
  const FACTOR = 15;
  const size = Math.min(BASE_SIZE + Math.log(count) * FACTOR, MAX_SIZE);

  return divIcon({
    html: `<span>${count}</span>`,
    className: "custom-marker-cluster",

    iconSize: point(size, size, true),
    iconAnchor: [size / 2, size / 2],
  });
};
