"use client";

import React, { PropsWithChildren } from "react";
import { FicheSolutionSmallCard } from "./fiche-solution-small-card";

export default function FicheSolutionEstimationCard({
  ficheSolutionId,
  children,
  onClick,
  className,
}: {
  ficheSolutionId: number;
  onClick?: () => void;
  className?: string;
} & PropsWithChildren) {
  return (
    <FicheSolutionSmallCard ficheSolutionId={ficheSolutionId} onClick={onClick} className={className}>
      {children}
    </FicheSolutionSmallCard>
  );
}
