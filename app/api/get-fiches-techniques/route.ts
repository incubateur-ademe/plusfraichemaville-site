import { NextRequest, NextResponse } from "next/server";
import { getFicheTechniqueByIds } from "@/lib/directus/queries/fichesTechniquesQueries";

export async function GET(request: NextRequest) {
  const ficheTechniqueIds = request.nextUrl.searchParams.get("ficheTechniqueIds");

  if (ficheTechniqueIds) {
    return NextResponse.json(await getFicheTechniqueByIds(<number[]>JSON.parse(ficheTechniqueIds)));
  } else {
    return NextResponse.json("[]");
  }
}
