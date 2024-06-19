"use client";

import { PFMV_ROUTES } from "@/helpers/routes";
import { useProjetsStore } from "@/stores/projets/provider";
import Link from "next/link";
import { AideListeCard } from "./aide-liste-card";

export const AideListe = () => {
  const projet = useProjetsStore((state) => state.getCurrentProjet());
  const { estimations, fiches_solutions_id: fichesSolutions } = projet || {};

  const hasEstimations = estimations && estimations?.length > 0;
  const hasFichesSolutions = fichesSolutions && fichesSolutions?.length > 0;

  if (!hasEstimations || !hasFichesSolutions) {
    return null;
  }

  return (
    <div>
      <div className="mb-10 flex items-center justify-between">
        <h1 className="mb-0 max-w-3xl text-[28px] font-bold leading-9">
          Pour quelle estimation souhaitez-vous trouver des financements ou des soutiens à {"l'ingénierie"} ?
        </h1>
        <Link
          href={PFMV_ROUTES.TABLEAU_DE_BORD_WITH_CURRENT_TAB(projet!.id, "tableau-de-suivi")}
          className="fr-btn fr-btn--tertiary rounded-[20px] !text-sm"
        >
          Retour au tableau de bord
        </Link>
      </div>
      <div>
        {estimations.map((estimation, index) => (
          <AideListeCard estimation={estimation} financementCount={2} ingenierieCount={4} key={index} />
        ))}
      </div>
    </div>
  );
};
