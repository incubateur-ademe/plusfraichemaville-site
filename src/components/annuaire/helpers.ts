import {
  ProjetWithPublicRelations,
  UserProjetWithPublicInfos,
  UserProjetWithUserInfos,
} from "@/src/lib/prisma/prismaCustomTypes";
import { LatLngTuple } from "leaflet";
import { AnnuaireMapClientProps } from "./map/annuaire-map-client";
import { CustomMarker, GeoJsonAdresse, AnnuaireContact, AnnuaireContactTypeMap, StrapiAnnuaireContact } from "./types";
import { prettyUserName } from "@/src/helpers/user";
import { getRegionLabelForProjet, getRegionLabelFromCode } from "@/src/helpers/regions";
import { formatNumberWithSpaces } from "@/src/helpers/common";
import { selectEspaceByCode, TypeEspaceCode } from "@/src/helpers/type-espace-filter";
import { RetourExperience } from "@/src/lib/strapi/types/api/retour-experience";
import { SousTypeDeContact, TypeDeContact } from "@/src/lib/strapi/types/components/retour-experience/Contact";

export const getProjetCoordinates = (projet: ProjetWithPublicRelations): LatLngTuple => {
  const adresseInfo = projet.adresse_all_infos as unknown as GeoJsonAdresse | undefined;
  const coordinates = adresseInfo?.geometry.coordinates
    ? { latitude: adresseInfo.geometry.coordinates[1], longitude: adresseInfo.geometry.coordinates[0] }
    : { latitude: projet.collectivite.latitude, longitude: projet.collectivite.longitude };
  return [coordinates.latitude, coordinates.longitude] as LatLngTuple;
};

export const makeInProgressProjetsPositions = (inProgressProjets: ProjetWithPublicRelations[]): CustomMarker[] =>
  inProgressProjets
    .map((projet): CustomMarker | undefined => {
      const coordinates = getProjetCoordinates(projet);

      if (!coordinates[0] || !coordinates[1]) {
        return undefined;
      }

      return {
        geocode: [coordinates[0], coordinates[1]],
        type: "in-progress",
        idProjet: projet.id,
        projet: {
          typeEspace: projet.type_espace as TypeEspaceCode,
        },
      };
    })
    .filter((marker) => marker !== undefined);

export const makeRexMarkers = (rexProjets: RetourExperience[]): AnnuaireMapClientProps["markers"] =>
  rexProjets
    .filter((projet) => Boolean(projet.attributes.location as unknown as GeoJsonAdresse))
    .map((projet) => {
      const { coordinates } = (projet.attributes.location as unknown as GeoJsonAdresse).geometry;
      const geocode = [coordinates[1], coordinates[0]] as LatLngTuple;
      const typeEspace = projet.attributes.types_espaces as TypeEspaceCode[];

      return {
        geocode,
        type: "rex",
        idProjet: projet.id,
        projet: {
          typeEspace,
          budget: projet.attributes.cout_euro,
        },
      };
    });

export const contactsTypeMap: AnnuaireContactTypeMap[] = [
  { code: TypeDeContact.Collectivite, label: "Collectivité" },
  { code: TypeDeContact.Conseil, label: "Conseil" },
  { code: TypeDeContact.StructurePublique, label: "Structure publique" },
  { code: TypeDeContact.ConceptionEtRealisation, label: "Conception et réalisation" },
  { code: TypeDeContact.ConcertationCitoyenne, label: "Concertation citoyenne" },
  { code: TypeDeContact.RechercheEtInnovation, label: "Recherche et innovation" },
  { code: TypeDeContact.Groupements, label: "Groupement" },
] as const;

export const getContactType = (code: AnnuaireContactTypeMap["code"]) =>
  contactsTypeMap.find((item) => item.code === code);

export type ContactTypeKeys = (typeof contactsTypeMap)[number]["code"];

export const getContactTypeLabelByCode = (code: ContactTypeKeys) =>
  contactsTypeMap.find((c) => c.code === code)?.label || code;

