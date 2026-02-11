import { updateRecommandationsViewedByUser } from "@/src/actions/projets/update-recommandations-viewed-by-user-action";
import { useProjetsStore } from "@/src/stores/projets/provider";
import { useUserStore } from "@/src/stores/user/provider";
import { TypeFiche, TypeUpdate } from "@/src/helpers/common";
import { isEmpty } from "../helpers/listUtils";
import { getProjetFichesIdsByType } from "@/src/components/common/generic-save-fiche/helpers";

export const useRecommandationsViewed = () => {
  const addOrUpdateProjet = useProjetsStore((state) => state.addOrUpdateProjet);
  const currentProjet = useProjetsStore((state) => state.getCurrentProjet());
  const currentUser = useUserStore((state) => state.userInfos?.id);
  const recommandationViewed = currentProjet?.recommandationsViewedBy;
  const fichesSolutionsIds = getProjetFichesIdsByType({ projet: currentProjet, typeFiche: TypeFiche.solution });

  const shouldShowRecommandationBadge = !isEmpty(fichesSolutionsIds);
  const recommandationsAlreadyViewed =
    (currentUser && recommandationViewed?.includes(currentUser)) || !shouldShowRecommandationBadge;

  const updateToRecommandationsViewed = async () => {
    if (currentUser && currentProjet && !recommandationsAlreadyViewed) {
      const updatedProjet = await updateRecommandationsViewedByUser(
        currentProjet.id.toString(),
        currentUser,
        TypeUpdate.add,
      );
      if (updatedProjet.projet) {
        addOrUpdateProjet(updatedProjet.projet);
      }
    }
  };

  return { recommandationsAlreadyViewed, updateToRecommandationsViewed };
};
