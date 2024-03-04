"use client";

import { PFMV_ROUTES } from "@/helpers/routes";
import Link from "next/link";

type FichesSolutionsProjetHeaderProps = {
  projetId?: number;
  projetNom?: string;
};

export const FichesSolutionsProjetHeader = ({ projetId, projetNom }: FichesSolutionsProjetHeaderProps) => {
  return (
    <div className="mb-8">
      <div className="text-3xl font-bold mb-6">Je choisis mes solutions de rafraîchissement</div>
      <span className="block">
        Mes solutions sélectionnées pour mon projet{" "}
        <Link href={PFMV_ROUTES.TABLEAU_DE_BORD(projetId!)} className="font-semibold">
          {projetNom}
        </Link>
        .
      </span>
      <span>
        Ajouter des solutions ici vous permettra de calculer un budget par projet et préparer un cahier des charges.
      </span>
    </div>
  );
};
