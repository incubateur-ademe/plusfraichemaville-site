"use server";

import { auth } from "@/lib/next-auth/auth";
import { ResponseAction } from "../actions-types";
import { hasPermissionToUpdateProjet } from "@/actions/projets/permissions";
import { deleteEstimation, getEstimationById } from "@/lib/prisma/prismaEstimationQueries";

export const deleteEstimationAction = async (estimationId: number): Promise<ResponseAction<{}>> => {
  const session = await auth();
  if (!session) {
    return { type: "error", message: "UNAUTHENTICATED" };
  }
  const estimationToDelete = await getEstimationById(estimationId);

  if (!estimationToDelete) {
    return { type: "success", message: "ESTIMATION_DELETE" };
  }

  if (!(await hasPermissionToUpdateProjet(estimationToDelete.projet_id, session.user.id))) {
    return { type: "error", message: "ESTIMATION_DELETE_UNAUTHORIZED" };
  }

  await deleteEstimation(estimationId);

  return { type: "success", message: "ESTIMATION_DELETE" };
};
