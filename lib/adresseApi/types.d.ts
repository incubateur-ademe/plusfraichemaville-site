import { FeatureCollection, GeoJsonProperties, Point } from "geojson";

type ErrorResponse = { code: number; message: string };
type BanFeatureCollection = FeatureCollection<Point, GeoJsonProperties>;
export type BanAPIResponse = BanFeatureCollection | ErrorResponse;

export type AddressCollectivite = {
  banId: string;
  nomCollectivite: string;
  codePostal: string;
  codeInsee: string;
  long?: number | null;
  lat?: number | null;
  banInfo?: GeoJsonProperties | null;
};
