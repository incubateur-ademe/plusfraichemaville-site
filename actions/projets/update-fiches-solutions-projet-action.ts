"use server";

import { PFMV_ROUTES } from "@/helpers/routes";
import { auth } from "@/lib/next-auth/auth";

import { revalidatePath } from "next/cache";
import { ResponseAction } from "../actions-types";
import { hasPermissionToUpdateProjet } from "@/actions/projets/permissions";
import { updateFichesSolutionsProjet } from "@/lib/prisma/prismaProjetQueries";
import { ProjetWithCollectivite } from "@/lib/prisma/prismaCustomTypes";

export const updateFichesSolutionsProjetAction = async (
  projetId: number,
  fichesSolutionsId: number[],
): Promise<ResponseAction<{ projet: ProjetWithCollectivite | null }>> => {
  const session = await auth();
  if (!session) {
    return { type: "error", message: "UNAUTHENTICATED", projet: null };
  }

  if (!(await hasPermissionToUpdateProjet(projetId, session.user.id))) {
    return { type: "error", message: "UNAUTHORIZED", projet: null };
  }

  const projet = await updateFichesSolutionsProjet(projetId, fichesSolutionsId);

  revalidatePath(PFMV_ROUTES.ESPACE_PROJET_FICHES_SOLUTIONS_LISTE(projetId));

  return { type: "success", message: "PROJETS_LOADED", projet };
};
