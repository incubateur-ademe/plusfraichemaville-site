/**
 * ProjetFiche DTO
 * Decouples frontend from Prisma database schema
 */

import { FicheType } from '@/src/generated/prisma/client';

export interface ProjetFicheDto {
  id: number;
  projetId: number;
  ficheId: number;
  type: FicheType;
  createdAt: string;
  userId: string;
}
