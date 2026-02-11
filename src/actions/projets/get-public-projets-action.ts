"use server";

import { auth } from "@/src/lib/next-auth/auth";
import { ResponseAction } from "../actions-types";
import { ProjetWithPublicRelationsDto } from "@/src/types/dto";
import { getPublicProjets } from "@/src/lib/prisma/prismaProjetQueries";

type GetPublicProjetsActionParams = {
  excludeProjetId?: string;
};

export const getPublicProjetsAction = async ({
  excludeProjetId,
}: GetPublicProjetsActionParams): Promise<ResponseAction<{ publicProjets: ProjetWithPublicRelationsDto[] }>> => {
  const session = await auth();
  if (!session) {
    return { type: "error", message: "UNAUTHENTICATED", publicProjets: [] };
  }

  const publicProjets = await getPublicProjets({
    excludeProjetId: excludeProjetId ? parseInt(excludeProjetId) : undefined,
  });

  return { type: "success", publicProjets };
};
