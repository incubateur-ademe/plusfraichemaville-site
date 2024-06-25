import Image from "next/image";
import { AidesTerritoiresAide } from "../types";
import CmsRichText from "@/components/common/CmsRichText";
import { AideFichePanelLine } from "./aide-fiche-panel-line";
import Button from "@codegouvfr/react-dsfr/Button";
import { AideCardSaveButton } from "./aide-card-save-button";

type AideFicheProps = {
  aide: AidesTerritoiresAide;
};
export const AideFiche = ({ aide }: AideFicheProps) => {
  const lines = [
    {
      title: "Porteur(s) d'aide",
      picto: "porteur-aide",
      description: aide.financers,
    },
    {
      title: "Subvention",
      picto: "subvention",
      description: [
        `${aide.subvention_rate_lower_bound ? `Min: ${aide.subvention_rate_lower_bound}% -` : ""}  ${
          aide.subvention_rate_upper_bound ? `Max: ${aide.subvention_rate_upper_bound}%` : ""
        }`,
        aide.subvention_comment ?? "",
      ],
    },
    {
      title: "Récurrence",
      picto: "recurrence",
      description: aide.recurrence,
    },
    {
      title: "Bénéficiaires",
      picto: "beneficiaires",
      description: aide.targeted_audiences,
    },
    {
      title: "Zone géographique couverte par l'aide",
      picto: "zone-geo",
      description: aide.perimeter,
    },
    {
      title: "Dernières mises à jour",
      picto: "maj",
      date: aide.date_updated,
    },
  ];

  return (
    <div className="flex gap-6 rounded-[20px]">
      <div
        className="relative w-full max-w-96 rounded-2xl bg-dsfr-background-alt-blue-france p-6"
        id="financement-panel"
      >
        <AideCardSaveButton estimationId={1} aideTerritoireId={aide.id} className="right-4 top-4" />
        <div className="mb-6 flex items-center gap-4">
          <Image src="/images/financement/financement.svg" width={64} height={64} alt="" />
          <h2 className="mb-0 text-[22px] text-dsfr-background-flat-info">Financement</h2>
        </div>
        <div>
          {lines.map((line, index) => (
            <AideFichePanelLine
              title={line.title}
              description={line.description}
              picto={line.picto}
              date={line.date}
              key={index}
            />
          ))}
        </div>
      </div>
      <div className="w-full">
        <div className="mb-11">
          <small className="mb-5 block text-base font-bold text-dsfr-background-flat-info">
            {"Porteur d'aide public"}
          </small>
          <h1 className="mb-10 text-[40px] text-dsfr-background-flat-info">{aide.name}</h1>
          <h2 className="max-w-xl text-[22px] leading-7 text-dsfr-background-flat-info">
            {"Nom initial de l'aide"}
            <span className="block font-normal">{aide.name_initial}</span>
          </h2>
        </div>
        <div className="mb-16">{aide.description && <CmsRichText label={aide.description} />}</div>
        <div className="flex justify-end">
          <Button
            iconId="ri-external-link-fill"
            className="!ml-auto rounded-2xl"
            size="small"
            onClick={() => window.open(aide.application_url ?? "")}
          >
            Candidater
          </Button>
        </div>
      </div>
    </div>
  );
};
