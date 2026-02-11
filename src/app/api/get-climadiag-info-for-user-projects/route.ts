import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "@/src/lib/next-auth/auth";
import { getUserProjets } from "@/src/lib/prisma/prismaProjetQueries";
import { getUserWithCollectivites } from "@/src/lib/prisma/prismaUserQueries";
import { getClimadiagInfoFromCodeInsee } from "@/src/lib/prisma/prisma-climadiag-queries";
import { isSirenCommune } from "@/src/helpers/categories-juridiques";

export async function GET(request: NextRequest) {
  const requestUserId = request.nextUrl.searchParams.get("userId");
  const session = await getServerSession(authOptions);
  if (session) {
    if (session.user.id !== requestUserId) {
      return NextResponse.json(null, { status: 403 });
    } else {
      const userProjets = await getUserProjets(requestUserId);
      const user = await getUserWithCollectivites(requestUserId);
      const userSirenInfo = user?.sirenInfo;
      const climadiagSearchKeys = new Set<string>();
      if (isSirenCommune(userSirenInfo) && userSirenInfo?.adresseEtablissement.codeCommuneEtablissement) {
        climadiagSearchKeys.add(userSirenInfo.adresseEtablissement.codeCommuneEtablissement);
      } else if (userSirenInfo?.siren) {
        climadiagSearchKeys.add(userSirenInfo.siren);
      }
      userProjets.map((projet) => {
        if (projet.collectivite.codeInsee) {
          climadiagSearchKeys.add(projet.collectivite.codeInsee);
        }
      });
      return NextResponse.json(await getClimadiagInfoFromCodeInsee(Array.from(climadiagSearchKeys)));
    }
  } else {
    return NextResponse.json(null, { status: 401 });
  }
}
