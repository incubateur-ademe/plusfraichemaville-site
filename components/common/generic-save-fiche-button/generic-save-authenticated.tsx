import { GenericSaveBase } from "./base";

import { useUserStore } from "@/stores/user/provider";
import { FichesBookmarked } from "./fiche-in-storage-helper";
import { GenericSaveFicheButtonProps } from ".";

export const GenericSaveAuthenticated = ({ id, type, projectName }: GenericSaveFicheButtonProps) => {
  const isSolution = type === "solution";
  const fichesIds: FichesBookmarked[] = useUserStore((state) =>
    isSolution
      ? (state.userInfos?.selection_fiches_solutions as FichesBookmarked[]) ?? []
      : state.userInfos?.selection_fiches_diagnostic ?? [],
  );
  const setFichesIds = useUserStore((state) =>
    isSolution ? state.updateBookmarkedFichesSolutions : state.updateBookmarkedFichesDiagnostic,
  );

  return (
    <GenericSaveBase id={id} type={type} fichesIds={fichesIds} setFichesIds={setFichesIds} projectName={projectName} />
  );
};
