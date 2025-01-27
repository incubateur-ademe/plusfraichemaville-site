"use server";

import { auth } from "@/src/lib/next-auth/auth";
import { ResponseAction } from "../actions-types";
import { ProjetWithRelations } from "@/src/lib/prisma/prismaCustomTypes";
import { getUserProjets } from "@/src/lib/prisma/prismaProjetQueries";
import { PermissionManager } from "@/src/helpers/permission-manager";

export const getUserProjetsAction = async (
  userId: string,
): Promise<ResponseAction<{ projets: ProjetWithRelations[] }>> => {
  const session = await auth();
  if (!session) {
    return { type: "error", message: "UNAUTHENTICATED", projets: [] };
  }

  const permission = new PermissionManager(session);

  if (!permission.canViewUserProject(userId)) {
    return { type: "error", message: "UNAUTHORIZED", projets: [] };
  }
  const projets = await getUserProjets(userId);

  return { type: "success", message: "PROJETS_LOADED", projets };
};
