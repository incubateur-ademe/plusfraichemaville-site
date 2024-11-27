import { GetValues } from "@/src/lib/strapi/types/types";
import { LatLngTuple } from "leaflet";
import { TypeEspaceCode } from "../filters/TypeEspaceFilter";

type Coordinates = [number, number];

interface Geometry {
  type: "Point";
  coordinates: Coordinates;
}

export const ZOOM_LEVELS = {
  housenumber: 18,
  street: 16,
  locality: 14,
  municipality: 12,
} as const;

export type ZoomLevelKey = keyof typeof ZOOM_LEVELS;

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
  projet?: {
    typeEspace?: TypeEspaceCode | TypeEspaceCode[];
    budget?: number;
  };
};

export type CustomMarkerType = CustomMarker["type"];

export type StrapiSourcingContact = GetValues<"retour-experience.contact"> & { id: number };

export type RexContactId = { rexId: number; contactId: number };

export type SourcingContact = {
  uniqueId: string;
  typeContact: GetValues<"retour-experience.contact">["type_de_contact"];
  label?: string;
  telephone?: string;
  email?: string;
  siteInternet?: string;
} & (
  | {
      type: "rex";
      id: RexContactId;
      sousTypeContact: GetValues<"retour-experience.contact">["sous_type_de_contact"];
      rex?: { nom: string; cout?: string; region?: string | null; slug: string };
    }
  | {
      type: "in-progress";
      userProjetId: number;
      nomCollectivite?: string | null;
      poste?: string | null;
      projet?: {
        nom: string;
        region: string | null;
        typeEspace?: string | null;
      };
    }
);

export type SourcingContactTypeMap = {
  code:
    | GetValues<"retour-experience.contact">["sous_type_de_contact"]
    | GetValues<"retour-experience.contact">["type_de_contact"];
  label: string;
};
