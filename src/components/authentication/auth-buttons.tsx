"use client";
import { AuthButtonEspaceProjet } from "./auth-button-espace-projet";
import { AuthButtonUser } from "./auth-button-user";
import { signIn, useSession } from "next-auth/react";
import { Case, Conditional, Default } from "@/src/components/common/conditional-renderer";
import Button from "@codegouvfr/react-dsfr/Button";
import { getFullUrl, PFMV_ROUTES } from "@/src/helpers/routes";
import { usePathname } from "next/navigation";
import clsx from "clsx";

export const AuthButtons = () => {
  const { status } = useSession();

  const handleSignIn = () => signIn("agentconnect", { callbackUrl: getFullUrl(PFMV_ROUTES.ESPACE_PROJET) });
  const displaySearch = process.env.NEXT_PUBLIC_FEATURE_SEARCH === "true" || false;
  const isSearchPage = usePathname().startsWith(PFMV_ROUTES.RECHERCHE_GLOBALE(""));

  return (
    <div className="hidden items-center gap-4 lg:flex">
      {displaySearch && (
        <Button
          title="Rechercher"
          className={clsx("rounded-3xl", isSearchPage && "!bg-dsfr-background-action-low-blue-france")}
          iconId="fr-icon-search-line"
          priority="tertiary"
          iconPosition="left"
          linkProps={{
            href: PFMV_ROUTES.RECHERCHE_GLOBALE(),
          }}
        >
          Rechercher
        </Button>
      )}
      <Conditional>
        <Case condition={status === "authenticated"}>
          <AuthButtonEspaceProjet /> <AuthButtonUser />
        </Case>
        <Case condition={status === "loading"}>
          <div className="h-10 w-40 animate-pulse rounded-3xl bg-dsfr-background-alt-grey" />
        </Case>
        <Default>
          <Button
            onClick={() => handleSignIn()}
            priority="tertiary no outline"
            iconId="fr-icon-user-line"
            iconPosition="left"
            className="rounded-3xl"
          >
            Se connecter
          </Button>
        </Default>
      </Conditional>
    </div>
  );
};
