import { updateRecommandationsViewedByUser } from "@/actions/projets/update-recommandations-viewed-by-user-action";
import { useProjetsStore } from "@/stores/projets/provider";
import { useUserStore } from "@/stores/user/provider";

export const useRecommandationsViewed = () => {
  const addOrUpdateProjet = useProjetsStore((state) => state.addOrUpdateProjet);
  const currentProjet = useProjetsStore((state) => state.getCurrentProjet());
  const currentUser = useUserStore((state) => state.userInfos?.id);
  const recommandationViewed = currentProjet?.recommandations_viewed_by;
  const shouldShowRecommandationBadge = (currentProjet?.fiches_solutions_id?.length || 0) > 0;
  const recommandationsAlreadyViewed =
    (currentUser && recommandationViewed?.includes(currentUser)) || !shouldShowRecommandationBadge;

  const updateToRecommandationsViewed = async () => {
    if (currentUser && currentProjet && !recommandationsAlreadyViewed) {
      const updatedProjet = await updateRecommandationsViewedByUser(currentProjet.id.toString(), currentUser, "add");
      if (updatedProjet.projet) {
        addOrUpdateProjet(updatedProjet.projet);
      }
    }
  };

  return { recommandationsAlreadyViewed, updateToRecommandationsViewed };
};
