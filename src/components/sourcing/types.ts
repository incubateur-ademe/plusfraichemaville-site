import { GetValues } from "@/src/lib/strapi/types/types";
import { LatLngTuple } from "leaflet";

type Coordinates = [number, number];

interface Geometry {
  type: "Point";
  coordinates: Coordinates;
}

export interface AddressProperties {
  label: string;
  score: number;
  housenumber: string;
  id: string;
  type: "housenumber";
  name: string;
  postcode: string;
  citycode: string;
  x: number;
  y: number;
  city: string;
  context: string;
  importance: number;
  street: string;
}

export interface GeoJsonAdresse {
  type: "Feature";
  geometry: Geometry;
  properties: AddressProperties;
}

export type CustomMarker = {
  geocode: LatLngTuple;
  type: "in-progress" | "rex" | "ma-collectivite";
  idProjet?: number;
};

export type SourcingContact = {
  type_de_contact: GetValues<"retour-experience.contact">["type_de_contact"];
  sous_type_de_contact: GetValues<"retour-experience.contact">["sous_type_de_contact"];
  label?: string;
  telephone?: string;
  email?: string;
};

export type SourcingContactTypeMap = {
  code:
    | GetValues<"retour-experience.contact">["sous_type_de_contact"]
    | GetValues<"retour-experience.contact">["type_de_contact"];
  label: string;
};
