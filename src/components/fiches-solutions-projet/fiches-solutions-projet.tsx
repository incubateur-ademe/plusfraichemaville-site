"use client";

import { useProjetsStore } from "@/src/stores/projets/provider";
import { FichesSolutionsProjetHeader } from ".";
import { FichesSolutionsProjetsSelected } from "./fiches-solutions-projet-selected";
import { AllSolutionsBoard } from "../common/all-solutions-board";
import { getProjetFichesIdsByType } from "@/src/components/common/generic-save-fiche/helpers";
import { TypeFiche } from "@/src/helpers/common";

export const FichesSolutionsProjet = () => {
  const currentProjet = useProjetsStore((state) => state.getCurrentProjet());
  const updateStore = useProjetsStore((state) => state.addOrUpdateProjet);
  const selectedFichesSolutionsIds = getProjetFichesIdsByType({ projet: currentProjet, typeFiche: TypeFiche.solution });

  return (
    <>
      <div className="fr-container py-10">
        <FichesSolutionsProjetHeader projetId={currentProjet?.id} projetNom={currentProjet?.nom} />
        <FichesSolutionsProjetsSelected
          selectedFichesSolutionsIds={selectedFichesSolutionsIds}
          updateStore={updateStore}
          projetId={currentProjet?.id}
        />
      </div>
      <AllSolutionsBoard />
    </>
  );
};
