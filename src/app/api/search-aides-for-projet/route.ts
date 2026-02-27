import { NextRequest, NextResponse } from "next/server";
import { searchAidesFromAidesTerritoires } from "@/src/lib/aidesTerritoires/fetch";
import { updateUserProjetAidesFsUnselected } from "@/src/lib/prisma/prisma-user-projet-queries";
import { getFicheSolutionByIds } from "@/src/lib/strapi/queries/fichesSolutionsQueries";
import { getCollectiviteById } from "@/src/lib/prisma/prismaCollectiviteQueries";
import { getServerSession } from "next-auth";
import { authOptions } from "@/src/lib/next-auth/auth";
import { customCaptureException } from "@/src/lib/sentry/sentryCustomMessage";
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

  const allSolutionIds = projet.fiches
    .filter((fiche) => fiche.type === FicheType.SOLUTION)
    .map((fiche) => fiche.fiche_id);

  const ficheSolutionIds = isEmpty(requestedIds) ? [] : allSolutionIds.filter((id) => requestedIds!.includes(id));

  const unselectedIds = requestedIds ? allSolutionIds.filter((id) => !requestedIds.includes(id)) : allSolutionIds;
  const userIdParam = request.nextUrl.searchParams.get("userId");

  if (userIdParam) {
    try {
      await updateUserProjetAidesFsUnselected(userIdParam, projet.id, unselectedIds);
    } catch (error) {
      customCaptureException("Error updating aides_fs_unselected in API", error);
    }
  }

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
