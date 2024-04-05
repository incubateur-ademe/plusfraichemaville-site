import { GenericSaveFicheButtonProps } from ".";
import { GenericSaveBase } from "./base";

import { useFicheLocalStorage } from "./use-fiche-local-storage";

export const GenericSaveUnauthenticated = ({ id, type, projectName }: GenericSaveFicheButtonProps) => {
  const [fichesIds, setFichesIds] = useFicheLocalStorage(type);

  return (
    <GenericSaveBase id={id} type={type} fichesIds={fichesIds} setFichesIds={setFichesIds} projectName={projectName} />
  );
};
