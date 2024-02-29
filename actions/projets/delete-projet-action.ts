"use server";

import { PFMV_ROUTES } from "@/helpers/routes";
import { auth } from "@/lib/next-auth/auth";
import { deleteUserProjet } from "@/lib/prisma/prismaUserQueries";
import { revalidatePath } from "next/cache";
import { ResponseAction } from "../actions-types";
import { hasPermissionToUpdateProjet } from "@/actions/projets/permissions";

export const deleteProjetAction = async (projetId: number): Promise<ResponseAction<{}>> => {
  const session = await auth();
  if (!session) {
    return { type: "error", message: "UNAUTHENTICATED" };
  }

  if (!(await hasPermissionToUpdateProjet(projetId, session.user.id))) {
    return { type: "error", message: "PROJET_DELETE_UNAUTHORIZED" };
  }

  await deleteUserProjet(projetId);

  revalidatePath(PFMV_ROUTES.LISTE_PROJETS);

  return { type: "success", message: "PROJET_DELETE" };
};
