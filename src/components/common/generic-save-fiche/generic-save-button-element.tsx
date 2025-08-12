import clsx from "clsx";
import { GenericSaveBaseProps } from ".";
import Button from "@codegouvfr/react-dsfr/Button";

interface GenericSaveFicheButtonBaseProps extends Omit<GenericSaveBaseProps, "type"> {
  className?: string;
  update: () => void;
  isSaved?: boolean;
  labels?: { saved: string; notSaved: string };
}

export const GenericSaveButtonElement = ({ className, update, isSaved, labels }: GenericSaveFicheButtonBaseProps) => {
  return (
    <div className={clsx(className, "relative z-[1]")}>
      {isSaved ? (
        <Button
          onClick={update}
          className={clsx("rounded-3xl")}
          iconId="fr-icon-check-line"
          iconPosition="right"
          priority="primary"
        >
          {labels?.saved || "Ajoutée au projet"}
        </Button>
      ) : (
        <Button
          onClick={update}
          className={clsx("rounded-3xl")}
          iconId="fr-icon-add-line"
          iconPosition="right"
          priority="secondary"
        >
          {labels?.notSaved || "Ajouter au projet"}
        </Button>
      )}
    </div>
  );
};
