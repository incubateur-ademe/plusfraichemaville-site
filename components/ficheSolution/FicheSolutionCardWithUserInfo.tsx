"use client";

import React, { PropsWithChildren } from "react";
import FicheSolutionFullCard from "@/components/ficheSolution/fiche-solution-full-card";
import { APIResponseData } from "@/lib/strapi/types/types";
import { GenericSaveFiche } from "../common/generic-save-fiche";

export type FicheSolutionCardWithUserInfoProps = {
  ficheSolution: APIResponseData<"api::fiche-solution.fiche-solution">;
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
      <FicheSolutionFullCard ficheSolution={ficheSolution.attributes} extraUrlParams={extraUrlParams} />
      {children}
      <GenericSaveFiche
        id={ficheSolution.id}
        type="solution"
        projectName={projectName}
        withoutModal={withoutModal}
        classNameButton="absolute top-3 right-4"
      />
    </div>
  );
}
