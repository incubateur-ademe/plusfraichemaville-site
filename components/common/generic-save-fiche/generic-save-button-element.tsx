import Button from "@codegouvfr/react-dsfr/Button";
import clsx from "clsx";
import { GenericSaveBaseProps } from ".";

interface GenericSaveFicheButtonBaseProps extends GenericSaveBaseProps {
  className?: string;
  update: () => void;
  assets: {
    code: string;
    label: string;
  };
}

export const GenericSaveButtonElement = ({ className, assets, update }: GenericSaveFicheButtonBaseProps) => {
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
