"use client";

import { PFMV_ROUTES } from "@/src/helpers/routes";
import { GenericFicheLink } from "../common/generic-save-fiche/generic-fiche-link";
import { useParams, usePathname } from "next/navigation";
import { Case, Conditional } from "../common/conditional-renderer";
import Link from "next/link";

export const SourcingLayoutButton = () => {
  const { projetId } = useParams();
  const isMapPage = usePathname().includes(PFMV_ROUTES.ESPACE_PROJET_SOURCING_MAP);

  return (
    <div className="flex items-center justify-between">
      <GenericFicheLink
        href={PFMV_ROUTES.ESPACE_PROJET_TABLEAU_DE_BORD}
        className="fr-btn fr-btn--secondary rounded-3xl"
      >
        Revenir au tableau de bord
      </GenericFicheLink>
      <Conditional>
        <Case condition={isMapPage}>
          <Link href={PFMV_ROUTES.ESPACE_PROJET_SOURCING(+projetId)} className="fr-btn rounded-3xl">
            Voir mes contacts sélectionnés
          </Link>
        </Case>
      </Conditional>
    </div>
  );
};