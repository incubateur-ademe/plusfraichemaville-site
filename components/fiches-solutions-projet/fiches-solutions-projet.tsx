"use client";

import { useProjetsStore } from "@/stores/projets/provider";
import { FichesSolutionsProjetHeader } from ".";
import { FichesSolutionsProjetsCurrent } from "./fiches-solutions-projet-current";
import { useParams } from "next/navigation";
import { AllSolutionsBoard } from "../common/all-solutions-board";

export const FichesSolutionsProjet = () => {
  const { projetId } = useParams();
  const projet = useProjetsStore((state) => state.getProjetById(+projetId));
  const getSelectedFichesSolutions = useProjetsStore((state) => state.getSelectedFichesSolutionsByProjet);
  const selectedFichesSolutions = getSelectedFichesSolutions(+projetId);

  return (
    <>
      <div className="fr-container py-10">
        <FichesSolutionsProjetHeader projetId={projet?.id} projetNom={projet?.nom} />
        <FichesSolutionsProjetsCurrent fichesSolutions={selectedFichesSolutions} />
      </div>
      <AllSolutionsBoard />
    </>
  );
};
