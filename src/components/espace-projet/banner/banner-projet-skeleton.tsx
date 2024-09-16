import clsx from "clsx";

export const BannerProjetSkeleton = () => (
  <div className="fr-container animate-pulse">
    <div className="flex items-center justify-between">
      <div className="flex gap-5">
        <div className="size-20  rounded-lg bg-dsfr-background-action-low-blue-france"></div>
        <div className="flex flex-col justify-between py-1">
          <div className="h-[30px] w-28  rounded-[4px] bg-dsfr-background-action-low-blue-france"></div>
          <div className="h-6 w-28  rounded-[4px] bg-dsfr-background-action-low-blue-france"></div>
        </div>
      </div>
      <div className="flex gap-4">
        <div className={clsx("size-[51px]  rounded-full bg-dsfr-background-action-low-blue-france")}></div>
        <div className={clsx("size-[51px]  rounded-full bg-dsfr-background-action-low-blue-france")}></div>
      </div>
    </div>
  </div>
);
