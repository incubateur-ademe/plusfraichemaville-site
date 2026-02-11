/**
 * ProjetSourcingContact DTO
 * Decouples frontend from Prisma database schema
 */

import { UserProjetWithPublicInfosDto } from './user-projet.dto';

export interface ProjetSourcingContactDto {
  id: number;
  projetId: number;
  sourcedUserProjetId: number;
  createdAt: string;
  createdBy: string;
  sourcedUserProjet: UserProjetWithPublicInfosDto;
}
