type Coordinates = [number, number];

interface Geometry {
  type: "Point";
  coordinates: Coordinates;
}

interface AddressProperties {
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

interface Adresse {
  type: "Feature";
  geometry: Geometry;
  properties: AddressProperties;
}

export interface GeoJsonDocument {
  type: "FeatureCollection";
  version: string;
  features: Adresse[];
  attribution: string;
  licence: string;
  query: string;
  limit: number;
}
