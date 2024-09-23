import { Feature, GeoJsonProperties, Point } from "geojson";
import { collectivite, projet } from "@prisma/client";
import { AddressCollectivite, AddressProjet } from "@/src/lib/adresseApi/types";

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

export const mapAddressApiToAddressProjet = (
  nationalBaseAddress: Feature<Point, GeoJsonProperties>,
): AddressProjet => ({
  label: nationalBaseAddress.properties?.label,
  banInfo: nationalBaseAddress.properties,
});

export const mapDBCollectiviteToCollectiviteAddress = (dbCollectivite?: collectivite): AddressCollectivite | null => {
  return dbCollectivite
    ? {
        id: dbCollectivite.id,
        banId: dbCollectivite.ban_id ?? "",
        nomCollectivite: dbCollectivite.nom ?? "",
        codeInsee: dbCollectivite.code_insee ?? "",
        codePostal: dbCollectivite.code_postal ?? "",
        long: dbCollectivite.longitude,
        lat: dbCollectivite.latitude,
      }
    : null;
};

export const mapDBProjetToProjetAddress = (dbProjet?: projet): AddressProjet => {
  return { label: dbProjet?.adresse ?? "", banInfo: dbProjet?.adresse_info as GeoJsonProperties };
};
