import clsx from "clsx";

export const SourcingRexContactCardSkeleton = () => {
  return (
    <div
      className={clsx(
        "w-[22rem] rounded-2xl border-[1px] border-dsfr-border-default-grey",
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
      <div className="mt-auto h-16 w-full bg-dsfr-background-alt-blue-france flex items-center">
        <div className="h-3 w-2/5 ml-4 rounded-xl bg-dsfr-background-contrast-grey-active opacity-30" />
      </div>
    </div>
  );
};
