"use client";
import Notice from "@codegouvfr/react-dsfr/Notice";
import { startTransition } from "react";
import { discardInformationAction } from "@/src/actions/users/discard-information-action";
import { hasDiscardedInformation } from "@/src/helpers/user";
import { useUserStore } from "@/src/stores/user/provider";

export const NoticeEntreprisePrivee = () => {
  const BANNER_ID = "notice-entreprise-privee";
  const currentUser = useUserStore((state) => state.userInfos);
  const setUserInfos = useUserStore((state) => state.setUserInfos);

  const handleDiscardInformation = () => {
    startTransition(async () => {
      if (currentUser?.id) {
        const result = await discardInformationAction(currentUser.id, BANNER_ID);
        if (result.type === "success") {
          setUserInfos(result.updatedUser);
        }
      }
    });
  };
  if (!currentUser || hasDiscardedInformation(currentUser, BANNER_ID)) {
    return null;
  }
  return (
    <Notice
      classes={{ root: "[&_p]:mb-0" }}
      title="Ce service est pensé pour les collectivités."
      description="Les entreprises qui les accompagnent sont les bienvenues mais certains termes de l’interface
      peuvent ne pas être adaptés."
      iconDisplayed
      severity="warning"
      isClosable
      onClose={handleDiscardInformation}
    />
  );
};
