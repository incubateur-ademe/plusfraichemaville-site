/**
 * UserProjet Converters
 * Converts Prisma types to DTOs
 */

import { user_projet } from '@/src/generated/prisma/client';
import {
  UserProjetDto,
  UserProjetWithUserDto,
  UserProjetWithUserInfosDto,
  UserProjetWithPublicInfosDto,
  UserProjetWithRelationsDto,
} from '@/src/types/dto';
import {
  UserProjetWithUser,
  UserProjetWithUserInfos,
  UserProjetWithPublicInfos,
  UserProjetWithRelations,
} from '../prismaCustomTypes';
import { convertUserToDto, convertUserPublicInfosToDto, convertUserWithCollectiviteToDto } from './user-converters';
import { convertCollectiviteToDto } from './collectivite-converters';

export function convertUserProjetToDto(userProjet: user_projet): UserProjetDto {
  return {
    id: userProjet.id,
    emailAddress: userProjet.email_address,
    role: userProjet.role,
    projetId: userProjet.projet_id,
    userId: userProjet.user_id,
    createdAt: userProjet.created_at.toISOString(),
    invitationToken: userProjet.invitation_token,
    invitationStatus: userProjet.invitation_status,
    deletedAt: userProjet.deleted_at?.toISOString() || null,
    deletedBy: userProjet.deleted_by,
    nbViews: userProjet.nb_views,
    lastViewedAt: userProjet.last_viewed_at?.toISOString() || null,
  };
}

export function convertUserProjetWithUserToDto(userProjet: UserProjetWithUser): UserProjetWithUserDto {
  return {
    ...convertUserProjetToDto(userProjet),
    user: userProjet.user ? convertUserToDto(userProjet.user) : null,
  };
}

export function convertUserProjetWithUserInfosToDto(userProjet: UserProjetWithUserInfos): UserProjetWithUserInfosDto {
  return {
    id: userProjet.id,
    user: userProjet.user ? convertUserPublicInfosToDto(userProjet.user) : null,
    createdAt: userProjet.created_at.toISOString(),
    role: userProjet.role,
    invitationStatus: userProjet.invitation_status,
    userId: userProjet.user_id,
    nbViews: userProjet.nb_views,
  };
}

export function convertUserProjetWithPublicInfosToDto(
  userProjet: UserProjetWithPublicInfos,
): UserProjetWithPublicInfosDto {
  return {
    id: userProjet.id,
    user: userProjet.user ? convertUserPublicInfosToDto(userProjet.user) : null,
    projet: {
      collectivite: convertCollectiviteToDto(userProjet.projet.collectivite),
      nom: userProjet.projet.nom,
      typeEspace: userProjet.projet.type_espace,
      niveauMaturite: userProjet.projet.niveau_maturite,
      adresseAllInfos: userProjet.projet.adresse_all_infos,
    },
  };
}

export function convertUserProjetWithRelationsToDto(userProjet: UserProjetWithRelations): UserProjetWithRelationsDto {
  return {
    id: userProjet.id,
    emailAddress: userProjet.email_address,
    role: userProjet.role,
    projetId: userProjet.projet_id,
    userId: userProjet.user_id,
    createdAt: userProjet.created_at.toISOString(),
    invitationToken: userProjet.invitation_token,
    invitationStatus: userProjet.invitation_status,
    deletedAt: userProjet.deleted_at?.toISOString() || null,
    deletedBy: userProjet.deleted_by,
    nbViews: userProjet.nb_views,
    lastViewedAt: userProjet.last_viewed_at?.toISOString() || null,
    projet: {
      id: userProjet.projet.id,
      nom: userProjet.projet.nom,
      collectiviteId: userProjet.projet.collectiviteId,
      collectivite: convertCollectiviteToDto(userProjet.projet.collectivite),
    },
    user: userProjet.user ? convertUserWithCollectiviteToDto(userProjet.user) : null,
  };
}
