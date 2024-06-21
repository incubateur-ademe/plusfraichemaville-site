import { NextRequest, NextResponse } from "next/server";
import { fetchAidesFromAidesTerritoires } from "@/lib/aidesTerritoires/fetch";
import { getFicheSolutionByIds } from "@/lib/strapi/queries/fichesSolutionsQueries";
import { getEstimationById } from "@/lib/prisma/prismaEstimationQueries";
import { getProjetById } from "@/lib/prisma/prismaProjetQueries";
import { getCollectiviteById } from "@/lib/prisma/prismaCollectiviteQueries";

export async function GET(request: NextRequest) {
  // TODO : Sécuriser cette route
  const estimationId = request.nextUrl.searchParams.get("estimationId");
  if (estimationId) {
    const estimation = await getEstimationById(+estimationId);
    if (estimation) {
      const ficheSolutions = await getFicheSolutionByIds(estimation.fiches_solutions_id);
      const projet = await getProjetById(estimation.projet_id);
      if (projet) {
        const collectivite = await getCollectiviteById(projet.collectiviteId);
        if (collectivite) {
          const result = await fetchAidesFromAidesTerritoires(
            ficheSolutions.map((fs) => fs.attributes),
            collectivite,
          );
          return NextResponse.json(result?.results);
        }
      }
    }
  }
  return NextResponse.json([]);
}
