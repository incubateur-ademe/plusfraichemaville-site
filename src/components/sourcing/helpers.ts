import { ProjetWithPublicRelations } from "@/src/lib/prisma/prismaCustomTypes";
import { RexProjet } from "@/src/lib/strapi/types/types";
import { LatLngTuple } from "leaflet";
import { SourcingMapElementProps } from "../map";
import { GeoJsonDocument } from "./types";

export const makeInProgressProjetsPositions = (
  inProgressProjets: ProjetWithPublicRelations[],
): SourcingMapElementProps["markers"] =>
  inProgressProjets.map((projet) => ({
    geocode: [projet.collectivite.latitude, projet.collectivite.longitude] as LatLngTuple,
    type: "in-progress",
  }));

export const makeRexProjetsPositions = (rexProjets: RexProjet[]): SourcingMapElementProps["markers"] =>
  rexProjets
    .filter((projet) => Boolean(projet.attributes.location as unknown as GeoJsonDocument))
    .map((projet) => {
      const { coordinates } = (projet.attributes.location as unknown as GeoJsonDocument).features[0].geometry;
      const geocode = [coordinates[1], coordinates[0]] as LatLngTuple;
      return {
        geocode,
        type: "rex",
      };
    });
