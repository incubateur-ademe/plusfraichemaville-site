"use server";

import { auth } from "@/src/lib/next-auth/auth";
import { ResponseAction } from "../actions-types";
import { customCaptureException } from "@/src/lib/sentry/sentryCustomMessage";
import { RoleProjet } from "@prisma/client";
import { UserProjetWithUser } from "@/src/lib/prisma/prismaCustomTypes";
import { updateUserRoleProject } from "@/src/lib/prisma/prisma-user-projet-queries";
import { createAnalytic } from "@/src/lib/prisma/prisma-analytics-queries";

export const updateUserRoleProjectAction = async (
  userId: string,
  projectId: number,
  role: RoleProjet,
): Promise<ResponseAction<{ member: UserProjetWithUser | null }>> => {
  const session = await auth();

  // On garde ce code au cas où on autorise un jour la modification d'un rôle d'un utilisateur.
  if (!session || session) {
    return { type: "error", message: "UNAUTHENTICATED", member: null };
  }

  // const permission = new PermissionManager(session);
  // const canUpdateUserRole = await permission.canUpdateUserRole(session?.user.id, userId, projectId);
  //
  // if (!canUpdateUserRole) {
  //   return { type: "error", message: "UNAUTHORIZED", member: null };
  // }

  try {
    const member = await updateUserRoleProject(userId, projectId, role);
    if (member) {
      await createAnalytic({
        context: {
          updatedUser: member.user_id,
        },
        event_type: "UPDATE_USER_ROLE",
        reference_type: "USER",
        // @ts-ignore
        reference_id: session.user.id,
        // @ts-ignore
        userId: session.user.id,
      });
    }
    return {
      type: "success",
      message: "ROLE_UPDATED",
      member,
    };
  } catch (e) {
    customCaptureException("Error in updating user role DB call", e);
    return { type: "error", message: "TECHNICAL_ERROR", member: null };
  }
};
