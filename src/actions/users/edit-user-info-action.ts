"use server";

import { PFMV_ROUTES } from "@/src/helpers/routes";
import { auth } from "@/src/lib/next-auth/auth";
import { getUserWithCollectivites, updateUser } from "@/src/lib/prisma/prismaUserQueries";
import { revalidatePath } from "next/cache";
import { ResponseAction } from "../actions-types";
import { UserWithCollectivite } from "@/src/lib/prisma/prismaCustomTypes";
import { UserInfoFormData, UserInfoFormSchema } from "@/src/forms/user/UserInfoFormSchema";
import { captureError, customCaptureException } from "@/src/lib/sentry/sentryCustomMessage";
import { getOrCreateCollectiviteFromForm } from "@/src/actions/collectivites/get-or-create-collectivite-from-form";
import { CUSTOM_CANAL_ACQUISITION } from "@/src/helpers/canalAcquisition";
import { PermissionManager } from "@/src/helpers/permission-manager";
import { upsertBrevoContact } from "@/src/services/brevo/brevo-api";
import { createConnectContact } from "@/src/services/connect";
import { mapUserToConnectContact } from "@/src/services/connect/connect-helpers";

export const editUserInfoAction = async (
  data: UserInfoFormData & { userId: string },
): Promise<ResponseAction<{ updatedUser?: UserWithCollectivite | null }>> => {
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
      const prismaUser = await getUserWithCollectivites(data.userId);
      if (
        prismaUser?.collectivites[0] &&
        prismaUser?.collectivites[0].collectivite.ban_id !== data.collectivite.banId
      ) {
        return { type: "error", message: "CHANGE_COLLECTIVITE_ERROR" };
      }
      const collectiviteId = await getOrCreateCollectiviteFromForm(data.collectivite, session.user.id);
      const canalAcquisition =
        data.canalAcquisition === CUSTOM_CANAL_ACQUISITION.label
          ? data.customCanalAcquisition || data.canalAcquisition
          : data.canalAcquisition;

      const updatedUser = await updateUser({
        userId: data.userId,
        userPrenom: data.prenom,
        userNom: data.nom,
        userPoste: data.poste,
        collectiviteId: collectiviteId,
        canalAcquisition: canalAcquisition,
        nomEtablissement: data.nomEtablissement,
        acceptCommunicationProduit: data.acceptCommunicationProduit,
      });
      try {
        const response = await upsertBrevoContact({
          email: data.email,
          acceptInfoProduct: data.acceptCommunicationProduit,
          subscribeNewsletter: data.subscribeToNewsletter,
        });
        if (!response.ok) {
          const brevoResponse = await response.json();
          captureError("Erreur lors de la mise à jour dans Brevo", JSON.stringify(brevoResponse));
        }
      } catch (e) {
        customCaptureException("Error in Brevo call in EditUserInfoAction", e);
      }

      try {
        if (updatedUser && process.env.CONNECT_SYNC_ACTIVE === "true" && data.subscribeToNewsletter) {
          await createConnectContact(mapUserToConnectContact(updatedUser, true));
        }
      } catch (e) {
        customCaptureException("Error in Connect call in EditUserInfoAction", e);
      }

      revalidatePath(PFMV_ROUTES.MON_PROFIL);
      return { type: "success", message: "USER_UPDATED", updatedUser };
    } catch (e) {
      customCaptureException("Error in EditUserInfoAction DB call", e);
      return { type: "error", message: "TECHNICAL_ERROR" };
    }
  }
};
