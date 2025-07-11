import { getCurrentUserRole } from "@/src/components/partage/helpers";
import { useProjetsStore } from "@/src/stores/projets/provider";
import { useUserStore } from "@/src/stores/user/provider";
import { RoleProjet } from "@/src/generated/prisma/client";

export const useCanEditProjet = (projetId?: number | null) => {
  const currentUserId = useUserStore((state) => state.userInfos?.id);
  const projetById = useProjetsStore((state) => (projetId ? state.getProjetById(projetId) : null));
  const role = getCurrentUserRole(projetById?.users, currentUserId);

  return role === RoleProjet.ADMIN || role === RoleProjet.EDITEUR;
};
