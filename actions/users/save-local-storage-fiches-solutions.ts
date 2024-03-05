"use server";

import { PFMV_ROUTES } from "@/helpers/routes";
import { auth } from "@/lib/next-auth/auth";

import { revalidatePath } from "next/cache";
import { ResponseAction } from "../actions-types";
import { hasPermissionToUpdateUser } from "@/actions/projets/permissions";
import { saveFicheSolutionsByUser } from "@/lib/prisma/prismaUserQueries";

export const updateFichesSolutionsProjetAction = async (
  projetId: number,
  userId: string,
  //   savedFichesSolutionsIds: number[],
): Promise<ResponseAction<{}>> => {
  const session = await auth();
  if (!session) {
    return { type: "error", message: "UNAUTHENTICATED" };
  }

  if (!hasPermissionToUpdateUser(session.user.id, userId)) {
    return { type: "error", message: "UNAUTHORIZED" };
  }

  await saveFicheSolutionsByUser(session.user.id);

  revalidatePath(PFMV_ROUTES.ESPACE_PROJET_FICHES_SOLUTIONS_LISTE(projetId));

  return { type: "success", message: "PROJETS_LOADED" };
};
