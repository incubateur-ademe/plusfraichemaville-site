import { FeatureCollection, GeoJsonProperties, Point } from "geojson";

type ErrorResponse = { code: number; message: string };
type BanFeatureCollection = FeatureCollection<Point, GeoJsonProperties>;
export type BanAPIResponse = BanFeatureCollection | ErrorResponse;

export type AddressCollectivite = {
  id?: number;
  banId: string;
  nomCollectivite: string;
  codePostal: string;
  codeInsee: string;
  long?: number | null;
  lat?: number | null;
  banInfo?: GeoJsonProperties | null;
};

export type AddressProjet = {
  label: string;
  banInfo?: GeoJsonProperties | null;
};
