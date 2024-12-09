import clsx from "clsx";

export const SourcingMapSkeleton = () => (
  <div className="flex items-center gap-8">
    <div
      className={clsx("dashed flex h-[715px] w-full items-center justify-center bg-dsfr-background-default-grey-hover")}
    >
      Carte en cours de chargement...
    </div>
  </div>
);
