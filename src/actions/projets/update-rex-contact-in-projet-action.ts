"use server";
import { auth } from "@/src/lib/next-auth/auth";
import { ResponseAction } from "../actions-types";
import { customCaptureException } from "@/src/lib/sentry/sentryCustomMessage";
import { ProjetWithRelations } from "@/src/lib/prisma/prismaCustomTypes";
import { PermissionManager } from "@/src/helpers/permission-manager";
import { getProjetWithRelationsById, updateSourcingRexProjet } from "@/src/lib/prisma/prismaProjetQueries";
import isEqual from "lodash/isEqual";
import { RexContactId } from "@/src/components/sourcing/types";
import { TypeUpdate } from "@/src/helpers/common";

export const updateRexContactInProjetAction = async (
  projetId: number,
  rexContactId: RexContactId,
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
    let projetToUpdate = await getProjetWithRelationsById(projetId);
    if (!projetToUpdate) {
      return { type: "error", message: "PROJET_UPDATE_UNAUTHORIZED" };
    }

    let newSourcingRex =
      (projetToUpdate.sourcing_rex as RexContactId[] | null)?.filter(
        (savedContact) => !isEqual(savedContact, rexContactId),
      ) || [];
    if (typeUpdate === TypeUpdate.add) {
      newSourcingRex = [...newSourcingRex, rexContactId];
    }
    projetToUpdate = await updateSourcingRexProjet(projetId, newSourcingRex);

    return { type: "success", projet: projetToUpdate };
  } catch (e) {
    customCaptureException("Error in updateRexContactInProjetAction DB call", e);
    return { type: "error", message: "TECHNICAL_ERROR" };
  }
};
