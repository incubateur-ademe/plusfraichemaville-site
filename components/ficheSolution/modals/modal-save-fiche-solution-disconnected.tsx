import Button from "@codegouvfr/react-dsfr/Button";
import { ModalSaveFicheSolutionProps } from "../ButtonSaveFicheSolution";
import { PFMV_ROUTES } from "@/helpers/routes";
import CustomDSFRModal from "@/components/common/CustomDSFRModal";

export const ModalSaveFicheSolutionDisconnected = ({ modal, ficheSolutionId }: ModalSaveFicheSolutionProps) => {
  return (
    <CustomDSFRModal
      modalId={ficheSolutionId?.toString()!}
      close={modal.close}
      isModalOpen={modal.isModalOpen}
      size="small"
    >
      <h1 id="fr-modal-title-bookmark-modal" className="fr-modal__title">
        <span className="fr-icon-arrow-right-line fr-fi--lg"></span>Solution sauvegardée dans mon espace Projet
      </h1>
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
    </CustomDSFRModal>
  );
};
