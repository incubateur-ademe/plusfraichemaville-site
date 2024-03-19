"use server";

import { auth } from "@/lib/next-auth/auth";
import { ResponseAction } from "../actions-types";
import { ProjetWithRelations } from "@/lib/prisma/prismaCustomTypes";
import { hasPermissionToUpdateProjet } from "@/actions/projets/permissions";
import { addRecommandationsViewedBy, deleteRecommandationsViewedBy } from "@/lib/prisma/prismaProjetQueries";

export const updateRecommandationsViewedByUser = async (
  projetId: string,
  action: "add" | "delete",
): Promise<ResponseAction<{ projet: ProjetWithRelations | null }>> => {
  const session = await auth();
  if (!session) {
    return { type: "error", message: "UNAUTHENTICATED", projet: null };
  }

  if (!hasPermissionToUpdateProjet(+projetId, session.user.id)) {
    return { type: "error", message: "UNAUTHORIZED", projet: null };
  }

  const projet =
    action === "add"
      ? await addRecommandationsViewedBy(+projetId, session.user.id)
      : await deleteRecommandationsViewedBy(+projetId, session.user.id);

  return { type: "success", message: "RECOMMANDATION_VIEWED_UPDATED", projet };
};
