import { NextRequest, NextResponse } from "next/server";
import { getFicheSolutionByIdsComplete } from "@/src/lib/strapi/queries/fichesSolutionsQueries";

export async function GET(request: NextRequest) {
  const ficheSolutionIds = request.nextUrl.searchParams.get("ficheSolutionIds");

  if (ficheSolutionIds) {
    const listFicheSolutionIds = <number[]>JSON.parse(ficheSolutionIds);

    if (listFicheSolutionIds.length > 0) {
      return NextResponse.json(await getFicheSolutionByIdsComplete(<number[]>JSON.parse(ficheSolutionIds)));
    }
  }
  return NextResponse.json([]);
}
