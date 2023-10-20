"use client";
import { FicheTechnique } from "@/lib/directus/directusModels";
import React, { useState } from "react";
import {
  bookmarkFicheTechniques,
  isFicheTechniquesBookmarked,
  unBookmarkFicheTechniques,
} from "@/lib/favorites/anonymousFavorite";
import Tag from "@codegouvfr/react-dsfr/Tag";

export default function FicheTechniqueCardWithUserInfo({
  ficheTechnique,
  children,
}: {
  ficheTechnique: FicheTechnique;
  children: React.ReactNode;
}) {
  const [isBookmarked, setIsBookmarked] = useState(isFicheTechniquesBookmarked(ficheTechnique.slug));

  const changeFavorite = () => {
    if (isBookmarked) {
      unBookmarkFicheTechniques(ficheTechnique.slug);
      setIsBookmarked(false);
    } else {
      bookmarkFicheTechniques(ficheTechnique.slug);
      setIsBookmarked(true);
    }
  };
  return (
    <div className={"flex flex-col"}>
      {children}
      <Tag
        iconId="fr-icon-bookmark-line"
        dismissible={isBookmarked}
        nativeButtonProps={{
          onClick: changeFavorite,
        }}
      >
        {isBookmarked ? "Retirer des favoris" : "Mettre en favori"}
      </Tag>
    </div>
  );
}
