import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "@/lib/next-auth/auth";
import { getAvailableProjectsForCollectivite } from "@/lib/prisma/prismaCollectiviteQueries";
import { PermissionManager } from "@/helpers/permission-manager";

export async function GET(request: NextRequest) {
  const collectiviteId = request.nextUrl.searchParams.get("collectiviteId");
  const userId = request.nextUrl.searchParams.get("userId");
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json([], { status: 401 });
  }

  if (!collectiviteId || !userId) {
    return NextResponse.json([], { status: 400 });
  }

  const canViewUserProject = new PermissionManager().canViewUserProject(session.user.id, userId);
  const canUserViewCollectiviteProjets = await new PermissionManager().canUserViewCollectiviteProjets(
    session.user.id,
    +collectiviteId,
  );

  if (!canViewUserProject || !canUserViewCollectiviteProjets) {
    return NextResponse.json([], { status: 401 });
  }

  return NextResponse.json(await getAvailableProjectsForCollectivite(+collectiviteId, session.user.id));
}
