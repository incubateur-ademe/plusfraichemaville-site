import clsx from "clsx";

export const FicheCardSkeleton = ({ horizontal }: { horizontal?: boolean }) => {
  return (
    <div
      className={clsx("pfmv-card  bg-white", horizontal ? "h-52 lg:w-full lg:max-w-[53rem]" : "h-[40.3125rem] w-72")}
    >
      <div className={clsx("animate-pulse", horizontal && "flex")}>
        <div
          className={clsx(
            "bg-dsfr-contrast-grey h-52",
            horizontal ? "w-72 rounded-tl-xl rounded-bl-xl" : "w-full rounded-t-xl shrink-0",
          )}
        ></div>
        <div className={clsx(horizontal && "w-full")}>
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
    </div>
  );
};
