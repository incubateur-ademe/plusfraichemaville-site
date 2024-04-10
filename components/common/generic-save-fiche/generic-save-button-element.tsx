import Button from "@codegouvfr/react-dsfr/Button";
import clsx from "clsx";
import { GenericSaveBaseProps } from ".";

interface GenericSaveFicheButtonBaseProps extends GenericSaveBaseProps {
  className?: string;
  update: () => void;
  assets: {
    className: string;
    code: string;
    label: string;
  };
}

export const GenericSaveButtonElement = ({ className, assets, update }: GenericSaveFicheButtonBaseProps) => {
  return (
    <div className={clsx(className)}>
      <Button onClick={update} className={clsx(assets.className)}>
        {assets.code && <i className={clsx("fr-icon--sm", assets.code)}></i>}
        {/* {assets.code && <i className={clsx("", assets.code)}></i>} */}
        {assets.label}
      </Button>
    </div>
  );
};
