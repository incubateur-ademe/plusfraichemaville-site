"use server";
import { auth } from "@/src/lib/next-auth/auth";
import { ResponseAction } from "../actions-types";
import { customCaptureException } from "@/src/lib/sentry/sentryCustomMessage";
import { ProjetWithRelations } from "@/src/lib/prisma/prismaCustomTypes";
import { PermissionManager } from "@/src/helpers/permission-manager";
import { getProjetWithRelationsById } from "@/src/lib/prisma/prismaProjetQueries";
import { addContactToProjet, deleteContactFromProjet } from "@/src/lib/prisma/prisma-projet-sourcing-contact-queries";
import { getUserProjetById } from "@/src/lib/prisma/prisma-user-projet-queries";

export const updateUserContactInProjetAction = async (
  projetId: number,
  userProjetId: number,
  typeUpdate: "add" | "delete",
): Promise<ResponseAction<{ projet?: ProjetWithRelations | null }>> => {
  const session = await auth();
  if (!session) {
    return { type: "error", message: "UNAUTHENTICATED" };
  }
  try {
    const permission = new PermissionManager(session);
    if (projetId && !(await permission.canEditProject(projetId))) {
      return { type: "error", message: "PROJET_UPDATE_UNAUTHORIZED" };
    }
    let projetToUpdate = await getProjetWithRelationsById(projetId);
    const userProjetToUse = await getUserProjetById(userProjetId);
    if (!projetToUpdate || !userProjetToUse) {
      return { type: "error", message: "PROJET_UPDATE_UNAUTHORIZED" };
    }
    if (typeUpdate === "add") {
      await addContactToProjet(projetId, userProjetId, session.user.id);
    } else {
      await deleteContactFromProjet(projetId, userProjetId);
    }
    const updatedProjet = await getProjetWithRelationsById(projetId);
    return { type: "success", projet: updatedProjet };
  } catch (e) {
    customCaptureException("Error in updateUserContactInProjetAction DB call", e);
    return { type: "error", message: "TECHNICAL_ERROR" };
  }
};
