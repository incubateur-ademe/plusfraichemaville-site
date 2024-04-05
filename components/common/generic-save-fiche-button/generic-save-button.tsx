import Button from "@codegouvfr/react-dsfr/Button";
import clsx from "clsx";
import { useSaveBookmarks } from "./use-save-bookmarks";
import { FichesBookmarked } from "./helpers";
import { GenericSaveFicheButtonProps } from ".";
import { selectSavedOrUnsavedAssets } from "./assets";

interface GenericSaveFicheButtonBaseProps extends GenericSaveFicheButtonProps {
  className?: string;
  fichesIds: FichesBookmarked[];
  setFichesIds: (_fichesIds: FichesBookmarked[]) => void;
}

export const GenericSaveButton = ({
  className,
  type,
  id,
  fichesIds,
  setFichesIds,
  projectName,
  opener,
}: GenericSaveFicheButtonBaseProps) => {
  const { isBookmarked, update } = useSaveBookmarks(type, id, fichesIds, setFichesIds, projectName ?? "", opener);
  const assets = selectSavedOrUnsavedAssets(isBookmarked, "common");
  return (
    <div className={clsx("absolute top-3 right-4", className)}>
      <Button
        onClick={update}
        className={clsx(
          "!text-sm !w-fit !min-h-[2rem] !pr-3 !pl-[0.65rem]  rounded-full !py-0",
          "flex justify-center items-center",
        )}
      >
        <i className={clsx("fr-icon--sm mr-2", assets.code)}></i>
        {assets.label}
      </Button>
    </div>
  );
};
