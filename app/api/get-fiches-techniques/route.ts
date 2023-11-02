import { NextRequest, NextResponse } from "next/server";
import { getFicheTechniqueBySlugs } from "@/lib/directus/queries/fichesTechniquesQueries";

export async function GET(request: NextRequest) {
  const slugs = request.nextUrl.searchParams.get("ficheTechniqueSlugs");

  if (slugs) {
    return NextResponse.json(await getFicheTechniqueBySlugs(<string[]>JSON.parse(slugs)));
  } else {
    return NextResponse.json("[]");
  }
}
