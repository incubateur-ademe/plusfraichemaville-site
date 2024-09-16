import { NextRequest, NextResponse } from "next/server";
import { fetchAideFromAidesTerritoiresById } from "@/src/lib/aidesTerritoires/fetch";
import { getServerSession } from "next-auth";
import { authOptions } from "@/src/lib/next-auth/auth";
import { getAideById } from "@/src/lib/prisma/prismaAideQueries";

export async function GET(request: NextRequest) {
  const aideId = request.nextUrl.searchParams.get("aideId");
  if (!aideId) {
    return NextResponse.json(null, { status: 400 });
  }

  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json(null, { status: 401 });
  }

  const aide = await getAideById(+aideId);
  if (!aide) {
    return NextResponse.json("Aide not found", { status: 422 });
  }
  const result = await fetchAideFromAidesTerritoiresById(aide.aideTerritoireId);
  return NextResponse.json(result);
}
