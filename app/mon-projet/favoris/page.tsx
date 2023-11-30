"use client";
import React, { useEffect, useState } from "react";
import { useLocalStorage } from "usehooks-ts";
import { BOOKMARK_FS_KEY, ProjectBookmarks } from "@/helpers/bookmarkedFicheSolutionHelper";
import BookmarkedFicheSolutionByProject from "@/components/favoris/BookmarkedFicheSolution";

export default function Page() {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);
  const [bookmarkedFichesSolutions] = useLocalStorage<ProjectBookmarks[]>(BOOKMARK_FS_KEY, []);
  return (
    isClient && (
      <div className="fr-container">
        {bookmarkedFichesSolutions.length <= 0 ? (
          <div className={"text-xl font-bold"}>{"Vous n'avez pas encore sélectionné de fiches solutions"}</div>
        ) : (
          bookmarkedFichesSolutions.map((pb) => (
            <BookmarkedFicheSolutionByProject
              key={pb.projectName}
              projectName={pb.projectName}
              ficheSolutionIds={pb.ficheSolutionIds}
            />
          ))
        )}
      </div>
    )
  );
}
