import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/src/lib/next-auth/auth";
import { getPublicProjetById } from "@/src/lib/prisma/prismaProjetQueries";

export async function GET(request: NextRequest) {
  const projetId = request.nextUrl.searchParams.get("projetId");
  if (!projetId) {
    return NextResponse.json(null, { status: 400 });
  }

  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json(null, { status: 401 });
  }

  const projet = await getPublicProjetById(+projetId);
  if (!projet) {
    return NextResponse.json("Projet not found", { status: 422 });
  }
  return NextResponse.json(projet);
}
