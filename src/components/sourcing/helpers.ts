import { ProjetWithPublicRelations } from "@/src/lib/prisma/prismaCustomTypes";
import { LatLngTuple } from "leaflet";
import { SourcingMapClientProps } from "./map/sourcing-map-client";
import { CustomMarker, GeoJsonAdresse } from "./types";
import { lambert93toWGPS } from "@/src/helpers/convert-coordinates";
import { RetourExperienceResponse } from "../ficheSolution/type";

export const makeInProgressProjetsPositions = (inProgressProjets: ProjetWithPublicRelations[]): CustomMarker[] =>
  inProgressProjets.map((projet) => {
    const adresseInfo = projet.adresse_info as unknown as GeoJsonAdresse["properties"];

    const coordinates = adresseInfo
      ? lambert93toWGPS(adresseInfo.x, adresseInfo.y)
      : { latitude: projet.collectivite.latitude, longitude: projet.collectivite.longitude };

    return {
      geocode: [coordinates.latitude, coordinates.longitude] as LatLngTuple,
      type: "in-progress",
      idProjet: projet.id,
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
        idProjet: projet.id,
      };
    });

export const contactsTypeMap = {
  conseil: "Conseil",
  structure_publique: "Structure publique",
  conception_et_realisation: "Conception et réalisation",
  concertation_citoyenne: "Concertation citoyenne",
  recherche_et_innovation: "Recherche et innovation",
  groupements: "Groupements",
  collectivite: "Collectivité",
} as const;

export const contactsSousTypeMap = {
  bureau_etude_ingenierie: "Bureau d'étude ingénierie",
  bureau_etude_technique: "Bureau d'étude technique",
  assistance_maitrise_ouvrage: "Assistance à maîtrise d'ouvrage",
  agence_eau: "Agence de l'eau",
  bailleur_social: "Bailleur social",
  caue: "CAUE",
  agence_architecture: "Agence d'architecture",
  agence_paysagiste: "Agence paysagiste",
  amenageur: "Aménageur",
  societe_arboriculture: "Société d'arboriculture",
  agence_conception_lumiere: "Agence conception lumière",
  syndic_copropriete: "Syndic de copropriété",
  agence_communication: "Agence de communication",
  collectif: "Collectif",
  pole_universitaire: "Pôle universitaire",
  laboratoire_recherche: "Laboratoire de recherche",
  institut: "Institut",
  syndicat_mixte: "Syndicat mixte",
  association: "Association",
  federation: "Fédération",
  collectivite: "Collectivité",
} as const;
