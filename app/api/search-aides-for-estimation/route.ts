import { NextRequest, NextResponse } from "next/server";
import { searchAidesFromAidesTerritoires } from "@/lib/aidesTerritoires/fetch";
import { getFicheSolutionByIds } from "@/lib/strapi/queries/fichesSolutionsQueries";
import { getEstimationById } from "@/lib/prisma/prismaEstimationQueries";
import { getProjetById } from "@/lib/prisma/prismaProjetQueries";
import { getCollectiviteById } from "@/lib/prisma/prismaCollectiviteQueries";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/next-auth/auth";
import { hasPermissionToViewProjet } from "@/actions/projets/permissions";

export const SEARCH_AIDE_FOR_ESTIMATION_URL = (estimationId: number) =>
  `/api/search-aides-for-estimation?estimationId=${estimationId}`;

export async function GET(request: NextRequest) {
  const estimationId = request.nextUrl.searchParams.get("estimationId");
  if (!estimationId) {
    return NextResponse.json(null, { status: 400 });
  }

  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json(null, { status: 401 });
  }

  const estimation = await getEstimationById(+estimationId);
  if (!estimation) {
    return NextResponse.json("Estimation not found", { status: 422 });
  }

  const projet = await getProjetById(estimation.projet_id);
  if (!projet) {
    return NextResponse.json("Projet not found", { status: 422 });
  }
  if (!(await hasPermissionToViewProjet(projet.id, session.user.id))) {
    return NextResponse.json(null, { status: 403 });
  }

  const ficheSolutions = await getFicheSolutionByIds(estimation.fiches_solutions_id);
  const collectivite = await getCollectiviteById(projet.collectiviteId);
  if (collectivite) {
    const result = await searchAidesFromAidesTerritoires(
      ficheSolutions.map((fs) => fs.attributes),
      collectivite,
    );
    return NextResponse.json(result);
  }
  return NextResponse.json([]);
}
