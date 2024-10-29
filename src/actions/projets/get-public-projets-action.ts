"use server";

import { auth } from "@/src/lib/next-auth/auth";
import { ResponseAction } from "../actions-types";
import { ProjetWithPublicRelations } from "@/src/lib/prisma/prismaCustomTypes";
import { getPublicProjets } from "@/src/lib/prisma/prismaProjetQueries";
import { PermissionManager } from "@/src/helpers/permission-manager";

export const getPublicProjetsAction = async (): Promise<
  ResponseAction<{ publicProjets: ProjetWithPublicRelations[] }>
> => {
  const session = await auth();
  if (!session) {
    return { type: "error", message: "UNAUTHENTICATED", publicProjets: [] };
  }

  const permission = new PermissionManager(session);

  if (!permission.canViewUserProject(session.user.id)) {
    return { type: "error", message: "UNAUTHORIZED", publicProjets: [] };
  }
  const publicProjets = await getPublicProjets();

  return { type: "success", message: "PROJETS_LOADED", publicProjets };
};
