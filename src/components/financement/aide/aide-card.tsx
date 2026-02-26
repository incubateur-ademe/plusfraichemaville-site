import { AidesTerritoiresAide, TypeAidesTerritoiresAide } from "../types";
import Image from "next/image";
import { resolveAidType } from "../helpers";
import clsx from "clsx";
import { AideCardSaveButtonProjet } from "./aide-card-save-button-projet";
import { useModalStore } from "@/src/stores/modal/provider";
import { AidesTerritoiresCardLines } from "@/src/components/financement/aide/aide-info-lines";
import { AideFichePanelLine } from "@/src/components/financement/aide/aide-fiche-panel-line";
import { useGetSavedAideInProjetId } from "@/src/hooks/use-get-aide-saved-in-projet-id";

type AideCardProps = {
  aide: AidesTerritoiresAide;
  withSaveButton?: boolean;
  projetId?: number;
};

export const AideCard = ({ aide, withSaveButton, projetId }: AideCardProps) => {
  const setCurrentDetailedAide = useModalStore((state) => state.setCurrentDetailedAide);
  const type = resolveAidType(aide.aid_types_full);
  const isAideFinanciere = type === TypeAidesTerritoiresAide.financement;
  const savedId = useGetSavedAideInProjetId(aide.id);
  return (
    <div className="relative w-[362px]" id={`aide-card-${aide.id}`}>
      {withSaveButton && projetId && (
        <AideCardSaveButtonProjet projetId={projetId} aideTerritoireId={aide.id} className="right-2 top-3" />
      )}
      <div className={clsx("fr-enlarge-link fr-card flex h-full flex-col rounded-2xl",
          "hover:bg-dsfr-background-default-grey-hover",
        !!savedId ? "pfmv-flat-card-selected" : "pfmv-flat-card")}>
        <div
          className={clsx(
            "rounded-t-2xl px-5 py-4 ",
            isAideFinanciere ? "bg-dsfr-background-alt-blue-france" : "bg-dsfr-background-alt-brown-cafe-creme",
          )}
        >
          <span className="flex items-center gap-2">
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
        <div className="fr-card__body">
          <div className="fr-card__content p-5">
            <h2 className="fr-card__title mb-6 text-lg" id={`title-aide-${aide.id}`}>
              <a
                href="#"
                onClick={(e) => {
                  setCurrentDetailedAide(aide);
                  e.preventDefault();
                }}
              >
                {aide.name}
              </a>
            </h2>
            <div className="fr-card__desc">
              {AidesTerritoiresCardLines(aide).map((line) => (
                <AideFichePanelLine
                  line={line}
                  pictoClassname={clsx(
                    "fr-icon--sm",
                    isAideFinanciere
                      ? "text-dsfr-background-flat-info"
                      : "text-dsfr-background-flat-orange-terre-battue",
                  )}
                  showMore={line.showMore}
                  classname="text-sm border-t-[1px] border-t-black/10 py-3"
                  key={line.title}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
