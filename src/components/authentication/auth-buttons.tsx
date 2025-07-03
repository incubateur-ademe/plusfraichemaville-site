"use client";
import { AuthButtonEspaceProjet } from "./auth-button-espace-projet";
import { AuthButtonUser } from "./auth-button-user";
import { signIn, useSession } from "next-auth/react";
import { Case, Conditional, Default } from "@/src/components/common/conditional-renderer";
import Button from "@codegouvfr/react-dsfr/Button";
import { getFullUrl, PFMV_ROUTES } from "@/src/helpers/routes";

export const AuthButtons = () => {
  const { status } = useSession();

  const handleSignIn = () => signIn("agentconnect", { callbackUrl: getFullUrl(PFMV_ROUTES.ESPACE_PROJET_LISTE) });

  return (
    <div className="hidden items-center gap-4 lg:flex">
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
