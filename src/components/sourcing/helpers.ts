import { ProjetWithPublicRelations } from "@/src/lib/prisma/prismaCustomTypes";
import { LatLngTuple } from "leaflet";
import { SourcingMapClientProps } from "./sourcing-map-client";
import { GeoJsonAdresse } from "./types";
import { lambert93toWGPS } from "@/src/helpers/convert-coordinates";
import { RetourExperienceResponse } from "../ficheSolution/type";

export const makeInProgressProjetsPositions = (
  inProgressProjets: ProjetWithPublicRelations[],
): SourcingMapClientProps["markers"] =>
  inProgressProjets.map((projet) => {
    const adresseInfo = projet.adresse_info as unknown as GeoJsonAdresse["properties"];

    const coordinates = adresseInfo
      ? lambert93toWGPS(adresseInfo.x, adresseInfo.y)
      : { latitude: projet.collectivite.latitude, longitude: projet.collectivite.longitude };

    return {
      geocode: [coordinates.latitude, coordinates.longitude] as LatLngTuple,
      type: "in-progress",
    };
  });

export const makeRexProjetsPositions = (rexProjets: RetourExperienceResponse[]): SourcingMapClientProps["markers"] =>
  rexProjets
    .filter((projet) => Boolean(projet.attributes.location as unknown as GeoJsonAdresse))
    .map((projet) => {
      const { coordinates } = (projet.attributes.location as unknown as GeoJsonAdresse).geometry;
      const geocode = [coordinates[1], coordinates[0]] as LatLngTuple;
      return {
        geocode,
        type: "rex",
      };
    });
