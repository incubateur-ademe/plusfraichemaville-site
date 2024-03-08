"use client";

import { updateFichesSolutionsProjetAction } from "@/actions/projets/update-fiches-solutions-projet-action";
import Button from "@codegouvfr/react-dsfr/Button";
import clsx from "clsx";
import { FicheSolutionResponse } from "./type";
import { useParams } from "next/navigation";
import { useProjetsStore } from "@/stores/projets/provider";
import { useSession } from "next-auth/react";
import { createModal } from "@codegouvfr/react-dsfr/Modal";
import Link from "next/link";
import { PFMV_ROUTES } from "@/helpers/routes";

const modal = createModal({
  id: "bookmark-modal",
  isOpenedByDefault: false,
});

type ButtonSaveFicheSolutionInProjetProps = {
  ficheSolutionId: FicheSolutionResponse["id"];
  className?: string;
};

export const ButtonSaveFicheSolutionInProjet = ({
  ficheSolutionId,
  className = "right-2",
}: ButtonSaveFicheSolutionInProjetProps) => {
  const { projetId } = useParams();
  const userId = useSession().data?.user.id;
  const projet = useProjetsStore((state) => state.getProjetById(+projetId));
  const updateStore = useProjetsStore((state) => state.addOrUpdateProjet);

  const fichesSolutionsIdSaved = projet?.fiches_solutions_id || [];
  const isAlreadySaved = fichesSolutionsIdSaved.includes(+ficheSolutionId);
  const fichesSolutionsUpdated = isAlreadySaved
    ? fichesSolutionsIdSaved.filter((ficheId) => ficheId !== +ficheSolutionId)
    : Array.from(new Set([...fichesSolutionsIdSaved, +ficheSolutionId]));

  if (!projet?.id || !userId) {
    return null;
  }

  return (
    <>
      <modal.Component title="" size="large">
        <div className="flex items-center mb-10">
          <i className={"fr-icon--lg fr-icon-arrow-right-line mr-4"} />
          <span className="text-2xl font-bold">
            Solution ajoutée dans mon projet <br />
            <span className="text-dsfr-text-label-blue-france">{projet.nom}</span>
          </span>
        </div>
        <Button priority="primary" className="rounded-3xl !min-h-fit !text-sm ml-20 mr-4" onClick={() => modal.close()}>
          Continuer ma lecture
        </Button>
        <Link
          href={PFMV_ROUTES.ESPACE_PROJET_FICHES_SOLUTIONS(+projetId)}
          className="fr-btn fr-btn--secondary rounded-3xl !min-h-fit !text-sm mr-4"
        >
          Voir mes fiches solutions
        </Link>
      </modal.Component>
      <Button
        onClick={async () => {
          const updatedProjet = await updateFichesSolutionsProjetAction(projet.id, fichesSolutionsUpdated);
          if (updatedProjet.projet) {
            updateStore(updatedProjet.projet);

            !isAlreadySaved && modal.open();
          }
        }}
        className={clsx(
          "!text-sm !w-fit !min-h-[2rem] !p-2 rounded-full !py-0",
          "flex justify-center items-center absolute top-2 right-2",
          className,
        )}
      >
        <i className={clsx(`fr-icon--sm`, isAlreadySaved ? "ri-add-circle-fill mr-1" : "ri-add-circle-line")}></i>
        {isAlreadySaved && "Ajoutée au projet"}
      </Button>
    </>
  );
};
