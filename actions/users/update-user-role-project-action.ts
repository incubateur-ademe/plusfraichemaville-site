"use server";

import { auth } from "@/lib/next-auth/auth";
import { ResponseAction } from "../actions-types";
import { customCaptureException } from "@/lib/sentry/sentryCustomMessage";
import { RoleProjet } from "@prisma/client";
import { UserProjetWithUser } from "@/lib/prisma/prismaCustomTypes";
import { revalidatePath } from "next/cache";
import { updateUserRoleProject } from "@/lib/prisma/prisma-user-projet-queries";

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
  // const canUpdateUserRole = await new PermissionManager().canUpdateUserRole(session?.user.id, userId, projectId);
  //
  // if (!canUpdateUserRole) {
  //   return { type: "error", message: "UNAUTHORIZED", member: null };
  // }

  try {
    const member = await updateUserRoleProject(userId, projectId, role);
    revalidatePath(`/espace-projet/${projectId}`);
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
