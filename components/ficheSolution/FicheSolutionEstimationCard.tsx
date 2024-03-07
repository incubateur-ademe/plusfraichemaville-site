"use client";

import React, { PropsWithChildren } from "react";
import { FicheSolutionSmallCard } from "./fiche-solution-small-card";

export default function FicheSolutionEstimationCard({
  ficheSolutionId,
  children,
  onClick,
}: {
  ficheSolutionId: number;
  onClick?: () => void;
} & PropsWithChildren) {
  return (
    <FicheSolutionSmallCard ficheSolutionId={ficheSolutionId} onClick={onClick}>
      {children}
    </FicheSolutionSmallCard>
  );
}
