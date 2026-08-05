import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "@/src/lib/next-auth/auth";
import { getAideDecisionFirstSteps } from "@/src/lib/strapi/queries/aideDecisionQueries";

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json(null, { status: 401 });
  }

  return NextResponse.json(await getAideDecisionFirstSteps());
}
