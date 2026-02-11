"use server";

import { PFMV_ROUTES } from "@/src/helpers/routes";
import { auth } from "@/src/lib/next-auth/auth";
import { revalidatePath } from "next/cache";
import { ResponseAction } from "../actions-types";
import { customCaptureException } from "@/src/lib/sentry/sentryCustomMessage";
import { PermissionManager } from "@/src/helpers/permission-manager";
import { EventType, ReferenceType, StatutUser } from "@/src/generated/prisma/client";
import { updateUserStatut } from "@/src/lib/prisma/prismaUserQueries";
import { createAnalytic } from "@/src/lib/prisma/prisma-analytics-queries";
import { UserWithCollectiviteDto } from "@/src/types/dto";

export const updateUserStatutAction = async (
  statut: StatutUser,
  userId: string,
): Promise<ResponseAction<{ updatedUser?: UserWithCollectiviteDto | null }>> => {
  const session = await auth();
  if (!session) {
    return { type: "error", message: "UNAUTHENTICATED" };
  }

  const permission = new PermissionManager(session);

  if (!permission.canUpdateUser(userId)) {
    return { type: "error", message: "UNAUTHORIZED" };
  }

  try {
    const updatedUser = await updateUserStatut(userId, statut);
    if (updatedUser) {
      await createAnalytic({
        context: { statut: statut },
        event_type: EventType.UPDATE_STATUT_USER,
        reference_id: updatedUser.id,
        reference_type: ReferenceType.USER,
        user_id: session.user.id,
      });
    }
    revalidatePath(PFMV_ROUTES.MON_STATUT);
    return { type: "success", message: "USER_UPDATED", updatedUser };
  } catch (e) {
    customCaptureException("Error in EditUserInfoAction DB call", e);
    return { type: "error", message: "TECHNICAL_ERROR" };
  }
};
