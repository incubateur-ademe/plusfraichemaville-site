import Button from "@codegouvfr/react-dsfr/Button";
import clsx from "clsx";
import { selectSavedOrUnsavedAssets } from "./helpers";
import { useSaveBookmarks } from "./use-save-bookmarks";
import { FichesBookmarked } from "./fiche-in-storage-helper";
import { GenericSaveFicheButtonProps } from ".";

interface GenericSaveFicheButtonBaseProps extends GenericSaveFicheButtonProps {
  className?: string;
  fichesIds: FichesBookmarked[];
  setFichesIds: (_fichesIds: FichesBookmarked[]) => void;
}

export const GenericSaveBase = ({
  className,
  type,
  id,
  fichesIds,
  setFichesIds,
  projectName,
}: GenericSaveFicheButtonBaseProps) => {
  const { isBookmarked, update } = useSaveBookmarks(type, id, fichesIds, setFichesIds, projectName ?? "", opener);
  const assets = selectSavedOrUnsavedAssets(isBookmarked, "common");

  return (
    <div className={className}>
      <Button
        onClick={update}
        className={clsx("!text-sm !w-fit !min-h-[2rem] !p-2 rounded-full !py-0", "flex justify-center items-center")}
      >
        <i className={clsx(`fr-icon--sm`, assets.code)}></i>
        {assets.label}
      </Button>
    </div>
  );
};
