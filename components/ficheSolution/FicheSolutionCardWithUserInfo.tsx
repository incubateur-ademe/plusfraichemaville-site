import React from "react";
import ButtonSaveFicheSolution from "@/components/ficheSolution/ButtonSaveFicheSolution";
import FicheSolutionFullCard from "@/components/ficheSolution/FicheSolutionFullCard";
import { APIResponseData } from "@/lib/strapi/types/types";

export default function FicheSolutionCardWithUserInfo({
  ficheSolution,
  projectName,
  extraUrlParams,
  className,
}: {
  ficheSolution: APIResponseData<"api::fiche-solution.fiche-solution">;
  projectName: string;
  extraUrlParams?: { param: string; value: string }[];
  className?: string;
}) {
  return (
    <div className={`relative flex ${className}`}>
      <FicheSolutionFullCard ficheSolution={ficheSolution.attributes} extraUrlParams={extraUrlParams} />
      <ButtonSaveFicheSolution
        ficheSolutionId={ficheSolution.id}
        label={false}
        projectName={projectName}
        className={"flex justify-center items-center absolute top-2 right-6"}
      />
    </div>
  );
}
