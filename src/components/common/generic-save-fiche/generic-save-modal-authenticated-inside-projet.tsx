import { useProjetsStore } from "@/src/stores/projets/provider";
import { GenericSaveModalCommonProps } from "./generic-save-modal";
import { PFMV_ROUTES } from "@/src/helpers/routes";
import { TypeFiche } from "@/src/helpers/common";
import { usePathname, useRouter } from "next/navigation";
import Button from "@codegouvfr/react-dsfr/Button";

export const ModalSaveModalAuthenticatedInsideProjet = ({ modal, type }: GenericSaveModalCommonProps) => {
  const projet = useProjetsStore((state) => state.getCurrentProjet());

  const pathName = usePathname();
  const router = useRouter();
  const clickAddMoreCard = () => {
    if (projet?.id != null) {
      if (
        type === TypeFiche.solution &&
        !pathName.startsWith(PFMV_ROUTES.ESPACE_PROJET_FICHES_SOLUTIONS_LISTE(projet.id))
      ) {
        router.push(PFMV_ROUTES.ESPACE_PROJET_FICHES_SOLUTIONS_LISTE(projet.id));
      } else if (
        type === TypeFiche.diagnostic &&
        !pathName.startsWith(PFMV_ROUTES.ESPACE_PROJET_DIAGNOSTIC_PRESTATION_LISTE(projet.id))
      ) {
        router.push(PFMV_ROUTES.ESPACE_PROJET_DIAGNOSTIC_PRESTATION_LISTE(projet.id));
      }
    }
    modal.close();
  };

  return (
    <modal.Component
      title={`${type === TypeFiche.solution ? "Solution" : "Méthode diagnostic"} ajoutée à mon projet`}
      size="medium"
      // @ts-expect-error ignore
      iconId="fr-icon-success-fill text-dsfr-background-action-high-success-hover mr-2"
    >
      <div className="mb-10 text-2xl font-bold">{projet?.nom}</div>
      <Button
        className="mb-4 mr-4 !min-h-fit rounded-3xl !text-sm before:!content-none"
        onClick={clickAddMoreCard}
        priority="secondary"
      >
        {type === TypeFiche.diagnostic ? "Ajouter d'autres méthodes" : "Ajouter d'autres solutions"}
      </Button>

      <Button
        onClick={() => {
          modal.close();
          if (projet?.id) {
            router.push(
              type === TypeFiche.diagnostic
                ? PFMV_ROUTES.ESPACE_PROJET_DIAGNOSTIC_MES_PRESTATIONS(projet?.id)
                : PFMV_ROUTES.TABLEAU_DE_BORD(projet?.id),
            );
          }
        }}
        className="rounded-3xl !text-sm before:!content-none"
      >
        {type === TypeFiche.diagnostic ? "Valider mes méthodes" : "Aller au tableau de bord"}
      </Button>
    </modal.Component>
  );
};
