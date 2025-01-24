import Badge from "@codegouvfr/react-dsfr/Badge";
import clsx from "clsx";

export const AnnuaireRexSkeleton = () => {
  return (
    <div>
      <div
        className={clsx(
          "flex w-full flex-col bg-dsfr-background-alt-blue-france text-dsfr-text-title-grey",
          "min-h-52 px-5 pb-4 pt-6",
        )}
      >
        <div className="flex items-center justify-between">
          <Badge small noIcon className="!mb-0 !bg-dsfr-text-default-success !text-dsfr-text-inverted-success">
            Projet réalisé
          </Badge>
          <div className="flex flex-row items-center gap-1">
            <div className="text-sm">Budget</div>
            <div className={"h-3 w-16 animate-pulse rounded-xl bg-dsfr-background-contrast-grey-active opacity-30"} />
          </div>
        </div>
        <div className="animate-pulse opacity-30">
          <div className={"mt-6 h-3 w-4/5 rounded-xl bg-dsfr-background-contrast-grey-active"} />
          <div className={"mt-4 h-3 w-3/5 rounded-xl bg-dsfr-background-contrast-grey-active"} />
          <div className={"mb-8 mt-4 h-3 w-2/5 rounded-xl bg-dsfr-background-contrast-grey-active"} />
        </div>
        <div className={"h-3 w-1/4 animate-pulse rounded-xl bg-dsfr-background-contrast-grey-active opacity-30"} />
      </div>

      <div className="p-5">
        <h2 className="text-xl font-bold text-pfmv-navy">Contacts</h2>
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
    </div>
  );
};
