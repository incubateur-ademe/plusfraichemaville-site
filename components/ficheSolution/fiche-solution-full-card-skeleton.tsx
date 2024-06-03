import clsx from "clsx";

export const FicheSolutionFullCardSkeleton = () => {
  return (
    <div className="pfmv-card h-[40.3125rem] w-72 bg-white">
      <div className="animate-pulse">
        <div className="h-52 w-full rounded-t-xl bg-dsfr-contrast-grey"></div>

        <div
          className={clsx(
            "bg-dsfr-background-contrast-green-menthe-active opacity-30",
            "mx-auto mt-8 h-3 w-4/5 rounded-xl",
          )}
        ></div>
        <div
          className={clsx(
            "bg-dsfr-background-contrast-green-menthe-active opacity-30",
            "mx-auto mt-4 h-3 w-4/5 rounded-xl",
          )}
        ></div>
        <div
          className={clsx(
            "bg-dsfr-background-contrast-green-menthe-active opacity-30",
            "mx-auto mt-4 h-3 w-4/5 rounded-xl",
          )}
        ></div>
        <div
          className={clsx(
            "bg-dsfr-background-contrast-green-menthe-active opacity-30",
            "mx-auto mt-4 h-3 w-4/5 rounded-xl",
          )}
        ></div>
        <div
          className={clsx(
            "bg-dsfr-background-contrast-green-menthe-active opacity-30",
            "mx-auto mt-4 h-3 w-4/5 rounded-xl",
          )}
        ></div>
      </div>
    </div>
  );
};
