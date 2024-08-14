"use server";

import { auth } from "@/lib/next-auth/auth";
import { ResponseAction } from "../actions-types";
import { ProjetWithPublicRelations } from "@/lib/prisma/prismaCustomTypes";
import { getPendingUserProjets } from "@/lib/prisma/prismaProjetQueries";
import { PermissionManager } from "@/helpers/permission-manager";

export const getPendingUserProjetsAction = async (
  userId: string,
): Promise<ResponseAction<{ pendingProjets: ProjetWithPublicRelations[] }>> => {
  const session = await auth();
  if (!session) {
    return { type: "error", message: "UNAUTHENTICATED", pendingProjets: [] };
  }

  if (!new PermissionManager().canViewUserProject(session.user.id, userId)) {
    return { type: "error", message: "UNAUTHORIZED", pendingProjets: [] };
  }
  const pendingProjets = await getPendingUserProjets(userId);

  return { type: "success", message: "PROJETS_LOADED", pendingProjets };
};
