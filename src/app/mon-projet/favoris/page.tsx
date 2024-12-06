"use client";
import { useEffect, useState } from "react";
import { useLocalStorage } from "usehooks-ts";
import SignInCard from "@/src/components/signin/SignInCard";
import { PFMV_ROUTES } from "@/src/helpers/routes";
import { useUserStore } from "@/src/stores/user/provider";
import { useSession } from "next-auth/react";

import { FichesDiagnosticFavoris } from "@/src/components/fiches-diagnostic/fiches-diagnostic-favoris";
import {
  BOOKMARK_FS_KEY,
  FICHE_DIAGNOSTIC_IDS_STORAGE_KEY,
  FicheBookmarkedSolution,
  FichesBookmarked,
} from "@/src/components/common/generic-save-fiche/helpers";
import { FichesSolutionsFavoris } from "@/src/components/ficheSolution/fiches-solutions-favoris";
import clsx from "clsx";

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
      <div className="fr-container pt-10">
        <div>
          {session.status !== "authenticated" && (
            <SignInCard
              message="save"
              className={clsx(
                "mb-9 flex !w-full !max-w-full pb-0",
                "[&_.fr-connect-group]:flex [&_.fr-connect-group]:flex-col",
                "[&_.fr-connect-group]:items-center [&_.fr-connect-group]:justify-center",
              )}
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
