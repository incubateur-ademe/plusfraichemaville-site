import {
  TYPE_SOLUTION_VERTE,
  TYPE_SOLUTION_BLEUE,
  TYPE_SOLUTION_GRISE,
  TYPE_SOLUTION_DOUCE,
} from "@/helpers/typeSolution";

import { HomeSolutionExplanationCard } from "../homepage/HomeSolutionExplanationCard";

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
