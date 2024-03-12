import { FichesSolutionsProjetEmpty } from ".";

import Link from "next/link";
import { useRouter } from "next/navigation";
import clsx from "clsx";
import { PFMV_ROUTES } from "@/helpers/routes";

import { FichesSolutionsProjetsSelectedCard } from "./fiches-solutions-projet-selected-card";

import { ProjetWithRelations } from "@/lib/prisma/prismaCustomTypes";
import { updateFichesSolutionsValidatedAction } from "@/actions/projets/update-fiches-solutions-validated-action";
import { notifications } from "../common/notifications";
import Button from "@codegouvfr/react-dsfr/Button";
import React from "react";

type FichesSolutionsProjetsSelectedProps = {
  selectedFichesSolutionsIds?: number[];
  isValidated: boolean | undefined;
  updateStore: (_projet: ProjetWithRelations) => void;
  projetId?: number
};

export const FichesSolutionsProjetsSelected = ({
  selectedFichesSolutionsIds,
  isValidated,
  updateStore,
  projetId
}: FichesSolutionsProjetsSelectedProps) => {
  const router = useRouter();

  const validateFichesSolutionsToProjet = async () => {
    if (isValidated && projetId) {
      notifications("success", "FICHES_SOLUTIONS_VALIDATED");
      router.push(PFMV_ROUTES.TABLEAU_DE_BORD(projetId));

    } else if (projetId) {
      const updatedProjet = await updateFichesSolutionsValidatedAction(projetId);
      notifications(updatedProjet.type, updatedProjet.message);
      if (updatedProjet.projet) {
        updateStore(updatedProjet.projet);
        router.push(PFMV_ROUTES.TABLEAU_DE_BORD(projetId));
      }
    }
  };

  if (!projetId) {
    return null;
  }
  return (
    <div>
      <div className="flex flex-wrap gap-8 mb-10">
        {selectedFichesSolutionsIds && selectedFichesSolutionsIds.length === 0 ? (
          <FichesSolutionsProjetEmpty />
        ) : (
          selectedFichesSolutionsIds?.map((selectedFichesSolution, index) => (
            <FichesSolutionsProjetsSelectedCard ficheSolutionId={selectedFichesSolution} key={index} />
          ))
        )}
        <Link
          href={PFMV_ROUTES.ESPACE_PROJET_FICHES_SOLUTIONS_LISTE(+projetId)}
          className={clsx(
            "fr-btn !w-32 !h-32 rounded-3xl bg-dsfr-text-label-blue-france",
            "flex !flex-col items-center justify-center",
            "self-center",
          )}
        >
          <i className="ri-add-circle-fill text-white text-sm mb-2"></i>
          <span className="text-white text-center">Ajouter des solutions</span>
        </Link>
      </div>
      <Button className="rounded-3xl" type="button" onClick={validateFichesSolutionsToProjet}>
        Valider
      </Button>
    </div>
  );
};
