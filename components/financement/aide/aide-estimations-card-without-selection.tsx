import { Separator, SeparatorY } from "@/components/common/separator";
import { FicheSolutionSmallCard } from "@/components/ficheSolution/fiche-solution-small-card";
import { useEstimationGlobalPrice } from "@/hooks/use-estimation-global-price";
import { EstimationWithAides } from "@/lib/prisma/prismaCustomTypes";
import Image from "next/image";
import { PropsWithChildren } from "react";

type AideEstimationsCardWithoutSelectionProps = {
  financementCount: number;
  ingenierieCount: number;
  estimation: EstimationWithAides;
} & PropsWithChildren;

export const AideEstimationsCardWithoutSelection = ({
  financementCount,
  ingenierieCount,
  estimation,
  children,
}: AideEstimationsCardWithoutSelectionProps) => {
  const { fournitureMin, fournitureMax, entretienMin, entretienMax } = useEstimationGlobalPrice(estimation);

  return (
    <>
      <div className="mb-8 flex flex-wrap gap-6">
        {estimation.fiches_solutions_id.map((fiche, index) => (
          <FicheSolutionSmallCard
            ficheSolutionId={fiche}
            className="w-52 shrink-0 rounded-2xl bg-dsfr-background-default-grey-hover"
            key={index}
          />
        ))}
      </div>
      <Separator className="mb-6" />
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
      <div className="flex h-24 items-center justify-between rounded-2xl bg-dsfr-background-alt-blue-france px-6 py-3">
        <div className="flex gap-8">
          <div className="flex items-center gap-4">
            <div className="flex gap-2">
              <Image src="/images/financement/financement.svg" width={41} height={38} alt="" />
              <span className="text-block pt-2 text-[68px] font-bold text-dsfr-background-flat-info">
                {financementCount}
              </span>
            </div>
            <div>
              <span className="block font-bold text-dsfr-background-flat-info">
                {financementCount > 1 ? "financements" : "financement"}
              </span>
              <span>{financementCount > 1 ? "ont été trouvés" : "a été trouvé"}</span>
            </div>
          </div>
          <SeparatorY />
          <div className="flex items-center gap-4">
            <div className="flex gap-2">
              <Image src="/images/financement/ingenierie.svg" width={41} height={38} alt="" />
              <span className="text-block pt-2 text-[68px] font-bold text-dsfr-background-flat-orange-terre-battue">
                {ingenierieCount}
              </span>
            </div>
            <div>
              <span className="block font-bold text-dsfr-background-flat-orange-terre-battue">
                {ingenierieCount > 1 ? "soutiens à l'ingénierie" : "soutien à l'ingénierie"}
              </span>
              <span>{ingenierieCount > 1 ? "ont été trouvés" : "a été trouvé"}</span>
            </div>
          </div>
        </div>
        {children}
      </div>
    </>
  );
};
