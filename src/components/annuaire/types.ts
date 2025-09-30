import { TypeEspaceCode } from "@/src/helpers/type-espace-filter";
import { LatLngTuple } from "@/src/types/global";
import { Contact } from "@/src/lib/strapi/types/components/retour-experience/Contact";

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

export type StrapiAnnuaireContact = Contact & { id: number };

export type RexContactId = { rexId: number; contactId: number };

export type AnnuaireContact = {
  uniqueId: string;
  typeContact: Contact["type_de_contact"];
  label?: string;
  telephone?: string;
  email?: string;
  siteInternet?: string;
} & (
  | {
      type: "rex";
      id: RexContactId;
      sousTypeContact: Contact["sous_type_de_contact"];
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

export type AnnuaireContactTypeMap = {
  code: Contact["sous_type_de_contact"] | Contact["type_de_contact"];
  label: string;
};
