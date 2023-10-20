"use client";
import { FicheTechnique } from "@/lib/directus/directusModels";
import React, { useState } from "react";
import {
  bookmarkFicheTechniques,
  isFicheTechniquesBookmarked,
  unBookmarkFicheTechniques,
} from "@/lib/favorites/anonymousFavorite";
import Button from "@codegouvfr/react-dsfr/Button";

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
      <Button className={"grow-0"} onClick={changeFavorite}>
        {isBookmarked ? "Retirer des favoris" : "Mettre en favori"}
      </Button>
    </div>
  );
}
