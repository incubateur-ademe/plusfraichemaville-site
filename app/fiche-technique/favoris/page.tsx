"use client";
import React, { useEffect, useState } from "react";
import BookmarkedFicheTechniqueByProject from "@/components/favoris/BookmarkedFicheTechnique";
import { useLocalStorage } from "usehooks-ts";
import { BOOKMARK_FS_KEY, ProjectBookmarks } from "@/helpers/bookmarkedFicheSolutionHelper";

export default function Page() {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);
  const [bookmarkedFichesTechniques] = useLocalStorage<ProjectBookmarks[]>(BOOKMARK_FS_KEY, []);
  return (
    isClient && (
      <div className="fr-container">
        {bookmarkedFichesTechniques.length <= 0 ? (
          <div className={"text-xl font-bold"}>{"Vous n'avez pas encore sélectionné de fiches techniques"}</div>
        ) : (
          bookmarkedFichesTechniques.map((pb) => (
            <BookmarkedFicheTechniqueByProject
              key={pb.projectName}
              projectName={pb.projectName}
              ficheTechniqueIds={pb.ficheSolutionIds}
            />
          ))
        )}
      </div>
    )
  );
}
