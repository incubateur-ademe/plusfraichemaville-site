"use server";

import { auth } from "@/lib/next-auth/auth";
import { ResponseAction } from "../actions-types";
import { hasPermissionToUpdateUser } from "@/actions/projets/permissions";

import { customCaptureException } from "@/lib/sentry/sentryCustomMessage";
import { updateFicheDiagnosticByUser } from "@/lib/prisma/prismaUserQueries";
import { UserInfos } from "@/stores/user/store";
import { FichesBookmarked } from "@/components/common/generic-save-fiche-button/helpers";

export const updateFicheDiagnosticByUserAction = async (
  userId: string,
  ficheDiagnosticIds: FichesBookmarked[],
): Promise<ResponseAction<{ user: UserInfos | null }>> => {
  const session = await auth();
  if (!session) {
    return { type: "error", message: "UNAUTHENTICATED", user: null };
  }

  if (!(await hasPermissionToUpdateUser(userId, session.user.id))) {
    return { type: "error", message: "UNAUTHORIZED", user: null };
  }

  try {
    const user = await updateFicheDiagnosticByUser(session.user.id, ficheDiagnosticIds);
    return { type: "success", message: "FICHE_DIAGNOSTIC_ADDED_TO_PROJET", user };
  } catch (e) {
    customCaptureException("Error in UpdateFichesDiagnosticByUserAction DB call", e);
    return { type: "error", message: "TECHNICAL_ERROR", user: null };
  }
};
