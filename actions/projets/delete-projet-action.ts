"use server";

import { hasPermissionToUpdateProjet } from "@/helpers/permissions";
import { PFMV_ROUTES } from "@/helpers/routes";
import { auth } from "@/lib/next-auth/auth";
import { deleteUserProjet } from "@/lib/prisma/prismaUserQueries";
import { revalidatePath } from "next/cache";
import { ResponseAction } from "../actions-types";

export const deleteProjetAction = async (createdBy: string, projetId: number): Promise<ResponseAction<{}>> => {
  const session = await auth();
  if (!session) {
    return { type: "error", message: "UNAUTHENTICATED" };
  }

  if (!hasPermissionToUpdateProjet(session.user.id, createdBy)) {
    return { type: "error", message: "PROJET_DELETE_UNAUTHORIZED" };
  }

  await deleteUserProjet(session.user.id, projetId);

  revalidatePath(PFMV_ROUTES.LISTE_PROJETS);

  return { type: "success", message: "PROJET_DELETE" };
};
