import { getCurrentUserRole } from "@/src/components/partage/helpers";
import { useProjetsStore } from "@/src/stores/projets/provider";
import { useUserStore } from "@/src/stores/user/provider";
import { RoleProjet } from "@prisma/client";

export const useIsLecteur = () => {
  const currentProjet = useProjetsStore((state) => state.getCurrentProjet());
  const currentUserId = useUserStore((state) => state.userInfos?.id);
  return (currentProjet && getCurrentUserRole(currentProjet.users, currentUserId) !== RoleProjet.ADMIN) ?? false;
};
