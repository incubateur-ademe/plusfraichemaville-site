import Image from "next/image";
import clsx from "clsx";
import {
  INDIEN_BIODIVERSITE,
  INDIEN_CANOPEE,
  INDIEN_PERMEABILITE,
  INDIEN_RAFRAICHISSEMENT_URBAIN,
} from "@/src/helpers/indicateurs-environnementaux/indicateurs-environnementaux-list";
import IndienCoeffExplanationModal from "@/src/components/diagnostic-indien/indien-coeff-explanation-modal";
import IndienResultRange from "@/src/components/diagnostic-indien/indien-result-range";
import { ProjetIndiEnSimuation } from "@/src/lib/prisma/prismaCustomTypes";

export default function IndienResultRanges({
  diagnosticResults,
  isPdf = false,
}: {
  diagnosticResults: ProjetIndiEnSimuation;
  isPdf?: boolean;
}) {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      <section>
        <h3 className="mb-4 font-bold">Indicateurs majeurs</h3>
        <IndienResultRange
          coefficientValue={diagnosticResults.coeffRafraichissementUrbain}
          coefficient={INDIEN_RAFRAICHISSEMENT_URBAIN}
          large
          isPdf={isPdf}
        />
      </section>
      <section>
        <h3 className="mb-4 font-bold">Autres indicateurs</h3>
        <IndienResultRange
          className="mb-3"
          coefficientValue={diagnosticResults.coeffPermeabilite}
          coefficient={INDIEN_PERMEABILITE}
          isPdf={isPdf}
        />
        <IndienResultRange
          className="mb-3"
          coefficientValue={diagnosticResults.coeffBiodiversite}
          coefficient={INDIEN_BIODIVERSITE}
          isPdf={isPdf}
        />
        <div className="mb-6 rounded-2xl bg-white px-4 py-2">
          {!isPdf && <IndienCoeffExplanationModal coefficient={INDIEN_CANOPEE} />}
          <div className={clsx("flex flex-row items-center justify-between gap-4", !isPdf && "mr-10")}>
            <div className="flex flex-row items-center gap-6">
              <Image src={INDIEN_CANOPEE.icone} width={51} height={51} alt="" className="h-10" />
              <div className={clsx("text-lg font-bold", INDIEN_CANOPEE.textColor)}>{INDIEN_CANOPEE.label}</div>
            </div>
            <div className="text-2xl font-bold">{diagnosticResults.partCanopee} %</div>
          </div>
        </div>
      </section>
    </div>
  );
}
