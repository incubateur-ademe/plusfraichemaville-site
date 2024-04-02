"use client";

import Button from "@codegouvfr/react-dsfr/Button";

import { useSaveBookmarksButton } from "./use-save-bookmarks";
import { ModalSaveFicheSolutionDisconnected } from "./modals/modal-save-fiche-solution-disconnected";
import { ModalSaveFichesSolutionsConnected } from "./modals/modal-save-fiche-solution-connected";
import clsx from "clsx";
import { useMemo, useState } from "react";

export type ModalSaveFicheSolutionProps = {
  modal: {
    open: () => void;
    close: () => void;
    isModalOpen: boolean;
  };
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
  const [isModalOpen, setIsModalOpen] = useState(false);

  const modal = useMemo(
    () => ({
      open: () => {
        setIsModalOpen(true);
      },
      close: () => {
        setIsModalOpen(false);
      },
      isModalOpen,
    }),
    [isModalOpen],
  );

  const { isBookmarked, changeFavorite, isAuthenticated } = useSaveBookmarksButton(
    ficheSolutionId,
    projectName,
    modal.open,
  );

  return (
    <div>
      <>
        <div className={className}>
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
              className={clsx(
                "flex justify-center items-center hover:bg-dsfr-hover-blue-sun bg-dsfr-text-label-blue-france ",
                "text-white rounded-2xl cursor-pointer w-8 h-8",
              )}
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
