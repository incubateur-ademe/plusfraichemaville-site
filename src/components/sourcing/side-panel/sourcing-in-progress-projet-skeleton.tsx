import clsx from "clsx";
import { Badge } from "@codegouvfr/react-dsfr/Badge";

export const SourcingInProgressProjetSkeleton = () => {
  return (
    <>
      <div className="h-46 flex w-full flex-col">
        <div className={clsx("h-[11.5rem] bg-dsfr-background-alt-blue-france px-5 pb-4 pt-6")}>
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
            <div className="flex flex-row items-center gap-1">
              <div className="text-sm text-dsfr-text-mention-grey">Maturité du projet</div>
              <div className={"size-8 animate-pulse rounded-full bg-dsfr-background-contrast-grey-active opacity-30"} />
            </div>
          </div>
        </div>
      </div>
      <div className="p-5">
        <h2 className="text-xl font-bold text-pfmv-navy">Contact</h2>
        <div className="rounded-2xl border-[1px] border-dsfr-border-default-grey p-6">
          <div className="mb-4 animate-pulse">
            <div className="mb-8 h-3 w-36 rounded-xl bg-dsfr-background-contrast-grey-active opacity-30" />
            <div className="mb-2 h-3 w-48 rounded-xl bg-dsfr-background-contrast-grey-active opacity-30" />
            <div className="mb-2 h-3 w-48 rounded-xl bg-dsfr-background-contrast-grey-active opacity-30" />
          </div>
          <div className="animate-pulse">
            <div className="mb-2 h-3 w-36 rounded-xl bg-dsfr-background-contrast-grey-active opacity-30" />
            <div className="h-3 w-36 rounded-xl bg-dsfr-background-contrast-grey-active opacity-30" />
          </div>
        </div>
      </div>
    </>
  );
};
