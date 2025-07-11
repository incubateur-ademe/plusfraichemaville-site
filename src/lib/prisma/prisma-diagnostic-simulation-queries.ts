import { prismaClient } from "./prismaClient";
import { diagnostic_simulation } from "@/src/generated/prisma/client";
import { ProjetIndiEnSimuation } from "@/src/lib/prisma/prismaCustomTypes";

export const upsertDiagnosticSimulation = async ({
  userId,
  initialValues,
  projetId,
  validated,
  diagnosticSimulationId,
}: {
  userId: string;
  initialValues: ProjetIndiEnSimuation;
  projetId: number;
  validated: boolean;
  diagnosticSimulationId?: string;
}): Promise<diagnostic_simulation> => {
  return prismaClient.diagnostic_simulation.upsert({
    where: { id: diagnosticSimulationId || "", projet_id: projetId },
    create: {
      user_id: userId,
      projet_id: projetId,
      initial_values: initialValues,
      validated: validated || undefined,
    },
    update: {
      user_id: userId,
      initial_values: initialValues,
      validated: validated || undefined,
    },
  });
};

export const comeBackLaterDiagnosticSimulation = async ({
  userId,
  projetId,
  diagnosticSimulationId,
}: {
  userId: string;
  projetId: number;
  diagnosticSimulationId?: string;
}): Promise<diagnostic_simulation> => {
  return prismaClient.diagnostic_simulation.upsert({
    where: { id: diagnosticSimulationId || "", projet_id: projetId },
    create: {
      user_id: userId,
      projet_id: projetId,
    },
    update: {
      user_id: userId,
    },
  });
};

export const getDiagnosticSimulationsByProjet = async (projetId: number): Promise<diagnostic_simulation[]> => {
  return prismaClient.diagnostic_simulation.findMany({
    where: { projet_id: projetId },
  });
};
