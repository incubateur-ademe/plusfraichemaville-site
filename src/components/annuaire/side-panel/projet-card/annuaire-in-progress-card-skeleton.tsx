import Badge from "@codegouvfr/react-dsfr/Badge";
import clsx from "clsx";

export const AnnuaireInProgressCardSkeleton = () => {
  return (
    <>
      <div className="h-46 flex w-full flex-col">
        <div className={clsx("h-[11.5rem] bg-dsfr-background-alt-blue-france px-5 pb-4 pt-6 rounded-2xl")}>
          <div className="flex items-center justify-between">
            <Badge small noIcon className="!mb-0 !bg-pfmv-navy !text-dsfr-background-alt-blue-france">
              Projet en cours
            </Badge>
            <div className={"h-3 w-1/4 animate-pulse rounded-xl bg-dsfr-background-contrast-grey-active opacity-30"} />
          </div>
          <div
            className={"mt-6 h-3 w-4/5 animate-pulse rounded-xl bg-dsfr-background-contrast-grey-active opacity-30"}
          />
          <div
            className={
              "mb-8 mt-4 h-3 w-3/5 animate-pulse rounded-xl bg-dsfr-background-contrast-grey-active opacity-30"
            }
          />
          <div className="mt-auto flex flex-row items-center justify-between">
            <div className={"h-3 w-1/4 animate-pulse rounded-xl bg-dsfr-background-contrast-grey-active opacity-30"} />
            <div className={"h-3 w-1/3 animate-pulse rounded-xl bg-dsfr-background-contrast-grey-active opacity-30"} />
          </div>
        </div>
      </div>
    </>
  );
};
