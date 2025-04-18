"use server";

import { auth } from "@/src/lib/next-auth/auth";
import { ResponseAction } from "../actions-types";
import { customCaptureException } from "@/src/lib/sentry/sentryCustomMessage";
import { PermissionManager } from "@/src/helpers/permission-manager";
import {
  comeBackLaterDiagnosticSimulation,
  getDiagnosticSimulationsByProjet,
} from "@/src/lib/prisma/prisma-diagnostic-simulation-queries";

export const comebackLaterDiagnosticSimulationAction = async (projetId: number): Promise<ResponseAction> => {
  const session = await auth();
  if (!session) {
    return { type: "error", message: "UNAUTHENTICATED" };
  }
  const canUpdateProjet = await new PermissionManager(session).canEditProject(projetId);

  if (!canUpdateProjet) {
    return { type: "error", message: "PROJET_UPDATE_UNAUTHORIZED" };
  }

  try {
    const simulations = await getDiagnosticSimulationsByProjet(projetId);

    await comeBackLaterDiagnosticSimulation({
      userId: session.user.id,
      projetId,
      diagnosticSimulationId: simulations[0]?.id,
    });
    return { type: "success" };
  } catch (e) {
    // @ts-ignore
    customCaptureException("Error in upsertDiagnosticSimulationAction DB call", e?.stack);
    return { type: "error", message: "TECHNICAL_ERROR" };
  }
};
