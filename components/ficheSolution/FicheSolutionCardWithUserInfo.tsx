"use client";

import React, { PropsWithChildren } from "react";
import FicheSolutionFullCard from "@/components/ficheSolution/FicheSolutionFullCard";
import { APIResponseData } from "@/lib/strapi/types/types";
import { useParams } from "next/navigation";
import { ButtonSaveFicheSolutionInProjet } from "./button-save-fiche-solution-in-projet";
import { GenericSaveFicheButton } from "../common/generic-save-fiche-button";

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
  const { projetId } = useParams();

  return (
    <div className={`relative flex ${className}`}>
      <FicheSolutionFullCard ficheSolution={ficheSolution.attributes} extraUrlParams={extraUrlParams} />
      {children}
      {projetId ? (
        <ButtonSaveFicheSolutionInProjet ficheSolutionId={ficheSolution.id} className="absolute top-2 right-2" />
      ) : (
        <GenericSaveFicheButton id={ficheSolution.id} projectName={projectName} type="solution" />
      )}
    </div>
  );
}
