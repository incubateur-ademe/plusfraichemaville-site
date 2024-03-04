"use client";

import { useProjetsStore } from "@/stores/projets/provider";
import { FichesSolutionsProjetHeader } from ".";
import { FichesSolutionsProjetsSelected } from "./fiches-solutions-projet-selected";
import { useParams } from "next/navigation";
import { AllSolutionsBoard } from "../common/all-solutions-board";

export const FichesSolutionsProjet = () => {
  const { projetId } = useParams();
  const projet = useProjetsStore((state) => state.getProjetById(+projetId));
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
