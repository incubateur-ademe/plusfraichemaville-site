"use client";
import React from "react";

import Button from "@codegouvfr/react-dsfr/Button";
import { createModal } from "@codegouvfr/react-dsfr/Modal";

import { useSaveBookmarksButton } from "./use-save-bookmarks";
import { ModalSaveFicheSolutionDisconnected } from "./modals/modal-save-fiche-solution-disconnected";
import { ModalSaveFichesSolutionsConnected } from "./modals/modal-save-fiche-solution-connected";

const modal = createModal({
  id: "bookmark-modal",
  isOpenedByDefault: false,
});

export type ModalSaveFicheSolutionProps = {
  modal: typeof modal;
  ficheSolutionId?: number;
};
export default function ButtonSaveFicheSolution({
  ficheSolutionId,
  projectName,
  label,
  className,
}: {
  ficheSolutionId: number;
  label: boolean;
  projectName: string;
  className?: string;
}) {
  const { isBookmarked, changeFavorite, isAuthenticated } = useSaveBookmarksButton(
    ficheSolutionId,
    projectName,
    modal.open,
  );

  return (
    <div>
      <>
        <div className={`${className}`}>
          {label || isBookmarked ? (
            <Button
              className={"fr-icon--sm rounded-3xl text-sm"}
              iconId={isBookmarked ? "fr-icon-bookmark-fill" : "fr-icon-bookmark-line"}
              onClick={changeFavorite}
              size="small"
            >
              {isBookmarked ? "Sauvegardé" : "Sauvegarder"}
            </Button>
          ) : (
            <div
              // eslint-disable-next-line max-len
              className="flex justify-center items-center hover:bg-dsfr-hover-blue-sun bg-dsfr-text-label-blue-france text-white rounded-2xl
                  cursor-pointer w-8 h-8"
              onClick={changeFavorite}
            >
              <span className={"fr-icon--sm fr-icon-bookmark-line"} aria-hidden="true" />
            </div>
          )}
        </div>
        {isAuthenticated ? (
          <ModalSaveFichesSolutionsConnected ficheSolutionId={ficheSolutionId} modal={modal} />
        ) : (
          <ModalSaveFicheSolutionDisconnected modal={modal} />
        )}
      </>
    </div>
  );
}
