/**
 * DiagnosticSimulation Converters
 * Converts Prisma types to DTOs
 */

import { diagnostic_simulation } from '@/src/generated/prisma/client';
import { DiagnosticSimulationDto } from '@/src/types/dto';

export function convertDiagnosticSimulationToDto(simulation: diagnostic_simulation): DiagnosticSimulationDto {
  return {
    id: simulation.id,
    userId: simulation.user_id,
    projetId: simulation.projet_id,
    initialValues: simulation.initial_values,
    validated: simulation.validated,
    createdAt: simulation.created_at.toISOString(),
    updatedAt: simulation.updated_at.toISOString(),
  };
}
