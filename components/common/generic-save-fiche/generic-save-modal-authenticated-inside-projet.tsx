import { useProjetsStore } from "@/stores/projets/provider";
import { GenericSaveModalCommonProps } from "./generic-save-modal";
import Button from "@codegouvfr/react-dsfr/Button";
import Link from "next/link";
import { PFMV_ROUTES } from "@/helpers/routes";

export const ModalSaveModalAuthenticatedInsideProjet = ({ modal, type }: GenericSaveModalCommonProps) => {
  const projet = useProjetsStore((state) => state.getCurrentProjet());
  return (
    <modal.Component title="" size="large">
      <div className="flex items-center mb-10">
        <i className={"fr-icon--lg fr-icon-arrow-right-line mr-4"} />
        <span className="text-2xl font-bold">
          {type === "solution" ? "Solution" : "Méthode diagnostic"} ajoutée dans mon projet <br />
          <span className="text-dsfr-text-label-blue-france">{projet?.nom}</span>
        </span>
      </div>
      <Button
        priority="primary"
        className="rounded-3xl !min-h-fit !text-sm md:ml-20 mr-4"
        onClick={() => modal.close()}
      >
        Continuer ma lecture
      </Button>
      <Link
        href={
          type === "solution"
            ? PFMV_ROUTES.ESPACE_PROJET_FICHES_SOLUTIONS(projet?.id!)
            : PFMV_ROUTES.ESPACE_PROJET_FICHES_DIAGNOSTIC(projet?.id!)
        }
        className="fr-btn fr-btn--secondary rounded-3xl !min-h-fit !text-sm mr-4"
      >
        Voir mes fiches {type === "solution" ? "solutions" : "diagnostic"}
      </Link>
    </modal.Component>
  );
};
