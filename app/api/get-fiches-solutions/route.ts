import { NextRequest, NextResponse } from "next/server";
import { getFicheSolutionByIds } from "@/lib/strapi/queries/fichesSolutionsQueries";

export async function GET(request: NextRequest) {
  const ficheSolutionIds = request.nextUrl.searchParams.get("ficheSolutionIds");

  if (ficheSolutionIds) {
    return NextResponse.json(await getFicheSolutionByIds(<number[]>JSON.parse(ficheSolutionIds)));
  } else {
    return NextResponse.json("[]");
  }
}
