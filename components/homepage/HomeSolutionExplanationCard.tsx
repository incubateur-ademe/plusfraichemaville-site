import Image from "next/image";
import React from "react";
import { TypeSolution } from "@/helpers/typeSolution";

export const HomeSolutionExplanationCard = ({ typeSolution }: { typeSolution: TypeSolution }) => {
  return (
    <div className="flex w-72 flex-col items-center bg-dsfr-background-default-grey rounded-2xl">
      <div className="flex w-full h-40">
        <Image
          width={450}
          height={300}
          src={typeSolution.cardImage}
          alt={typeSolution.label}
          className={"w-full h-full object-cover rounded-t-2xl"}
        />
      </div>
      <div className="m-8">
        {typeSolution.coloredIcon("fr-icon--lg")}
        <div
          className={`text-xl font-bold mt-2 ${typeSolution.colorClass}`}
        >{`Qu'est ce qu'une ${typeSolution.label.toLowerCase()} ?`}</div>
        <div className={`mt-4 text-dsfr-text-default-grey`}>{typeSolution.explanation}</div>
      </div>
    </div>
  );
};
