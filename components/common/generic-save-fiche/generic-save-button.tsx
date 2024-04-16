import { DSFRModal } from "@/types/global";
import { GenericSaveBaseProps } from ".";
import { GenericSaveAuthenticatedOutsideProjet } from "./generic-save-button-authenticated-outside-projet";

import { GenericSaveUnauthenticated } from "./generic-save-button-unauthenticated";
import { GenericSaveSpinner } from "./generic-spinner";
import { useProjetsStore } from "@/stores/projets/provider";
import { GenericSaveAuthenticatedInsideProjet } from "./generic-save-button-authenticated-inside-projet";
import { useSession } from "next-auth/react";

interface GenericSaveFicheButtonBaseProps extends GenericSaveBaseProps {
  modal?: DSFRModal;
}

export interface GenericSaveFicheButtonWithOpener extends GenericSaveBaseProps {
  opener?: () => void;
}

export const GenericSaveButton = ({ modal, ...props }: GenericSaveFicheButtonBaseProps) => {
  const currentProjetId = useProjetsStore((state) => state.currentProjetId);
  const status = useSession().status;

  const buttons = {
    authenticated: currentProjetId ? (
      <GenericSaveAuthenticatedInsideProjet {...props} opener={modal?.open} />
    ) : (
      <GenericSaveAuthenticatedOutsideProjet {...props} opener={modal?.open} />
    ),
    unauthenticated: <GenericSaveUnauthenticated {...props} opener={modal?.open} />,
    loading: <GenericSaveSpinner />,
  };

  return <div className={props.classNameButton}>{buttons[status]}</div>;
};
