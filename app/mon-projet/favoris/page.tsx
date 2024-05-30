"use client";
import React, { useEffect, useState } from "react";
import { useLocalStorage } from "usehooks-ts";
import SignInCard from "@/components/signin/SignInCard";
import { PFMV_ROUTES } from "@/helpers/routes";
import { useUserStore } from "@/stores/user/provider";
import { useSession } from "next-auth/react";

import { FichesDiagnosticFavoris } from "@/components/fiches-diagnostic/fiches-diagnostic-favoris";
import {
  BOOKMARK_FS_KEY,
  FICHE_DIAGNOSTIC_IDS_STORAGE_KEY,
  FicheBookmarkedSolution,
  FichesBookmarked,
} from "@/components/common/generic-save-fiche/helpers";
import { FichesSolutionsFavoris } from "@/components/ficheSolution/fiches-solutions-favoris";

export default function Page() {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);

  const session = useSession();
  const userBookmarkedFichesSolutions = useUserStore((state) => state.userInfos?.selection_fiches_solutions);
  const userBookmarkedFichesDiagnostic = useUserStore((state) => state.userInfos?.selection_fiches_diagnostic);
  const [bookmarkedFichesSolutionsInLocalStorage] = useLocalStorage<FichesBookmarked[]>(BOOKMARK_FS_KEY, []);
  const [bookmarkedFichesDiagnosticInLocalStorage] = useLocalStorage<number[]>(FICHE_DIAGNOSTIC_IDS_STORAGE_KEY, []);

  const bookmarkedFichesSolutions =
    session.status === "authenticated"
      ? userBookmarkedFichesSolutions ?? []
      : bookmarkedFichesSolutionsInLocalStorage ?? [];

  const bookmarkedFichesDiagnostic =
    session.status === "authenticated" ? userBookmarkedFichesDiagnostic : bookmarkedFichesDiagnosticInLocalStorage;

  return (
    isClient && (
      <div
        className="fr-container order-1 flex flex-[0_1_100%] flex-row flex-wrap place-content-center
          items-start pt-10 text-dsfr-text-title-grey first:flex-[1_0_50%] [&>*:not(:nth-child(2))]:w-full
          [&>*:nth-child(2)]:grow"
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
        <FichesSolutionsFavoris bookmarkedFichesSolutions={bookmarkedFichesSolutions as FicheBookmarkedSolution[]} />
      </div>
    )
  );
}
