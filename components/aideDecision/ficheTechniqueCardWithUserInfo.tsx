"use client";
import { FicheTechnique } from "@/lib/directus/directusModels";
import React, { useEffect, useState } from "react";
import Tag from "@codegouvfr/react-dsfr/Tag";
import { useLocalStorageBookmarkedFT } from "@/hooks/useLocalStorage";
import { SpinnerCircularFixed } from "spinners-react";

export default function FicheTechniqueCardWithUserInfo({
  ficheTechnique,
  children,
}: {
  ficheTechnique: FicheTechnique;
  children: React.ReactNode;
}) {
  const [isClient, setIsClient] = useState(false);
  const { isFicheTechniqueBookmarked, bookmarkFicheTechnique, unBookmarkFicheTechnique } =
    useLocalStorageBookmarkedFT();
  useEffect(() => {
    setIsClient(true);
    setIsBookmarked(isFicheTechniqueBookmarked(ficheTechnique.slug));
  }, [ficheTechnique.slug, isFicheTechniqueBookmarked]);
  const [isBookmarked, setIsBookmarked] = useState(false);

  const changeFavorite = () => {
    if (isBookmarked) {
      unBookmarkFicheTechnique(ficheTechnique.slug);
      setIsBookmarked(false);
    } else {
      bookmarkFicheTechnique(ficheTechnique.slug);
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
          <SpinnerCircularFixed size={20} color="var(--text-label-blue-france)" />
        </Tag>
      )}
    </div>
  );
}
