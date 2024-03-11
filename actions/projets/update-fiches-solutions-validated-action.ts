"use server";

import { auth } from "@/lib/next-auth/auth";

import { ResponseAction } from "../actions-types";
import { hasPermissionToUpdateProjet } from "@/actions/projets/permissions";
import { updateFichesSolutionsProjetValidated } from "@/lib/prisma/prismaProjetQueries";
import { ProjetWithRelations } from "@/lib/prisma/prismaCustomTypes";

export const updateFichesSolutionsValidatedAction = async (
  projetId: number,
): Promise<ResponseAction<{ projet: ProjetWithRelations | null }>> => {
  const session = await auth();
  if (!session) {
    return { type: "error", message: "UNAUTHENTICATED", projet: null };
  }

  if (!(await hasPermissionToUpdateProjet(projetId, session.user.id))) {
    return { type: "error", message: "UNAUTHORIZED", projet: null };
  }

  const projet = await updateFichesSolutionsProjetValidated(projetId);

  return { type: "success", message: "FICHES_SOLUTIONS_VALIDATED", projet };
};
