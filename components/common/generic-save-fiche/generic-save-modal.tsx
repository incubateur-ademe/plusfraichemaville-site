import { DSFRModal } from "@/types/global";
import { GenericSaveModalUnauthenticated } from "./generic-save-modal-unauthenticated";
import { useProjetsStore } from "@/stores/projets/provider";
import { ModalSaveModalAuthenticatedOutsideProjet } from "./generic-save-modal-authenticated-outside-projet";
import { ModalSaveModalAuthenticatedInsideProjet } from "./generic-save-modal-authenticated-inside-projet";
import { useSession } from "next-auth/react";

export type GenericSaveModalCommonProps = {
  modal: DSFRModal;
  type: "solution" | "diagnostic";
  id: number;
};

export const GenericSaveModal = ({ ...props }: GenericSaveModalCommonProps) => {
  const currentProjetId = useProjetsStore((state) => state.currentProjetId);
  const status = useSession().status;
  console.log("status", status);

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
