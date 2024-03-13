"use server";

import { auth } from "@/lib/next-auth/auth";
import { ResponseAction } from "../actions-types";
import { hasPermissionToUpdateProjet } from "@/actions/projets/permissions";
import { updateFichesSolutionsProjet } from "@/lib/prisma/prismaProjetQueries";
import { ProjetWithRelations } from "@/lib/prisma/prismaCustomTypes";

export const updateFichesSolutionsProjetAction = async (
  projetId: number,
  fichesSolutionsId: number[],
): Promise<ResponseAction<{ projet: ProjetWithRelations | null }>> => {
  const session = await auth();
  if (!session) {
    return { type: "error", message: "UNAUTHENTICATED", projet: null };
  }

  if (!(await hasPermissionToUpdateProjet(projetId, session.user.id))) {
    return { type: "error", message: "UNAUTHORIZED", projet: null };
  }

  const projet = await updateFichesSolutionsProjet(projetId, fichesSolutionsId);

  return { type: "success", message: "FICHES_SOLUTIONS_ADDED_TO_PROJET", projet };
};
