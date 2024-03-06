"use client";
import React from "react";

import Button from "@codegouvfr/react-dsfr/Button";
import { createModal } from "@codegouvfr/react-dsfr/Modal";

import { useConnectedSaveBookmarksButton } from "./use-save-bookmarks";

const modal = createModal({
  id: "bookmark-modal",
  isOpenedByDefault: false,
});

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
  const { isBookmarked, changeFavorite } = useConnectedSaveBookmarksButton(ficheSolutionId, projectName, modal.open);

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
        <modal.Component
          title="Solution sauvegardée dans mon espace Projet"
          iconId="fr-icon-arrow-right-line"
          size="large"
        >
          <div>Retrouvez toutes vos solutions mises en favoris dans votre espace Projet.</div>
          <div className="mt-6">
            <Button className={"rounded-3xl text-sm mr-6 mb-2"} onClick={() => modal.close()} size="small">
              Continuer ma lecture
            </Button>
            <Button
              priority="secondary"
              className={"rounded-3xl text-sm"}
              linkProps={{ href: "/mon-projet/favoris", target: "_self" }}
              size="small"
            >
              Ma sélection
            </Button>
          </div>
        </modal.Component>
      </>
    </div>
  );
}
