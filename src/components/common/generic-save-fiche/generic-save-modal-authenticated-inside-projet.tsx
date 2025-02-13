import { useProjetsStore } from "@/src/stores/projets/provider";
import { GenericSaveModalCommonProps } from "./generic-save-modal";
import Link from "next/link";
import { PFMV_ROUTES } from "@/src/helpers/routes";
import { TypeFiche } from "@/src/helpers/common";

export const ModalSaveModalAuthenticatedInsideProjet = ({ modal, type }: GenericSaveModalCommonProps) => {
  const projet = useProjetsStore((state) => state.getCurrentProjet());
  return (
    <modal.Component
      title={`${type === TypeFiche.solution ? "Solution" : "Méthode diagnostic"} ajoutée à mon projet`}
      size="medium"
      // @ts-ignore
      iconId="fr-icon-success-fill text-dsfr-background-action-high-success-hover mr-2"
    >
      <div className="mb-10 text-2xl font-bold">{projet?.nom}</div>
      <Link
        href={
          type === TypeFiche.diagnostic
            ? PFMV_ROUTES.ESPACE_PROJET_FICHES_DIAGNOSTIC_PRESTATION_LISTE(projet?.id!)
            : PFMV_ROUTES.ESPACE_PROJET_FICHES_SOLUTIONS_LISTE(projet?.id!)
        }
        className="fr-btn fr-btn--secondary mb-4 mr-4 !min-h-fit rounded-3xl !text-sm"
        onClick={() => modal.close()}
      >
        {type === TypeFiche.diagnostic ? "Ajouter d'autres diagnostic" : "Ajouter d'autres méthodes"}
      </Link>
      <Link
        href={
          type === TypeFiche.diagnostic
            ? PFMV_ROUTES.ESPACE_PROJET_FICHES_DIAGNOSTIC_PRESTATION_SELECTION(projet?.id!)
            : PFMV_ROUTES.TABLEAU_DE_BORD(projet?.id!)
        }

        className="fr-btn mr-4 !min-h-fit rounded-3xl !text-sm">
        {type === TypeFiche.diagnostic ? "Valider mes méthodes" : "Aller au tableau de bord"}
      </Link>
    </modal.Component>
  );
};
