"use server";
import { auth } from "@/src/lib/next-auth/auth";
import { ResponseAction } from "../actions-types";
import { customCaptureException } from "@/src/lib/sentry/sentryCustomMessage";
import { ProjetWithRelations } from "@/src/lib/prisma/prismaCustomTypes";
import { PermissionManager } from "@/src/helpers/permission-manager";
import { getProjetWithRelationsById, updateSourcingCmsProjet } from "@/src/lib/prisma/prismaProjetQueries";
import isEqual from "lodash/isEqual";
import { RexContactId } from "@/src/components/sourcing/types";

export const updateRexContactInProjetAction = async (
  projetId: number,
  rexContactId: RexContactId,
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
    if (!projetToUpdate) {
      return { type: "error", message: "PROJET_UPDATE_UNAUTHORIZED" };
    }

    let newSourcingCms = (projetToUpdate.sourcing_cms as RexContactId[]).filter(
      (savedContact) => !isEqual(savedContact, rexContactId),
    );
    if (typeUpdate === "add") {
      newSourcingCms = [...newSourcingCms, rexContactId];
    }
    projetToUpdate = await updateSourcingCmsProjet(projetId, newSourcingCms);

    return { type: "success", projet: projetToUpdate };
  } catch (e) {
    customCaptureException("Error in updateRexContactInProjetAction DB call", e);
    return { type: "error", message: "TECHNICAL_ERROR" };
  }
};
