import { FichesSolutionsProjetEmpty } from ".";
import clsx from "clsx";
import { PFMV_ROUTES } from "@/helpers/routes";
import { ProjetWithRelations } from "@/lib/prisma/prismaCustomTypes";
import React from "react";
import { FicheSolutionCardWithFetcher } from "../ficheSolution/fiche-solution-card-with-fetcher";
import { GenericFicheLink } from "@/components/common/generic-save-fiche/generic-fiche-link";

type FichesSolutionsProjetsSelectedProps = {
  selectedFichesSolutionsIds?: number[];
  updateStore: (_projet: ProjetWithRelations) => void;
  projetId?: number;
};

export const FichesSolutionsProjetsSelected = ({
  selectedFichesSolutionsIds,
  projetId,
}: FichesSolutionsProjetsSelectedProps) => {
  if (!projetId) {
    return null;
  }

  return (
    <div>
      <div className="mb-10 flex flex-wrap gap-8">
        {selectedFichesSolutionsIds && selectedFichesSolutionsIds.length === 0 ? (
          <FichesSolutionsProjetEmpty />
        ) : (
          selectedFichesSolutionsIds?.map((selectedFichesSolution, index) => (
            <FicheSolutionCardWithFetcher id={selectedFichesSolution} complete projectName="" key={index} />
          ))
        )}
        <GenericFicheLink
          href={PFMV_ROUTES.ESPACE_PROJET_FICHES_SOLUTION_LISTE_ALL}
          className={clsx(
            "fr-btn !h-32 !w-32 rounded-[10px] bg-dsfr-text-label-blue-france",
            "flex !flex-col items-center justify-center",
            "self-center",
          )}
        >
          <i className="ri-add-circle-fill mb-2 text-sm text-white"></i>
          <span className="text-center text-white">Ajouter des solutions</span>
        </GenericFicheLink>
      </div>
      <GenericFicheLink
        href={PFMV_ROUTES.ESPACE_PROJET_TABLEAU_DE_BORD}
        className="fr-btn fr-btn--secondary rounded-3xl"
      >
        Revenir au tableau de bord
      </GenericFicheLink>
    </div>
  );
};
