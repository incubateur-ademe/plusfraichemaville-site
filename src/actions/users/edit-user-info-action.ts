"use server";

import { PFMV_ROUTES } from "@/src/helpers/routes";
import { auth } from "@/src/lib/next-auth/auth";
import { updateUser } from "@/src/lib/prisma/prismaUserQueries";
import { revalidatePath } from "next/cache";
import { ResponseAction } from "../actions-types";
import { UserInfoFormData, UserInfoFormSchema } from "@/src/forms/user/UserInfoFormSchema";
import { captureError, customCaptureException } from "@/src/lib/sentry/sentryCustomMessage";
import { CUSTOM_CANAL_ACQUISITION } from "@/src/helpers/canalAcquisition";
import { PermissionManager } from "@/src/helpers/permission-manager";
import { createConnectContact } from "@/src/services/connect";
import { mapUserToConnectContact } from "@/src/services/connect/connect-helpers";
import { sendMattermostWebhook } from "@/src/services/mattermost";
import { makeNoSirenUserWebhookData } from "@/src/services/mattermost/mattermost-helpers";
import { UserWithCollectiviteDto } from "@/src/types/dto";

export const editUserInfoAction = async (
  data: UserInfoFormData & { userId: string },
): Promise<ResponseAction<{ updatedUser?: UserWithCollectiviteDto | null }>> => {
  const session = await auth();
  if (!session) {
    return { type: "error", message: "UNAUTHENTICATED" };
  }

  const permission = new PermissionManager(session);

  if (!permission.canUpdateUser(data.userId)) {
    return { type: "error", message: "UNAUTHORIZED" };
  }

  const parseParamResult = UserInfoFormSchema.safeParse(data);
  if (!parseParamResult.success) {
    captureError("EditUserInfoAction format errors", parseParamResult.error.flatten());
    return { type: "error", message: "PARSING_ERROR" };
  } else {
    try {
      const canalAcquisition =
        data.canalAcquisition === CUSTOM_CANAL_ACQUISITION.label
          ? data.customCanalAcquisition || data.canalAcquisition
          : data.canalAcquisition;

      const updatedUser = await updateUser({
        userId: data.userId,
        userPrenom: data.prenom,
        userNom: data.nom,
        userPoste: data.poste,
        canalAcquisition: canalAcquisition,
        nomEtablissement: data.nomEtablissement,
        acceptCommunicationProduit: data.acceptCommunicationProduit,
        acceptCommunicationSuiviProjet: data.acceptCommunicationSuiviProjet,
      });

      try {
        if (updatedUser && process.env.CONNECT_SYNC_ACTIVE === "true" && data.subscribeToNewsletter) {
          await createConnectContact(mapUserToConnectContact(updatedUser, true));
        }
      } catch (e) {
        customCaptureException("Error in Connect call in EditUserInfoAction", e);
      }
      if (updatedUser?.nomEtablissement != null && updatedUser.sirenInfo == null) {
        await sendMattermostWebhook(makeNoSirenUserWebhookData(updatedUser), "noSiren", 3000);
      }

      revalidatePath(PFMV_ROUTES.MON_PROFIL);
      return { type: "success", message: "USER_UPDATED", updatedUser };
    } catch (e) {
      customCaptureException("Error in EditUserInfoAction DB call", e);
      return { type: "error", message: "TECHNICAL_ERROR" };
    }
  }
};
