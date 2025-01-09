"use client";

import { useProjetsStore } from "@/src/stores/projets/provider";
import { FichesSolutionsProjetHeader } from ".";
import { FichesSolutionsProjetsSelected } from "./fiches-solutions-projet-selected";
import { AllSolutionsBoard } from "../common/all-solutions-board";
import { FichesSolutionProjetBookmarksByEspace } from "./fiches-solutions-projet-bookmarks-by-espace";
import { useCanEditProjet } from "@/src/hooks/use-can-edit-projet";

export const FichesSolutionsProjet = () => {
  const currentProjet = useProjetsStore((state) => state.getCurrentProjet());
  const canEditProjet = useCanEditProjet(currentProjet?.id);
  const updateStore = useProjetsStore((state) => state.addOrUpdateProjet);
  const selectedFichesSolutionsIds = currentProjet?.fiches_solutions_id;

  return (
    <>
      <div className="fr-container py-10">
        <FichesSolutionsProjetHeader projetId={currentProjet?.id} projetNom={currentProjet?.nom} />
        <FichesSolutionsProjetsSelected
          selectedFichesSolutionsIds={selectedFichesSolutionsIds}
          updateStore={updateStore}
          projetId={currentProjet?.id}
        />
        {canEditProjet && (
          <>
            <FichesSolutionProjetBookmarksByEspace
              projetNom={currentProjet?.nom ?? ""}
              projetTypeEspace={currentProjet?.type_espace ?? ""}
              projetsFichesSolutionsIds={selectedFichesSolutionsIds ?? []}
              updateStore={updateStore}
              projetId={currentProjet?.id}
            />

            <FichesSolutionProjetBookmarksByEspace
              projetNom={currentProjet?.nom ?? ""}
              projetTypeEspace={""}
              projetsFichesSolutionsIds={selectedFichesSolutionsIds ?? []}
              updateStore={updateStore}
              projetId={currentProjet?.id}
            />
          </>
        )}
      </div>
      <AllSolutionsBoard />
    </>
  );
};
