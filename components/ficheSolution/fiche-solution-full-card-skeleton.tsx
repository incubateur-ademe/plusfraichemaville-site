import clsx from "clsx";

export const FicheSolutionFullCardSkeleton = () => {
  return (
    <div className="w-72 pfmv-card h-[40.3125rem] bg-white">
      <div className="animate-pulse">
        <div className="bg-dsfr-contrast-grey rounded-t-xl h-52 w-full"></div>

        <div
          className={clsx(
            "bg-dsfr-background-contrast-green-menthe-active opacity-30",
            "w-4/5 mx-auto h-3 rounded-xl mt-8",
          )}
        ></div>
        <div
          className={clsx(
            "bg-dsfr-background-contrast-green-menthe-active opacity-30",
            "w-4/5 mx-auto h-3 rounded-xl mt-4",
          )}
        ></div>
        <div
          className={clsx(
            "bg-dsfr-background-contrast-green-menthe-active opacity-30",
            "w-4/5 mx-auto h-3 rounded-xl mt-4",
          )}
        ></div>
        <div
          className={clsx(
            "bg-dsfr-background-contrast-green-menthe-active opacity-30",
            "w-4/5 mx-auto h-3 rounded-xl mt-4",
          )}
        ></div>
        <div
          className={clsx(
            "bg-dsfr-background-contrast-green-menthe-active opacity-30",
            "w-4/5 mx-auto h-3 rounded-xl mt-4",
          )}
        ></div>
      </div>
    </div>
  );
};
