"use server";

import { auth } from "@/src/lib/next-auth/auth";
import { FichesBookmarked } from "@/src/components/common/generic-save-fiche/helpers";
import { customCaptureException } from "@/src/lib/sentry/sentryCustomMessage";
import { saveAllFichesFromLocalStorage } from "@/src/lib/prisma/prismaUserQueries";
import { PermissionManager } from "@/src/helpers/permission-manager";

export const saveAllFichesFromLocalStorageAction = async (
  userId: string,
  fiches: {
    fichesSolutions: FichesBookmarked[];
    fichesDiagnostic: FichesBookmarked[];
  },
) => {
  const session = await auth();

  if (!session) {
    return { type: "error", message: "UNAUTHENTICATED", user: null };
  }

  const permission = new PermissionManager(session);

  if (!permission.canUpdateUser(userId)) {
    return { type: "error", message: "UNAUTHORIZED", user: null };
  }

  try {
    const user = await saveAllFichesFromLocalStorage(session.user.id, fiches);

    return { type: "success", message: "", user };
  } catch (e) {
    customCaptureException("Error in saveAllFichesFromLocalStorageAction DB call", e);
    return { type: "error", message: "TECHNICAL_ERROR", user: null };
  }
};
