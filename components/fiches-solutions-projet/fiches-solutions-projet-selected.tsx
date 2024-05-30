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
  projetId?: number;
};

export const FichesSolutionsProjetsSelected = ({
  selectedFichesSolutionsIds,
  isValidated,
  updateStore,
  projetId,
}: FichesSolutionsProjetsSelectedProps) => {
  const router = useRouter();

  if (!projetId) {
    return null;
  }

  const returnToDashboard = () => {
    router.push(PFMV_ROUTES.TABLEAU_DE_BORD(projetId));
  };

  const validateFichesSolutionsToProjet = async () => {
    if (isValidated) {
      notifications("success", "FICHES_SOLUTIONS_VALIDATED");
      returnToDashboard();
    } else {
      const updatedProjet = await updateFichesSolutionsValidatedAction(projetId);
      notifications(updatedProjet.type, updatedProjet.message);
      if (updatedProjet.projet) {
        updateStore(updatedProjet.projet);
        returnToDashboard();
      }
    }
  };

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
      {selectedFichesSolutionsIds && selectedFichesSolutionsIds.length > 0 ? (
        <Button className="rounded-3xl bg-pfmv-navy" type="button" onClick={validateFichesSolutionsToProjet}>
          Valider
        </Button>
      ) : (
        <Button className="rounded-3xl bg-pfmv-navy" type="button" onClick={returnToDashboard}>
          Retour au tableau de bord
        </Button>
      )}
    </div>
  );
};
