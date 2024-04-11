import clsx from "clsx";
import { GenericSaveBaseProps } from ".";
import { GenericSaveLabel } from "./generic-save-label";
import { GenericSavePicto } from "./generic-save-picto";

interface GenericSaveFicheButtonBaseProps extends GenericSaveBaseProps {
  className?: string;
  update: () => void;
  assets: {
    className: string;
    code: boolean;
    label?: string;
  };
  isSaved?: boolean;
}

export const GenericSaveButtonElement = ({ className, assets, update, isSaved }: GenericSaveFicheButtonBaseProps) => {
  return (
    <div className={clsx(className, "z-[1] relative")}>
      <button onClick={update} className={clsx(assets.className)}>
        {assets.code && <GenericSavePicto />}
        {assets.label && (
          <>
            {assets.label}
            <i className="fr-icon--sm ri-close-fill ml-px pt-[2px]"></i>
          </>
        )}
      </button>
      <GenericSaveLabel isSaved={isSaved!} />
    </div>
  );
};
