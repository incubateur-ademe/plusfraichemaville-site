import { getCurrentUserRole } from "@/src/components/partage/helpers";
import { useProjetsStore } from "@/src/stores/projets/provider";
import { useUserStore } from "@/src/stores/user/provider";
import { RoleProjet } from "@/src/generated/prisma/client";

export const useIsLecteur = (projetId?: number | null) => {
  const currentUserId = useUserStore((state) => state.userInfos?.id);
  const projetById = useProjetsStore((state) => (projetId ? state.getProjetById(projetId) : null));

  return getCurrentUserRole(projetById?.users, currentUserId) === RoleProjet.LECTEUR;
};
