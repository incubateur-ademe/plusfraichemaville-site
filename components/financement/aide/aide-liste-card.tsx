import { Separator, SeparatorY } from "@/components/common/separator";
import { FicheSolutionSmallCard } from "@/components/ficheSolution/fiche-solution-small-card";
import { formatNumberWithSpaces } from "@/helpers/common";
import { estimation } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

type AideListeCardProps = {
  financementCount: number;
  ingenierieCount: number;
  estimation: estimation;
};

export const AideListeCard = ({ financementCount, ingenierieCount, estimation }: AideListeCardProps) => {
  return (
    <div className="pfmv-card w-full p-8 hover:outline-none">
      <h2 className="mb-1 text-[22px] text-pfmv-navy">
        Nommer estimation
        <i className="ri-pencil-fill ml-1"></i>
      </h2>
      <span className="mb-10 block text-black">Solutions pour lesquelles vous recherchez des financements</span>
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
          <span className="block">{formatNumberWithSpaces(10000)} €</span>
        </div>
        <div className="flex items-center justify-between text-lg">
          <span className="block font-bold text-dsfr-text-disabled-grey">Entretien</span>
          <span className="block">{formatNumberWithSpaces(10000)} €</span>
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
              <span className="block font-bold text-dsfr-background-flat-info">financements</span>
              <span>ont été trouvés</span>
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
                soutien à {"l'ingénierie"}
              </span>
              <span>ont été trouvées</span>
            </div>
          </div>
        </div>
        <Link href="/" className="fr-btn rounded-[30px]">
          Sélectionner
        </Link>
      </div>
    </div>
  );
};
