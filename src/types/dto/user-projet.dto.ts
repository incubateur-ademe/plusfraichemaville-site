/**
 * UserProjet DTOs
 * Decouples frontend from Prisma database schema
 */

import { InvitationStatus, RoleProjet } from '@/src/generated/prisma/client';
import { UserDto, UserPublicInfosDto, UserWithCollectiviteDto } from './user.dto';
import { CollectiviteDto } from './collectivite.dto';

export interface UserProjetDto {
  id: number;
  emailAddress: string | null;
  role: RoleProjet;
  projetId: number;
  userId: string | null;
  createdAt: string;
  invitationToken: string | null;
  invitationStatus: InvitationStatus;
  deletedAt: string | null;
  deletedBy: string | null;
  nbViews: number | null;
  lastViewedAt: string | null;
}

export interface UserProjetWithUserDto extends UserProjetDto {
  user: UserDto | null;
}

export interface UserProjetWithUserInfosDto {
  id: number;
  user: UserPublicInfosDto | null;
  createdAt: string;
  role: RoleProjet;
  invitationStatus: InvitationStatus;
  userId: string | null;
  nbViews: number | null;
}

export interface UserProjetWithPublicInfosDto {
  id: number;
  user: UserPublicInfosDto | null;
  projet: {
    collectivite: CollectiviteDto;
    nom: string;
    typeEspace: string | null;
    niveauMaturite: string | null;
    adresseAllInfos: unknown | null;
  };
}

export interface UserProjetWithRelationsDto {
  id: number;
  emailAddress: string | null;
  role: RoleProjet;
  projetId: number;
  userId: string | null;
  createdAt: string;
  invitationToken: string | null;
  invitationStatus: InvitationStatus;
  deletedAt: string | null;
  deletedBy: string | null;
  nbViews: number | null;
  lastViewedAt: string | null;
  projet: {
    id: number;
    nom: string;
    collectiviteId: number;
    collectivite: CollectiviteDto;
  };
  user: UserWithCollectiviteDto | null;
}
