import {
  TYPE_SOLUTION_VERTE,
  TYPE_SOLUTION_BLEUE,
  TYPE_SOLUTION_GRISE,
  TYPE_SOLUTION_DOUCE,
  TypeSolution,
} from "@/helpers/typeSolution";
import Image from "next/image";

export const AllSolutionsBoard = () => {
  return (
    <div className="bg-dsfr-background-action-low-blue-france flex flex-col justify-center items-center pt-12 pb-20">
      {/* eslint-disable-next-line max-len */}
      <div className="text-dsfr-text-label-blue-france font-bold text-[1.375rem] max-w-md m-x-auto text-center leading-normal">
        Différents types de solutions à combiner pour lutter contre la surchauffe urbaine
      </div>
      <div className="fr-container !max-w-[80rem] flex mt-12 gap-6 flex-wrap justify-center">
        <HomeSolutionExplanationCard typeSolution={TYPE_SOLUTION_VERTE} />
        <HomeSolutionExplanationCard typeSolution={TYPE_SOLUTION_BLEUE} />
        <HomeSolutionExplanationCard typeSolution={TYPE_SOLUTION_GRISE} />
        <HomeSolutionExplanationCard typeSolution={TYPE_SOLUTION_DOUCE} />
      </div>
    </div>
  );
};

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
        <div className={"mt-4 text-dsfr-text-default-grey"}>{typeSolution.explanation}</div>
      </div>
    </div>
  );
};
