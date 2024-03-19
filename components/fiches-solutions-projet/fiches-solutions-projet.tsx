"use client";

import { useProjetsStore } from "@/stores/projets/provider";
import { FichesSolutionsProjetHeader } from ".";
import { FichesSolutionsProjetsSelected } from "./fiches-solutions-projet-selected";
import { AllSolutionsBoard } from "../common/all-solutions-board";
import { FichesSolutionProjetBookmarksByEspace } from "./fiches-solutions-projet-bookmarks-by-espace";

export const FichesSolutionsProjet = () => {
  const projet = useProjetsStore((state) => state.getCurrentProjet());
  const updateStore = useProjetsStore((state) => state.addOrUpdateProjet);
  const selectedFichesSolutionsIds = projet?.fiches_solutions_id;
  return (
    <>
      <div className="fr-container py-10">
        <FichesSolutionsProjetHeader projetId={projet?.id} projetNom={projet?.nom} />
        <FichesSolutionsProjetsSelected
          selectedFichesSolutionsIds={selectedFichesSolutionsIds}
          isValidated={projet?.fiches_solutions_validated}
          updateStore={updateStore}
          projetId={projet?.id}
        />
        <FichesSolutionProjetBookmarksByEspace
          projetNom={projet?.nom ?? ""}
          projetTypeEspace={projet?.type_espace ?? ""}
          projetsFichesSolutionsIds={selectedFichesSolutionsIds ?? []}
          updateStore={updateStore}
          projetId={projet?.id}
        />
        <FichesSolutionProjetBookmarksByEspace
          projetNom={projet?.nom ?? ""}
          projetTypeEspace={""}
          projetsFichesSolutionsIds={selectedFichesSolutionsIds ?? []}
          updateStore={updateStore}
          projetId={projet?.id}
        />
      </div>
      <AllSolutionsBoard />
    </>
  );
};
