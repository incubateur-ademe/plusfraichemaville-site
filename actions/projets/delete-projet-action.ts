"use server";

import { PFMV_ROUTES } from "@/helpers/routes";
import { auth } from "@/lib/next-auth/auth";
import { revalidatePath } from "next/cache";
import { ResponseAction } from "../actions-types";
import { hasPermissionToUpdateProjet } from "@/actions/projets/permissions";
import { customCaptureException } from "@/lib/sentry/sentryCustomMessage";
import { deleteProjet } from "@/lib/prisma/prismaProjetQueries";

export const deleteProjetAction = async (projetId: number): Promise<ResponseAction<{}>> => {
  const session = await auth();
  if (!session) {
    return { type: "error", message: "UNAUTHENTICATED" };
  }

  if (!(await hasPermissionToUpdateProjet(projetId, session.user.id))) {
    return { type: "error", message: "PROJET_DELETE_UNAUTHORIZED" };
  }

  try {
    await deleteProjet(projetId, session.user.id);

    revalidatePath(PFMV_ROUTES.ESPACE_PROJET_LISTE);
  } catch (e) {
    customCaptureException("Error in DeleteProjetAction DB call", e);
    return { type: "error", message: "TECHNICAL_ERROR" };
  }

  return { type: "success", message: "PROJET_DELETE" };
};
