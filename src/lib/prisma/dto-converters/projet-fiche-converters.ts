/**
 * ProjetFiche Converters
 * Converts Prisma types to DTOs
 */

import { projet_fiche } from '@/src/generated/prisma/client';
import { ProjetFicheDto } from '@/src/types/dto';

export function convertProjetFicheToDto(projetFiche: projet_fiche): ProjetFicheDto {
  return {
    id: projetFiche.id,
    projetId: projetFiche.projet_id,
    ficheId: projetFiche.fiche_id,
    type: projetFiche.type,
    createdAt: projetFiche.created_at.toISOString(),
    userId: projetFiche.user_id,
  };
}
