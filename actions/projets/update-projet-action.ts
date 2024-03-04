"use server";

import { PFMV_ROUTES } from "@/helpers/routes";
import { auth } from "@/lib/next-auth/auth";

import { revalidatePath } from "next/cache";
import { ResponseAction } from "../actions-types";
import { hasPermissionToUpdateProjet } from "@/actions/projets/permissions";
import { updateFichesSolutionsProjet } from "@/lib/prisma/prismaProjetQueries";

export const updateFichesSolutionsProjetAction = async (
  userId: string,
  projetId: number,
  fichesSolutionsId: number[],
): Promise<ResponseAction<{}>> => {
  const session = await auth();
  if (!session) {
    return { type: "error", message: "UNAUTHENTICATED" };
  }

  if (!hasPermissionToUpdateProjet(projetId, userId)) {
    return { type: "error", message: "UNAUTHORIZED" };
  }
  console.log("from action ", fichesSolutionsId);

  await updateFichesSolutionsProjet(projetId, fichesSolutionsId);

  revalidatePath(PFMV_ROUTES.ESPACE_PROJET_FICHES_SOLUTIONS_LISTE(projetId));

  return { type: "success", message: "PROJETS_LOADED" };
};
