import clsx from "clsx";
import Button from "@codegouvfr/react-dsfr/Button";

export const AnnuaireSidePanelCloseSelectedProjet = ({ closePanel }: { closePanel: () => void }) => {
  return (
    <div className={clsx("w-full bg-dsfr-background-alt-blue-france pl-4")}>
      <Button
        priority="tertiary no outline"
        className="right ml-auto mr-0 !bg-dsfr-background-alt-blue-france !px-0 text-pfmv-navy hover:underline"
        onClick={() => {
          closePanel();
        }}
        iconId="fr-icon-arrow-left-line"
        iconPosition="left"
      >
        Revenir à la liste
      </Button>
    </div>
  );
};
