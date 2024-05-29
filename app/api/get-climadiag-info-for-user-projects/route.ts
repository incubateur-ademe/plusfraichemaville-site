import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "@/lib/next-auth/auth";
import { getUserProjets } from "@/lib/prisma/prismaProjetQueries";
import { getUserWithCollectivites } from "@/lib/prisma/prismaUserQueries";
import { notEmpty } from "@/helpers/listUtils";
import { getClimadiagInfoFromCodeInsee } from "@/lib/prisma/prisma-climadiag-queries";

export async function GET(request: NextRequest) {
  const requestUserId = request.nextUrl.searchParams.get("userId");
  const session = await getServerSession(authOptions);
  if (session) {
    if (session.user.id !== requestUserId) {
      return NextResponse.json(null, { status: 403 });
    } else {
      const userProjets = await getUserProjets(requestUserId);
      const user = await getUserWithCollectivites(requestUserId);
      const collectiviteInseeCode = new Set<string>(
        user?.collectivites.map((userCollectivite) => userCollectivite.collectivite.code_insee).filter(notEmpty),
      );
      userProjets.map((projet) => {
        if (projet.collectivite.code_insee) {
          collectiviteInseeCode.add(projet.collectivite.code_insee);
        }
      });
      return NextResponse.json(await getClimadiagInfoFromCodeInsee(Array.from(collectiviteInseeCode)));
    }
  } else {
    return NextResponse.json(null, { status: 401 });
  }
}
