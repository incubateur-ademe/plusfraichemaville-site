import { NextRequest, NextResponse } from "next/server";
import { searchAidesFromAidesTerritoires } from "@/src/lib/aidesTerritoires/fetch";
import { getFicheSolutionByIds } from "@/src/lib/strapi/queries/fichesSolutionsQueries";
import { getEstimationById } from "@/src/lib/prisma/prismaEstimationQueries";
import { getProjetById } from "@/src/lib/prisma/prismaProjetQueries";
import { getCollectiviteById } from "@/src/lib/prisma/prismaCollectiviteQueries";
import { getServerSession } from "next-auth";
import { authOptions } from "@/src/lib/next-auth/auth";
import { PermissionManager } from "@/src/helpers/permission-manager";
import { selectEspaceLabelByCode } from "@/src/helpers/type-espace-filter";

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

  const projet = await getProjetById(estimation.projetId);
  if (!projet) {
    return NextResponse.json("Projet not found", { status: 422 });
  }

  const permission = new PermissionManager(session);
  if (!(await permission.canEditProject(projet.id))) {
    return NextResponse.json(null, { status: 403 });
  }

  const ficheSolutionIds = estimation.estimationsFichesSolutions.map((efs) => efs.ficheSolutionId);
  const ficheSolutions = await getFicheSolutionByIds(ficheSolutionIds);
  const collectivite = await getCollectiviteById(projet.collectiviteId);
  if (collectivite) {
    const result = await searchAidesFromAidesTerritoires(
      ficheSolutions.map((fs) => fs.attributes),
      collectivite,
      selectEspaceLabelByCode(projet.typeEspace),
    );
    return NextResponse.json(result);
  }
  return NextResponse.json([]);
}
