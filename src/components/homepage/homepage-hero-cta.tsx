"use client";
import LinkWithoutPrefetch from "@/src/components/common/link-without-prefetch";
import { useSession } from "next-auth/react";
import { Case, Conditional } from "@/src/components/common/conditional-renderer";
import { PFMV_ROUTES } from "@/src/helpers/routes";
import { useProjetsStore } from "@/src/stores/projets/provider";
import { hasFichesSolutions } from "@/src/components/common/generic-save-fiche/helpers";
import { isEmpty } from "@/src/helpers/listUtils";

export const HomepageHeroCta = () => {
  const { status } = useSession();
  const projets = useProjetsStore((state) => state.projets);
  const onlyOneProjetWithoutSolution = projets?.length === 1 && !hasFichesSolutions(projets[0]);
  const onlyOneProjetWithSolution = projets?.length === 1 && hasFichesSolutions(projets[0]);

  return (
    <>
      <Conditional>
        <Case condition={status === "loading"}>
          <div className="h-10 w-40 animate-pulse rounded-3xl bg-dsfr-background-alt-grey mx-auto" />
        </Case>
        <Case condition={status === "unauthenticated"}>
          <LinkWithoutPrefetch href={PFMV_ROUTES.CONNEXION} className="fr-btn rounded-3xl">
            Créer un projet
          </LinkWithoutPrefetch>
        </Case>
        <Case condition={isEmpty(projets)}>
          <LinkWithoutPrefetch href={PFMV_ROUTES.CREATE_PROJET} className="fr-btn rounded-3xl">
            Je crée mon premier projet
          </LinkWithoutPrefetch>
        </Case>
        <Case condition={onlyOneProjetWithoutSolution}>
          <LinkWithoutPrefetch href={PFMV_ROUTES.TABLEAU_DE_BORD(projets[0]?.id)} className="fr-btn rounded-3xl">
            Je sélectionne des solutions pour mon projet
          </LinkWithoutPrefetch>
        </Case>
        <Case condition={onlyOneProjetWithSolution}>
          <LinkWithoutPrefetch href={PFMV_ROUTES.TABLEAU_DE_BORD(projets[0]?.id)} className="fr-btn rounded-3xl">
            Je continue mon projet
          </LinkWithoutPrefetch>
        </Case>
        <Case condition={projets?.length > 1}>
          <LinkWithoutPrefetch href={PFMV_ROUTES.ESPACE_PROJET} className="fr-btn rounded-3xl">
            Je continue mes projets
          </LinkWithoutPrefetch>
        </Case>
      </Conditional>
    </>
  );
};
