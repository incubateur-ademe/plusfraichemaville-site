"use client";
import { AuthButtonEspaceProjet } from "./auth-button-espace-projet";
import { AuthButtonUser } from "./auth-button-user";
import { useSession } from "next-auth/react";
import { PFMV_ROUTES } from "@/src/helpers/routes";
import Link from "next/link";
import { Case, Conditional, Default } from "@/src/components/common/conditional-renderer";

export const AuthButtons = () => {
  const { status } = useSession();

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
          <Link
            className="fr-btn fr-btn--tertiary-no-outline fr-icon-user-line fr-btn--icon-left rounded-3xl"
            href={PFMV_ROUTES.ESPACE_PROJET}
            prefetch={false}
          >
            Se connecter
          </Link>
        </Default>
      </Conditional>
    </div>
  );
};
