import clsx from "clsx";

export const AnnuaireRexContactCardSkeleton = () => {
  return (
    <div
      className={clsx(
        "w-96 rounded-2xl border-[1px] border-dsfr-border-default-grey",
        "flex flex-col justify-between overflow-y-hidden",
      )}
    >
      <div className="p-6">
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
      <div className="mt-auto flex h-16 w-full items-center bg-dsfr-background-alt-blue-france">
        <div className="ml-4 h-3 w-2/5 rounded-xl bg-dsfr-background-contrast-grey-active opacity-30" />
      </div>
    </div>
  );
};
