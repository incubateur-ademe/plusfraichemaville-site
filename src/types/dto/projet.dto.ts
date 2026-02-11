/**
 * Projet DTOs
 * Decouples frontend from Prisma database schema
 */

import { StatutProjet } from "@/src/generated/prisma/client";
import { CollectiviteDto } from "./collectivite.dto";
import { UserDto } from "./user.dto";
import { EstimationWithAidesDto } from "./estimation.dto";
import { UserProjetWithUserDto, UserProjetWithUserInfosDto } from "./user-projet.dto";
import { ProjetSourcingContactDto } from "./sourcing.dto";
import { ProjetFicheDto } from "./projet-fiche.dto";
import { DiagnosticSimulationDto } from "./diagnostic.dto";
import { GeoJsonProperties } from "geojson";

export interface ProjetDto {
  id: number;
  createdBy: string;
  createdAt: string;
  updatedAt: string | null;
  nom: string;
  typeEspace: string | null;
  adresse: string | null;
  niveauMaturite: string | null;
  adresseInfo: unknown | null;
  adresseAllInfos: GeoJsonProperties | null;
  dateEcheance: string | null;
  fichesSolutionsId: number[];
  fichesDiagnosticId: number[];
  collectiviteId: number;
  recommandationsViewedBy: string[];
  deletedAt: string | null;
  deletedBy: string | null;
  isPublic: boolean | null;
  budget: number | null;
  sourcingRex: unknown | null;
  statut: StatutProjet | null;
  statutUpdatedAt: string | null;
}

export interface ProjetWithCollectiviteDto extends ProjetDto {
  collectivite: CollectiviteDto;
}

export interface ProjetWithRelationsDto extends ProjetDto {
  collectivite: CollectiviteDto;
  estimations: EstimationWithAidesDto[];
  creator: UserDto;
  users: UserProjetWithUserDto[];
  sourcingUserProjets: ProjetSourcingContactDto[];
  fiches: ProjetFicheDto[];
  diagnosticSimulations: DiagnosticSimulationDto[];
}

export interface ProjetWithPublicRelationsDto {
  id: number;
  nom: string;
  collectiviteId: number;
  typeEspace: string | null;
  niveauMaturite: string | null;
  adresseAllInfos: unknown | null;
  collectivite: CollectiviteDto;
  users: UserProjetWithUserInfosDto[];
}

export interface ProjetWithAdminUserDto extends ProjetWithCollectiviteDto {
  users: {
    user: {
      email: string;
    } | null;
    role: "ADMIN";
  }[];
}
