"use client";

import { PFMV_ROUTES } from "@/helpers/routes";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const AuthButtonEspaceProjet = () => {
  const isConnexionPage = usePathname().startsWith(PFMV_ROUTES.CONNEXION);
  const isEspaceProjet = usePathname().startsWith(PFMV_ROUTES.ESPACE_PROJET);

  return (
    <Link
      href={PFMV_ROUTES.ESPACE_PROJET}
      className={clsx(
        "fr-btn fr-btn--tertiary ri-dashboard-fill fr-btn--icon-left relative z-10",
        "!text-sm !shadow-none",
        isConnexionPage || isEspaceProjet
          ? "!bg-dsfr-background-action-low-blue-france"
          : "border-dsfr-background-disabled-grey border-[1px]",
      )}
    >
      Mon espace projet
    </Link>
  );
};
