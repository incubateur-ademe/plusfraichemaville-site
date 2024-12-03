"use client";

import { updateProjetVisibilityAction } from "@/src/actions/projets/update-projet-visibility-action";
import { useProjetsStore } from "@/src/stores/projets/provider";
import { notifications } from "../common/notifications";
import { ProjetVisibilityReduced } from "@/src/components/common/projet-visibility-reduced";
import React from "react";
import { ProjetVisibility } from "@/src/components/common/projet-visibility";

export const SourcingProjetVisibility = ({
  isLecteur,
  reducedComponent = false,
}: {
  isLecteur: boolean;
  reducedComponent?: boolean;
}) => {
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
    <>
      {reducedComponent ? (
        <ProjetVisibilityReduced
          isPublic={isPublic}
          disabled={isLecteur}
          isLoading={!currentProjet}
          onVisibilityChange={handleVisibility}
        />
      ) : (
        <ProjetVisibility
          isPublic={isPublic}
          disabled={isLecteur}
          isLoading={!currentProjet}
          onVisibilityChange={handleVisibility}
        />
      )}
    </>
  );
};
