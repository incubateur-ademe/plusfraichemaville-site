/**
 * User Converters
 * Converts Prisma types to DTOs
 */

import { User } from "@/src/generated/prisma/client";
import { UserDto, UserPublicInfosDto, UserWithAdminProjetsDto, UserWithCollectiviteDto } from "@/src/types/dto";
import { AgentConnectInfo, UserPublicInfos, UserWithAdminProjets, UserWithCollectivite } from "../prismaCustomTypes";
import { convertCollectiviteToDto } from "./collectivite-converters";
import { SirenInfo } from "@/src/lib/siren/types";
import { convertProjetWithCollectiviteToDto } from "@/src/lib/prisma/dto-converters/projet-converters";

export function convertUserToDto(user: User): UserDto {
  return {
    id: user.id,
    email: user.email,
    emailVerified: user.emailVerified?.toISOString() || null,
    image: user.image,
    agentconnectInfo: user.agentconnect_info as AgentConnectInfo | null,
    nom: user.nom,
    prenom: user.prenom,
    poste: user.poste,
    nomEtablissement: user.nom_etablissement,
    siren: user.siren,
    sirenInfo: user.siren_info as SirenInfo | null,
    createdAt: user.created_at.toISOString(),
    updatedAt: user.updated_at?.toISOString() || null,
    canalAcquisition: user.canal_acquisition,
    discardedInformation: user.discardedInformation,
    acceptCommunicationProduit: user.accept_communication_produit,
    acceptCommunicationSuiviProjet: user.accept_communication_suivi_projet,
    lastBrowsingDate: user.last_browsing_date?.toISOString() || null,
    statut: user.statut,
  };
}

export function convertUserPublicInfosToDto(user: UserPublicInfos): UserPublicInfosDto {
  return {
    id: user.id,
    nom: user.nom,
    prenom: user.prenom,
    email: user.email,
    poste: user.poste,
    nomEtablissement: user.nom_etablissement,
  };
}

export function convertUserWithCollectiviteToDto(user: UserWithCollectivite): UserWithCollectiviteDto {
  return {
    ...convertUserToDto(user),
    collectivites: user.collectivites.map((uc) => ({
      userId: uc.user_id,
      collectiviteId: uc.collectivite_id,
      collectivite: convertCollectiviteToDto(uc.collectivite),
    })),
  };
}

export function convertUserWithAdminProjetsToDto(user: UserWithAdminProjets): UserWithAdminProjetsDto {
  return {
    ...convertUserToDto(user),
    projets: user.projets.map((userProjet) => convertProjetWithCollectiviteToDto(userProjet.projet)),
    collectivites: user.collectivites.map((uc) => ({
      collectivite: { codePostal: uc.collectivite.code_postal, adresseAllInfos: uc.collectivite.adresse_all_infos },
    })),
  };
}
