"use client";
import { useEffect, useState } from "react";
import { useLocalStorage } from "usehooks-ts";
import SignInCard from "@/src/components/signin/SignInCard";
import { PFMV_ROUTES } from "@/src/helpers/routes";
import { useUserStore } from "@/src/stores/user/provider";
import { useSession } from "next-auth/react";

import {
  BOOKMARK_FS_KEY,
  FicheBookmarkedSolution,
  FichesBookmarked,
} from "@/src/components/common/generic-save-fiche/helpers";
import { FichesSolutionsFavoris } from "@/src/components/ficheSolution/fiches-solutions-favoris";

export default function Page() {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);

  const session = useSession();
  const userBookmarkedFichesSolutions = useUserStore((state) => state.userInfos?.selection_fiches_solutions);
  const [bookmarkedFichesSolutionsInLocalStorage] = useLocalStorage<FichesBookmarked[]>(BOOKMARK_FS_KEY, []);

  const bookmarkedFichesSolutions =
    session.status === "authenticated"
      ? userBookmarkedFichesSolutions ?? []
      : bookmarkedFichesSolutionsInLocalStorage ?? [];

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
        <FichesSolutionsFavoris bookmarkedFichesSolutions={bookmarkedFichesSolutions as FicheBookmarkedSolution[]} />
      </div>
    )
  );
}
