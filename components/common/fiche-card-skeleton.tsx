import clsx from "clsx";

export const FicheCardSkeleton = ({ vertical }: { vertical?: boolean }) => {
  return (
    <div
      className={clsx(
        "pfmv-card  bg-white",
        vertical ? "h-52 lg:w-full lg:max-w-[53rem]" : "h-[40.3125rem] w-72",
        // small ? "h-[26rem]" : "h-[40.3125rem]",
      )}
    >
      <div className={clsx("animate-pulse", vertical && "flex")}>
        <div
          className={clsx(
            "bg-dsfr-contrast-grey h-52",
            vertical ? "w-72 rounded-tl-xl rounded-bl-xl" : "w-full rounded-t-xl shrink-0",
          )}
        ></div>
        <div className={clsx(vertical && "w-full")}>
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
