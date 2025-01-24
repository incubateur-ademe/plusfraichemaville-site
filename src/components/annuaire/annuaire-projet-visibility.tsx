"use client";

import { updateProjetVisibilityAction } from "@/src/actions/projets/update-projet-visibility-action";
import { useProjetsStore } from "@/src/stores/projets/provider";
import { notifications } from "../common/notifications";
import { ProjetVisibility } from "../common/projet-visibility";

export const AnnuaireProjetVisibility = ({ isLecteur, reduced = false }: { isLecteur: boolean; reduced?: boolean }) => {
  const currentProjet = useProjetsStore((state) => state.getCurrentProjet());
  const isPublic = currentProjet?.is_public;
  const projetId = currentProjet?.id;
  const addOrUpdateProjet = useProjetsStore((state) => state.addOrUpdateProjet);

  const handleVisibility = async (checked: boolean) => {
    if (projetId) {
      const result = await updateProjetVisibilityAction(projetId, checked);
      if (result.projet) {
        addOrUpdateProjet(result.projet);
      }
      notifications(result.type, result.message);
    }
  };

  return (
    <ProjetVisibility
      isPublic={isPublic}
      disabled={isLecteur}
      isLoading={!currentProjet}
      onVisibilityChange={handleVisibility}
      reduced={reduced}
    />
  );
};
