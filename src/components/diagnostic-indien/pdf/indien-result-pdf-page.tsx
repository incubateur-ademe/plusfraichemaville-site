import React, { useEffect, useRef } from "react";
import { ProjetIndiEnSimuation, ProjetWithRelations } from "@/src/lib/prisma/prismaCustomTypes";
import { Separator } from "@/src/components/common/separator";
import { IndienResultPdfHeader } from "@/src/components/diagnostic-indien/pdf/indien-result-pdf-header";
import IndienResultRanges from "@/src/components/diagnostic-indien/indien-result-ranges";
import IndienResultPieChartSurface from "@/src/components/diagnostic-indien/indien-result-surface-repartition";
import Image from "next/image";
import { generatePdf } from "@/src/helpers/pdf-utils";

type ClimadiagViewerProps = {
  data: ProjetIndiEnSimuation;
  projet: ProjetWithRelations;
  close: () => void;
};

export const IndienResultPdfPage = ({ data, projet, close }: ClimadiagViewerProps) => {
  const filename = `resultat-diagnostic.pdf`;

  const ignore = useRef(false);

  useEffect(() => {
    if (!ignore.current) {
      generatePdf(`PFMV-${filename}`, "#indien-result-page", close);
    }
    return () => {
      ignore.current = true;
    };
  }, [filename, close]);

  return (
    <div className="relative bg-white">
      <div className="fixed left-0 top-0 -z-[9] h-[2000px] w-screen bg-white"></div>
      <div id="indien-result-page" className="fixed left-0 top-0 -z-20 h-[2000px] w-screen bg-white">
        <div>
          <div className="px-14 py-10">
            <IndienResultPdfHeader />
            <Separator className="mb-10 mt-6" />
            <div className="mb-4 text-3xl font-bold text-pfmv-navy">{projet.nom}</div>
            <div className="mb-8 text-xl font-bold">
              Analyse simplifiée de la surchauffe au sein de mon espace, à l’état initial.
            </div>
            <div className="rounded-2xl bg-dsfr-background-alt-blue-france p-6">
              <IndienResultRanges diagnosticResults={data} isPdf />
              <IndienResultPieChartSurface results={data} />
              <div className="mt-8 flex flex-row items-center gap-4 rounded-2xl bg-white p-4">
                <Image
                  src="/images/fiches-diagnostic/indicateurs-environnementaux/ampoule-idee.svg"
                  height={39}
                  width={34}
                  alt="Point d'attention"
                  className="mb-2 h-10"
                />
                <div>
                  {"Si vous souhaitez faire un"} <strong>{"diagnostic approfondi"}</strong>
                  {", de nombreuses expertises peuvent vous éclairer : vous pouvez cartographier l’îlot de chaleur " +
                    "urbain ou encore évaluer le confort thermique de vos usagers. Rendez-vous sur " +
                    "plusfraichemaville.fr pour trouver les méthodes de diagnostic adaptées à votre projet."}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
