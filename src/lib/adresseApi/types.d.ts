import { Feature, FeatureCollection, GeoJsonProperties, Point } from "geojson";

type ErrorResponse = { code: number; message: string; detail: string[] };
type BanFeatureCollection = FeatureCollection<Point, GeoJsonProperties>;
export type BanFeature = Feature<Point, GeoJsonProperties<object>>;
export type BanAPIResponse = BanFeatureCollection | ErrorResponse;

export type AddressCommune = {
  id?: number;
  banId: string;
  nomCommune: string;
  codePostal: string;
  codeInsee: string;
  oldCodeInsee?: string;
  long?: number | null;
  lat?: number | null;
  banInfo?: GeoJsonProperties | null;
};

export type AddressProjet = {
  label: string;
  banInfo?: GeoJsonProperties | null;
};
