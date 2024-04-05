import { GenericSaveButton } from "./generic-save-button";

import { useUserStore } from "@/stores/user/provider";
import { FichesBookmarked } from "./helpers";
import { GenericSaveFicheButtonProps } from ".";

export const GenericSaveAuthenticated = ({ ...props }: GenericSaveFicheButtonProps) => {
  const isSolution = props.type === "solution";
  const fichesIds: FichesBookmarked[] = useUserStore((state) =>
    isSolution
      ? (state.userInfos?.selection_fiches_solutions as FichesBookmarked[]) ?? []
      : state.userInfos?.selection_fiches_diagnostic ?? [],
  );
  const setFichesIds = useUserStore((state) =>
    isSolution ? state.updateBookmarkedFichesSolutions : state.updateBookmarkedFichesDiagnostic,
  );

  return <GenericSaveButton fichesIds={fichesIds} setFichesIds={setFichesIds} {...props} />;
};
