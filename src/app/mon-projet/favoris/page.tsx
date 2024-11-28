"use client";
import { PropsWithChildren, ReactNode, useEffect, useState } from "react";
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
import Accordion from "@codegouvfr/react-dsfr/Accordion";

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
              callbackUrl={process.env.NEXT_PUBLIC_URL_SITE + PFMV_ROUTES.ESPACE_PROJET_LISTE}
            />
          )}
        </div>
        <FavorisAccordion>
          <FichesDiagnosticFavoris bookmarkedFichesDiagnostic={bookmarkedFichesDiagnostic} />
        </FavorisAccordion>
        <FavorisAccordion>
          <FichesSolutionsFavoris bookmarkedFichesSolutions={bookmarkedFichesSolutions as FicheBookmarkedSolution[]} />
        </FavorisAccordion>
      </div>
    )
  );
}
type FavorisAccordionProps = {
  children: NonNullable<ReactNode>;
  projectName?: string;
};
export const FavorisAccordion = ({ children, projectName }: FavorisAccordionProps) => {
  return (
    <Accordion
      label={projectName ? `Mon projet « ${projectName} »` : "Mes favoris"}
      className="rounded-[20px] bg-dsfr-background-default-grey-hover"
    >
      {children}
    </Accordion>
  );
};
