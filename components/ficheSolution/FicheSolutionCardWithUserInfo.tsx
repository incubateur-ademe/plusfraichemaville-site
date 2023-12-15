import { FicheSolution } from "@/lib/directus/directusModels";
import React from "react";
import ButtonSaveFicheSolution from "@/components/ficheSolution/ButtonSaveFicheSolution";

export default function FicheSolutionCardWithUserInfo({
  ficheSolution,
  aideDecisionFirstStepName,
  className,
  children,
}: {
  ficheSolution: FicheSolution;
  aideDecisionFirstStepName: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={`relative flex ${className}`}>
      {children}
      <ButtonSaveFicheSolution
        ficheSolution={ficheSolution}
        label={false}
        projectName={aideDecisionFirstStepName}
        className={"flex justify-center items-center absolute top-2 right-6 z-40"}
      />
    </div>
  );
}
