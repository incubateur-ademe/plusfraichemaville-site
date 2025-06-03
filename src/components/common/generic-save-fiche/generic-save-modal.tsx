import { DSFRModal } from "@/src/types/global";
import { GenericSaveModalUnauthenticated } from "./generic-save-modal-unauthenticated";
import { useProjetsStore } from "@/src/stores/projets/provider";
import { ModalSaveModalAuthenticatedOutsideProjet } from "./generic-save-modal-authenticated-outside-projet";
import { ModalSaveModalAuthenticatedInsideProjet } from "./generic-save-modal-authenticated-inside-projet";
import { useSession } from "next-auth/react";
import { TypeFiche } from "@/src/helpers/common";

export type GenericSaveModalCommonProps = {
  modal: DSFRModal;
  type: TypeFiche;
  id: number;
};

export const GenericSaveModal = ({ ...props }: GenericSaveModalCommonProps) => {
  const currentProjetId = useProjetsStore((state) => state.currentProjetId);
  const status = useSession().status;

  const modals = {
    unauthenticated: <GenericSaveModalUnauthenticated />,
    authenticated: currentProjetId ? (
      <ModalSaveModalAuthenticatedInsideProjet {...props} />
    ) : (
      <ModalSaveModalAuthenticatedOutsideProjet {...props} />
    ),
    loading: <></>,
  };

  return modals[status];
};
