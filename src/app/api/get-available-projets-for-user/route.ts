import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "@/src/lib/next-auth/auth";
import { PermissionManager } from "@/src/helpers/permission-manager";
import { getAvailableProjetsForSiren } from "@/src/lib/prisma/prismaProjetQueries";
import { getUserById } from "@/src/lib/prisma/prismaUserQueries";

export async function GET(request: NextRequest) {
  const userId = request.nextUrl.searchParams.get("userId");
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json([], { status: 401 });
  }

  if (!userId) {
    return NextResponse.json([], { status: 400 });
  }

  const permission = new PermissionManager(session);

  const canViewUserProject = permission.canViewUserProject(userId);

  const user = await getUserById(userId);

  if (!canViewUserProject || !user) {
    return NextResponse.json([], { status: 401 });
  }
  if (!user.siren) {
    return NextResponse.json([]);
  }
  return NextResponse.json(await getAvailableProjetsForSiren(user.siren, session.user.id));
}
