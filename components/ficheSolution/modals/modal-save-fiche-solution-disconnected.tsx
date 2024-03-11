import Button from "@codegouvfr/react-dsfr/Button";
import { ModalSaveFicheSolutionProps } from "../ButtonSaveFicheSolution";
import { PFMV_ROUTES } from "@/helpers/routes";

export const ModalSaveFicheSolutionDisconnected = ({ modal }: ModalSaveFicheSolutionProps) => {
  return (
    <modal.Component title="Solution sauvegardée dans mon espace Projet" iconId="fr-icon-arrow-right-line" size="large">
      <div>Retrouvez toutes vos solutions mises en favoris dans votre espace Projet.</div>
      <div className="mt-6">
        <Button className={"rounded-3xl text-sm mr-6 mb-2"} onClick={() => modal.close()} size="small">
          Continuer ma lecture
        </Button>
        <Button
          priority="secondary"
          className={"rounded-3xl text-sm"}
          linkProps={{ href: PFMV_ROUTES.MES_FICHES_SOLUTIONS, target: "_self" }}
          size="small"
        >
          Ma sélection
        </Button>
      </div>
    </modal.Component>
  );
};
