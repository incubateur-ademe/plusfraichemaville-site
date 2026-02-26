import { NextRequest, NextResponse } from "next/server";
import { searchAidesFromAidesTerritoires } from "@/src/lib/aidesTerritoires/fetch";
import { getFicheSolutionByIds } from "@/src/lib/strapi/queries/fichesSolutionsQueries";
import { getProjetWithRelationsById } from "@/src/lib/prisma/prismaProjetQueries";
import { getCollectiviteById } from "@/src/lib/prisma/prismaCollectiviteQueries";
import { getServerSession } from "next-auth";
import { authOptions } from "@/src/lib/next-auth/auth";
import { PermissionManager } from "@/src/helpers/permission-manager";
import { selectEspaceLabelByCode } from "@/src/helpers/type-espace-filter";
import { FicheType } from "@/src/generated/prisma/client";
import { isEmpty } from "@/src/helpers/listUtils";

export async function GET(request: NextRequest) {
  const projetId = request.nextUrl.searchParams.get("projetId");
  if (!projetId) {
    return NextResponse.json(null, { status: 400 });
  }

  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json(null, { status: 401 });
  }

  const projet = await getProjetWithRelationsById(+projetId);
  if (!projet) {
    return NextResponse.json("Projet not found", { status: 422 });
  }

  const permission = new PermissionManager(session);
  if (!(await permission.canViewProject(projet.id))) {
    return NextResponse.json(null, { status: 403 });
  }

  const ficheSolutionIdsParam = request.nextUrl.searchParams.get("ficheSolutionIds");
  const requestedIds: number[] | null = ficheSolutionIdsParam ? JSON.parse(ficheSolutionIdsParam) : null;

  const ficheSolutionIds = isEmpty(requestedIds)
    ? []
    : projet.fiches
        .filter((fiche) => fiche.type === FicheType.SOLUTION)
        .filter((fiche) => requestedIds!.includes(fiche.fiche_id))
        .map((fiche) => fiche.fiche_id);

  const ficheSolutions = await getFicheSolutionByIds(ficheSolutionIds);
  const collectivite = await getCollectiviteById(projet.collectiviteId);
  if (collectivite) {
    const result = await searchAidesFromAidesTerritoires(
      ficheSolutions.map((fs) => fs.attributes),
      collectivite,
      selectEspaceLabelByCode(projet.type_espace),
    );
    return NextResponse.json(result);
  }
  return NextResponse.json([]);
}
