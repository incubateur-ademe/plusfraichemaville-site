/**
 * Estimation Converters
 * Converts Prisma types to DTOs
 */

import { estimation } from '@/src/generated/prisma/client';
import {
  EstimationDto,
  EstimationWithAidesDto,
  EstimationFicheSolutionDto,
  EstimationMateriauDto,
  SimpleEstimationFicheSolutionDto,
} from '@/src/types/dto';
import {
  EstimationWithAides,
  EstimationFicheSolution,
  EstimationMateriau,
  SimpleEstimationFicheSolution,
} from '../prismaCustomTypes';
import { convertEstimationAideToDto } from './aide-converters';

export function convertEstimationToDto(estimation: estimation): EstimationDto {
  return {
    id: estimation.id,
    createdBy: estimation.created_by,
    createdAt: estimation.created_at.toISOString(),
    updatedAt: estimation.updated_at.toISOString(),
    projetId: estimation.projet_id,
    materiaux: estimation.materiaux,
    deletedAt: estimation.deleted_at?.toISOString() || null,
    deletedBy: estimation.deleted_by,
  };
}

export function convertEstimationMateriauToDto(materiau: EstimationMateriau): EstimationMateriauDto {
  return {
    materiauId: materiau.materiau_id,
    quantite: materiau.quantite,
    coutInvestissementOverride: materiau.cout_investissement_override,
    coutEntretienOverride: materiau.cout_entretien_override,
  };
}

export function convertEstimationFicheSolutionToDto(
  ficheSolution: EstimationFicheSolution,
): EstimationFicheSolutionDto {
  return {
    id: ficheSolution.id,
    estimationId: ficheSolution.estimation_id,
    ficheSolutionId: ficheSolution.fiche_solution_id,
    quantite: ficheSolution.quantite,
    coutMinInvestissement: ficheSolution.cout_min_investissement,
    coutMaxInvestissement: ficheSolution.cout_max_investissement,
    coutMinEntretien: ficheSolution.cout_min_entretien,
    coutMaxEntretien: ficheSolution.cout_max_entretien,
    coutInvestissementOverride: ficheSolution.cout_investissement_override,
    coutEntretienOverride: ficheSolution.cout_entretien_override,
    estimationMateriaux: ficheSolution.estimation_materiaux.map(convertEstimationMateriauToDto),
    createdAt: ficheSolution.created_at.toISOString(),
    updatedAt: ficheSolution.updated_at.toISOString(),
  };
}

export function convertSimpleEstimationFicheSolutionToDto(
  ficheSolution: SimpleEstimationFicheSolution,
): SimpleEstimationFicheSolutionDto {
  return {
    ficheSolutionId: ficheSolution.fiche_solution_id,
    quantite: ficheSolution.quantite,
    coutInvestissementOverride: ficheSolution.cout_investissement_override,
    coutEntretienOverride: ficheSolution.cout_entretien_override,
  };
}

export function convertEstimationWithAidesToDto(estimation: EstimationWithAides): EstimationWithAidesDto {
  return {
    ...convertEstimationToDto(estimation),
    estimationsAides: estimation.estimations_aides.map(convertEstimationAideToDto),
    estimationsFichesSolutions: estimation.estimations_fiches_solutions.map(convertEstimationFicheSolutionToDto),
  };
}
