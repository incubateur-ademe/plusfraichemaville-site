/**
 * DiagnosticSimulation DTO
 * Decouples frontend from Prisma database schema
 */

export interface DiagnosticSimulationDto {
  id: string;
  userId: string | null;
  projetId: number;
  initialValues: unknown | null;
  validated: boolean;
  createdAt: string;
  updatedAt: string;
}
