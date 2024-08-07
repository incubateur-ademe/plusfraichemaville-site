import { getCurrentUserRole } from "@/components/partage/helpers";
import { useProjetsStore } from "@/stores/projets/provider";
import { useUserStore } from "@/stores/user/provider";

export const useIsLecteur = () => {
  const currentProjet = useProjetsStore((state) => state.getCurrentProjet());
  const currentUserId = useUserStore((state) => state.userInfos?.id);
  const isLecteur = (currentProjet && getCurrentUserRole(currentProjet.users, currentUserId) !== "ADMIN") ?? false;
  return isLecteur;
};
