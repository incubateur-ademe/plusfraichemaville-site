"use client";
import { FicheTechnique } from "@/lib/directus/directusModels";
import React, { useEffect, useState } from "react";
import Tag from "@codegouvfr/react-dsfr/Tag";
import { SpinnerCircularFixed } from "spinners-react";
import { useLocalStorage } from "usehooks-ts";
import {
  addFicheTechniqueBookmark,
  BOOKMARK_FT_KEY,
  isFicheTechniqueBookmarked,
  ProjectBookmarks,
  unBookmarkFicheTechnique,
} from "@/helpers/bookmarkedFicheTechniqueHelper";

export default function FicheTechniqueCardWithUserInfo({
  ficheTechnique,
  aideDecisionFirstStepName,
  children,
}: {
  ficheTechnique: FicheTechnique;
  aideDecisionFirstStepName: string;
  children: React.ReactNode;
}) {
  const [isClient, setIsClient] = useState(false);

  const [bookmarkedFichesTechniques, setBookmarkedFichesTechniques] = useLocalStorage<ProjectBookmarks[]>(
    BOOKMARK_FT_KEY,
    [],
  );

  const [isBookmarked, setIsBookmarked] = useState(
    isFicheTechniqueBookmarked(bookmarkedFichesTechniques, ficheTechnique.id, aideDecisionFirstStepName),
  );

  useEffect(() => {
    setIsClient(true);
  }, []);

  const changeFavorite = () => {
    if (isBookmarked) {
      setBookmarkedFichesTechniques(
        unBookmarkFicheTechnique(bookmarkedFichesTechniques, ficheTechnique.id, aideDecisionFirstStepName),
      );
      setIsBookmarked(false);
    } else {
      setBookmarkedFichesTechniques(
        addFicheTechniqueBookmark(bookmarkedFichesTechniques, ficheTechnique.id, aideDecisionFirstStepName),
      );
      setIsBookmarked(true);
    }
  };
  return (
    <div className={"relative flex grow"}>
      {children}
      {isClient ? (
        <Tag
          className={"absolute top-2 right-2 z-40"}
          iconId={isBookmarked ? "fr-icon-bookmark-fill" : "fr-icon-bookmark-line"}
          nativeButtonProps={{
            onClick: changeFavorite,
          }}
        >
          {isBookmarked ? "Retirer des favoris" : "Mettre en favori"}
        </Tag>
      ) : (
        <Tag
          className={"absolute top-2 right-2 z-40"}
          nativeButtonProps={{
            onClick: () => {},
          }}
        >
          <SpinnerCircularFixed size={20} color="dsfr-text-label-blue-france" />
        </Tag>
      )}
    </div>
  );
}
