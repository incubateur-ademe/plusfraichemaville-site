import { useProjetsStore } from "@/src/stores/projets/provider";
import { GenericSaveModalCommonProps } from "./generic-save-modal";
import Link from "next/link";
import { PFMV_ROUTES } from "@/src/helpers/routes";
import { TypeFiche } from "@/src/helpers/common";
import { usePathname, useRouter } from "next/navigation";
import Button from "@codegouvfr/react-dsfr/Button";

export const ModalSaveModalAuthenticatedInsideProjet = ({ modal, type }: GenericSaveModalCommonProps) => {
  const projet = useProjetsStore((state) => state.getCurrentProjet());

  const pathName = usePathname();
  const router = useRouter();
  const clickAddMoreCard = () => {
    if (
      type === TypeFiche.solution &&
      !pathName.startsWith(PFMV_ROUTES.ESPACE_PROJET_FICHES_SOLUTIONS_LISTE(projet?.id!))
    ) {
      router.push(PFMV_ROUTES.ESPACE_PROJET_FICHES_SOLUTIONS_LISTE(projet?.id!));
    } else if (
      type === TypeFiche.diagnostic &&
      !pathName.startsWith(PFMV_ROUTES.ESPACE_PROJET_DIAGNOSTIC_PRESTATION_LISTE(projet?.id!))
    ) {
      router.push(PFMV_ROUTES.ESPACE_PROJET_DIAGNOSTIC_PRESTATION_LISTE(projet?.id!));
    }
    modal.close();
  };

  return (
    <modal.Component
      title={`${type === TypeFiche.solution ? "Solution" : "Méthode diagnostic"} ajoutée à mon projet`}
      size="medium"
      // @ts-ignore
      iconId="fr-icon-success-fill text-dsfr-background-action-high-success-hover mr-2"
    >
      <div className="mb-10 text-2xl font-bold">{projet?.nom}</div>
      <Button className="fr-btn fr-btn--secondary mb-4 mr-4 !min-h-fit rounded-3xl !text-sm" onClick={clickAddMoreCard}>
        {type === TypeFiche.diagnostic ? "Ajouter d'autres méthodes" : "Ajouter d'autres solutions"}
      </Button>
      <Link
        href={
          type === TypeFiche.diagnostic
            ? PFMV_ROUTES.ESPACE_PROJET_DIAGNOSTIC_MES_PRESTATIONS(projet?.id!)
            : PFMV_ROUTES.TABLEAU_DE_BORD(projet?.id!)
        }
        className="fr-btn mr-4 !min-h-fit rounded-3xl !text-sm"
      >
        {type === TypeFiche.diagnostic ? "Valider mes méthodes" : "Aller au tableau de bord"}
      </Link>
    </modal.Component>
  );
};
