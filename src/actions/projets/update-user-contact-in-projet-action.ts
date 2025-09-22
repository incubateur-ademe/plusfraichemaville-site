"use server";
import { auth } from "@/src/lib/next-auth/auth";
import { ResponseAction } from "../actions-types";
import { customCaptureException } from "@/src/lib/sentry/sentryCustomMessage";
import { ProjetWithRelations } from "@/src/lib/prisma/prismaCustomTypes";
import { PermissionManager } from "@/src/helpers/permission-manager";
import { getProjetWithRelationsById } from "@/src/lib/prisma/prismaProjetQueries";
import { addContactToProjet, deleteContactFromProjet } from "@/src/lib/prisma/prisma-projet-sourcing-contact-queries";
import { getUserProjetById } from "@/src/lib/prisma/prisma-user-projet-queries";
import { TypeUpdate } from "@/src/helpers/common";
import { Prisma } from "@/src/generated/prisma/client";

export const updateUserContactInProjetAction = async (
  projetId: number,
  userProjetId: number,
  typeUpdate: TypeUpdate,
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
    const projetToUpdate = await getProjetWithRelationsById(projetId);
    const userProjetToUse = await getUserProjetById(userProjetId);
    if (!projetToUpdate || !userProjetToUse) {
      return { type: "error", message: "PROJET_UPDATE_UNAUTHORIZED" };
    }
    if (typeUpdate === TypeUpdate.add) {
      await addContactToProjet(projetId, userProjetId, session.user.id);
    } else {
      try {
        await deleteContactFromProjet(projetId, userProjetId);
      } catch (e) {
        if (!(e instanceof Prisma.PrismaClientKnownRequestError) || e.code !== "P2025") {
          throw e;
        }
      }
    }
    const updatedProjet = await getProjetWithRelationsById(projetId);
    return { type: "success", projet: updatedProjet };
  } catch (e) {
    customCaptureException("Error in updateUserContactInProjetAction DB call", e);
    return { type: "error", message: "TECHNICAL_ERROR" };
  }
};
