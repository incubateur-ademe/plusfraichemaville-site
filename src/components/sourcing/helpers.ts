import { ProjetWithPublicRelations } from "@/src/lib/prisma/prismaCustomTypes";
import { RexProjet, StrapiLocation } from "@/src/lib/strapi/types/types";
import { LatLngTuple } from "leaflet";

export const makeInProgressProjetsPositions = (inProgressProjets: ProjetWithPublicRelations[]) =>
  inProgressProjets.map((projet) => ({
    geocode: [projet.collectivite.latitude, projet.collectivite.longitude] as LatLngTuple,
  }));

export const makeRexProjetsPositions = (rexProjets: RexProjet[]) =>
  rexProjets
    .filter((projet) => projet.attributes.location as unknown as StrapiLocation)
    .map((projet) => {
      const location = projet.attributes.location as unknown as StrapiLocation;
      const geocode = [location.lat, location.lng] as LatLngTuple;
      return {
        geocode,
      };
    });
