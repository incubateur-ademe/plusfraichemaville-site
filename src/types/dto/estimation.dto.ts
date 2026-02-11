/**
 * Estimation DTOs
 * Decouples frontend from Prisma database schema
 */

import { EstimationAideDto } from './aide.dto';

export interface EstimationDto {
  id: number;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  projetId: number;
  materiaux: unknown | null;
  deletedAt: string | null;
  deletedBy: string | null;
}

export interface EstimationMateriauDto {
  materiauId: number;
  quantite: number;
  coutInvestissementOverride?: number | null;
  coutEntretienOverride?: number | null;
}

export interface EstimationFicheSolutionDto {
  id: string;
  estimationId: number;
  ficheSolutionId: number;
  quantite: number | null;
  coutMinInvestissement: number;
  coutMaxInvestissement: number;
  coutMinEntretien: number;
  coutMaxEntretien: number;
  coutInvestissementOverride: number | null;
  coutEntretienOverride: number | null;
  estimationMateriaux: EstimationMateriauDto[];
  createdAt: string;
  updatedAt: string;
}

export interface SimpleEstimationFicheSolutionDto {
  ficheSolutionId: number;
  quantite: number | null;
  coutInvestissementOverride?: number | null;
  coutEntretienOverride?: number | null;
}

export interface EstimationWithAidesDto extends EstimationDto {
  estimationsAides: EstimationAideDto[];
  estimationsFichesSolutions: EstimationFicheSolutionDto[];
}

// Form types (kept for backward compatibility)
export type EstimationSimpleFicheSolutionForm = {
  ficheSolutionId: number;
  quantite: number;
  coutInvestissementOverride?: number;
  coutEntretienOverride?: number;
};

export type EstimationMateriauForm = {
  materiauId: number;
  quantite: number;
  coutInvestissementOverride?: number;
  coutEntretienOverride?: number;
};
