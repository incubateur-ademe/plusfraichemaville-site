import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "@/src/lib/next-auth/auth";
import { getAideDecisionBySlug, getAideDecisionHistoryBySlug } from "@/src/lib/strapi/queries/aideDecisionQueries";
import { AideDecisionStepData } from "@/src/lib/strapi/queries/commonStrapiFilters";

export async function GET(request: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json(null, { status: 401 });
  }

  const slug = request.nextUrl.searchParams.get("slug");

  if (!slug) {
    return NextResponse.json(null, { status: 400 });
  }

  const [etape, historique] = await Promise.all([getAideDecisionBySlug(slug), getAideDecisionHistoryBySlug(slug)]);

  const data: AideDecisionStepData = { etape, historique };

  return NextResponse.json(data);
}
