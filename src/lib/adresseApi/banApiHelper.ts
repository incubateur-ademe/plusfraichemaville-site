import { Feature, GeoJsonProperties, Point } from "geojson";
import { collectivite, projet } from "@/src/generated/prisma/client";
import { AddressCollectivite, AddressProjet } from "@/src/lib/adresseApi/types";

export const mapAddressApiToCollectiviteAddress = (nationalBaseAddress: Feature<Point>): AddressCollectivite => ({
  banId: nationalBaseAddress.properties?.id,
  nomCollectivite: nationalBaseAddress.properties?.city,
  codeInsee: nationalBaseAddress.properties?.citycode,
  oldCodeInsee: nationalBaseAddress.properties?.oldcitycode,
  codePostal: nationalBaseAddress.properties?.postcode,
  long: nationalBaseAddress.geometry.coordinates[0]!,
  lat: nationalBaseAddress.geometry.coordinates[1]!,
  banInfo: nationalBaseAddress,
});

export const mapAddressApiToAddressProjet = (nationalBaseAddress: Feature<Point>): AddressProjet => ({
  label: nationalBaseAddress.properties?.label,
  banInfo: nationalBaseAddress,
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
  return { label: dbProjet?.adresse ?? "", banInfo: dbProjet?.adresse_all_infos as GeoJsonProperties };
};
