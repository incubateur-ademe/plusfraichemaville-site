"use server";

import { auth } from "@/src/lib/next-auth/auth";
import { ResponseAction } from "../actions-types";
import { ProjetWithRelations } from "@/src/lib/prisma/prismaCustomTypes";
import { addRecommandationsViewedBy, deleteRecommandationsViewedBy } from "@/src/lib/prisma/prismaProjetQueries";
import { PermissionManager } from "@/src/helpers/permission-manager";
import { TypeUpdate } from "@/src/helpers/common";

export const updateRecommandationsViewedByUser = async (
  projetId: string,
  userId: string,
  action: TypeUpdate,
): Promise<ResponseAction<{ projet: ProjetWithRelations | null }>> => {
  const session = await auth();
  if (!session) {
    return { type: "error", message: "UNAUTHENTICATED", projet: null };
  }
  const permission = new PermissionManager(session);
  if (!(await permission.canEditProject(+projetId)) || !permission.canUpdateUser(userId)) {
    return { type: "error", message: "UNAUTHORIZED", projet: null };
  }

  const projet =
    action === TypeUpdate.add
      ? await addRecommandationsViewedBy(+projetId, session.user.id)
      : await deleteRecommandationsViewedBy(+projetId, session.user.id);

  return { type: "success", message: "RECOMMANDATION_VIEWED_UPDATED", projet };
};
