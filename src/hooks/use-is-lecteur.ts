import { getCurrentUserRole } from "@/src/components/partage/helpers";
import { useProjetsStore } from "@/src/stores/projets/provider";
import { useUserStore } from "@/src/stores/user/provider";
import { RoleProjet } from "@prisma/client";

export const useIsLecteur = (projetId?: number) => {
  const currentProjet = useProjetsStore((state) => state.getCurrentProjet());
  const projetById = useProjetsStore((state) => (projetId ? state.getProjetById(projetId) : null));
  const currentUserId = useUserStore((state) => state.userInfos?.id);

  const selectedProjet = projetId && projetById ? projetById.users : currentProjet?.users;

  return getCurrentUserRole(selectedProjet, currentUserId) !== RoleProjet.ADMIN ?? false;
};
