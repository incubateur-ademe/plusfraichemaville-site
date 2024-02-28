import { Feature, GeoJsonProperties, Point } from "geojson";
import { collectivite } from "@prisma/client";
import { AddressCollectivite } from "@/lib/adresseApi/types";

export const mapAddressApiToCollectiviteAddress = (
  nationalBaseAddress: Feature<Point, GeoJsonProperties>,
): AddressCollectivite => ({
  banId: nationalBaseAddress.properties?.id,
  nomCollectivite: nationalBaseAddress.properties?.city,
  codeInsee: nationalBaseAddress.properties?.citycode,
  codePostal: nationalBaseAddress.properties?.postcode,
  long: nationalBaseAddress.geometry.coordinates[0]!,
  lat: nationalBaseAddress.geometry.coordinates[1]!,
  banInfo: nationalBaseAddress.properties,
});

export const mapDBCollectiviteToCollectiviteAddress = (dbCollectivite?: collectivite): AddressCollectivite | null => {
  return dbCollectivite
    ? {
      banId: dbCollectivite.ban_id ?? "",
      nomCollectivite: dbCollectivite.nom ?? "",
      codeInsee: dbCollectivite.code_insee ?? "",
      codePostal: dbCollectivite.code_postal ?? "",
      long: dbCollectivite.longitude,
      lat: dbCollectivite.latitude,
    }
    : null;
};
