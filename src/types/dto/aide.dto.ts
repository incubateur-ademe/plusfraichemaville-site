/**
 * Aide DTOs
 * Decouples frontend from Prisma database schema
 */

export interface AideDto {
  id: number;
  aideTerritoireId: number;
  submissionDeadline: string | null;
  type: string;
  name: string | null;
  financers: string[];
}

export interface EstimationAideDto {
  id: number;
  estimationId: number;
  aideId: number;
  createdAt: string | null;
  userId: string | null;
  aide: AideDto;
}
