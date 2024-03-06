"use client";

import { useProjetsStore } from "@/stores/projets/provider";
import { FichesSolutionsProjetHeader } from ".";
import { FichesSolutionsProjetsSelected } from "./fiches-solutions-projet-selected";
import { AllSolutionsBoard } from "../common/all-solutions-board";

export const FichesSolutionsProjet = () => {
  const projet = useProjetsStore((state) => state.getCurrentProjet());
  const selectedFichesSolutionsIds = projet?.fiches_solutions_id;

  return (
    <>
      <div className="fr-container py-10">
        <FichesSolutionsProjetHeader projetId={projet?.id} projetNom={projet?.nom} />
        <FichesSolutionsProjetsSelected selectedFichesSolutionsIds={selectedFichesSolutionsIds} />
      </div>
      <AllSolutionsBoard />
    </>
  );
};
