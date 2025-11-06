import Notice from "@codegouvfr/react-dsfr/Notice";
import { useUserStore } from "@/src/stores/user/provider";
import { useProjetsStore } from "@/src/stores/projets/provider";
import { startTransition } from "react";
import { discardInformationAction } from "@/src/actions/users/discard-information-action";
import { hasDiscardedInformation } from "@/src/helpers/user";
import { isEmpty } from "@/src/helpers/listUtils";

export const TableauDeBordSuiviBanner = () => {
  const currentUser = useUserStore((state) => state.userInfos);
  const setUserInfos = useUserStore((state) => state.setUserInfos);
  const currentProjet = useProjetsStore((state) => state.getCurrentProjet());
  const BANNER_ID = `banner-welcome-projet-${currentProjet?.id}`;

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
  if (
    !currentUser ||
    hasDiscardedInformation(currentUser, BANNER_ID) ||
    !isEmpty(currentProjet?.fiches) ||
    !isEmpty(currentProjet?.diagnostic_simulations)
  ) {
    return null;
  }

  return (
    <Notice
      className="mb-8 rounded-2xl bg-dsfr-background-alt-grey !text-dsfr-text-title-grey [&_p]:mb-0"
      classes={{ title: "mb-2 text-xl block", description: "!mb-0 block" }}
      description="Commencez par remplir les modules ci-dessous pour préciser votre projet, ou utilisez les outils
       disponibles pour l'enrichir. À vous de jouer !"
      title={`Bienvenue ${currentUser?.prenom || ""} !`}
      isClosable={true}
      iconDisplayed={false}
      onClose={handleDiscardInformation}
    />
  );
};
