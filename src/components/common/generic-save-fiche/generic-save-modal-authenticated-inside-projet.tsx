import { useProjetsStore } from "@/src/stores/projets/provider";
import { GenericSaveModalCommonProps } from "./generic-save-modal";
import Link from "next/link";
import { PFMV_ROUTES } from "@/src/helpers/routes";
import { GenericFicheLink } from "@/src/components/common/generic-save-fiche/generic-fiche-link";

export const ModalSaveModalAuthenticatedInsideProjet = ({ modal, type }: GenericSaveModalCommonProps) => {
  const projet = useProjetsStore((state) => state.getCurrentProjet());
  return (
    <modal.Component
      title={`${type === "solution" ? "Solution" : "Méthode diagnostic"} ajoutée à mon projet`}
      size="medium"
      // @ts-ignore
      iconId="fr-icon-success-fill text-dsfr-background-action-high-success-hover mr-2"
    >
      <div className="mb-10 text-2xl font-bold">{projet?.nom}</div>
      <GenericFicheLink
        className="fr-btn fr-btn--secondary mb-4 mr-4 !min-h-fit rounded-3xl !text-sm"
        onClick={() => modal.close()}
        href={
          type === "diagnostic"
            ? PFMV_ROUTES.ESPACE_PROJET_FICHES_DIAGNOSTIC_LISTE_ALL
            : PFMV_ROUTES.ESPACE_PROJET_FICHES_SOLUTION_LISTE_ALL
        }
      >
        {type === "diagnostic" ? "Ajouter d'autres diagnostic" : "Ajouter d'autres solutions"}
      </GenericFicheLink>
      <Link href={PFMV_ROUTES.TABLEAU_DE_BORD(projet?.id!)} className="fr-btn mr-4 !min-h-fit rounded-3xl !text-sm">
        Aller au tableau de bord
      </Link>
    </modal.Component>
  );
};
