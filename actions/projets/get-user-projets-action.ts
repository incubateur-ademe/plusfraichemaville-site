"use server";

import { PFMV_ROUTES } from "@/helpers/routes";
import { auth } from "@/lib/next-auth/auth";
import { revalidatePath } from "next/cache";
import { ResponseAction } from "../actions-types";
import { ProjetWithRelations } from "@/lib/prisma/prismaCustomTypes";
import { hasPermissionToViewUserProjet } from "@/actions/projets/permissions";
import { getUserProjets } from "@/lib/prisma/prismaProjetQueries";

export const getUserProjetsAction = async (
  userId: string,
): Promise<ResponseAction<{ projets: ProjetWithRelations[] }>> => {
  const session = await auth();
  if (!session) {
    return { type: "error", message: "UNAUTHENTICATED", projets: [] };
  }

  if (!hasPermissionToViewUserProjet(session.user.id, userId)) {
    return { type: "error", message: "UNAUTHORIZED", projets: [] };
  }
  const projets = await getUserProjets(userId);

  revalidatePath(PFMV_ROUTES.ESPACE_PROJET_LISTE);

  return { type: "success", message: "PROJETS_LOADED", projets };
};
