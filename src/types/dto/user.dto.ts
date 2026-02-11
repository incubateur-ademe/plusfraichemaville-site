/**
 * User DTOs
 * Decouples frontend from Prisma database schema
 */

import { CollectiviteDto } from "./collectivite.dto";
import { AgentConnectInfo } from "@/src/lib/prisma/prismaCustomTypes";
import { SirenInfo } from "@/src/lib/siren/types";
import { ProjetWithCollectiviteDto } from "@/src/types/dto/projet.dto";
import { $Enums } from "@/src/generated/prisma/client";
import StatutUser = $Enums.StatutUser;

export interface UserDto {
  id: string;
  email: string;
  emailVerified: string | null;
  image: string | null;
  agentconnectInfo: AgentConnectInfo | null;
  nom: string | null;
  prenom: string | null;
  poste: string | null;
  nomEtablissement: string | null;
  siren: string | null;
  sirenInfo: SirenInfo | null;
  createdAt: string;
  updatedAt: string | null;
  canalAcquisition: string | null;
  discardedInformation: string[];
  acceptCommunicationProduit: boolean;
  acceptCommunicationSuiviProjet: boolean;
  lastBrowsingDate: string | null;
  statut: StatutUser | null;
}

export interface UserPublicInfosDto {
  id: string;
  nom: string | null;
  prenom: string | null;
  email: string;
  poste: string | null;
  nomEtablissement: string | null;
}

export interface UserWithCollectiviteDto extends UserDto {
  collectivites: {
    userId: string;
    collectiviteId: number;
    collectivite: CollectiviteDto;
  }[];
}

export interface UserWithAdminProjetsDto extends UserDto {
  projets: ProjetWithCollectiviteDto[];
  collectivites: {
    collectivite: Pick<CollectiviteDto, "codePostal" | "adresseAllInfos">;
  }[];
}
