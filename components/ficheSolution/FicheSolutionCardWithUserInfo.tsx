import { FicheSolution } from "@/lib/directus/directusModels";
import React from "react";
import ButtonSaveFicheSolution from "@/components/ficheSolution/ButtonSaveFicheSolution";
import FicheSolutionFullCard from "@/components/ficheSolution/FicheSolutionFullCard";

export default function FicheSolutionCardWithUserInfo({
  ficheSolution,
  projectName,
  extraUrlParams,
  className,
}: {
  ficheSolution: FicheSolution;
  projectName: string;
  extraUrlParams?: { param: string; value: string }[];
  className?: string;
}) {
  return (
    <div className={`relative flex ${className}`}>
      <FicheSolutionFullCard ficheSolution={ficheSolution} extraUrlParams={extraUrlParams} />
      <ButtonSaveFicheSolution
        ficheSolution={ficheSolution}
        label={false}
        projectName={projectName}
        className={"flex justify-center items-center absolute top-2 right-6"}
      />
    </div>
  );
}
