"use server";

import { auth } from "@/lib/next-auth/auth";
import { ResponseAction } from "../actions-types";
import { customCaptureException } from "@/lib/sentry/sentryCustomMessage";
import { PermissionManager } from "@/helpers/permission-manager";
import { getUserById } from "@/lib/prisma/prismaUserQueries";
import { attachInvitationsByToken, getUserProjetById } from "@/lib/prisma/prisma-user-projet-queries";
import { Prisma } from "@prisma/client";
import { ProjetWithPublicRelations } from "@/lib/prisma/prismaCustomTypes";

export const attachInvitationToUserAction = async (
  userId: string,
  invitationId: number,
  invitationToken: string,
): Promise<
  ResponseAction<{
    updatedProjet?: ProjetWithPublicRelations | null;
  }>
> => {
  const session = await auth();
  if (!session) {
    return { type: "error", message: "UNAUTHENTICATED" };
  }
  const canUpdateUser = new PermissionManager().canUpdateUser(userId, session.user.id);

  if (!canUpdateUser) {
    return { type: "error", message: "UNAUTHORIZED" };
  }

  try {
    const user = await getUserById(userId);
    if (!user) {
      return { type: "error", message: "UNAUTHORIZED" };
    }
    const existingProjetLink = await getUserProjetById(invitationId);
    if (existingProjetLink?.user_id === userId) {
      return { type: "success" };
    }
    const projetLink = await attachInvitationsByToken(invitationId, invitationToken, user);
    return { type: "success", updatedProjet: projetLink?.projet };
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === "P2025") {
        return { type: "error", message: "INVITATION_NOT_FOUND" };
      }
      if (e.code === "P2002") {
        return { type: "error", message: "INVITATION_NOT_FOR_EMAIL" };
      }
    }
    customCaptureException("Error in request to join project DB call", e);
    return { type: "error", message: "TECHNICAL_ERROR" };
  }
};
