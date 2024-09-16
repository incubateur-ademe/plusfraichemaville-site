import clsx from "clsx";
import { GenericSaveBaseProps } from ".";
import { GenericSaveLabel } from "./generic-save-label";
import { GenericSavePicto } from "./generic-save-picto";

interface GenericSaveFicheButtonBaseProps extends Omit<GenericSaveBaseProps, "type"> {
  className?: string;
  update: () => void;
  assets: {
    className: string;
    code: boolean;
    label?: string;
  };
  isSaved?: boolean;
}

export const GenericSaveButtonElement = ({
  className,
  assets,
  update,
  isSaved,
  withLabel,
}: GenericSaveFicheButtonBaseProps) => {
  return (
    <div className={clsx(className, "relative z-[1]")}>
      <button onClick={update} className={clsx(assets.className)}>
        {assets.code && (
          <div className={clsx("savePicto flex h-8 w-8 items-center justify-center rounded-full")}>
            <GenericSavePicto />
          </div>
        )}
        {assets.label && (
          <>
            {assets.label}
            <i className="fr-icon--sm ri-close-fill ml-px pt-[2px]"></i>
          </>
        )}
      </button>
      <GenericSaveLabel isSaved={isSaved!} withLabel={withLabel} />
    </div>
  );
};
