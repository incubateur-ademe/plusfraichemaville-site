import { GenericSaveFicheButtonProps } from ".";
import { GenericSaveButton } from "./generic-save-button";

import { useFicheLocalStorage } from "./use-fiche-local-storage";

export const GenericSaveUnauthenticated = ({ ...props }: GenericSaveFicheButtonProps) => {
  const [fichesIds, setFichesIds] = useFicheLocalStorage(props.type);

  return <GenericSaveButton fichesIds={fichesIds} setFichesIds={setFichesIds} {...props} />;
};
