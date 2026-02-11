/**
 * ProjetSourcingContact Converters
 * Converts Prisma types to DTOs
 */

import { ProjetSourcingContactDto } from '@/src/types/dto';
import { ProjetSourcingContact } from '../prismaCustomTypes';
import { convertUserProjetWithPublicInfosToDto } from './user-projet-converters';

export function convertProjetSourcingContactToDto(
  sourcingContact: ProjetSourcingContact,
): ProjetSourcingContactDto {
  return {
    id: sourcingContact.id,
    projetId: sourcingContact.projet_id,
    sourcedUserProjetId: sourcingContact.sourced_user_projet_id,
    createdAt: sourcingContact.created_at.toISOString(),
    createdBy: sourcingContact.created_by,
    sourcedUserProjet: convertUserProjetWithPublicInfosToDto(sourcingContact.sourced_user_projet),
  };
}
