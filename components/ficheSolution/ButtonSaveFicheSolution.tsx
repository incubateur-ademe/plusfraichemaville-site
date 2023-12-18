"use client";
import { FicheSolution } from "@/lib/directus/directusModels";
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

export default function ButtonSaveFicheSolution({
  ficheSolution,
  projectName,
  label,
  className,
}: {
  ficheSolution: FicheSolution;
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
    isFicheSolutionBookmarked(bookmarkedFichesSolutions, ficheSolution.id, projectName),
  );

  useEffect(() => {
    setIsClient(true);
  }, []);

  const changeFavorite = () => {
    if (isBookmarked) {
      setBookmarkedFichesSolutions(unBookmarkFicheSolution(bookmarkedFichesSolutions, ficheSolution.id, projectName));
      setIsBookmarked(false);
    } else {
      setBookmarkedFichesSolutions(addFicheSolutionBookmark(bookmarkedFichesSolutions, ficheSolution.id, projectName));
      setIsBookmarked(true);
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
