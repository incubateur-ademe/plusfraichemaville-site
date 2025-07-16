"use client";

import { PFMV_ROUTES } from "@/src/helpers/routes";
import LinkWithoutPrefetch from "@/src/components/common/link-without-prefetch";

type FichesSolutionsProjetHeaderProps = {
  projetId?: number;
  projetNom?: string;
};

export const FichesSolutionsProjetHeader = ({ projetId, projetNom }: FichesSolutionsProjetHeaderProps) => {
  return (
    <div className="mb-8">
      <h1 className="mb-6 text-[1.75rem] font-bold">Je choisis mes solutions de rafraîchissement</h1>
      <span className="block">
        Mes solutions sélectionnées pour mon projet{" "}
        <LinkWithoutPrefetch href={PFMV_ROUTES.TABLEAU_DE_BORD(projetId!)} className="font-semibold">
          {projetNom}
        </LinkWithoutPrefetch>
        .
      </span>
      <span>
        Ajouter des solutions ici vous permettra de calculer un budget par projet et préparer un cahier des charges.
      </span>
    </div>
  );
};
