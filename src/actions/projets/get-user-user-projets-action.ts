"use server";

import { auth } from "@/src/lib/next-auth/auth";
import { ResponseAction } from "../actions-types";
import { PermissionManager } from "@/src/helpers/permission-manager";
import { getUserUserProjetByUserId } from "@/src/lib/prisma/prisma-user-projet-queries";
import { user_projet } from "@/src/generated/prisma/client";

export const getUserUserProjetsAction = async (
  userId: string,
): Promise<ResponseAction<{ userProjets: user_projet[] }>> => {
  const session = await auth();
  if (!session) {
    return { type: "error", message: "UNAUTHENTICATED", userProjets: [] };
  }

  const permission = new PermissionManager(session);

  if (!permission.canViewUserProject(userId)) {
    return { type: "error", message: "UNAUTHORIZED", userProjets: [] };
  }
  const userProjets = await getUserUserProjetByUserId(userId);

  return { type: "success", message: "PROJETS_LOADED", userProjets };
};
