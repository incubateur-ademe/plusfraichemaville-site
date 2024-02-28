"use server";

import { PFMV_ROUTES } from "@/helpers/routes";
import { auth } from "@/lib/next-auth/auth";
import { getUserProjets } from "@/lib/prisma/prismaUserQueries";
import { revalidatePath } from "next/cache";
import { ResponseAction } from "../actions-types";
import { ProjetWithNomCollectivite } from "@/lib/prisma/prismaCustomTypes";

export const getUserProjetsAction = async (): Promise<ResponseAction<{ projets: ProjetWithNomCollectivite[] }>> => {
  const session = await auth();
  if (!session) {
    return { type: "error", message: "UNAUTHENTICATED", projets: [] };
  }

  const projets = await getUserProjets(session.user.id);

  revalidatePath(PFMV_ROUTES.LISTE_PROJETS);

  return { type: "success", message: "PROJETS_LOADED", projets };
};
