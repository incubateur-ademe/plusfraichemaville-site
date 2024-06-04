"use client";

import { PFMV_ROUTES } from "@/helpers/routes";
import clsx from "clsx";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const AuthButtonEspaceProjet = () => {
  const { status } = useSession();
  const isAuthanticated = status === "authenticated";
  const isConnexionPage = usePathname().startsWith("/connexion");

  return (
    <Link
      href={PFMV_ROUTES.ESPACE_PROJET}
      className={clsx(
        "fr-btn fr-btn--tertiary ri-dashboard-fill fr-btn--icon-left relative z-10",
        "!text-sm !shadow-none",
        isAuthanticated || isConnexionPage
          ? "!bg-dsfr-background-action-low-blue-france"
          : "border-dsfr-background-disabled-grey border-[1px]",
      )}
    >
      Mon espace projet
    </Link>
  );
};
