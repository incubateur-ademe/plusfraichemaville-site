"use server";

import { auth } from "@/src/lib/next-auth/auth";
import { ResponseAction } from "../actions-types";
import { ProjetWithPublicRelations } from "@/src/lib/prisma/prismaCustomTypes";
import { getPublicProjets } from "@/src/lib/prisma/prismaProjetQueries";

export const getPublicProjetsAction = async (): Promise<
  ResponseAction<{ publicProjets: ProjetWithPublicRelations[] }>
> => {
  const session = await auth();
  if (!session) {
    return { type: "error", message: "UNAUTHENTICATED", publicProjets: [] };
  }

  const publicProjets = await getPublicProjets();

  return { type: "success", publicProjets };
};
