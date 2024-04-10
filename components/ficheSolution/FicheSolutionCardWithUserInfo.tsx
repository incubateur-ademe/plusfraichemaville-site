"use client";

import React, { PropsWithChildren } from "react";
import FicheSolutionFullCard from "@/components/ficheSolution/FicheSolutionFullCard";
import { APIResponseData } from "@/lib/strapi/types/types";
import { GenericSaveFiche } from "../common/generic-save-fiche";

type FicheSolutionCardWithUserInfoProps = {
  ficheSolution: APIResponseData<"api::fiche-solution.fiche-solution">;
  projectName: string;
  extraUrlParams?: { param: string; value: string }[];
  className?: string;
} & PropsWithChildren;

export default function FicheSolutionCardWithUserInfo({
  ficheSolution,
  extraUrlParams,
  className = "",
  children,
  projectName,
}: FicheSolutionCardWithUserInfoProps) {
  return (
    <div className={`relative ${className}`}>
      <FicheSolutionFullCard ficheSolution={ficheSolution.attributes} extraUrlParams={extraUrlParams} />
      {children}
      <GenericSaveFiche id={ficheSolution.id} type="solution" projectName={projectName} />
      {/* {projetId ? (
        <ButtonSaveFicheSolutionInProjet ficheSolutionId={ficheSolution.id} className="absolute top-2 right-2" />
      ) : (
        <GenericSaveFiche id={ficheSolution.id} projectName={projectName} type="solution" />
      )} */}
    </div>
  );
}
