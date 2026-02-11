/**
 * Collectivite Converters
 * Converts Prisma types to DTOs
 */

import { collectivite } from '@/src/generated/prisma/client';
import { CollectiviteDto } from '@/src/types/dto';

export function convertCollectiviteToDto(collectivite: collectivite): CollectiviteDto {
  return {
    id: collectivite.id,
    nom: collectivite.nom,
    codeInsee: collectivite.code_insee,
    codePostal: collectivite.code_postal,
    adresseInfo: collectivite.adresse_info,
    adresseAllInfos: collectivite.adresse_all_infos,
    banId: collectivite.ban_id,
    latitude: collectivite.latitude,
    longitude: collectivite.longitude,
    createdBy: collectivite.created_by,
    createdAt: collectivite.created_at.toISOString(),
    aidesTerritoriesPerimeterId: collectivite.aides_territoires_perimeter_id,
  };
}
