import { AidesTerritoiresAide, TypeAidesTerritoiresAide } from "../types";
import Image from "next/image";
import { resolveAidType } from "../helpers";
import clsx from "clsx";
import { AideCardSaveButton } from "./aide-card-save-button";
import { useParams } from "next/navigation";
import Button from "@codegouvfr/react-dsfr/Button";
import { useModalStore } from "@/src/stores/modal/provider";
import { AidesTerritoiresCardLines } from "@/src/components/financement/aide/aide-info-lines";
import { AideFichePanelLine } from "@/src/components/financement/aide/aide-fiche-panel-line";

type AideCardProps = {
  aide: AidesTerritoiresAide;
  withSaveButton?: boolean;
};

export const AideCard = ({ aide, withSaveButton }: AideCardProps) => {
  const setCurrentDetailedAide = useModalStore((state) => state.setCurrentDetailedAide);
  const type = resolveAidType(aide.aid_types_full);
  const isAideFinanciere = type === TypeAidesTerritoiresAide.financement;
  const estimationId = useParams().estimationId;
  return (
    <div className="pfmv-card no-shadow  relative w-[362px] cursor-pointer overflow-hidden" id={`aide-card-${aide.id}`}>
      {withSaveButton && !!estimationId && (
        <AideCardSaveButton estimationId={+estimationId} aideTerritoireId={aide.id} className="right-2 top-3" />
      )}
      <div className="flex h-full flex-col" onClick={() => setCurrentDetailedAide(aide)}>
        <div
          className={clsx(
            "relative h-16 px-5 py-4",
            isAideFinanciere ? "bg-dsfr-background-alt-blue-france" : "bg-dsfr-background-alt-brown-cafe-creme",
          )}
        >
          <span className="flex items-center gap-4">
            <Image
              src={`/images/financement/${isAideFinanciere ? "financement" : "ingenierie"}.svg`}
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
          </span>
        </div>
        <div className="p-5">
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
            className="!mx-auto mb-5 mt-auto !block !w-56 rounded-3xl px-9"
            onClick={() => setCurrentDetailedAide(aide)}
          >
            {"Lire plus"}
          </Button>
        </div>
      </div>
    </div>
  );
};
