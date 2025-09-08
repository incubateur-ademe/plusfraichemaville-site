"use client";
import clsx from "clsx";
import { FicheCardSkeleton } from "@/src/components/common/fiche-card-skeleton";

type RechercheResultatsSkeletonProps = {
  className?: string;
};

export const RechercheResultatsSkeleton = ({ className }: RechercheResultatsSkeletonProps) => {
  return (
    <div className={clsx(" animate-pulse", className)}>
      <div className="h-10 w-[82%] rounded-t-xl bg-dsfr-contrast-grey" />
      <div className="flex flex-wrap gap-8 p-6">
        <FicheCardSkeleton />
        <FicheCardSkeleton />
      </div>
    </div>
  );
};
