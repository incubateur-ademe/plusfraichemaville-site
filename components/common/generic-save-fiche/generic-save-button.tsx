import { DSFRModal } from "@/types/global";
import { GenericSaveBaseProps } from ".";
import { GenericSaveAuthenticatedOutsideProjet } from "./generic-save-button-authenticated-outside-projet";

import { GenericSaveUnauthenticated } from "./generic-save-button-unauthenticated";
import { GenericSaveSpinner } from "./generic-spinner";
import { useProjetsStore } from "@/stores/projets/provider";
import { GenericSaveAuthenticatedInsideProjet } from "./generic-save-button-authenticated-inside-projet";

interface GenericSaveFicheButtonBaseProps extends GenericSaveBaseProps {
  status: "authenticated" | "unauthenticated" | "loading";
  modal?: DSFRModal;
}

export interface GenericSaveFicheButtonWithOpener extends GenericSaveBaseProps {
  opener?: () => void;
}

export const GenericSaveButton = ({ status, modal, ...props }: GenericSaveFicheButtonBaseProps) => {
  const currentProjetId = useProjetsStore((state) => state.currentProjetId);

  const buttons = {
    authenticated: currentProjetId ? (
      <GenericSaveAuthenticatedInsideProjet {...props} opener={modal?.open} />
    ) : (
      <GenericSaveAuthenticatedOutsideProjet {...props} opener={modal?.open} />
    ),
    unauthenticated: <GenericSaveUnauthenticated {...props} opener={modal?.open} />,
    loading: <GenericSaveSpinner />,
  };

  return buttons[status];
};
