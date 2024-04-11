import { DSFRModal } from "@/types/global";
import { GenericSaveModalUnauthenticated } from "./generic-save-modal-unauthenticated";
import { useProjetsStore } from "@/stores/projets/provider";
import { ModalSaveModalAuthenticatedOutsideProjet } from "./generic-save-modal-authenticated-outside-projet";
import { ModalSaveModalAuthenticatedInsideProjet } from "./generic-save-modal-authenticated-inside-projet";

export type GenericSaveModalCommonProps = {
  modal: DSFRModal;
  type: "solution" | "diagnostic";
  id: number;
};

interface GenericSaveModalInitialProps extends GenericSaveModalCommonProps {
  status: "authenticated" | "unauthenticated" | "loading";
}

export const GenericSaveModal = ({ status, ...props }: GenericSaveModalInitialProps) => {
  const currentProjetId = useProjetsStore((state) => state.currentProjetId);

  const modals = {
    unauthenticated: <GenericSaveModalUnauthenticated {...props} />,
    authenticated: currentProjetId ? (
      <ModalSaveModalAuthenticatedInsideProjet {...props} />
    ) : (
      <ModalSaveModalAuthenticatedOutsideProjet {...props} />
    ),
    loading: <></>,
  };

  return modals[status];
};
