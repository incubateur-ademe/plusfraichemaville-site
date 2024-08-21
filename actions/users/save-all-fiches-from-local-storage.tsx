"use server";

import { auth } from "@/lib/next-auth/auth";
import { FichesBookmarked } from "@/components/common/generic-save-fiche/helpers";
import { customCaptureException } from "@/lib/sentry/sentryCustomMessage";
import { saveAllFichesFromLocalStorage } from "@/lib/prisma/prismaUserQueries";
import { PermissionManager } from "@/helpers/permission-manager";

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

  if (!new PermissionManager().canUpdateUser(userId, session.user.id)) {
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
