import Image from "next/image";
import { AidesTerritoiresAide, TypeAidesTerritoiresAide } from "../types";
import CmsRichText from "@/components/common/CmsRichText";
import { AideFichePanelLine } from "./aide-fiche-panel-line";
import Button from "@codegouvfr/react-dsfr/Button";
import { AideCardSaveButton } from "./aide-card-save-button";
import { resolveAidType } from "@/components/financement/helpers";
import clsx from "clsx";
import { AidesTerritoiresFullDetailedLines } from "@/components/financement/aide/aide-info-lines";
import { useParams } from "next/navigation";

type AideFicheProps = {
  aide: AidesTerritoiresAide;
};

export const AideFiche = ({ aide }: AideFicheProps) => {
  const isAideFinanciere = resolveAidType(aide.aid_types_full) === TypeAidesTerritoiresAide.financement;
  const estimationId = +useParams().estimationId;

  return (
    <div className="flex gap-6 rounded-[20px]">
      <div
        className={clsx(
          "relative w-full max-w-96 rounded-2xl px-6 pb-6 pt-14",
          isAideFinanciere ? "bg-dsfr-background-alt-blue-france" : "bg-dsfr-background-alt-brown-cafe-creme",
        )}
        id="financement-panel"
      >
        {!!estimationId && (
          <AideCardSaveButton estimationId={estimationId} aideTerritoireId={aide.id} className="right-4 top-4" />
        )}
        <div className="mb-6 flex items-center gap-4">
          <Image
            src={`/images/financement/${isAideFinanciere ? "financement" : "ingenierie"}.svg`}
            className="mb-2"
            width={64}
            height={64}
            alt=""
          />
          <h2
            className={clsx(
              "mb-0 text-[22px]",
              isAideFinanciere ? "text-dsfr-background-flat-info" : "text-dsfr-background-flat-orange-terre-battue",
            )}
          >
            {isAideFinanciere ? "Financemement" : "Soutien à l'ingénierie"}
          </h2>
        </div>
        <div>
          {AidesTerritoiresFullDetailedLines(aide).map((line, index) => (
            <AideFichePanelLine
              line={line}
              key={index}
              pictoClassname={
                isAideFinanciere ? "text-dsfr-background-flat-info" : "text-dsfr-background-flat-orange-terre-battue"
              }
              classname="mb-8"
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
        {aide.application_url && (
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
        )}
      </div>
    </div>
  );
};
