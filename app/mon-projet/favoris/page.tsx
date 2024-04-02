"use client";
import React, { useEffect, useState } from "react";
import { useLocalStorage } from "usehooks-ts";
import { BOOKMARK_FS_KEY, ProjectBookmarks } from "@/helpers/bookmarkedFicheSolutionHelper";
import BookmarkedFicheSolutionByProject from "@/components/favoris/BookmarkedFicheSolution";
import Button from "@codegouvfr/react-dsfr/Button";
import SignInCard from "@/components/signin/SignInCard";
import { PFMV_ROUTES } from "@/helpers/routes";
import { useUserStore } from "@/stores/user/provider";
import { useSession } from "next-auth/react";
import { getFichesDiagnosticFromLocalStorage } from "@/components/fiches-diagnostic/helpers";
import { FichesDiagnosticFavoris } from "@/components/fiches-diagnostic/fiches-diagnostic-favoris";

export default function Page() {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);
  const session = useSession();
  const userBookmarkedFichesSolutions = useUserStore((state) => state.bookmarkedFichesSolutions);
  const userBookmarkedFichesDiagnostic = useUserStore((state) => state.bookmarkedFichesDiagnostic);
  const [bookmarkedFichesSolutionsInLocalStorage] = useLocalStorage<ProjectBookmarks[]>(BOOKMARK_FS_KEY, []);

  const bookmarkedFichesSolutions =
    session.status === "authenticated" ? userBookmarkedFichesSolutions : bookmarkedFichesSolutionsInLocalStorage;

  const bookmarkedFichesDiagnostic =
    session.status === "authenticated" ? userBookmarkedFichesDiagnostic : getFichesDiagnosticFromLocalStorage();

  return (
    isClient && (
      <div
        className="fr-container text-dsfr-text-title-grey pt-8 flex flex-row flex-wrap first:flex-[1_0_50%] gap-8
          flex-[0_1_100%] order-1 [&>*:not(:nth-child(2))]:w-full [&>*:nth-child(2)]:grow items-start
          place-content-center"
      >
        <div>
          {session.status !== "authenticated" && (
            <SignInCard
              message="save"
              callbackUrl={process.env.NEXT_PUBLIC_URL_SITE + PFMV_ROUTES.ESPACE_PROJET_LISTE}
            />
          )}
        </div>
        <FichesDiagnosticFavoris bookmarkedFichesDiagnostic={bookmarkedFichesDiagnostic} />
        {bookmarkedFichesSolutions && bookmarkedFichesSolutions.length === 0 ? (
          <div>
            <div className="fr-h3">Mes solutions sauvegardées</div>
            <div>{"Retrouvez ici vos solutions sauvegardées."}</div>
            <div>{"Vous n'avez pas encore sélectionné de fiches solutions."}</div>
            <Button
              linkProps={{
                href: PFMV_ROUTES.FICHES_SOLUTIONS,
              }}
              className={"rounded-3xl mt-8"}
            >
              Découvrir les solutions
            </Button>
          </div>
        ) : (
          bookmarkedFichesSolutions &&
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
