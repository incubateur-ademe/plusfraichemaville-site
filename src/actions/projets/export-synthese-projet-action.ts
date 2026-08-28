"use server";

import { auth } from "@/src/lib/next-auth/auth";
import { ResponseAction } from "../actions-types";
import { customCaptureException } from "@/src/lib/sentry/sentryCustomMessage";
import { getProjetWithRelationsById } from "@/src/lib/prisma/prismaProjetQueries";
import { PermissionManager } from "@/src/helpers/permission-manager";
import { ProjetSyntheseFormData, ProjetSyntheseFormSchema } from "@/src/forms/projet-synthese/projet-synthese-form-schema";
import path from "path";
import fs from "fs/promises";

export const exportSyntheseProjetAction = async (
  projetId: number,
  formData: ProjetSyntheseFormData,
): Promise<ResponseAction<{ fileBase64?: string | null; filename?: string }>> => {
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

  try {
    const filePath = path.join(process.cwd(), "public", "templates", "template_synthese_projet.pptx");
    const fileBuffer = await fs.readFile(filePath);

    return {
      type: "success",
      fileBase64: fileBuffer.toString("base64"),
      filename: `synthese-projet-${projet.id}.pptx`,
    };
  } catch (e) {
    customCaptureException("Error in exportSyntheseProjetAction", e);
    return { type: "error", message: "TECHNICAL_ERROR", fileBase64: null };
  }
};
