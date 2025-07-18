"use client";

import { PFMV_ROUTES } from "@/src/helpers/routes";
import clsx from "clsx";
import { usePathname } from "next/navigation";
import LinkWithoutPrefetch from "@/src/components/common/link-without-prefetch";

export const AuthButtonEspaceProjet = () => {
  const isConnexionPage = usePathname().startsWith(PFMV_ROUTES.CONNEXION);
  const isEspaceProjet = usePathname().startsWith(PFMV_ROUTES.ESPACE_PROJET);

  return (
    <LinkWithoutPrefetch
      href={PFMV_ROUTES.ESPACE_PROJET}
      className={clsx(
        "fr-btn fr-btn--tertiary ri-dashboard-fill fr-btn--icon-left relative z-10",
        "!text-sm !shadow-none",
        isConnexionPage || isEspaceProjet
          ? "!bg-dsfr-background-action-low-blue-france"
          : "border-[1px] border-dsfr-background-disabled-grey",
      )}
    >
      Mon espace projet
    </LinkWithoutPrefetch>
  );
};
