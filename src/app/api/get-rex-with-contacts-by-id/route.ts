import { NextRequest, NextResponse } from "next/server";
import { getRetoursExperiencesWithContactsById } from "@/src/lib/strapi/queries/retoursExperienceQueries";

export async function GET(request: NextRequest) {
  const rexId = request.nextUrl.searchParams.get("rexId");
  if (rexId) {
    const response = await getRetoursExperiencesWithContactsById(rexId);
    if (response) {
      return NextResponse.json(response);
    }
    return NextResponse.json(null);
  }
  return NextResponse.json(null);
}
