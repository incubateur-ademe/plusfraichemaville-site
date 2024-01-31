"use client";
import React, { useEffect, useState } from "react";
import { useLocalStorage } from "usehooks-ts";
import { BOOKMARK_FS_KEY, ProjectBookmarks } from "@/helpers/bookmarkedFicheSolutionHelper";
import BookmarkedFicheSolutionByProject from "@/components/favoris/BookmarkedFicheSolution";
import Button from "@codegouvfr/react-dsfr/Button";

export default function Page() {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);
  const [bookmarkedFichesSolutions] = useLocalStorage<ProjectBookmarks[]>(BOOKMARK_FS_KEY, []);
  return (
    isClient && (
      <div className="fr-container text-dsfr-text-title-grey pt-8">
        {bookmarkedFichesSolutions.length === 0 ? (
          <>
            <div className="fr-h3">Ma sélection</div>
            <div>{"Retrouvez ici vos solutions sauvegardées."}</div>
            <div>{"Vous n'avez pas encore sélectionné de fiches solutions."}</div>
            <Button
              linkProps={{
                href: "/fiche-solution",
              }}
              className={`rounded-3xl mt-8`}
            >
              Découvrir les solutions
            </Button>
          </>
        ) : (
          bookmarkedFichesSolutions
            .sort((a, b) => b.projectName.localeCompare(a.projectName))
            .map((pb) => (
              <div key={pb.projectName}>
                <BookmarkedFicheSolutionByProject projectName={pb.projectName} ficheSolutionIds={pb.ficheSolutionIds} />
                <hr className="mt-8" />
              </div>
            ))
        )}
      </div>
    )
  );
}
