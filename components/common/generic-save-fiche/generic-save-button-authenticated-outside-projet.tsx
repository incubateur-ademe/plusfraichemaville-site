import { GenericSaveButtonElement } from "./generic-save-button-element";
import { useUserStore } from "@/stores/user/provider";
import { selectSavedOrUnsavedAssets } from "./assets";
import { GenericSaveFicheButtonWithOpener } from "./generic-save-button";

export const GenericSaveAuthenticatedOutsideProjet = ({ opener, ...props }: GenericSaveFicheButtonWithOpener) => {
  const isSolution = props.type === "solution";
  const userFichesSolutions = useUserStore((state) => state.userInfos?.selection_fiches_solutions) as number[];
  const userFichesDiagnostic = useUserStore((state) => state.userInfos?.selection_fiches_diagnostic) as number[];
  const isSaved = isSolution ? userFichesSolutions.includes(props.id) : userFichesDiagnostic.includes(props.id);

  const updater = useUserStore((state) => state.updateFichesUser);
  const update = () => {
    updater(props.type, props.id);
    !isSaved && opener && opener();
  };

  const assets = selectSavedOrUnsavedAssets(isSaved, "projet");

  return <GenericSaveButtonElement update={update} assets={assets} {...props} />;
};
