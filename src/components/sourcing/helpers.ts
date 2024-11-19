import {
  ProjetWithPublicRelations,
  UserProjetWithPublicInfos,
  UserProjetWithUserInfos,
} from "@/src/lib/prisma/prismaCustomTypes";
import { LatLngTuple } from "leaflet";
import { SourcingMapClientProps } from "./map/sourcing-map-client";
import { CustomMarker, GeoJsonAdresse, SourcingContact, SourcingContactTypeMap, StrapiSourcingContact } from "./types";
import { lambert93toWGPS } from "@/src/helpers/convert-coordinates";
import { RetourExperienceResponse } from "../ficheSolution/type";
import { prettyUserName } from "@/src/helpers/user";
import { selectEspaceByCode } from "@/src/components/filters/TypeEspaceFilter";
import { getRegionLabelForProjet, getRegionLabelFromCode } from "@/src/helpers/regions";

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

export const contactsTypeMap: SourcingContactTypeMap[] = [
  { code: "conseil", label: "Conseil" },
  { code: "structure_publique", label: "Structure publique" },
  { code: "conception_et_realisation", label: "Conception et réalisation" },
  { code: "concertation_citoyenne", label: "Concertation citoyenne" },
  { code: "recherche_et_innovation", label: "Recherche et innovation" },
  { code: "groupements", label: "Groupement" },
  { code: "collectivite", label: "Collectivité" },
] as const;

export const contactsSousTypeMap: SourcingContactTypeMap[] = [
  { code: "bureau_etude_ingenierie", label: "Bureau d'étude ingénierie" },
  { code: "bureau_etude_technique", label: "Bureau d'étude technique" },
  { code: "assistance_maitrise_ouvrage", label: "Assistance à maîtrise d'ouvrage" },
  { code: "agence_eau", label: "Agence de l'eau" },
  { code: "bailleur_social", label: "Bailleur social" },
  { code: "caue", label: "CAUE" },
  { code: "agence_architecture", label: "Agence d'architecture" },
  { code: "agence_paysagiste", label: "Agence paysagiste" },
  { code: "amenageur", label: "Aménageur" },
  { code: "societe_arboriculture", label: "Société d'arboriculture" },
  { code: "agence_conception_lumiere", label: "Agence conception lumière" },
  { code: "syndic_copropriete", label: "Syndic de copropriété" },
  { code: "agence_communication", label: "Agence de communication" },
  { code: "collectif", label: "Collectif" },
  { code: "pole_universitaire", label: "Pôle universitaire" },
  { code: "laboratoire_recherche", label: "Laboratoire de recherche" },
  { code: "institut", label: "Institut" },
  { code: "syndicat_mixte", label: "Syndicat mixte" },
  { code: "association", label: "Association" },
  { code: "federation", label: "Fédération" },
  { code: "collectivite", label: "Collectivité" },
] as const;

export const getSourcingContactTypeLabel = (code: SourcingContactTypeMap["code"], isSousType: boolean) => {
  const map = isSousType ? contactsSousTypeMap : contactsTypeMap;
  const contactType = map.find((item) => item.code === code);
  return contactType?.label;
};

export const strapiContactToSourcingContact = (
  strapiContact: StrapiSourcingContact,
  retourExperience: RetourExperienceResponse,
): SourcingContact => {
  return {
    type: "rex",
    id: { rexId: retourExperience.id, contactId: strapiContact.id },
    label: strapiContact.label,
    email: strapiContact.email,
    telephone: strapiContact.telephone,
    siteInternet: strapiContact.site_internet,
    sousTypeContact: strapiContact.sous_type_de_contact,
    typeContact: strapiContact.type_de_contact,
    rex: {
      nom: retourExperience.attributes.titre,
      cout: retourExperience.attributes.cout,
      slug: retourExperience.attributes.slug,
      region: getRegionLabelFromCode(retourExperience.attributes.region?.data.attributes.code)
    },
  };
};

export const userProjetToSourcingContact = (userProjet: UserProjetWithUserInfos): SourcingContact => ({
  type: "in-progress",
  userProjetId: userProjet?.id,
  typeContact: "collectivite",
  email: userProjet?.user?.email,
  poste: userProjet?.user?.poste,
  nomCollectivite: userProjet?.user?.nom_etablissement,
  label: userProjet.user ? prettyUserName(userProjet.user) : "",
});

export const userProjetToSourcingContactWithProjet = (userProjet: UserProjetWithPublicInfos): SourcingContact => ({
  type: "in-progress",
  userProjetId: userProjet?.id,
  typeContact: "collectivite",
  email: userProjet?.user?.email,
  poste: userProjet?.user?.poste,
  nomCollectivite: userProjet?.user?.nom_etablissement,
  label: userProjet.user ? prettyUserName(userProjet.user) : "",
  projet: {
    nom: userProjet.projet.nom,
    typeEspace: selectEspaceByCode(userProjet.projet.type_espace),
    region: getRegionLabelForProjet(userProjet.projet),
  },
});
