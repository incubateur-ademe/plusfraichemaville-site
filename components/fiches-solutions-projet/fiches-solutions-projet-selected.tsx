import { FichesSolutionsProjetEmpty } from ".";

import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import clsx from "clsx";
import { PFMV_ROUTES } from "@/helpers/routes";

import { FichesSolutionsProjetsSelectedCard } from "./fiches-solutions-projet-selected-card";

import { ProjetWithRelations } from "@/lib/prisma/prismaCustomTypes";
import { updateFichesSolutionsValidatedAction } from "@/actions/projets/update-fiches-solutions-validated-action";
import { notifications } from "../common/notifications";

type FichesSolutionsProjetsSelectedProps = {
  selectedFichesSolutionsIds?: number[];
  isValidated: boolean | undefined;
  updateStore: (_projet: ProjetWithRelations) => void;
};

export const FichesSolutionsProjetsSelected = ({
  selectedFichesSolutionsIds,
  isValidated,
  updateStore,
}: FichesSolutionsProjetsSelectedProps) => {
  const pathname = usePathname();
  const { projetId } = useParams();
  const tableauDeBordUrl = pathname.replace("/fiches-solutions", "/tableau-de-bord");

  const validateFichesSolutionsToProjet = async () => {
    const updatedProjet = await updateFichesSolutionsValidatedAction(+projetId);
    if (updatedProjet.projet) {
      updateStore(updatedProjet.projet);
      notifications();
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
      {isValidated ? (
        <Link className="fr-btn rounded-3xl mb-10" href={tableauDeBordUrl}>
          Retour au tableau de bord
        </Link>
      ) : (
        <button onClick={validateFichesSolutionsToProjet}>Valider</button>
      )}
    </div>
  );
};
