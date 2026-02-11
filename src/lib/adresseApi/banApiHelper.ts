import { Feature, Point } from "geojson";
import { AddressCommune, AddressProjet } from "@/src/lib/adresseApi/types";
import { CollectiviteDto, ProjetDto } from "@/src/types/dto";

export const mapAddressApiToCollectiviteAddress = (nationalBaseAddress: Feature<Point>): AddressCommune => ({
  banId: nationalBaseAddress.properties?.id,
  nomCommune: nationalBaseAddress.properties?.city,
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

export const mapDBCollectiviteToCollectiviteAddress = (dbCollectivite?: CollectiviteDto): AddressCommune | null => {
  return dbCollectivite
    ? {
        id: dbCollectivite.id,
        banId: dbCollectivite.banId ?? "",
        nomCommune: dbCollectivite.nom ?? "",
        codeInsee: dbCollectivite.codeInsee ?? "",
        codePostal: dbCollectivite.codePostal ?? "",
        long: dbCollectivite.longitude,
        lat: dbCollectivite.latitude,
      }
    : null;
};

export const mapDBProjetToProjetAddress = (dbProjet?: ProjetDto): AddressProjet => {
  return { label: dbProjet?.adresse ?? "", banInfo: dbProjet?.adresseAllInfos };
};
