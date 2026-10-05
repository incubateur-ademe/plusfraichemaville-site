"use server";

import { auth } from "@/src/lib/next-auth/auth";
import { ResponseAction } from "../actions-types";
import { captureError, customCaptureException } from "@/src/lib/sentry/sentryCustomMessage";
import { ProjetIndiEnSimuation } from "@/src/lib/prisma/prismaCustomTypes";
import { PermissionManager } from "@/src/helpers/permission-manager";
import {
  IndicateursEnvironnementauxFormData,
  IndicateursEnvironnementauxFormSchema,
} from "@/src/forms/indicateursEnvironnementaux/indicateurs-environnementaux-form-schema";
import { calculateCoeffsDiagnosticSimulation } from "@/src/lib/prisma/prismaCustomTypesHelper";
import { upsertDiagnosticSimulation } from "@/src/lib/prisma/prisma-diagnostic-simulation-queries";
import { diagnostic_simulation, EventType, ReferenceType } from "@/src/generated/prisma/client";
import { createAnalytic } from "@/src/lib/prisma/prisma-analytics-queries";
import { UPDATE_PROJET_CONTEXT_ACTIONS } from "@/src/components/analytics/helpers";

export const upsertDiagnosticSimulationAction = async (
  projetId: number,
  data: IndicateursEnvironnementauxFormData,
  validated: boolean,
  diagnosticSimulationId?: string,
): Promise<ResponseAction<{ diagnosticSimulation?: diagnostic_simulation }>> => {
  const session = await auth();
  if (!session) {
    return { type: "error", message: "UNAUTHENTICATED" };
  }
  const canUpdateProjet = await new PermissionManager(session).canEditProject(projetId);

  if (!canUpdateProjet) {
    return { type: "error", message: "PROJET_UPDATE_UNAUTHORIZED" };
  }

  const parseParamResult = IndicateursEnvironnementauxFormSchema.safeParse(data);
  if (!parseParamResult.success) {
    captureError("upsertDiagnosticSimulationAction format errors", parseParamResult.error.flatten());
    return { type: "error", message: "PARSING_ERROR" };
  } else {
    const newDiagnosticSimulation: ProjetIndiEnSimuation = {
      questions: data.questions.map((q) => ({ questionCode: q.questionCode, quantite: q.quantite })),
      ...calculateCoeffsDiagnosticSimulation(data.questions),
    };
    try {
      const diagnosticSimulation = await upsertDiagnosticSimulation({
        userId: session.user.id,
        projetId,
        diagnosticSimulationId,
        initialValues: newDiagnosticSimulation,
        validated,
      });
      await createAnalytic({
        context: { action: UPDATE_PROJET_CONTEXT_ACTIONS.DIAG_SIMPLIFIE },
        event_type: EventType.UPDATE_PROJET,
        reference_id: projetId.toString(),
        reference_type: ReferenceType.PROJET,
        user_id: session.user.id,
      });
      return { type: "success", message: "DIAGNOSTIC_SIMULATION_UPDATED", diagnosticSimulation };
    } catch (e) {
      // @ts-expect-error ignore
      customCaptureException("Error in upsertDiagnosticSimulationAction DB call", e?.stack);
      return { type: "error", message: "TECHNICAL_ERROR" };
    }
  }
};
