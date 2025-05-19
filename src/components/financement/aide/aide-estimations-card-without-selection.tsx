import { Separator } from "@/src/components/common/separator";
import { FicheSolutionSmallCard } from "@/src/components/ficheSolution/fiche-solution-small-card";
import { useEstimationGlobalPrice } from "@/src/hooks/use-estimation-global-price";
import { EstimationWithAides } from "@/src/lib/prisma/prismaCustomTypes";
import { PropsWithChildren } from "react";
import { useAidesByEstimationFetcher } from "@/src/hooks/use-aides-selected-by-estimation";
import { countAidesByType } from "../helpers";

import { AideEstimationsCardRecap } from "./aide-estimations-recap";

type AideEstimationsCardWithoutSelectionProps = {
  estimation: EstimationWithAides;
} & PropsWithChildren;

export const AideEstimationsCardWithoutSelection = ({
  estimation,
  children,
}: AideEstimationsCardWithoutSelectionProps) => {
  const { fournitureMin, fournitureMax, entretienMin, entretienMax } = useEstimationGlobalPrice(estimation);
  const { data: aides, isLoading } = useAidesByEstimationFetcher(estimation.id);
  const countAides = countAidesByType(aides?.results ?? []);

  return (
    <>
      <div className="mb-8 flex flex-wrap gap-6">
        {estimation.fiches_solutions_id.map((fiche, index) => (
          <FicheSolutionSmallCard
            ficheSolutionId={fiche}
            className="pointer-events-none w-52 shrink-0 rounded-2xl border-[1px] border-dsfr-border-default-grey"
            key={index}
          />
        ))}
      </div>
      <Separator className="mb-6 h-px !opacity-100" />
      <div className="mb-8">
        <div className="mb-2 flex items-center justify-between text-lg">
          <span className="block font-bold text-black">Investissement</span>
          <span className="block">
            <strong>{`${fournitureMin} - ${fournitureMax} € HT`}</strong>
          </span>
        </div>
        <div className="flex items-center justify-between text-lg">
          <span className="block font-bold text-dsfr-text-disabled-grey">Entretien</span>
          <span className="block">{`${entretienMin} - ${entretienMax} € HT / an`}</span>
        </div>
      </div>
      <AideEstimationsCardRecap isLoading={isLoading} countAides={{ ...countAides, verb: "trouvé" }}>
        {children}
      </AideEstimationsCardRecap>
    </>
  );
};
