"use client";
import React, { useEffect, useState } from "react";
import { useLocalStorage } from "usehooks-ts";
import {
  addFicheSolutionBookmark,
  BOOKMARK_FS_KEY,
  isFicheSolutionBookmarked,
  ProjectBookmarks,
  unBookmarkFicheSolution,
} from "@/helpers/bookmarkedFicheSolutionHelper";
import { Oval } from "react-loader-spinner";
import Button from "@codegouvfr/react-dsfr/Button";
import { createModal } from "@codegouvfr/react-dsfr/Modal";

const modalFromIcon = createModal({
  id: "bookmark-modal",
  isOpenedByDefault: false,
});

const modalFromButton = createModal({
  id: "bookmark-label-modal",
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
  const [isClient, setIsClient] = useState(false);

  const [bookmarkedFichesSolutions, setBookmarkedFichesSolutions] = useLocalStorage<ProjectBookmarks[]>(
    BOOKMARK_FS_KEY,
    [],
  );

  const [isBookmarked, setIsBookmarked] = useState(
    isFicheSolutionBookmarked(bookmarkedFichesSolutions, ficheSolutionId, projectName),
  );

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    setIsBookmarked(isFicheSolutionBookmarked(bookmarkedFichesSolutions, ficheSolutionId, projectName));
  }, [bookmarkedFichesSolutions, ficheSolutionId, projectName]);

  const modal = label ? modalFromButton : modalFromIcon;

  const changeFavorite = () => {
    if (isBookmarked) {
      setBookmarkedFichesSolutions(unBookmarkFicheSolution(bookmarkedFichesSolutions, ficheSolutionId, projectName));
      setIsBookmarked(false);
    } else {
      setBookmarkedFichesSolutions(addFicheSolutionBookmark(bookmarkedFichesSolutions, ficheSolutionId, projectName));
      setIsBookmarked(true);
      modal.open();
    }
  };

  return (
    <div className={`${className}`}>
      {isClient ? (
        <>
          {label ? (
            <Button
              className={`fr-icon--sm rounded-3xl text-sm`}
              iconId={isBookmarked ? "fr-icon-bookmark-fill" : "fr-icon-bookmark-line"}
              onClick={changeFavorite}
            >
              {isBookmarked ? "Sauvegardé" : "Sauvegarder"}
            </Button>
          ) : (
            <div
              className="flex justify-center items-center hover:bg-dsfr-hover-blue-sun bg-dsfr-text-label-blue-france
         text-white rounded-2xl cursor-pointer w-8 h-8"
              onClick={changeFavorite}
            >
              <span
                className={`fr-icon--sm ${isBookmarked ? "fr-icon-bookmark-fill" : "fr-icon-bookmark-line"}`}
                aria-hidden="true"
              />
            </div>
          )}
          <modal.Component
            title="Solution sauvegardée dans mon espace Projet"
            iconId="fr-icon-arrow-right-line"
            size="large"
          >
            <div>Retrouvez toutes vos solutions mises en favoris dans votre espace Projet.</div>
            <div className="mt-6">
              <Button className={`rounded-3xl text-sm mr-6 mb-2`} onClick={() => modal.close()} size="small">
                Continuer ma lecture
              </Button>
              <Button
                priority="secondary"
                className={`rounded-3xl text-sm`}
                linkProps={{ href: "/mon-projet/favoris", target: "_self" }}
                size="small"
              >
                Aller sur mon espace projet
              </Button>
            </div>
          </modal.Component>
        </>
      ) : (
        <div
          className={
            `flex justify-center items-center bg-dsfr-text-label-blue-france ` +
            ` h-8 text-white rounded-2xl ${label ? " w-32 " : "w-8 h-8"}`
          }
        >
          <Oval
            height={20}
            width={20}
            color="white"
            visible={true}
            ariaLabel="oval-loading"
            secondaryColor="grey"
            strokeWidth={3}
            strokeWidthSecondary={3}
          />
        </div>
      )}
    </div>
  );
}
