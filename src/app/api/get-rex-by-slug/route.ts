import { NextRequest, NextResponse } from "next/server";
import { getRetourExperienceBySlug } from "@/src/lib/strapi/queries/retoursExperienceQueries";

export async function GET(request: NextRequest) {
  const rexSlug = request.nextUrl.searchParams.get("rexSlug");
  if (rexSlug) {
    const response = await getRetourExperienceBySlug(rexSlug);
    if (response) {
      return NextResponse.json(response);
    }
    return NextResponse.json(null);
  }
  return NextResponse.json(null);
}
