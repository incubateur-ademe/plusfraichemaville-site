import Image from "next/image";
import { AidesTerritoiresAide, AidesTerritoiresAideType } from "../types";
import { GenericSaveFiche } from "@/components/common/generic-save-fiche";
import CmsRichText from "@/components/common/CmsRichText";
import { AideFichePanelLine } from "./aide-fiche-panel-line";

type AideFicheProps = {
  aide: AidesTerritoiresAide;
  type: AidesTerritoiresAideType;
};
export const AideFiche = ({ aide }: AideFicheProps) => {
  const lines = [
    {
      title: "Porteur(s) d'aide",
      picto: "porteur-aide",
      description: "aide.sub",
    },
    {
      title: "Subvention",
      picto: "subvention",
      description: "aide.sub",
    },
    {
      title: "Récurrence",
      picto: "recurrence",
      description: "aide.sub",
    },
    {
      title: "Bénéficiaires",
      picto: "beneficiaires",
      description: "aide.sub",
    },
    {
      title: "Zone géographique couverte par l'aide",
      picto: "zone-geo",
      description: "aide.sub",
    },
    {
      title: "Dernières mises à jour",
      picto: "maj",
      description: "aide.sub",
    },
  ];

  return (
    <div className="flex gap-6 rounded-[20px] pt-8">
      <div className="w-full max-w-96 rounded-2xl bg-dsfr-background-alt-blue-france p-6" id="financement-panel">
        <GenericSaveFiche id={100} type="diagnostic" className="ml-auto w-fit" />
        <div className="mb-6 flex items-center gap-4">
          <Image src="/images/financement/financement.svg" width={64} height={64} alt="" />
          <h2 className="text-dsfr-background-flat-info mb-0 text-[22px]">Financement</h2>
        </div>
        <div>
          {lines.map((line, index) => (
            <AideFichePanelLine title={line.title} description={line.description} picto={line.picto} key={index} />
          ))}
        </div>
      </div>
      <div className="w-full">
        <div className="mb-11">
          <small className="text-dsfr-background-flat-info mb-5 block text-base font-bold">
            {"Porteur d'aide public"}
          </small>
          <h1 className="text-dsfr-background-flat-info mb-10 text-[40px]">{aide.name}</h1>
          <h2 className="text-dsfr-background-flat-info max-w-xl text-[22px] leading-7">
            {"Nom initial de l'aide"}
            <span className="block font-normal">{aide.name_initial}</span>
          </h2>
        </div>
        <div>{aide.description && <CmsRichText label={aide.description} />}</div>
      </div>
    </div>
  );
};