export const contactsSousTypeMap: AnnuaireContactTypeMap[] = [
  { code: SousTypeDeContact.BureauEtudeIngenierie, label: "Bureau d'étude ingénierie" },
  { code: SousTypeDeContact.BureauEtudeTechnique, label: "Bureau d'étude technique" },
  { code: SousTypeDeContact.AssistanceMaitriseOuvrage, label: "Assistance à maîtrise d'ouvrage" },
  { code: SousTypeDeContact.AgenceEau, label: "Agence de l'eau" },
  { code: SousTypeDeContact.BailleurSocial, label: "Bailleur social" },
  { code: SousTypeDeContact.Caue, label: "CAUE" },
  { code: SousTypeDeContact.AgenceArchitecture, label: "Agence d'architecture" },
  { code: SousTypeDeContact.AgencePaysagiste, label: "Agence paysagiste" },
  { code: SousTypeDeContact.Amenageur, label: "Aménageur" },
  { code: SousTypeDeContact.SocieteArboriculture, label: "Société d'arboriculture" },
  { code: SousTypeDeContact.AgenceConceptionLumiere, label: "Agence conception lumière" },
  { code: SousTypeDeContact.SyndicCopropriete, label: "Syndic de copropriété" },
  { code: SousTypeDeContact.AgenceCommunication, label: "Agence de communication" },
  { code: SousTypeDeContact.Collectif, label: "Collectif" },
  { code: SousTypeDeContact.PoleUniversitaire, label: "Pôle universitaire" },
  { code: SousTypeDeContact.LaboratoireRecherche, label: "Laboratoire de recherche" },
  { code: SousTypeDeContact.Institut, label: "Institut" },
  { code: SousTypeDeContact.SyndicatMixte, label: "Syndicat mixte" },
  { code: SousTypeDeContact.Association, label: "Association" },
  { code: SousTypeDeContact.Federation, label: "Fédération" },
  { code: SousTypeDeContact.Collectivite, label: "Collectivité" },
  { code: SousTypeDeContact.EntreprisePrivee, label: "Entreprise privée" },
  { code: SousTypeDeContact.AgenceUrbanisme, label: "Agence d'urbanisme" },
  { code: SousTypeDeContact.EtablissementPublic, label: "Établissement public" },
  { code: SousTypeDeContact.PoleInnovation, label: "Pôle d'innovation" },
] as const;

export const getAnnuaireContactTypeLabel = (code: AnnuaireContactTypeMap["code"], isSousType?: boolean) => {
  const map = isSousType ? contactsSousTypeMap : contactsTypeMap;
  const contactType = map.find((item) => item.code === code);
  return contactType?.label;
};

export const strapiContactToAnnuaireContact = (
  strapiContact: StrapiAnnuaireContact,
  retourExperience: RetourExperience,
): AnnuaireContact => {
  return {
    type: "rex",
    uniqueId: `rex-${retourExperience.id}-${strapiContact.id}`,
    id: { rexId: retourExperience.id, contactId: strapiContact.id },
    label: strapiContact.label,
    email: strapiContact.email,
    telephone: strapiContact.telephone,
    siteInternet: strapiContact.site_internet,
    sousTypeContact: strapiContact.sous_type_de_contact,
    typeContact: strapiContact.type_de_contact,
    rex: {
      nom: retourExperience.attributes.titre,
      cout:
        retourExperience.attributes.cout_euro != null && retourExperience.attributes.cout_euro >= 0
          ? `${formatNumberWithSpaces(retourExperience.attributes.cout_euro)} €`
          : "Non communiqué",
      slug: retourExperience.attributes.slug,
      region: getRegionLabelFromCode(retourExperience.attributes.region?.data.attributes.code),
    },
  };
};

export const userProjetToAnnuaireContact = (userProjet: UserProjetWithUserInfos): AnnuaireContact => ({
  type: "in-progress",
  uniqueId: `in-progress-${userProjet?.id}`,
  userProjetId: userProjet?.id,
  typeContact: TypeDeContact.Collectivite,
  email: userProjet?.user?.email,
  poste: userProjet?.user?.poste,
  nomCollectivite: userProjet?.user?.nom_etablissement,
  label: userProjet.user ? prettyUserName(userProjet.user) : "",
});

export const userProjetToAnnuaireContactWithProjet = (userProjet: UserProjetWithPublicInfos): AnnuaireContact => ({
  type: "in-progress",
  uniqueId: `in-progress-${userProjet?.id}`,
  userProjetId: userProjet?.id,
  typeContact: TypeDeContact.Collectivite,
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

export const BUDGET_RANGES = {
  LESS_THAN_40K: { min: 0, max: 40000, label: "Moins de 40k€" },
  FROM_40K_TO_100K: { min: 40000, max: 100000, label: "De 40k€ à 100k€" },
  FROM_100K_TO_1M: { min: 100000, max: 1000000, label: "De 100k€ à 1M€" },
  FROM_1M_TO_10M: { min: 1000000, max: 10000000, label: "De 1M€ à 10M€" },
  MORE_THAN_10M: { min: 10000000, max: Infinity, label: "Plus de 10M€" },
} as const;

export type BudgetRangeKey = keyof typeof BUDGET_RANGES;
