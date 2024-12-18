import {
  TYPE_SOLUTION_VERTE,
  TYPE_SOLUTION_BLEUE,
  TYPE_SOLUTION_GRISE,
  TYPE_SOLUTION_DOUCE,
  TypeFicheSolution,
} from "@/src/helpers/type-fiche-solution";
import Image from "next/image";

export const AllSolutionsBoard = () => {
  return (
    <div className="flex flex-col items-center justify-center bg-dsfr-background-action-low-blue-france pb-20 pt-12">
      {/* eslint-disable-next-line max-len */}
      <div className="m-x-auto max-w-md text-center text-[1.375rem] font-bold leading-normal text-dsfr-text-label-blue-france">
        Différents types de solutions à combiner pour lutter contre la surchauffe urbaine
      </div>
      <div className="fr-container mt-12 flex !max-w-[80rem] flex-wrap justify-center gap-6">
        <HomeSolutionExplanationCard typeSolution={TYPE_SOLUTION_VERTE} />
        <HomeSolutionExplanationCard typeSolution={TYPE_SOLUTION_BLEUE} />
        <HomeSolutionExplanationCard typeSolution={TYPE_SOLUTION_GRISE} />
        <HomeSolutionExplanationCard typeSolution={TYPE_SOLUTION_DOUCE} />
      </div>
    </div>
  );
};

export const HomeSolutionExplanationCard = ({ typeSolution }: { typeSolution: TypeFicheSolution }) => {
  return (
    <div className="flex w-72 flex-col items-center rounded-2xl bg-dsfr-background-default-grey">
      <div className="flex h-40 w-full">
        <Image
          width={450}
          height={300}
          src={typeSolution.cardImage}
          alt={typeSolution.label}
          className={"h-full w-full rounded-t-2xl object-cover"}
        />
      </div>
      <div className="m-8">
        {typeSolution.coloredIcon("fr-icon--lg")}
        <div
          className={`mt-2 text-xl font-bold ${typeSolution.colorClass}`}
        >{`Qu'est ce qu'une ${typeSolution.label.toLowerCase()} ?`}</div>
        <div className={"mt-4 text-dsfr-text-default-grey"}>{typeSolution.explanation}</div>
      </div>
    </div>
  );
};
