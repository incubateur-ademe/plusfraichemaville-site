import { DSFRModal } from "@/types/global";
import { GenericSaveModalUnauthenticated } from "./generic-save-modal-unauthenticated";

export type GenericSaveModalCommonProps = {
  modal: DSFRModal;
  type: "solution" | "diagnostic";
};

interface GenericSaveModalInitialProps extends GenericSaveModalCommonProps {
  status: "authenticated" | "unauthenticated" | "loading";
}

export const GenericSaveModal = ({ status, ...props }: GenericSaveModalInitialProps) => {
  const modals = {
    unauthenticated: <GenericSaveModalUnauthenticated {...props} />,
    authenticated: <></>,
    loading: <></>,
  };

  return modals[status];
};
