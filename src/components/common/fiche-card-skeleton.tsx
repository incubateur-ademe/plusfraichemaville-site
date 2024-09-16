import clsx from "clsx";

export const FicheCardSkeleton = ({ horizontal }: { horizontal?: boolean }) => {
  return (
    <div
      className={clsx("pfmv-card  bg-white", horizontal ? "h-52 lg:w-full lg:max-w-[53rem]" : "h-[40.3125rem] w-72")}
    >
      <div className={clsx("animate-pulse", horizontal && "flex")}>
        <div
          className={clsx(
            "h-52 bg-dsfr-contrast-grey",
            horizontal ? "w-72 rounded-bl-xl rounded-tl-xl" : "w-full shrink-0 rounded-t-xl",
          )}
        ></div>
        <div className={clsx(horizontal && "w-full")}>
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
    </div>
  );
};
