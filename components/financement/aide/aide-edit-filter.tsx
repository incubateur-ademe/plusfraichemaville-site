import { useState } from "react";
import { aideCardOff, aideCardOn } from "../helpers";
import clsx from "clsx";

type AideEditFilterProps = {
  aideFinanciereCount: number;
  aideTechniqueCount: number;
  isLoading: boolean;
};

export const AideEditFilter = ({ aideFinanciereCount, aideTechniqueCount, isLoading }: AideEditFilterProps) => {
  const [filter, setFilter] = useState({
    aideFinanciere: true,
    aideTechnique: true,
  });

  const aideFinanciere = () => {
    filter.aideFinanciere ? aideCardOff("Aide financière") : aideCardOn("Aide financière");
    setFilter({ ...filter, aideFinanciere: !filter.aideFinanciere });
  };

  const aideTechnique = () => {
    filter.aideTechnique ? aideCardOff("Aide en ingénierie") : aideCardOn("Aide en ingénierie");
    setFilter({ ...filter, aideTechnique: !filter.aideTechnique });
  };

  return (
    <div className="flex gap-5">
      <div className="mb-10 flex cursor-pointer gap-2" onClick={aideFinanciere}>
        <div className="skrink-0 flex size-6 rounded-[4px] border-[1px] border-pfmv-navy text-pfmv-navy">
          {filter.aideFinanciere && <i className="ri-check-line mr-2" />}
        </div>
        Aides financières
        <span className={clsx(isLoading && "w-9 animate-pulse rounded-lg bg-pfmv-grey/20")}>
          {!isLoading && `(${aideFinanciereCount})`}
        </span>
      </div>
      <div className="mb-10 flex cursor-pointer gap-2" onClick={aideTechnique}>
        <div className="skrink-0 flex size-6 rounded-[4px] border-[1px] border-pfmv-navy text-pfmv-navy">
          {filter.aideTechnique && <i className="ri-check-line mr-2" />}
        </div>
        Aides techniques
        <div className={clsx(isLoading && "w-9 animate-pulse rounded-lg bg-pfmv-grey/20")}>
          {!isLoading && `(${aideTechniqueCount})`}
        </div>
      </div>
    </div>
  );
};
