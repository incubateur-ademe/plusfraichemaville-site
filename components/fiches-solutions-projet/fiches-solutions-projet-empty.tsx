import Button from "@codegouvfr/react-dsfr/Button";
import clsx from "clsx";

export const FichesSolutionsProjetEmpty = () => {
  return (
    <div className="flex items-center gap-8">
      <div className="w-72 h-[30rem] bg-dsfr-background-default-grey-hover dashed rounded-3xl"></div>
      <Button
        className={clsx(
          "!w-32 !h-32 rounded-3xl bg-dsfr-text-label-blue-france",
          "flex !flex-col items-center justify-center",
        )}
      >
        <i className="ri-add-circle-fill text-white text-sm mb-2"></i>
        <span className="text-white text-center">Ajouter des solutions</span>
      </Button>
    </div>
  );
};
