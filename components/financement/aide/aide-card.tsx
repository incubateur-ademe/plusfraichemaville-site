import { AidesTerritoiresAide, TypeAidesTerritoiresAide } from "../types";
import Image from "next/image";
import { resolveAidType } from "../helpers";
import clsx from "clsx";
import { AideCardSaveButton } from "./aide-card-save-button";
import { useParams } from "next/navigation";
import Button from "@codegouvfr/react-dsfr/Button";
import { useModalStore } from "@/stores/modal/provider";
import { AidesTerritoiresCardLines } from "@/components/financement/aide/aide-info-lines";
import { AideFichePanelLine } from "@/components/financement/aide/aide-fiche-panel-line";

type AideCardProps = {
  aide: AidesTerritoiresAide;
  withSaveButton?: boolean;
};

export const AideCard = ({ aide, withSaveButton }: AideCardProps) => {
  const setCurrentDetailedAide = useModalStore((state) => state.setCurrentDetailedAide);
  const type = resolveAidType(aide.aid_types_full);
  const isAideFinanciere = type === TypeAidesTerritoiresAide.financement;
  const estimationId = +useParams().estimationId;

  return (
    <div className="pfmv-card no-shadow  relative w-[266px] cursor-pointer overflow-hidden" id={`aide-card-${aide.id}`}>
      {withSaveButton && (
        <AideCardSaveButton estimationId={estimationId} aideTerritoireId={aide.id} className="right-2 top-2" />
      )}
      <div className="flex h-full flex-col" onClick={() => setCurrentDetailedAide(aide)}>
        <div
          className={clsx(
            "relative h-24 px-5 py-4",
            isAideFinanciere ? "bg-dsfr-background-alt-blue-france" : "bg-dsfr-background-alt-brown-cafe-creme",
          )}
        >
          <Image
            src={`/images/financement/${isAideFinanciere ? "financement" : "ingenierie"}.svg`}
            className="mb-2"
            width={32}
            height={32}
            alt=""
          />
          <span
            className={clsx(
              "text-sm font-bold",
              isAideFinanciere ? "text-dsfr-background-flat-info" : "text-dsfr-background-flat-orange-terre-battue",
            )}
          >
            {isAideFinanciere ? "Financement" : "Soutien à l'ingénierie"}
          </span>
        </div>
        <div className="p-5">
          <div
            className={clsx(
              "mb-4 w-fit rounded-[4px] bg-dsfr-background-alt-blue-france px-[6px] py-[2px]",
              "text-sm font-bold text-pfmv-navy",
            )}
          >
            {aide.perimeter_scale}
          </div>
          <h2 className="mb-6 text-lg">{aide.name}</h2>
          {AidesTerritoiresCardLines(aide).map((line) => (
            <AideFichePanelLine
              line={line}
              pictoClassname={clsx(
                "fr-icon--sm",
                isAideFinanciere ? "text-dsfr-background-flat-info" : "text-dsfr-background-flat-orange-terre-battue",
              )}
              showMore={line.showMore}
              classname="text-sm border-t-[1px] border-t-black/10 py-3"
              key={line.title}
            />
          ))}
        </div>
        <div className="mt-auto">
          <Button
            priority="tertiary"
            className="!mx-auto mb-5 mt-auto !block rounded-3xl px-9"
            onClick={() => setCurrentDetailedAide(aide)}
          >
            {"J'explore la solution"}
          </Button>
        </div>
      </div>
    </div>
  );
};
