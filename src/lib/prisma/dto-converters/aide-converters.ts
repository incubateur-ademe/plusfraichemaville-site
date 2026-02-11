/**
 * Aide Converters
 * Converts Prisma types to DTOs
 */

import { aide } from '@/src/generated/prisma/client';
import { AideDto, EstimationAideDto } from '@/src/types/dto';
import { EstimationAide } from '../prismaCustomTypes';

export function convertAideToDto(aide: aide): AideDto {
  return {
    id: aide.id,
    aideTerritoireId: aide.aideTerritoireId,
    submissionDeadline: aide.submission_deadline?.toISOString() || null,
    type: aide.type,
    name: aide.name,
    financers: aide.financers,
  };
}

export function convertEstimationAideToDto(estimationAide: EstimationAide): EstimationAideDto {
  return {
    id: estimationAide.id,
    estimationId: estimationAide.estimationId,
    aideId: estimationAide.aideId,
    createdAt: estimationAide.created_at?.toISOString() || null,
    userId: estimationAide.user_id,
    aide: convertAideToDto(estimationAide.aide),
  };
}
