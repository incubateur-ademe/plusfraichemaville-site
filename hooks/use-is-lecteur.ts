import { getCurrentUserRole } from "@/components/partage/helpers";
import { useProjetsStore } from "@/stores/projets/provider";
import { useUserStore } from "@/stores/user/provider";
import { RoleProjet } from "@prisma/client";

export const useIsLecteur = () => {
  const currentProjet = useProjetsStore((state) => state.getCurrentProjet());
  const currentUserId = useUserStore((state) => state.userInfos?.id);
  return (currentProjet && getCurrentUserRole(currentProjet.users, currentUserId) !== RoleProjet.ADMIN) ?? false;
};
