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

export default function FicheSolutionCardWithUserInfo({
  ficheSolution,
  aideDecisionFirstStepName,
  children,
}: {
  ficheSolution: FicheSolution;
  aideDecisionFirstStepName: string;
  children: React.ReactNode;
}) {
  const [isClient, setIsClient] = useState(false);

  const [bookmarkedFichesSolutions, setBookmarkedFichesSolutions] = useLocalStorage<ProjectBookmarks[]>(
    BOOKMARK_FS_KEY,
    [],
  );

  const [isBookmarked, setIsBookmarked] = useState(
    isFicheSolutionBookmarked(bookmarkedFichesSolutions, ficheSolution.id, aideDecisionFirstStepName),
  );

  useEffect(() => {
    setIsClient(true);
  }, []);

  const changeFavorite = () => {
    if (isBookmarked) {
      setBookmarkedFichesSolutions(
        unBookmarkFicheSolution(bookmarkedFichesSolutions, ficheSolution.id, aideDecisionFirstStepName),
      );
      setIsBookmarked(false);
    } else {
      setBookmarkedFichesSolutions(
        addFicheSolutionBookmark(bookmarkedFichesSolutions, ficheSolution.id, aideDecisionFirstStepName),
      );
      setIsBookmarked(true);
    }
  };
  return (
    <div className={"relative flex"}>
      {children}
      {isClient ? (
        <div
          className="flex justify-center items-center hover:bg-dsfr-hover-blue-sun bg-dsfr-text-label-blue-france
        w-8 h-8 text-white rounded-2xl absolute cursor-pointer top-2 right-6 z-40"
          onClick={changeFavorite}
        >
          <span
            className={`fr-icon--sm ${isBookmarked ? "fr-icon-bookmark-fill" : "fr-icon-bookmark-line"}`}
            aria-hidden="true"
          />
        </div>
      ) : (
        <div
          className="flex justify-center items-center bg-dsfr-text-label-blue-france
        w-8 h-8 text-white rounded-2xl absolute cursor-pointer top-2 right-6 z-40"
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
