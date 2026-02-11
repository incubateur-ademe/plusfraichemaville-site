/**
 * Projet Converters
 * Converts Prisma types to DTOs
 */

import { projet } from '@/src/generated/prisma/client';
import {
  ProjetDto,
  ProjetWithCollectiviteDto,
  ProjetWithRelationsDto,
  ProjetWithPublicRelationsDto,
  ProjetWithAdminUserDto,
} from '@/src/types/dto';
import {
  ProjetWithCollectivite,
  ProjetWithRelations,
  ProjetWithPublicRelations,
  ProjetWithAdminUser,
} from '../prismaCustomTypes';
import { convertCollectiviteToDto } from './collectivite-converters';
import { convertEstimationWithAidesToDto } from './estimation-converters';
import { convertUserToDto } from './user-converters';
import { convertUserProjetWithUserToDto, convertUserProjetWithUserInfosToDto } from './user-projet-converters';
import { convertProjetSourcingContactToDto } from './sourcing-converters';
import { convertProjetFicheToDto } from './projet-fiche-converters';
import { convertDiagnosticSimulationToDto } from './diagnostic-converters';
import { GeoJsonProperties } from "geojson";

export function convertProjetToDto(projet: projet): ProjetDto {
  return {
    id: projet.id,
    createdBy: projet.created_by,
    createdAt: projet.created_at.toISOString(),
    updatedAt: projet.updated_at?.toISOString() || null,
    nom: projet.nom,
    typeEspace: projet.type_espace,
    adresse: projet.adresse,
    niveauMaturite: projet.niveau_maturite,
    adresseInfo: projet.adresse_info,
    adresseAllInfos: projet.adresse_all_infos as GeoJsonProperties | null,
    dateEcheance: projet.date_echeance?.toISOString() || null,
    fichesSolutionsId: projet.fiches_solutions_id,
    fichesDiagnosticId: projet.fiches_diagnostic_id,
    collectiviteId: projet.collectiviteId,
    recommandationsViewedBy: projet.recommandations_viewed_by,
    deletedAt: projet.deleted_at?.toISOString() || null,
    deletedBy: projet.deleted_by,
    isPublic: projet.is_public,
    budget: projet.budget,
    sourcingRex: projet.sourcing_rex,
    statut: projet.statut,
    statutUpdatedAt: projet.statut_updated_at?.toISOString() || null,
  };
}

export function convertProjetWithCollectiviteToDto(projet: ProjetWithCollectivite): ProjetWithCollectiviteDto {
  return {
    ...convertProjetToDto(projet),
    collectivite: convertCollectiviteToDto(projet.collectivite),
  };
}

export function convertProjetWithRelationsToDto(projet: ProjetWithRelations): ProjetWithRelationsDto {
  return {
    ...convertProjetToDto(projet),
    collectivite: convertCollectiviteToDto(projet.collectivite),
    estimations: projet.estimations.map(convertEstimationWithAidesToDto),
    creator: convertUserToDto(projet.creator),
    users: projet.users.map(convertUserProjetWithUserToDto),
    sourcingUserProjets: projet.sourcing_user_projets.map(convertProjetSourcingContactToDto),
    fiches: projet.fiches.map(convertProjetFicheToDto),
    diagnosticSimulations: projet.diagnostic_simulations.map(convertDiagnosticSimulationToDto),
  };
}

export function convertProjetWithPublicRelationsToDto(
  projet: ProjetWithPublicRelations,
): ProjetWithPublicRelationsDto {
  return {
    id: projet.id,
    nom: projet.nom,
    collectiviteId: projet.collectiviteId,
    typeEspace: projet.type_espace,
    niveauMaturite: projet.niveau_maturite,
    adresseAllInfos: projet.adresse_all_infos,
    collectivite: convertCollectiviteToDto(projet.collectivite),
    users: projet.users.map(convertUserProjetWithUserInfosToDto),
  };
}

export function convertProjetWithAdminUserToDto(projet: ProjetWithAdminUser): ProjetWithAdminUserDto {
  return {
    ...convertProjetWithCollectiviteToDto(projet),
    users: projet.users.map((u) => ({
      user: u.user,
      role: "ADMIN",
    })),
  };
}
