"use server";

import { auth } from "@/src/lib/next-auth/auth";
import { ResponseAction } from "../actions-types";
import { customCaptureException } from "@/src/lib/sentry/sentryCustomMessage";
import { getProjetWithRelationsById } from "@/src/lib/prisma/prismaProjetQueries";
import { PermissionManager } from "@/src/helpers/permission-manager";
import {
  ProjetSyntheseFormData,
  ProjetSyntheseFormSchema,
} from "@/src/forms/projet-synthese/projet-synthese-form-schema";
import { generateSyntheseProjetPptx } from "@/src/lib/pptx-automizer/generate-synthese-projet-pptx";
import { dateToStringWithoutTime } from "@/src/helpers/dateUtils";
import { createAnalytic } from "@/src/lib/prisma/prisma-analytics-queries";
import { EventType, FicheType, ReferenceType } from "@/src/generated/prisma/client";

export const exportSyntheseProjetAction = async (
  projetId: number,
  formData: ProjetSyntheseFormData,
): Promise<ResponseAction<{ fileBase64?: string | null; filename?: string }>> => {
  if (process.env.NEXT_PUBLIC_FEATURE_EXPORT_PPT !== "true") {
    return { type: "error", message: "UNAUTHORIZED", fileBase64: null };
  }
  const session = await auth();
  if (!session) {
    return { type: "error", message: "UNAUTHENTICATED", fileBase64: null };
  }

  const parse = ProjetSyntheseFormSchema.safeParse(formData);
  if (!parse.success) {
    return { type: "error", message: "PARSING_ERROR", fileBase64: null };
  }

  const projet = await getProjetWithRelationsById(projetId);
  if (!projet) {
    return { type: "error", message: "TECHNICAL_ERROR", fileBase64: null };
  }

  const permission = new PermissionManager(session);
  if (!(await permission.canViewProject(projet.id))) {
    return { type: "error", message: "UNAUTHORIZED", fileBase64: null };
  }

  if (parse.data.estimationId && !projet.estimations.some((estimation) => estimation.id === parse.data.estimationId)) {
    return { type: "error", message: "UNAUTHORIZED", fileBase64: null };
  }

  if (!parse.data.aideIds.every((aideId) => projet.projetAides.some((projetAide) => projetAide.aideId === aideId))) {
    return { type: "error", message: "UNAUTHORIZED", fileBase64: null };
  }

  try {
    const fileBuffer = await generateSyntheseProjetPptx({
      projet,
      solutionIds: parse.data.solutionIds,
      estimationId: parse.data.estimationId,
      aideIds: parse.data.aideIds,
    });

    const allSolutionFicheIds = projet.fiches
      .filter((fiche) => fiche.type === FicheType.SOLUTION)
      .map((fiche) => fiche.fiche_id);
    const allEstimationIds = projet.estimations.map((estimation) => estimation.id);
    const allAideIds = projet.projetAides.map((projetAide) => projetAide.aideId);

    await createAnalytic({
      context: {
        fichesSolutionsIncluded: parse.data.solutionIds,
        fichesSolutionsExcluded: allSolutionFicheIds.filter((ficheId) => !parse.data.solutionIds.includes(ficheId)),
        estimationChosen: parse.data.estimationId ? [parse.data.estimationId] : [],
        estimationsExcluded: allEstimationIds.filter((estimationId) => estimationId !== parse.data.estimationId),
        aidesIncluded: parse.data.aideIds,
        aidesExcluded: allAideIds.filter((aideId) => !parse.data.aideIds.includes(aideId)),
      },
      event_type: EventType.DOWNLOAD_PROJET_SYNTHESE,
      reference_id: projet.id.toString(),
      reference_type: ReferenceType.PROJET,
      user_id: session.user.id,
    });

    return {
      type: "success",
      fileBase64: fileBuffer.toString("base64"),
      filename: `Synthèse-PFMV-${projet.nom.replaceAll(" ", "_")}-${dateToStringWithoutTime(new Date())?.replaceAll(
        "/",
        "",
      )}.pptx`,
    };
  } catch (e) {
    customCaptureException("Error in exportSyntheseProjetAction", e);
    return { type: "error", message: "TECHNICAL_ERROR", fileBase64: null };
  }
};
