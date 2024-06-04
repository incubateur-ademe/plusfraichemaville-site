import { FichesSolutionsProjetEmpty } from ".";
import Link from "next/link";
import { useRouter } from "next/navigation";
import clsx from "clsx";
import { PFMV_ROUTES } from "@/helpers/routes";
import { ProjetWithRelations } from "@/lib/prisma/prismaCustomTypes";
import { updateFichesSolutionsValidatedAction } from "@/actions/projets/update-fiches-solutions-validated-action";
import { notifications } from "../common/notifications";
import Button from "@codegouvfr/react-dsfr/Button";
import React from "react";
import { FicheSolutionCardWithFetcher } from "../ficheSolution/fiche-solution-card-with-fetcher";
import { GenericFicheLink } from "@/components/common/generic-save-fiche/generic-fiche-link";

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
