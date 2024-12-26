"use client";

import { PropsWithChildren } from "react";
import FicheSolutionFullCard from "@/src/components/ficheSolution/fiche-solution-full-card";
import { GenericSaveFiche } from "../common/generic-save-fiche";
import { FicheSolution } from "@/src/lib/strapi/types/api/fiche-solution";
import { TypeFiche } from "@/src/helpers/common";

export type FicheSolutionCardWithUserInfoProps = {
  ficheSolution: FicheSolution;
  projectName: string;
  extraUrlParams?: { param: string; value: string }[];
  className?: string;
  withoutModal?: boolean;
} & PropsWithChildren;

export default function FicheSolutionCardWithUserInfo({
  ficheSolution,
  extraUrlParams,
  className = "",
  children,
  projectName,
  withoutModal,
}: FicheSolutionCardWithUserInfoProps) {
  return (
    <div className={`relative flex ${className}`}>
      <FicheSolutionFullCard ficheAttributes={ficheSolution.attributes} extraUrlParams={extraUrlParams} />
      {children}
      <GenericSaveFiche
        id={ficheSolution.id}
        type={TypeFiche.solution}
        projectName={projectName}
        withoutModal={withoutModal}
        classNameButton="absolute top-3 right-4"
      />
    </div>
  );
}
