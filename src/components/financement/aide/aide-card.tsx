"use client";

import { AidesTerritoiresAide, TypeAidesTerritoiresAide } from "../types";
import Image from "next/image";
import { resolveAidType } from "../helpers";
import clsx from "clsx";
import { AideCardSaveButtonProjet } from "./aide-card-save-button-projet";
import { useModalStore } from "@/src/stores/modal/provider";
import { AidesTerritoiresCardLines } from "@/src/components/financement/aide/aide-info-lines";
import { AideFichePanelLine } from "@/src/components/financement/aide/aide-fiche-panel-line";
import { useGetSavedAideInProjetId } from "@/src/hooks/use-get-aide-saved-in-projet-id";
import { useProjetsStore } from "@/src/stores/projets/provider";
import { useUserStore } from "@/src/stores/user/provider";
import Badge from "@codegouvfr/react-dsfr/Badge";
import { addAideAlreadySeenAction } from "@/src/actions/userProjet/add-aide-already-seen-action";

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

  const currentUserId = useUserStore((state) => state.userInfos?.id);
  const projet = useProjetsStore((state) => state.getCurrentProjet());
  const updateUserProjetInProjet = useProjetsStore((state) => state.updateUserProjetInProjet);
  const userProjet = projet?.users.find((u) => u.user_id === currentUserId);
  const alreadySeen = userProjet?.aides_already_seen.includes(aide.id) ?? false;

  return (
    <div className="relative w-[362px]" id={`aide-card-${aide.id}`}>
      {withSaveButton && projetId && (
        <AideCardSaveButtonProjet projetId={projetId} aideTerritoireId={aide.id} className="right-2 top-3" />
      )}
      <div
        className={clsx(
          "fr-enlarge-link fr-card flex h-full flex-col rounded-2xl",
          "hover:bg-dsfr-background-default-grey-hover",
          savedId ? "pfmv-flat-card-selected" : "pfmv-flat-card",
        )}
      >
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
            <h2 className="fr-card__title mb-3 text-lg" id={`title-aide-${aide.id}`}>
              <a
                href="#"
                onClick={async (e) => {
                  e.preventDefault();
                  setCurrentDetailedAide(aide);
                  if (projetId && currentUserId) {
                    const result = await addAideAlreadySeenAction(currentUserId, projetId, aide.id);
                    if (result.type === "success" && result.userProjet) {
                      updateUserProjetInProjet(result.userProjet);
                    }
                  }
                }}
              >
                {aide.name}
              </a>
            </h2>
            {alreadySeen && (
              <Badge small noIcon className="mb-3">
                Déjà vu
              </Badge>
            )}
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
