import { Icon, divIcon, point } from "leaflet";
import { SourcingMapClientProps } from "./sourcing-map-client";

export const createCustomIcon = (type: SourcingMapClientProps["markers"][number]["type"]) =>
  new Icon({
    iconUrl: `/images/sourcing/sourcing-projet-${type}.svg`,
  });

export const createClusterCustomIcon = function (cluster: any) {
  return divIcon({
    html: `<span>${cluster.getChildCount()}</span>`,
    className: "custom-marker-cluster",
    iconSize: point(33, 33, true),
  });
};
